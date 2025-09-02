const codeLines = `// Hi, I'm Ben. This is a playful one-page calling card.
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


document.getElementById('codeblock').innerHTML = codeLines;


(function buildGutter(){
const lines = codeLines.split('\n').length;
const g = document.getElementById('gutter');
const frag = document.createDocumentFragment();
for(let i=1;i<=lines;i++){ const d=document.createElement('div'); d.textContent = i; frag.appendChild(d);} g.appendChild(frag);
})();


const phrases = [
'parsing ideas…',
'transcribing nonsense beautifully.',
'shipping tiny, shiny tools.',
'wrangling syntax for fun.',
'building delightful micro-things.',
];


document.querySelector('#codeblock').innerHTML = document.querySelector('#codeblock').innerHTML.replace('<span id=typewriter class=type-line aria-live=polite></span>', '<span id="typewriter" class="type-line" aria-live="polite"></span>');
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


document.getElementById('toggleTerminal').addEventListener('click', (e)=>{
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


document.getElementById('year').textContent = new Date().getFullYear();
