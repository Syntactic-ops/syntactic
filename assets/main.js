window.addEventListener('DOMContentLoaded', () => {
  const codeEl = document.getElementById('codeblock');
  const gutter = document.getElementById('gutter');
  const year = document.getElementById('year');

  if (year) year.textContent = new Date().getFullYear();
  if (!codeEl || !gutter) {
    console.warn('[Syntactic] Missing #codeblock or #gutter — check HTML IDs/paths.');
    return;
  }

  // Build the fake code block (two blank lines after intro for breathing room)
  const codeLines = `// Hi, I'm Ben. This is a playful one-page calling card.

const brand = "Syntactic"
const tagline = "<span id=typewriter class=type-line aria-live=polite></span>"

function summon(method){
  return (method === "email") ? "mailto:hello@syntactic.co.nz" : "https://github.com/Ben"
}

// Quick links
<nav>
  <a href="mailto:hello@syntactic.co.nz" class="btn">Send words this way →</a>
  <a href="https://github.com" class="btn">GitHub</a>
  <a href="https://x.com" class="btn">Sometimes I post</a>
</nav>

// Mini portfolio cards (expandable)
<section class="panel">
  <div class="cards">
    <article class="card">
      <h3>Who I Am</h3>
      <p>Developer-ish, transcriptionist-ish, professional tinkerer. Mildly obsessed with tidy UX and fun micro-interactions.</p>
      <div class="actions">
        <a href="mailto:hello@syntactic.co.nz" class="btn">Email</a>
        <a href="https://movesmart.nz" class="btn">Recent project</a>
      </div>
    </article>

    <article class="card">
      <h3>What I Do</h3>
      <p>Build small, useful things. Sometimes bigger things. Always readable code. Often with coffee.</p>
      <div class="actions">
        <a href="#" class="btn" id="toggleTerminal">Toggle terminal mode</a>
      </div>
    </article>

    <article class="card">
      <h3>Where to Find Me</h3>
      <p>Mostly here. Occasionally on GitHub. Rarely on social. Always open to good ideas.</p>
      <div class="actions">
        <a href="https://github.com" class="btn">GitHub</a>
        <a href="mailto:hello@syntactic.co.nz" class="btn">Contact</a>
      </div>
    </article>
  </div>

// Random word generator
<div class="generator">
  <button class="btn" id="rollWord">Roll a word</button>
  <div class="gen-output" id="wordOut"><span class="micro">(You get a delightfully odd word + definition.)</span></div>
</div>
</section>`;

  // Inject code block
  codeEl.innerHTML = codeLines;

  // Build gutter line numbers
  const lines = codeLines.split('\n').length;
  const frag = document.createDocumentFragment();
  for (let i = 1; i <= lines; i++) {
    const d = document.createElement('div');
    d.textContent = i;
    frag.appendChild(d);
  }
  gutter.appendChild(frag);

  // Fix injected placeholder for the typewriter span
  codeEl.innerHTML = codeEl.innerHTML.replace(
    '<span id=typewriter class=type-line aria-live=polite></span>',
    '<span id="typewriter" class="type-line" aria-live="polite"></span>'
  );

  // Typewriter
  const phrases = [
    'parsing ideas…',
    'transcribing nonsense beautifully.',
    'shipping tiny, shiny tools.',
    'wrangling syntax for fun.',
    'building delightful micro-things.',
  ];
  const typer = document.getElementById('typewriter');
  if (typer) {
    let p = 0, i = 0, deleting = false;
    (function tick(){
      const text = phrases[p];
      const speed = deleting ? 45 : 85;
      if (!deleting) {
        i++;
        typer.textContent = text.slice(0, i);
        if (i === text.length) { deleting = true; setTimeout(tick, 1000); return; }
      } else {
        i--;
        typer.textContent = text.slice(0, i);
        if (i === 0) { deleting = false; p = (p + 1) % phrases.length; }
      }
      setTimeout(tick, speed + Math.random()*120);
    })();
  }

  // Random word generator
  const WORDS = [
    {w:'apopheny', d:'The urge to find patterns where none exist.'},
    {w:'keysmack', d:'To type with enthusiasm bordering on percussion.'},
    {w:'semicolonial', d:'Excessively fond of semicolons.'},
    {w:'debugling', d:'A tiny bug that vanishes the moment you open DevTools.'},
    {w:'linklark', d:'A whimsical link you click with no idea why.'},
  ];
  const rollBtn = document.getElementById('rollWord');
  const out = document.getElementById('wordOut');
  if (rollBtn && out) {
    rollBtn.addEventListener('click', () => {
      const {w,d} = WORDS[Math.floor(Math.random()*WORDS.length)];
      out.innerHTML = `<strong>${w}</strong> — ${d}`;
    });
  }

  // Terminal mode toggle (safe)
  const toggle = document.getElementById('toggleTerminal');
  if (toggle) {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const isTerm = document.body.dataset.term === '1';
      document.body.dataset.term = isTerm ? '0' : '1';
      if (!isTerm) {
        document.documentElement.style.setProperty('--panel', '#0a0a0a');
        document.documentElement.style.setProperty('--ink', '#d8d8d8');
      } else {
        document.documentElement.style.setProperty('--panel', '#11151f');
        document.documentElement.style.setProperty('--ink', '#e6e6e6');
      }
    });
  }
});
