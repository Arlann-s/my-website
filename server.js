const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const HOST = process.env.HOST || '127.0.0.1';
const PORT = Number.parseInt(process.env.PORT, 10) || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8'
};

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
};

function createServer(port) {
  const server = http.createServer((req, res) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.writeHead(405, { ...SECURITY_HEADERS, Allow: 'GET, HEAD' });
      res.end('Method Not Allowed');
      return;
    }

    let reqPath;
    try {
      reqPath = decodeURIComponent(new URL(req.url, `http://${HOST}`).pathname);
    } catch {
      res.writeHead(400, { ...SECURITY_HEADERS, 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Bad Request');
      return;
    }

    if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
    const root = path.resolve(__dirname);
    const filePath = path.resolve(root, `.${reqPath}`);

    // Prevent directory traversal, including encoded variants.
    if (filePath !== root && !filePath.startsWith(`${root}${path.sep}`)) {
      res.writeHead(403, { ...SECURITY_HEADERS, 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Forbidden');
      return;
    }

    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        res.writeHead(404, { ...SECURITY_HEADERS, 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 Not Found');
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      res.writeHead(200, {
        ...SECURITY_HEADERS,
        'Content-Type': contentType,
        'Cache-Control': ext === '.html' || ext === '.json' ? 'no-cache' : 'public, max-age=86400',
        'Content-Length': stats.size
      });

      if (req.method === 'HEAD') {
        res.end();
        return;
      }

      fs.createReadStream(filePath).on('error', () => {
        if (!res.headersSent) res.writeHead(500, SECURITY_HEADERS);
        res.end('Internal Server Error');
      }).pipe(res);
    });
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`[!] พอร์ต ${port} กำลังถูกใช้งานอยู่ ระบบจะสลับไปลองพอร์ต ${port + 1}...`);
      createServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });

  server.listen(port, HOST, () => {
    const url = `http://${HOST}:${port}`;
    console.log(`\n==================================================`);
    console.log(`🚀 Arlann Web Server พร้อมทำงานแล้ว!`);
    console.log(`🔗 เข้าชมเว็บไซต์ได้ที่: ${url}`);
    console.log(`==================================================\n`);
    console.log(`(กด Ctrl + C เพื่อหยุดการทำงานของเซิร์ฟเวอร์)\n`);

    // Auto open browser on host OS
    if (process.platform === 'win32') {
      exec(`start ${url}`);
    } else if (process.platform === 'darwin') {
      exec(`open ${url}`);
    } else {
      exec(`xdg-open ${url}`);
    }
  });
}

createServer(PORT);
