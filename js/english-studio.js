/**
 * English Learning Studio Scripts (english-studio.html)
 * Controls 12 Tenses matrix, real-world scenario dialogue runner,
 * 3D flashcards flip & filter, and speech synthesis pronunciation.
 */

// Global data stores (pre-initialized to guarantee instant availability)
let tenseData = getFallbackTenseData();
let scenarioData = getFallbackScenarioData();

// Initial setup
document.addEventListener('DOMContentLoaded', async () => {
  // Reading Progress Spine tracker
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressEl = document.getElementById('learning-progress');
    if (progressEl) progressEl.style.width = scrolled + '%';
  });

  // Load JSON datasets with graceful fallback for local file:// mode
  await loadStudioDatasets();

  // Initialize with default selections
  if (document.getElementById('detail-title')) {
    selectTense('present-perfect');
  }
  if (document.getElementById('dialogue-thread')) {
    switchScenario('cafe');
  }
});

/**
 * Loads JSON data from data/ folder with fallback
 */
async function loadStudioDatasets() {
  const possiblePaths = [
    { tense: '../data/tense-data.json', scen: '../data/scenarios.json' },
    { tense: 'data/tense-data.json', scen: 'data/scenarios.json' },
    { tense: '/data/tense-data.json', scen: '/data/scenarios.json' }
  ];

  for (const p of possiblePaths) {
    try {
      const [tenseRes, scenRes] = await Promise.all([
        fetch(p.tense),
        fetch(p.scen)
      ]);
      if (tenseRes.ok && scenRes.ok) {
        tenseData = await tenseRes.json();
        scenarioData = await scenRes.json();
        return;
      }
    } catch (err) {
      // try next candidate path
    }
  }

  // Fallback data when file protocol restricts fetch
  tenseData = getFallbackTenseData();
  scenarioData = getFallbackScenarioData();
}

/**
 * Updates grammar matrix active view when a tense is clicked
 */
function selectTense(tenseKey) {
  if (!tenseData) return;

  // Reset borders/styles on tense buttons
  document.querySelectorAll('.tense-btn').forEach(btn => {
    btn.classList.remove('bg-primary-container/20', 'ring-2', 'ring-primary', 'shadow-md');
    btn.classList.add('bg-surface-container-low');
  });

  const activeData = tenseData[tenseKey] || tenseData['present-perfect'];
  if (!activeData) return;

  // Update view with data
  const updateText = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.innerText = val || '';
  };
  const updateHtml = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = val || '';
  };

  updateText('detail-category', activeData.category);
  updateText('detail-title', activeData.title);
  updateText('detail-formula', activeData.formula);
  updateText('pillar-formula', activeData.pillarFormula);
  updateHtml('pillar-formula-desc', activeData.pillarFormulaDesc);
  updateText('pillar-context', activeData.pillarContext);
  updateHtml('pillar-context-desc', activeData.pillarContextDesc);
  updateText('pillar-sentence-1', activeData.sentence1);
  updateText('pillar-sentence-1-sub', activeData.sentence1Sub);
  updateText('pillar-sentence-2', activeData.sentence2);
  updateText('pillar-sentence-2-sub', activeData.sentence2Sub);
  updateText('pillar-pitfall', activeData.pitfall);
  updateHtml('pillar-pitfall-desc', activeData.pitfallDesc);

  // Highlight clicked button
  if (typeof event !== 'undefined' && event && event.currentTarget) {
    event.currentTarget.classList.add('bg-primary-container/20', 'ring-2', 'ring-primary', 'shadow-md');
    event.currentTarget.classList.remove('bg-surface-container-low');
  }
}

/**
 * Filter Matrix by Time (Past / Present / Future / All)
 */
function setMatrixTime(time) {
  document.querySelectorAll('.time-tab').forEach(t => {
    t.classList.remove('active', 'bg-inverse-surface', 'text-inverse-on-surface');
    t.classList.add('text-on-surface-variant');
  });

  if (typeof event !== 'undefined' && event && event.currentTarget) {
    event.currentTarget.classList.add('active', 'bg-inverse-surface', 'text-inverse-on-surface');
    event.currentTarget.classList.remove('text-on-surface-variant');
  }

  if (time === 'past') selectTense('past-simple');
  else if (time === 'present') selectTense('present-perfect');
  else if (time === 'future') selectTense('future-cont');
  else selectTense('present-perfect');
}

/**
 * Switches the interactive conversation scenario
 */
function switchScenario(scenarioKey) {
  if (!scenarioData) return;

  document.querySelectorAll('.scenario-tab').forEach(tab => {
    tab.classList.remove('active', 'bg-inverse-surface', 'text-inverse-on-surface');
    tab.classList.add('bg-surface-container-high', 'text-on-surface');
  });

  if (typeof event !== 'undefined' && event && event.currentTarget) {
    event.currentTarget.classList.add('active', 'bg-inverse-surface', 'text-inverse-on-surface');
    event.currentTarget.classList.remove('bg-surface-container-high', 'text-on-surface');
  }

  const sc = scenarioData[scenarioKey] || scenarioData['cafe'];
  if (!sc) return;

  const setEl = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.innerText = val;
  };

  setEl('scenario-scene-badge', sc.sceneBadge);
  setEl('scenario-scene-title', sc.sceneTitle);
  setEl('scenario-pro-tip', sc.proTip);
  setEl('scenario-tone', sc.tone);

  const threadContainer = document.getElementById('dialogue-thread');
  if (!threadContainer) return;

  threadContainer.innerHTML = '';

  sc.dialogues.forEach((dlg) => {
    const bubbleEl = document.createElement('div');
    const bgClass = dlg.isYou ? 'bg-surface-container-lowest' : 'bg-surface-container-high/40';
    const roleColor = dlg.isYou ? 'bg-primary-fixed text-on-primary-fixed' : 'bg-secondary text-on-secondary';
    
    bubbleEl.className = `p-5 rounded-2xl ${bgClass} shadow-sm flex flex-col gap-3 transition-all hover:shadow-md cursor-pointer group`;
    bubbleEl.onclick = function() { toggleTranslation(this); };

    const spokenText = dlg.en.replace(/[“”"']/g, '');

    bubbleEl.innerHTML = `
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="h-7 w-7 rounded-full ${roleColor} flex items-center justify-center font-label-sm text-label-sm font-bold">${dlg.speakerRole}</span>
          <span class="font-label-md text-label-md font-semibold text-on-surface">${dlg.speakerName}</span>
        </div>
        <button type="button" onclick="event.stopPropagation(); speakText('${spokenText}')" class="h-8 w-8 rounded-full bg-surface-container hover:bg-primary-container hover:text-on-primary-container flex items-center justify-center transition-colors">
          <span class="material-symbols-outlined text-[18px]">volume_up</span>
        </button>
      </div>
      <p class="font-title-md text-title-md text-on-surface leading-snug">${dlg.en}</p>
      <div class="translation-box hidden pt-2 mt-1 flex flex-col gap-1 text-primary">
        <div class="flex items-center gap-1.5 font-label-sm text-label-sm uppercase tracking-wider">
          <span class="material-symbols-outlined text-[14px]">translate</span> คำแปล &amp; ความรู้สึกลึกซึ้ง
        </div>
        <p class="font-body-md text-body-md text-on-surface-variant font-normal">${dlg.th}</p>
        <span class="text-xs text-outline italic">${dlg.tip}</span>
      </div>
      <div class="flex items-center justify-between pt-1">
        <span class="font-label-sm text-label-sm text-outline group-hover:text-primary transition-colors flex items-center gap-1">
          <span class="material-symbols-outlined text-[14px]">touch_app</span> Click bubble to reveal Thai meaning
        </span>
        <span class="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container text-on-surface-variant">${dlg.badge}</span>
      </div>
    `;
    threadContainer.appendChild(bubbleEl);
  });
}

/**
 * Toggle Speech translation in dialogue bubble
 */
function toggleTranslation(cardElement) {
  const box = cardElement.querySelector('.translation-box');
  if (box) {
    box.classList.toggle('hidden');
  }
}

/**
 * Flip 3D Flashcard
 */
function flipCard(cardWrapper) {
  const inner = cardWrapper.querySelector('.card-inner');
  if (inner) {
    if (inner.style.transform === 'rotateY(180deg)') {
      inner.style.transform = 'rotateY(0deg)';
    } else {
      inner.style.transform = 'rotateY(180deg)';
    }
  }
}

/**
 * Filter Flashcards by Topic
 */
function filterFlashcards(topic) {
  document.querySelectorAll('.vocab-filter').forEach(f => {
    f.classList.remove('active', 'bg-inverse-surface', 'text-inverse-on-surface');
    f.classList.add('bg-surface-container', 'text-on-surface-variant');
  });

  if (typeof event !== 'undefined' && event && event.currentTarget) {
    event.currentTarget.classList.add('active', 'bg-inverse-surface', 'text-inverse-on-surface');
    event.currentTarget.classList.remove('bg-surface-container', 'text-on-surface-variant');
  }

  const cards = document.querySelectorAll('#flashcard-grid .card-item');
  cards.forEach(c => {
    if (topic === 'all' || c.getAttribute('data-topic') === topic) {
      c.style.display = 'block';
    } else {
      c.style.display = 'none';
    }
  });
}

/**
 * Text-to-speech Web Speech API integration
 */
function speakText(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const clean = text.replace(/["“”]/g, '');
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = 'en-US';
    utterance.rate = 0.92;
    window.speechSynthesis.speak(utterance);
  }
}

function playTenseComparisonAudio() {
  speakText("Past simple: I lost my keys yesterday. Present perfect: I have lost my keys, so I cannot get inside.");
}

function toggleAudioGlobal(btn) {
  speakText("Welcome to Arlann English Studio. Practice every day with calm cadence.");
}

/**
 * Fallback dataset for tenses
 */
function getFallbackTenseData() {
  return {
    "present-simple": {
      "category": "Present Aspect • Facts & Habits",
      "title": "Present Simple Tense",
      "formula": "Subject + V.1 (s/es)",
      "pillarFormula": "Subject + V.1 (เติม s/es กับเอกพจน์)",
      "pillarFormulaDesc": "• He/She/It กริยาเติม s หรือ es<br>• I/You/We/They ใช้ V.1 รูปปกติ",
      "pillarContext": "ความจริงทั่วไป หรือ กิจวัตรสม่ำเสมอ",
      "pillarContextDesc": "ใช้พูดถึงสิ่งที่เป็นจริงเสมอในธรรมชาติ นิสัย กิจวัตรประจำวัน ตารางเวลาที่แน่นอน",
      "sentence1": "“I drink coffee every single morning.”",
      "sentence1Sub": "(ดื่มกาแฟทุกเช้าเป็นนิสัย)",
      "sentence2": "“The sun rises in the east.”",
      "sentence2Sub": "(พระอาทิตย์ขึ้นทางทิศตะวันออก เป็นความจริง)",
      "pitfall": "ลืมเติม s/es เมื่อประธานเป็นคนเดียว",
      "pitfallDesc": "❌ ห้ามใช้: She work every day.<br>✅ ต้องแก้เป็น: She works every day."
    },
    "present-cont": {
      "category": "Present Aspect • Ongoing Action",
      "title": "Present Continuous Tense",
      "formula": "Subject + is / am / are + V.ing",
      "pillarFormula": "Subject + is/am/are + V.ing",
      "pillarFormulaDesc": "• I + am, He/She/It + is, You/We/They + are<br>• ตามด้วยกริยาเติม -ing เสมอ",
      "pillarContext": "กำลังเกิดขึ้น ณ ช่วงเวลานี้",
      "pillarContextDesc": "ใช้บอกเหตุการณ์ที่กำลังดำเนินอยู่ในขณะที่พูด",
      "sentence1": "“I am drafting a new essay on software architecture.”",
      "sentence1Sub": "(ฉันกำลังเขียนร่างบทความใหม่อยู่ตอนนี้)",
      "sentence2": "“Are you listening to the rain right now?”",
      "sentence2Sub": "(ตอนนี้เธอกำลังฟังเสียงฝนอยู่หรือเปล่า?)",
      "pitfall": "อย่าใช้กับ Stative Verbs",
      "pitfallDesc": "❌ ห้ามใช้: I am knowing the answer.<br>✅ ต้องแก้เป็น: I know the answer."
    },
    "present-perfect": {
      "category": "Present Aspect • Experience & Current Effect",
      "title": "Present Perfect Tense",
      "formula": "Subject + have / has + V.3",
      "pillarFormula": "Subject + have/has + V.3",
      "pillarFormulaDesc": "• I / You / We / They + have<br>• He / She / It + has<br>ตามด้วยกริยาช่อง 3 (Past Participle) เสมอ",
      "pillarContext": "ผลลัพธ์ยังต่อเนื่องถึงตอนนี้",
      "pillarContextDesc": "ใช้เมื่อเหตุการณ์ในอดีตส่งผลชัดเจนถึงปัจจุบัน หรือใช้เพื่อเล่าประสบการณ์ในชีวิตว่า เคย / ไม่เคยทำ โดยไม่สนใจเวลาที่เจาะจง",
      "sentence1": "“I have lost my keys.”",
      "sentence1Sub": "(แปลว่า: กุญแจยังหายอยู่ตอนนี้ ยังหาไม่เจอ)",
      "sentence2": "“Have you eaten yet? / I've missed you all day!”",
      "sentence2Sub": "(กินข้าวหรือยัง? / คิดถึงเธอมาทั้งวันเลย)",
      "pitfall": "ห้ามใส่เวลาเจาะจงในอดีต!",
      "pitfallDesc": "❌ ห้ามใช้: I have seen him yesterday.<br>✅ ต้องแก้เป็น: I saw him yesterday. (Past Simple) เพราะมีคำบอกเวลาอดีตชัดเจน"
    },
    "present-perf-cont": {
      "category": "Present Aspect • Continuous Duration up to Now",
      "title": "Present Perfect Continuous Tense",
      "formula": "Subject + have / has + been + V.ing",
      "pillarFormula": "Subject + have/has + been + V.ing",
      "pillarFormulaDesc": "• have/has + been + V.ing เสมอ",
      "pillarContext": "ทำต่อเนื่องไม่หยุดตั้งแต่ตอนนั้นจนถึงตอนนี้",
      "pillarContextDesc": "เน้นย้ำความพยายามหรือระยะเวลาที่ดำเนินมาอย่างต่อเนื่อง",
      "sentence1": "“I have been coding for five straight hours.”",
      "sentence1Sub": "(ฉันเขียนโค้ดต่อเนื่องมา 5 ชั่วโมงติดแล้ว)",
      "sentence2": "“It has been raining all afternoon.”",
      "sentence2Sub": "(ฝนตกต่อเนื่องไม่หยุดมาตลอดทั้งบ่าย)",
      "pitfall": "อย่าลืม been!",
      "pitfallDesc": "❌ ห้ามใช้: I have coding since 8 AM.<br>✅ ต้องแก้เป็น: I have been coding since 8 AM."
    },
    "past-simple": {
      "category": "Past Aspect • Completed Events",
      "title": "Past Simple Tense",
      "formula": "Subject + V.2",
      "pillarFormula": "Subject + V.2 (ed หรือ เปลี่ยนรูป)",
      "pillarFormulaDesc": "• ใช้กริยาช่อง 2 กับทุกประธาน<br>• ปฏิเสธ/คำถามใช้ Did + V.inf",
      "pillarContext": "จบสิ้นลงแล้วในอดีต ไม่ค้างคา",
      "pillarContextDesc": "ใช้เมื่อการกระทำเริ่มต้นและสิ้นสุดลงไปแล้วในอดีต มีจุดเวลาชัดเจน เช่น yesterday, last night, in 2021",
      "sentence1": "“I lost my keys yesterday, but I found them.”",
      "sentence1Sub": "(แปลว่า: กุญแจหายเมื่อวาน แต่ตอนนี้หาเจอแล้ว)",
      "sentence2": "“Did you sleep well last night?”",
      "sentence2Sub": "(เมื่อคืนหลับสบายดีไหม?)",
      "pitfall": "อย่าสับสนกับ have/has!",
      "pitfallDesc": "❌ ห้ามใช้: I did went there.<br>✅ ต้องแก้เป็น: I went there. หรือ I did not go there."
    },
    "past-cont": {
      "category": "Past Aspect • Interrupted Actions in Past",
      "title": "Past Continuous Tense",
      "formula": "Subject + was / were + V.ing",
      "pillarFormula": "Subject + was/were + V.ing",
      "pillarFormulaDesc": "• I / He / She / It + was<br>• You / We / They + were",
      "pillarContext": "กำลังเกิดขึ้น ณ เวลาหนึ่งในอดีต หรือถูกขัดจังหวะ",
      "pillarContextDesc": "ใช้บรรยายสิ่งที่กำลังทำอยู่แล้วมีอีกเหตุการณ์หนึ่งแทรกเข้ามา",
      "sentence1": "“I was reading a novel when the power went out.”",
      "sentence1Sub": "(ฉันกำลังอ่านหนังสืออยู่ดีๆ ไฟก็ดับลง)",
      "sentence2": "“What were you doing at 10 PM last night?”",
      "sentence2Sub": "(เมื่อคืนตอน 4 ทุ่ม เธอกำลังทำอะไรอยู่?)",
      "pitfall": "อย่าใช้ was/were กับกริยาช่อง 2!",
      "pitfallDesc": "❌ ห้ามใช้: I was walked home.<br>✅ ต้องแก้เป็น: I was walking home."
    },
    "past-perfect": {
      "category": "Past Aspect • Prior Past Event",
      "title": "Past Perfect Tense",
      "formula": "Subject + had + V.3",
      "pillarFormula": "Subject + had + V.3",
      "pillarFormulaDesc": "• ใช้ had + V.3 กับทุกประธาน",
      "pillarContext": "เกิดก่อนอีกเหตุการณ์หนึ่งในอดีต (อดีตของอดีต)",
      "pillarContextDesc": "เหตุการณ์ที่เกิดและจบก่อนจะใช้ Past Perfect",
      "sentence1": "“The train had already left when I reached the platform.”",
      "sentence1Sub": "(รถไฟออกไปก่อนแล้ว ตอนที่ฉันไปถึงชานชาลา)",
      "sentence2": "“She had never seen snow until she moved to Hokkaido.”",
      "sentence2Sub": "(เธอไม่เคยเห็นหิมะมาก่อนเลย จนกระทั่งย้ายไปฮอกไกโด)",
      "pitfall": "อย่าใช้โดยไม่มีบริบทเปรียบเทียบในอดีต",
      "pitfallDesc": "❌ ห้ามใช้: I had eaten lunch. (ลอยๆ โดยไม่มีเหตุการณ์ต่อมา)"
    },
    "past-perf-cont": {
      "category": "Past Aspect • Past Duration before Another Event",
      "title": "Past Perfect Continuous Tense",
      "formula": "Subject + had + been + V.ing",
      "pillarFormula": "Subject + had been + V.ing",
      "pillarFormulaDesc": "• had been + V.ing กับทุกประธาน",
      "pillarContext": "ทำต่อเนื่องมาช่วงหนึ่ง ก่อนจะมีอีกสิ่งในอดีตเกิดขึ้น",
      "pillarContextDesc": "เน้นย้ำระยะเวลาของการกระทำที่ดำเนินอย่างต่อเนื่องในอดีต",
      "sentence1": "“They had been discussing the thesis for hours before they agreed.”",
      "sentence1Sub": "(พวกเขาถกเถียงกันอยู่หลายชั่วโมงก่อนที่จะตกลงกันได้)",
      "sentence2": "“He had been waiting in the rain for 30 minutes when the bus came.”",
      "sentence2Sub": "(เขายืนรอมาครึ่งชั่วโมงแล้ว ตอนที่รถเมล์มาถึง)",
      "pitfall": "สับสนระหว่าง had done กับ had been doing",
      "pitfallDesc": "had done เน้นผลลัพธ์ / had been doing เน้นระยะเวลา"
    },
    "future-simple": {
      "category": "Future Aspect • Spontaneous Decision & Predictions",
      "title": "Future Simple Tense",
      "formula": "Subject + will + V.inf",
      "pillarFormula": "Subject + will + กริยาไม่ผัน (V.inf)",
      "pillarFormulaDesc": "• ใช้ will ได้กับทุกประธาน",
      "pillarContext": "ตัดสินใจทันที หรือ คาดเดาอนาคต",
      "pillarContextDesc": "ใช้เมื่อเพิ่งตัดสินใจทำตอนที่พูด หรือคาดคะเนสิ่งที่น่าจะเกิดขึ้นในอนาคต",
      "sentence1": "“It's raining. I'll get an umbrella.”",
      "sentence1Sub": "(ฝนตกแล้ว เดี๋ยวฉันไปหยิบร่มให้)",
      "sentence2": "“I think you will love this specialty matcha.”",
      "sentence2Sub": "(ฉันคิดว่าเธอต้องชอบมัทฉะแก้วนี้แน่ๆ)",
      "pitfall": "อย่าผันกริยาตามหลัง will",
      "pitfallDesc": "❌ ห้ามใช้: He will goes tomorrow.<br>✅ ต้องแก้เป็น: He will go tomorrow."
    },
    "future-cont": {
      "category": "Future Aspect • Definite Progress at a Point in Future",
      "title": "Future Continuous Tense",
      "formula": "Subject + will be + V.ing",
      "pillarFormula": "Subject + will be + V.ing",
      "pillarFormulaDesc": "• will be + V.ing กับทุกประธาน",
      "pillarContext": "กำลังทำสิ่งนี้อยู่แน่นอนในเวลาหนึ่งของอนาคต",
      "pillarContextDesc": "ใช้จินตนาการหรือยืนยันว่า เมื่อถึงเวลาที่ระบุในอนาคต เราจะกำลังอยู่ระหว่างการทำสิ่งนั้น",
      "sentence1": "“This time tomorrow, I will be flying over the Pacific.”",
      "sentence1Sub": "(เวลานี้ของวันพรุ่งนี้ ฉันจะกำลังนั่งเครื่องบินข้ามมหาสมุทรแปซิฟิกอยู่)",
      "sentence2": "“Don't call at 9 PM; I will be presenting our system design.”",
      "sentence2Sub": "(อย่าเพิ่งโทรมาตอน 3 ทุ่มนะ ตอนนั้นฉันจะกำลังพรีเซนต์งานระบบอยู่)",
      "pitfall": "อย่าลืมใส่ be!",
      "pitfallDesc": "❌ ห้ามใช้: I will waiting.<br>✅ ต้องแก้เป็น: I will be waiting for you."
    },
    "future-perfect": {
      "category": "Future Aspect • Completed by a Future Deadline",
      "title": "Future Perfect Tense",
      "formula": "Subject + will have + V.3",
      "pillarFormula": "Subject + will have + V.3",
      "pillarFormulaDesc": "• will have + V.3 กับทุกประธาน",
      "pillarContext": "เสร็จสิ้นสมบูรณ์ก่อนถึงกำหนดเวลาในอนาคต",
      "pillarContextDesc": "ก่อนจะถึงจุดเวลาหนึ่งในอนาคต สิ่งนี้จะสำเร็จเรียบร้อยแล้วแน่นอน",
      "sentence1": "“By December, I will have finished my pedagogical book.”",
      "sentence1Sub": "(ก่อนถึงเดือนธันวาคม ฉันจะเขียนหนังสือการสอนเล่มนี้เสร็จสมบูรณ์แล้วแน่นอน)",
      "sentence2": "“Will they have deployed the update by tomorrow morning?”",
      "sentence2Sub": "(พวกเขาจะติดตั้งอัปเดตระบบเสร็จก่อนเช้าวันพรุ่งนี้ไหม?)",
      "pitfall": "อย่าใช้ will has เด็ดขาด!",
      "pitfallDesc": "❌ ห้ามใช้: He will has finished.<br>✅ ต้องแก้เป็น: He will have finished."
    },
    "future-perf-cont": {
      "category": "Future Aspect • Duration Reached at a Future Mark",
      "title": "Future Perfect Continuous Tense",
      "formula": "Subject + will have been + V.ing",
      "pillarFormula": "Subject + will have been + V.ing",
      "pillarFormulaDesc": "• will have been + V.ing กับทุกประธาน",
      "pillarContext": "จะทำต่อเนื่องครบระยะเวลาหนึ่งเมื่อถึงเวลานั้น",
      "pillarContextDesc": "ใช้วัดไมล์สโตนว่า เมื่อถึงจุดเวลาในอนาคต การกระทำนั้นจะดำเนินต่อเนื่องสะสมมาครบกี่ปี กี่เดือน",
      "sentence1": "“In 2026, I will have been writing code for eight consecutive years.”",
      "sentence1Sub": "(ในปี 2026 ฉันจะเขียนโค้ดต่อเนื่องมาครบ 8 ปีเต็ม)",
      "sentence2": "“By 6 PM, she will have been studying for six hours straight.”",
      "sentence2Sub": "(เมื่อถึง 6 โมงเย็น เธอจะอ่านหนังสือต่อเนื่องครบ 6 ชั่วโมงเต็ม)",
      "pitfall": "อย่าลืม been ในโครงสร้างต่อเนื่อง",
      "pitfallDesc": "❌ ห้ามใช้: will have coding<br>✅ ต้องแก้เป็น: will have been coding"
    }
  };
}

/**
 * Fallback dataset for scenarios
 */
function getFallbackScenarioData() {
  return {
    "cafe": {
      "sceneBadge": "Setting: Specialty Coffee Bar",
      "sceneTitle": "Ordering Coffee & Custom Requests",
      "proTip": "ในร้านกาแฟต่างประเทศ การใช้ \"Can I get...\" ฟังดูเป็นธรรมชาติและสุภาพมาก ไม่จำเป็นต้องใช้ \"I want...\"",
      "tone": "Warm & Natural Casual",
      "dialogues": [
        {
          "speakerRole": "You",
          "speakerName": "Customer (You)",
          "isYou": true,
          "en": "“Hi there! Can I get an iced oat latte with half-sweet, please?”",
          "th": "“สวัสดีครับ/ค่ะ ขอกาแฟโอ๊ตลาเต้เย็น หวานน้อย (หวานครึ่งเดียว) แก้วนึงครับ/ค่ะ”",
          "tip": "Tip: “half-sweet” เข้าใจตรงกันทันที ดีกว่าพูดว่า “sweet 50%”",
          "badge": "Polite Request"
        },
        {
          "speakerRole": "Barista",
          "speakerName": "Barista",
          "isYou": false,
          "en": "“Sure thing! For here or to go? And what name can I put on that?”",
          "th": "“ได้เลยครับ! ทานที่นี่หรือรับกลับบ้านดีครับ? แล้วแก้วนี้เขียนชื่อคุณอะไรดีครับ?”",
          "tip": "Tip: “Sure thing!” เป็นคำตอบรับที่กระตือรือร้นและเป็นมิตร",
          "badge": "Common Follow-up"
        },
        {
          "speakerRole": "You",
          "speakerName": "Customer (You)",
          "isYou": true,
          "en": "“To go, please. Put it down under Arlann. Also, could I grab an extra napkin?”",
          "th": "“รับกลับบ้านครับ ใส่ชื่อว่า Arlann ได้เลยครับ แล้วก็ขอทิชชู่เพิ่มอีกแผ่นได้ไหมครับ?”",
          "tip": "Tip: “Put it down under [Name]” แปลว่า ลงชื่อนี้ไว้ที่แก้วได้เลย",
          "badge": "Name & Request"
        }
      ]
    },
    "smalltalk": {
      "sceneBadge": "Setting: Weekend Co-working / Garden",
      "sceneTitle": "Breaking the Ice Naturally",
      "proTip": "ให้เริ่มจากบรรยากาศ, หนังสือที่อ่าน, หรือเครื่องดื่ม เพื่อสร้างความผ่อนคลาย",
      "tone": "Friendly & Unhurried",
      "dialogues": [
        {
          "speakerRole": "You",
          "speakerName": "You",
          "isYou": true,
          "en": "“Mind if I sit here? Looks like the place is pretty packed today.”",
          "th": "“ขอนั่งตรงนี้ได้ไหมครับ? ดูเหมือนวันนี้คนจะแน่นร้านทีเดียว”",
          "tip": "Tip: “Mind if I...” เป็นการขออนุญาตที่สุภาพและเป็นกันเอง",
          "badge": "Ice Breaker"
        },
        {
          "speakerRole": "Friend",
          "speakerName": "Local Reader",
          "isYou": false,
          "en": "“Not at all, go ahead! What are you reading there? The cover looks intriguing.”",
          "th": "“ได้เลยครับ ตามสบายเลย! กำลังอ่านเล่มไหนอยู่เหรอครับ? หน้าปกดูน่าสนใจมาก”",
          "tip": "Tip: “Not at all” แปลว่า ไม่รังเกียจเลย นั่งได้ตามสบาย",
          "badge": "Open Answer"
        }
      ]
    },
    "travel": {
      "sceneBadge": "Setting: Boutique Hotel Reception",
      "sceneTitle": "Checking In & Inquiring Quiet Workspace",
      "proTip": "หากต้องการห้องที่เงียบ ให้ใช้คำว่า \"away from the elevator\"",
      "tone": "Polite & Professional Travel",
      "dialogues": [
        {
          "speakerRole": "You",
          "speakerName": "Guest (You)",
          "isYou": true,
          "en": "“Good afternoon. I have a reservation under Arlann for three nights.”",
          "th": "“สวัสดีตอนบ่ายครับ ผมจองห้องพักไว้ในชื่อ Arlann พัก 3 คืนครับ”",
          "tip": "Tip: “reservation under [Name]” คือสำนวนมาตรฐานในการเช็คอิน",
          "badge": "Check-in Formula"
        },
        {
          "speakerRole": "Staff",
          "speakerName": "Receptionist",
          "isYou": false,
          "en": "“Welcome, Mr. Arlann! We have your deluxe king ready. Could I see your passport?”",
          "th": "“ยินดีต้อนรับครับคุณ Arlann! ห้องดีลักซ์เตียงคิงไซส์พร้อมแล้ว ขออนุญาตดูพาสปอร์ตสักครู่ครับ”",
          "tip": "Tip: เจ้าหน้าที่จะมักขอ ID card หรือ passport เสมอ",
          "badge": "Verification"
        }
      ]
    },
    "empathy": {
      "sceneBadge": "Setting: Evening Walk / Voice Note",
      "sceneTitle": "Active Listening & Supportive Reassurance",
      "proTip": "เมื่อเพื่อนระบาย อย่าเพิ่งรีบเสนอทางแก้ปัญหา ให้เน้นสะท้อนความรู้สึก",
      "tone": "Warm, Deep & Empathetic",
      "dialogues": [
        {
          "speakerRole": "You",
          "speakerName": "You",
          "isYou": true,
          "en": "“Hey, I know things have been overwhelming lately. How are you holding up?”",
          "th": "“เธอ ช่วงนี้รู้เลยว่าเรื่องต่างๆ คงหนักหนามาก เป็นยังไงบ้าง ไหวไหม?”",
          "tip": "Tip: “How are you holding up?” สื่อถึงการถามไถ่ว่า รับมือกับความกดดันไหวไหม",
          "badge": "Empathetic Check-in"
        },
        {
          "speakerRole": "Friend",
          "speakerName": "Close Friend",
          "isYou": false,
          "en": "“Honestly? A bit burned out, but talking to you genuinely helps. Thanks for checking in.”",
          "th": "“บอกตรงๆ นะ แอบหมดไฟไปนิดนึง แต่พอได้คุยกับเธอก็รู้สึกดีขึ้นจริงๆ ขอบคุณที่ทักมาถามไถ่นะ”",
          "tip": "Tip: “Thanks for checking in” คือคำขอบคุณเมื่อมีคนทักมาถามไถ่สารทุกข์สุกดิบ",
          "badge": "Heartfelt Reply"
        }
      ]
    }
  };
}
