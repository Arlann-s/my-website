/* Arlann Weather Intelligence — resilient client-side implementation */
(() => {
'use strict';
const DEFAULT={lat:13.7563,lon:100.5018,name:'Bangkok'};
let place={...DEFAULT},frames=[],radarHost='',radarLayer=null,map=null,marker=null,chart=null,playTimer=null;
const models=[];
const $=id=>document.getElementById(id);
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const say=(id,value)=>{const e=$(id);if(e)e.textContent=value};
const weatherText=c=>({0:'ท้องฟ้าแจ่มใส',1:'แจ่มใสเป็นส่วนใหญ่',2:'มีเมฆบางส่วน',3:'มีเมฆมาก',45:'หมอก',48:'หมอก',51:'ฝนปรอย',53:'ฝนปรอย',55:'ฝนปรอยหนัก',61:'ฝนเล็กน้อย',63:'ฝนปานกลาง',65:'ฝนหนัก',80:'ฝนซู่',81:'ฝนซู่',82:'ฝนซู่หนัก',95:'ฝนฟ้าคะนอง',96:'พายุฝน',99:'พายุฝน'}[c]||'สภาพอากาศแปรปรวน');
const icon=c=>c>=95?'⛈️':c>=80?'🌧️':c>=51?'🌦️':c>=3?'☁️':'☀️';
async function getJSON(url,ms=16000){const ctl=new AbortController(),timer=setTimeout(()=>ctl.abort(),ms);try{const r=await fetch(url,{signal:ctl.signal,cache:'no-store'});if(!r.ok)throw Error('HTTP '+r.status);return await r.json()}finally{clearTimeout(timer)}}
function note(message){console.warn('[Weather]',message);const el=$('insight');if(el)el.textContent=message}
function initMap(){
 if(!window.L){$('map').innerHTML='<div style="padding:24px;color:#536474">แผนที่โหลดไม่สำเร็จ กรุณาตรวจอินเทอร์เน็ตแล้วรีเฟรช แต่ข้อมูลพยากรณ์ด้านอื่นยังใช้งานได้</div>';return}
 map=L.map('map',{zoomControl:false}).setView([place.lat,place.lon],7);
 L.control.zoom({position:'bottomright'}).addTo(map);
 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OpenStreetMap'}).addTo(map);
 marker=L.marker([place.lat,place.lon]).addTo(map);
 map.on('click',async e=>{await selectPlace(e.latlng.lat,e.latlng.lng,e.latlng.lat.toFixed(2)+', '+e.latlng.lng.toFixed(2))});
}
async function loadRadar(){
 try{
  const d=await getJSON('https://api.rainviewer.com/public/weather-maps.json');
  radarHost=d.host;frames=[...(d.radar?.past||[]),...(d.radar?.nowcast||[])];
  const past=d.radar?.past?.length||0;
  $('timeline').max=Math.max(0,frames.length-1);$('timeline').value=Math.max(0,past-1);
  drawRadar(+$('timeline').value);
  const f=frames[past?past-1:0],age=f?Math.max(0,Math.round(Date.now()/1000-f.time)/60):null;
  say('updated',age!==null?'Radar frame '+Math.round(age)+' min old':'Radar feed connected');
  say('radarBadge',frames.length?frames.length+' radar frames':'No radar frames');
  say('radarQuality',age!==null?Math.round(age)+' min old':'No frame');
 }catch(e){say('updated','Radar unavailable');say('radarBadge','Unavailable');say('radarQuality','Unavailable');console.warn('Radar:',e)}
}
function drawRadar(i){
 const f=frames[i];if(!f||!radarHost||!map)return;
 if(radarLayer)map.removeLayer(radarLayer);
 radarLayer=L.tileLayer(radarHost+f.path+'/256/{z}/{x}/{y}/2/1_1.png',{opacity:.65,maxZoom:12,attribution:'Radar © <a href="https://www.rainviewer.com/" target="_blank" rel="noopener noreferrer">RainViewer</a>'}).addTo(map);
 say('radarTime',new Intl.DateTimeFormat('th-TH',{hour:'2-digit',minute:'2-digit'}).format(new Date(f.time*1000)));
}
$('timeline').addEventListener('input',e=>drawRadar(+e.target.value));
$('playBtn').addEventListener('click',()=>{if(playTimer){clearInterval(playTimer);playTimer=null;say('playBtn','▶');return}if(!frames.length)return;say('playBtn','Ⅱ');let i=+$('timeline').value;playTimer=setInterval(()=>{i=(i+1)%frames.length;$('timeline').value=i;drawRadar(i)},700)});
const MODELS=[{id:'ecmwf',name:'ECMWF IFS',endpoint:'ecmwf'},{id:'gfs',name:'NOAA GFS',endpoint:'gfs'},{id:'icon',name:'DWD ICON',endpoint:'dwd-icon'},{id:'jma',name:'JMA',endpoint:'jma'}];
function modelURL(endpoint,prob=true){const p=new URLSearchParams({latitude:place.lat,longitude:place.lon,hourly:'temperature_2m,precipitation,rain,'+(prob?'precipitation_probability,':'')+'weather_code,wind_speed_10m',forecast_days:'2',timezone:'auto',timeformat:'unixtime'});return 'https://api.open-meteo.com/v1/'+endpoint+'?'+p}
async function loadModels(){
 models.length=0;
 await Promise.all(MODELS.map(async m=>{try{let data;try{data=await getJSON(modelURL(m.endpoint,true))}catch(_){data=await getJSON(modelURL(m.endpoint,false))}models.push({meta:m,data})}catch(e){console.warn(m.name,e)}}));
 if(!models.length){
  const p=new URLSearchParams({latitude:place.lat,longitude:place.lon,current:'temperature_2m,precipitation,rain,weather_code,wind_speed_10m',hourly:'temperature_2m,precipitation,rain,precipitation_probability,weather_code,wind_speed_10m',forecast_days:'2',timezone:'auto'});
  const data=await getJSON('https://api.open-meteo.com/v1/forecast?'+p);
  models.push({meta:{id:'baseline',name:'Open-Meteo Best Match'},data});
 }
 $('modelList').innerHTML=MODELS.map(m=>{const ok=models.some(x=>x.meta.id===m.id);return '<div class="model-line"><span>'+m.name+'</span><b class="'+(ok?'ok':'muted')+'">'+(ok?'ONLINE':'UNAVAILABLE')+'</b></div>'}).join('');
 if(models.some(x=>x.meta.id==='baseline'))$('modelList').insertAdjacentHTML('beforeend','<div class="model-line"><span>Open-Meteo Best Match (fallback)</span><b class="ok">ONLINE</b></div>');
 say('modelNote',models.length+' source(s) responding; fallback is used if model endpoints fail');
 say('modelQuality',models.length+' source(s) online');
 return models;
}
function valuesAt(result,times){const h=result.data.hourly;const src=(h.time||[]).map((t,i)=>({t:Number(t)*1000,rain:Number(h.precipitation?.[i]??h.rain?.[i]??0),pop:h.precipitation_probability?.[i]==null?null:Number(h.precipitation_probability[i])}));return times.map(t=>{const target=Number(t)*1000;let best=null,dist=Infinity;for(const p of src){const d=Math.abs(p.t-target);if(d<dist){best=p;dist=d}}return best&&dist<=90*60000?best:{rain:0,pop:null}})}
function drawChart(labels,data){if(!window.Chart){$('rainChart').insertAdjacentHTML('afterend','<p class="weather-caption">กราฟโหลดไม่สำเร็จ แต่ข้อมูลรายชั่วโมงแสดงด้านล่าง</p>');return}if(chart)chart.destroy();chart=new Chart($('rainChart'),{type:'line',data:{labels,datasets:[{label:'Rain (mm)',data,borderColor:'#087ca5',backgroundColor:'rgba(56,189,248,.14)',borderWidth:2.5,pointRadius:2,tension:.3,fill:true}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{display:false}},y:{beginAtZero:true,title:{display:true,text:'mm/h'}}}}})}
async function loadForecast(){
 const list=await loadModels();const primary=list.find(x=>x.meta.id==='ecmwf')||list[0],h=primary.data.hourly;
 if(!h?.time?.length)throw Error('Forecast response contained no hourly data');
 let idx=h.time.findIndex(t=>Number(t)*1000>=Date.now());if(idx<0)idx=0;
 say('temp',Math.round(h.temperature_2m?.[idx]??primary.data.current?.temperature_2m??0)+'°');
 const code=h.weather_code?.[idx]??primary.data.current?.weather_code??-1;say('weatherText',weatherText(code));say('weatherIcon',icon(code));
 say('rainNow',(h.rain?.[idx]??h.precipitation?.[idx]??primary.data.current?.rain??primary.data.current?.precipitation??0).toFixed(1)+' mm');
 say('popNow',h.precipitation_probability?.[idx]==null?'—':h.precipitation_probability[idx]+'%');
 say('windNow',Math.round(h.wind_speed_10m?.[idx]??primary.data.current?.wind_speed_10m??0)+' km/h');
 const times=h.time.slice(idx,idx+6);const ss=list.map(m=>({meta:m.meta,vals:valuesAt(m,times)}));
 const rain=times.map((_,i)=>ss.reduce((s,m)=>s+m.vals[i].rain,0)/ss.length);
 const pop=times.map((_,i)=>{const a=ss.map(m=>m.vals[i].pop).filter(v=>v!==null);return a.length?a.reduce((s,v)=>s+v,0)/a.length:null});
 const pops=pop.filter(v=>v!==null),avgPop=pops.length?pops.reduce((a,b)=>a+b,0)/pops.length:null,peak= pops.length?Math.max(...pops):null,total=rain.reduce((a,b)=>a+b,0);
 const totals=ss.map(m=>m.vals.reduce((s,v)=>s+v.rain,0)),mean=totals.reduce((a,b)=>a+b,0)/totals.length,spread=Math.max(...totals)-Math.min(...totals),agreement=totals.length<2?null:clamp(Math.round(100-100*clamp(spread/(Math.max(mean,1)+1)/2.2,0,1)),0,100);
 const risk=clamp(Math.round((avgPop??0)*.55+Math.min(total*5,28)+Math.min((peak??0)*.12,12)),0,100);
 say('riskScore',risk);say('riskBar','');$('riskBar').style.width=risk+'%';
 say('riskLabel',risk>=75?'ความเสี่ยงสูงมาก':risk>=50?'ความเสี่ยงสูง':risk>=25?'ความเสี่ยงปานกลาง':'ความเสี่ยงต่ำ');
 say('riskDetail',(avgPop===null?'ไม่มี PoP จากโมเดล':'PoP เฉลี่ย '+Math.round(avgPop)+'%')+' · '+total.toFixed(1)+' mm / 6h');
 say('confidence',agreement===null?'ความสอดคล้อง N/A':'Agreement '+agreement+'%');
 $('confidence').className='confidence-badge '+(agreement>=75?'high':agreement>=50?'mid':'low');
 say('signal',risk>=70?'⚠️ สัญญาณฝนเด่น — ติดตามเรดาร์ใกล้เวลา':risk>=40?'🟡 มีสัญญาณฝนบางส่วน':'ยังไม่พบสัญญาณฝนเด่น');
 const etaIndex=pop.findIndex((p,i)=>p!==null&&p>=60&&rain[i]>=.2);
 say('eta',etaIndex<0?'ยังไม่พบช่วงฝนเด่นจากเกณฑ์นี้': 'ช่วงที่ควรเฝ้าระวังประมาณ '+new Date(Number(times[etaIndex])*1000).toLocaleTimeString('th-TH',{hour:'2-digit',minute:'2-digit',timeZone:primary.data.timezone||'UTC'}));
 const first=rain.slice(0,3).reduce((a,b)=>a+b,0),last=rain.slice(3).reduce((a,b)=>a+b,0),trend=last>first*1.25?'เพิ่มขึ้น':first>last*1.25?'ลดลง':'ทรงตัว';say('trendBadge','แนวโน้ม '+trend);
 const peakIndex=pop.findIndex(v=>v===peak);say('insight','แนวโน้มฝน'+trend+' · ปริมาณสะสมเฉลี่ยจากแหล่งที่ตอบสนอง '+total.toFixed(1)+' mm/6h · '+(avgPop===null?'ไม่มีข้อมูลความน่าจะเป็นฝนที่ใช้เทียบได้':'PoP เฉลี่ย '+Math.round(avgPop)+'%')+' · model agreement '+(agreement===null?'N/A':agreement+'%')+'. คะแนน Risk เป็นดัชนี ไม่ใช่โอกาสฝนที่ผ่านการ calibration');
 say('qualityTitle',list.length+' data source(s) online');say('qualityText','ใช้ข้อมูลพยากรณ์ที่ดึงได้จริง หาก endpoint ของโมเดลไม่ตอบสนองจะใช้ Open-Meteo Best Match สำรอง ค่า agreement เป็นความสอดคล้อง ไม่ใช่ความแม่นยำที่พิสูจน์แล้ว');
 $('forecastStrip').innerHTML=times.map((t,i)=>'<div class="hour"><small>'+new Date(Number(t)*1000).toLocaleTimeString('th-TH',{hour:'2-digit',minute:'2-digit',timeZone:primary.data.timezone||'UTC'})+'</small><b>'+rain[i].toFixed(1)+' mm</b><b class="pop">'+(pop[i]===null?'—':Math.round(pop[i])+'%')+'</b></div>').join('');
 drawChart(times.map(t=>new Date(Number(t)*1000).toLocaleTimeString('th-TH',{hour:'2-digit',timeZone:primary.data.timezone||'UTC'})),rain);
}
async function refresh(){say('updated','กำลังโหลดข้อมูล…');const jobs=await Promise.allSettled([loadRadar(),loadForecast()]);if(jobs[1].status==='rejected'){say('updated','Forecast unavailable');say('qualityTitle','โหลดพยากรณ์ไม่สำเร็จ');note('โหลดข้อมูลพยากรณ์ไม่ได้ กรุณาตรวจอินเทอร์เน็ตแล้วรีเฟรชหน้า');console.error(jobs[1].reason)}else if(jobs[0].status==='fulfilled'){say('updated','อัปเดต '+new Date().toLocaleTimeString('th-TH',{hour:'2-digit',minute:'2-digit'}))}if(map)map.invalidateSize()}
async function selectPlace(lat,lon,name){place={lat:Number(lat),lon:Number(lon),name};say('locationName',name);say('placeSearchStatus','เลือกพื้นที่: '+name+' ('+Number(lat).toFixed(3)+', '+Number(lon).toFixed(3)+')');if(map){map.setView([place.lat,place.lon],Math.max(map.getZoom(),7));if(marker)marker.setLatLng([place.lat,place.lon])}await refresh()}
$('placeSearchForm').addEventListener('submit',async e=>{e.preventDefault();const q=$('placeSearch').value.trim();if(!q)return;say('placeSearchStatus','กำลังค้นหาพื้นที่…');try{const url='https://geocoding-api.open-meteo.com/v1/search?'+new URLSearchParams({name:q,count:8,language:'en',format:'json'});const data=await getJSON(url);if(!data.results||!data.results.length){say('placeSearchStatus','ไม่พบพื้นที่นี้ ลองชื่อเมืองภาษาอังกฤษหรือชื่อประเทศ');return}const best=data.results[0],name=[best.name,best.admin1,best.country].filter(Boolean).join(', ');await selectPlace(best.latitude,best.longitude,name);if(data.results.length>1)say('placeSearchStatus','ใช้ผลลัพธ์แรก: '+name+' — หากไม่ใช่จุดที่ต้องการ ให้ค้นหาพร้อมชื่อประเทศ')}catch(err){say('placeSearchStatus','ค้นหาไม่สำเร็จ ตรวจอินเทอร์เน็ตแล้วลองอีกครั้ง');console.warn('Geocoding:',err)}});
$('locateBtn').addEventListener('click',()=>{if(!navigator.geolocation){alert('เบราว์เซอร์ไม่รองรับ location');return}navigator.geolocation.getCurrentPosition(async p=>{await selectPlace(p.coords.latitude,p.coords.longitude,'ตำแหน่งของคุณ')},()=>alert('อ่านตำแหน่งไม่ได้ — อนุญาต Location ในเบราว์เซอร์หรือใช้ Bangkok เป็นค่าเริ่มต้น'))});
say('locationName',place.name);
initMap();refresh();setInterval(refresh,5*60*1000);
})();