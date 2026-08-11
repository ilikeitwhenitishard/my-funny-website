(function () {
  'use strict';

  let prankActive = true;
  let volumePressCount = 0;

  const terminal = document.getElementById('terminal');
  const fileQueue = document.getElementById('fileQueue');
  const keylog = document.getElementById('keylog');
  const profileList = document.getElementById('profileList');
  const hackScreen = document.getElementById('hackScreen');
  const prankReveal = document.getElementById('prankReveal');
  const closeBtn = document.getElementById('closeBtn');
  const alarmBeep = document.getElementById('alarmBeep');

  const FAKE_FILES = [
    'C:\\Users\\Documents\\passwords.txt',
    'C:\\Users\\Documents\\bank_details.pdf',
    'C:\\Users\\Desktop\\private_photos\\',
    'C:\\Users\\AppData\\Chrome\\Login Data',
    'C:\\Users\\Documents\\crypto_wallet.dat',
    'C:\\Users\\Desktop\\work\\confidential.docx',
    'C:\\Users\\Pictures\\Screenshots\\',
    'C:\\Users\\Downloads\\personal_notes.txt',
    'C:\\Users\\AppData\\Roaming\\Discord\\',
    'C:\\Users\\Documents\\tax_returns_2024.pdf'
  ];

  const HACK_LINES = [
    { text: '[INIT] Establishing encrypted tunnel...', type: 'info', delay: 0 },
    { text: '[OK] Tunnel established via port 443/TLS', type: 'success', delay: 400 },
    { text: '[WARN] Bypassing Windows Defender...', type: 'warn', delay: 800 },
    { text: '[OK] Real-time protection disabled', type: 'success', delay: 1200 },
    { text: '[INFO] Scanning local network 192.168.x.x/24...', type: 'info', delay: 1600 },
    { text: '[OK] Host identified: ' + getHostname(), type: 'success', delay: 2000 },
    { text: '[INFO] Resolving public IP via STUN...', type: 'info', delay: 2400 },
    { text: '[OK] Public IP: ' + fakeIP(), type: 'success', delay: 2800 },
    { text: '[INFO] Geolocation: ' + fakeLocation(), type: 'info', delay: 3200 },
    { text: '[WARN] Elevating privileges to SYSTEM...', type: 'warn', delay: 3600 },
    { text: '[OK] Token impersonation successful', type: 'success', delay: 4000 },
    { text: '[INFO] Enumerating drives C: D: E:...', type: 'info', delay: 4400 },
    { text: '[OK] Found 847 GB unencrypted data', type: 'success', delay: 4800 },
    { text: '[ERROR] Firewall rule injection failed — retrying...', type: 'error', delay: 5200 },
    { text: '[OK] Firewall compromised on attempt 2', type: 'success', delay: 5600 },
    { text: '[INFO] Harvesting browser credentials...', type: 'info', delay: 6000 },
    { text: '[OK] 23 saved passwords extracted', type: 'success', delay: 6400 },
    { text: '[INFO] Activating keylogger module...', type: 'info', delay: 6800 },
    { text: '[OK] Keystroke capture: ACTIVE', type: 'success', delay: 7200 },
    { text: '[WARN] Webcam stream initiated...', type: 'warn', delay: 7600 },
    { text: '[OK] Video feed recording to remote server', type: 'success', delay: 8000 },
    { text: '[INFO] Deploying ransomware payload...', type: 'error', delay: 8400 },
    { text: '[OK] AES-256 encryption module loaded', type: 'success', delay: 8800 },
    { text: '[!!!] ALL SYSTEMS COMPROMISED — LOCKDOWN ACTIVE', type: 'error', delay: 9200 }
  ];

  function fakeIP() {
    return [103, 21, 148, Math.floor(Math.random() * 255)].join('.');
  }

  function fakeLocation() {
    const cities = ['Mumbai, IN', 'Delhi, IN', 'Bangalore, IN', 'Chennai, IN', 'Hyderabad, IN'];
    return cities[Math.floor(Math.random() * cities.length)];
  }

  function getHostname() {
    return (navigator.userAgent.match(/Windows NT/) ? 'DESKTOP-' : 'HOST-') +
      Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  function randomHex(len) {
    let s = '';
    for (let i = 0; i < len; i++) s += '0123456789ABCDEF'[Math.floor(Math.random() * 16)];
    return s;
  }

  function randomMAC() {
    const parts = [];
    for (let i = 0; i < 6; i++) parts.push(randomHex(2));
    return parts.join(':');
  }

  function initProfile() {
    const os = navigator.userAgent.includes('Windows') ? 'Windows 10/11 Pro' :
      navigator.userAgent.includes('Mac') ? 'macOS Sonoma' : 'Linux';
    const browser = navigator.userAgent.includes('Chrome') ? 'Chrome' :
      navigator.userAgent.includes('Firefox') ? 'Firefox' : 'Browser';

    profileList.innerHTML = `
      <div><span class="label">HOST: </span><span class="value">${getHostname()}</span></div>
      <div><span class="label">OS: </span><span class="value">${os}</span></div>
      <div><span class="label">BROWSER: </span><span class="value">${browser}</span></div>
      <div><span class="label">IP: </span><span class="value danger">${fakeIP()}</span></div>
      <div><span class="label">MAC: </span><span class="value">${randomMAC()}</span></div>
      <div><span class="label">STATUS: </span><span class="value danger">COMPROMISED</span></div>
    `;

    document.getElementById('sessionId').textContent = 'SID-' + randomHex(8);
  }

  function addTermLine(text, type) {
    const line = document.createElement('div');
    line.className = 'term-line ' + (type || '');
    line.textContent = text;
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
  }

  function runTerminalSequence() {
    HACK_LINES.forEach(({ text, type, delay }) => {
      setTimeout(() => addTermLine(text, type), delay);
    });

    setInterval(() => {
      if (!prankActive) return;
      const extras = [
        '[SYNC] Uploading packet batch #' + Math.floor(Math.random() * 9999),
        '[HASH] ' + randomHex(32),
        '[NET] Outbound connection to 185.' + Math.floor(Math.random() * 255) + '.xx.xx',
        '[CRYPT] Encrypting sector ' + Math.floor(Math.random() * 999999),
        '[LOG] Captured input event at ' + new Date().toLocaleTimeString()
      ];
      addTermLine(extras[Math.floor(Math.random() * extras.length)], 'dim');
    }, 2500);
  }

  function animateProgress(id, pctId, speed) {
    let val = 0;
    const el = document.getElementById(id);
    const pct = document.getElementById(pctId);
    const tick = setInterval(() => {
      if (!prankActive) { clearInterval(tick); return; }
      val += Math.random() * speed;
      if (val >= 100) {
        val = 100;
        clearInterval(tick);
      }
      el.style.width = val + '%';
      pct.textContent = Math.floor(val) + '%';
    }, 200);
  }

  function runFileQueue() {
    let i = 0;
    const addFile = () => {
      if (!prankActive || i >= FAKE_FILES.length) return;
      const item = document.createElement('div');
      item.className = 'file-item';
      item.textContent = '▸ ENCRYPTING ' + FAKE_FILES[i];
      fileQueue.prepend(item);
      if (fileQueue.children.length > 8) fileQueue.lastChild.remove();
      setTimeout(() => item.classList.add('done'), 1500);
      i++;
      setTimeout(addFile, 800 + Math.random() * 600);
    };
    setTimeout(addFile, 3000);
  }

  function updateStats() {
    setInterval(() => {
      if (!prankActive) return;
      document.getElementById('cpuUsage').textContent = (85 + Math.floor(Math.random() * 14));
      document.getElementById('memUsage').textContent = (70 + Math.floor(Math.random() * 25));
      document.getElementById('pingVal').textContent = (12 + Math.floor(Math.random() * 40));
    }, 800);
  }

  function updateClock() {
    const tick = () => {
      document.getElementById('clock').textContent = new Date().toLocaleTimeString('en-GB');
    };
    tick();
    setInterval(tick, 1000);
  }

  function logKeystroke(key) {
    if (!prankActive) return;
    const item = document.createElement('div');
    item.className = 'key-item';
    item.textContent = '[' + new Date().toLocaleTimeString() + '] ' + key;
    keylog.prepend(item);
    if (keylog.children.length > 6) keylog.lastChild.remove();
  }

  // Matrix rain
  function initMatrix() {
    const canvas = document.getElementById('matrix');
    const ctx = canvas.getContext('2d');
    const chars = 'アイウエオカキクケコ0123456789ABCDEF@#$%&';
    let cols, drops;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.floor(canvas.width / 14);
      drops = Array(cols).fill(1);
    }

    resize();
    window.addEventListener('resize', resize);

    setInterval(() => {
      if (!prankActive) return;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0f0';
      ctx.font = '14px monospace';
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * 14, drops[i] * 14);
        if (drops[i] * 14 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }, 50);
  }

  // Lock down — block shortcuts & closing attempts
  function initLockdown() {
    window.addEventListener('beforeunload', (e) => {
      if (prankActive) {
        e.preventDefault();
        e.returnValue = 'Your system is being encrypted. Closing may cause permanent data loss.';
        return e.returnValue;
      }
    });

    document.addEventListener('contextmenu', (e) => e.preventDefault());

    document.addEventListener('keydown', (e) => {
      if (!prankActive) return;

      const blocked =
        e.key === 'F4' && e.altKey ||
        e.key === 'w' && (e.ctrlKey || e.metaKey) ||
        e.key === 'W' && (e.ctrlKey || e.metaKey) ||
        e.key === 'F11' ||
        e.key === 'Escape' ||
        e.key === 'F5' ||
        e.key === 'F12' ||
        e.key === 'Tab' && e.altKey ||
        e.key === 'Delete' && (e.ctrlKey || e.altKey) ||
        e.key === 'q' && (e.ctrlKey || e.metaKey) ||
        e.key === 'Q' && (e.ctrlKey || e.metaKey);

      if (blocked) {
        e.preventDefault();
        e.stopPropagation();
        flashAlert('ACCESS DENIED — SESSION LOCK ACTIVE');
        logKeystroke('BLOCKED: ' + e.key);
        return false;
      }

      // Volume Up or Volume Down = exit (press twice to avoid accidental exit)
      if (e.code === 'AudioVolumeUp' || e.code === 'AudioVolumeDown') {
        e.preventDefault();
        volumePressCount++;
        if (volumePressCount >= 2) {
          exitPrank();
        } else {
          flashAlert('...');
        }
      }

      if (e.key.length === 1) {
        logKeystroke(e.key);
      }
    });

    // Try fullscreen for immersion
    setTimeout(() => {
      const el = document.documentElement;
      if (el.requestFullscreen) {
        el.requestFullscreen().catch(() => {});
      }
    }, 500);

    // Re-focus if user clicks away
    window.addEventListener('blur', () => {
      if (prankActive) setTimeout(() => window.focus(), 100);
    });

    // Fake alarm beep (very subtle)
    try {
      alarmBeep.volume = 0.08;
      alarmBeep.play().catch(() => {});
    } catch (_) {}
  }

  function flashAlert(msg) {
    const banner = document.getElementById('alertBanner');
    const text = document.getElementById('alertText');
    const orig = text.textContent;
    text.textContent = msg;
    banner.style.borderColor = '#ff0040';
    setTimeout(() => {
      text.textContent = orig;
    }, 1200);
  }

  function exitPrank() {
    prankActive = false;
    document.body.classList.add('revealed');
    prankReveal.classList.remove('hidden');
    alarmBeep.pause();

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  }

  closeBtn.addEventListener('click', () => {
    prankReveal.classList.add('hidden');
    window.close();
    setTimeout(() => {
      document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#0f0;font-family:monospace;text-align:center;padding:2rem"><p>You can close this tab now.<br><br>Press Ctrl+W or click the X.</p></div>';
    }, 300);
  });

  // Boot
  initProfile();
  initMatrix();
  initLockdown();
  updateClock();
  updateStats();
  runTerminalSequence();
  runFileQueue();
  animateProgress('prog1', 'pct1', 3);
  animateProgress('prog2', 'pct2', 2.5);
  animateProgress('prog3', 'pct3', 2);

  addTermLine('root@exploit:~# ./init_payload.sh --force', 'dim');
  const cursor = document.createElement('span');
  cursor.className = 'term-cursor';
  terminal.lastChild.appendChild(cursor);
})();
