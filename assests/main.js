// Build the fake code block content (with two blank lines after the intro comment)


// Build gutter line numbers to match codeLines
(function buildGutter(){
  const lines = codeLines.split('\n').length;
  const g = document.getElementById('gutter');
  const frag = document.createDocumentFragment();
  for(let i=1;i<=lines;i++){ const d=document.createElement('div'); d.textContent = i; frag.appendChild(d);} g.appendChild(frag);
})();


// Typewriter effect (with breathing room already added above)
const phrases = [
  'parsing ideas…',
  'transcribing nonsense beautifully.',
  'shipping tiny, shiny tools.',
  'wrangling syntax for fun.',
  'building delightful micro-things.',
];


// Fix the injected placeholder to a proper span with attributes
const fixed = document.querySelector('#codeblock').innerHTML.replace(
  '<span id=typewriter class=type-line aria-live=polite></span>',
  '<span id="typewriter" class="type-line" aria-live="polite"></span>'
  );
document.querySelector('#codeblock').innerHTML = fixed;


const typer = document.getElementById('typewriter');
let p = 0, i = 0, deleting = false;
function tick(){
const text = phrases[p];
const speed = deleting ? 45 : 85;
if(!deleting){
  i++;
  typer.textContent = text.slice(0,i);
  if(i === text.length){ deleting = true; setTimeout(tick, 1000); return; }
} else {
  i--;
  typer.textContent = text.slice(0,i);
  if(i === 0){ deleting = false; p = (p+1) % phrases.length; }
}
  setTimeout(tick, speed + Math.random()*120);
}
tick();


// Random word generator
const WORDS = [
  {w:'apopheny', d:'The urge to find patterns where none exist.'},
  {w:'keysmack', d:'To type with enthusiasm bordering on percussion.'},
  {w:'semicolonial', d:'Excessively fond of semicolons.'},
  {w:'debugling', d:'A tiny bug that vanishes the moment you open DevTools.'},
  {w:'linklark', d:'A whimsical link you click with no idea why.'},
];


document.getElementById('rollWord').addEventListener('click', ()=>{
  const {w,d} = WORDS[Math.floor(Math.random()*WORDS.length)];
  document.getElementById('wordOut').innerHTML = `<strong>${w}</strong> — ${d}`;
});


// Fake terminal mode toggle
const toggle = document.getElementById('toggleTerminal');
  if(toggle){
    toggle.addEventListener('click', (e)=>{
    e.preventDefault();
    const body = document.body;
    const isTerm = body.dataset.term === '1';
    body.dataset.term = isTerm ? '0' : '1';
  if(!isTerm){
    document.documentElement.style.setProperty('--panel', '#0a0a0a');
    document.documentElement.style.setProperty('--ink', '#d8d8d8');
  } else {
    document.documentElement.style.setProperty('--panel', '#11151f');
    document.documentElement.style.setProperty('--ink', '#e6e6e6');
  }
  });
}


// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();
