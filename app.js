// MILL-ANN – veřejný web
const driversGrid=document.querySelector('#drivers-grid');
const winnersGrid=document.querySelector('#winners-grid');
const newsGrid=document.querySelector('#news-grid');
const galleryGrid=document.querySelector('#gallery-grid');
const standingsList=document.querySelector('#standings-list');
const modal=document.querySelector('#driver-modal');
const modalContent=document.querySelector('#modal-content');

function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));}
function initials(name){return name.split(/\s+/).map(x=>x[0]).join('').slice(0,2).toUpperCase();}
function photoHTML(src,name,cls='driver-photo'){
  return src
    ? `<div class="${cls}"><img src="${esc(src)}" alt="${esc(name)}" loading="lazy"></div>`
    : `<div class="${cls}">${initials(name)}</div>`;
}
function renderStandings(){
  const sorted=[...DRIVERS].sort((a,b)=>(b.stats.points||0)-(a.stats.points||0));
  const wins=Object.fromEntries(DRIVERS.map(d=>[d.name,0]));
  WINNERS.forEach(w=>{if(wins[w.driver]!==undefined)wins[w.driver]++;});
  standingsList.innerHTML=sorted.map((d,i)=>`
    <div class="standing-row">
      <span class="rank ${i<3?'top':''}">${i+1}</span>
      <span class="driver-name">${esc(d.name)}<small>${wins[d.name]||0}× vítěz turnaje</small></span>
      <span class="races">${d.stats.races||0} startů</span>
      <span class="points">${d.stats.points||0} b</span>
    </div>`).join('');
}
function renderDrivers(){
  driversGrid.innerHTML=DRIVERS.map((d,i)=>`
    <article class="driver-card" data-driver="${i}">
      ${photoHTML(d.photo,d.name,'driver-photo')}
      <div class="driver-info">
        <h3>${esc(d.name)}</h3>
        <p>${esc(d.team)} • 🇨🇿 ${esc(d.country)}</p>
        <div class="driver-meta"><span>${d.stats.wins} vítězství</span><strong>${d.stats.points} bodů</strong></div>
      </div>
    </article>`).join('');
  document.querySelectorAll('.driver-card').forEach(c=>c.addEventListener('click',()=>openDriver(Number(c.dataset.driver))));
}
function renderWinners(){
  winnersGrid.innerHTML=WINNERS.map((w,i)=>`
    <article class="winner-card"><span class="event">${esc(w.event)}</span><h3>${esc(w.driver)}</h3>
    <p>${esc(w.note)}</p><span class="number">${String(i+1).padStart(2,'0')}</span></article>`).join('');
}
function renderNews(){
  newsGrid.innerHTML=NEWS.map(n=>`
    <article class="news-card">
      ${n.image?`<img src="${esc(n.image)}" alt="" loading="lazy">`:''}
      <div class="news-content"><span class="news-date">${esc(n.date)}</span><h3>${esc(n.title)}</h3><p>${esc(n.text)}</p></div>
    </article>`).join('');
}

let GALLERY_ITEMS=[];
let galleryIndex=0;
async function loadGalleryFromGitHub(){
  // Na GitHub Pages načte obrázky přímo z veřejného repozitáře.
  // Používá pevnou cestu repozitáře, takže funguje i po přesunu webu.
  try{
    const apiUrl='https://api.github.com/repos/wejtyy/mill-ann/contents/assets/gallery';
    const r=await fetch(apiUrl,{cache:'no-store',headers:{'Accept':'application/vnd.github+json'}});
    if(!r.ok)return false;
    const files=await r.json();
    if(!Array.isArray(files))return false;
    const items=files
      .filter(f=>f.type==='file' && /\.(png|jpe?g|webp|gif)$/i.test(f.name))
      .sort((a,b)=>a.name.localeCompare(b.name,undefined,{numeric:true,sensitivity:'base'}))
      .map(f=>({title:f.name.replace(/\.[^.]+$/,'').replace(/[-_]+/g,' '),image:f.download_url}));
    if(items.length){GALLERY_ITEMS=items;return true;}
  }catch(e){console.warn('Galerii se nepodařilo načíst:',e);}
  return false;
}
function renderGallery(){
  const items=GALLERY_ITEMS.length?GALLERY_ITEMS:GALLERY;
  if(!items.length){
    galleryGrid.innerHTML='<div class="gallery-empty">Galerie zatím neobsahuje žádné fotografie.</div>';
    return;
  }
  GALLERY_ITEMS=items;
  galleryGrid.innerHTML=items.map((g,i)=>`
    <button class="gallery-item" type="button" data-gallery-index="${i}">
      <img src="${esc(g.image)}" alt="${esc(g.title||'Mill-Ann')}" loading="lazy">
    </button>`).join('');
  galleryGrid.querySelectorAll('[data-gallery-index]').forEach(el=>el.addEventListener('click',()=>openGallery(Number(el.dataset.galleryIndex))));
}
function openGallery(i){
  galleryIndex=i; updateGalleryLightbox();
  document.querySelector('#gallery-lightbox').classList.add('open');
  document.querySelector('#gallery-lightbox').setAttribute('aria-hidden','false');
}
function updateGalleryLightbox(){
  const g=GALLERY_ITEMS[galleryIndex]; if(!g)return;
  const box=document.querySelector('#gallery-lightbox');
  box.querySelector('.gallery-lightbox-image').src=g.image;
  box.querySelector('.gallery-lightbox-image').alt=g.title||'Mill-Ann';
  box.querySelector('.gallery-lightbox-counter').textContent=`${galleryIndex+1} / ${GALLERY_ITEMS.length}`;
}
function closeGallery(){
  document.querySelector('#gallery-lightbox').classList.remove('open');
  document.querySelector('#gallery-lightbox').setAttribute('aria-hidden','true');
}
function galleryPrev(){if(!GALLERY_ITEMS.length)return;galleryIndex=(galleryIndex-1+GALLERY_ITEMS.length)%GALLERY_ITEMS.length;updateGalleryLightbox();}
function galleryNext(){if(!GALLERY_ITEMS.length)return;galleryIndex=(galleryIndex+1)%GALLERY_ITEMS.length;updateGalleryLightbox();}

function openDriver(i){
  const d=DRIVERS[i];
  modalContent.innerHTML=`
    <div class="profile-head">
      ${photoHTML(d.photo,d.name,'profile-avatar')}
      <div><p class="eyebrow">JEZDEC</p><h2>${esc(d.name)}</h2><p>${esc(d.team)} • 🇨🇿 ${esc(d.country)}</p></div>
    </div>
    <div class="profile-stats">
      <div class="profile-stat"><span>Vítězství</span><strong>${d.stats.wins}</strong></div>
      <div class="profile-stat"><span>Pódia</span><strong>${d.stats.podiums}</strong></div>
      <div class="profile-stat"><span>Body</span><strong>${d.stats.points}</strong></div>
      <div class="profile-stat"><span>Starty</span><strong>${d.stats.races}</strong></div>
      <div class="profile-stat"><span>Tým</span><strong style="font-size:16px">${esc(d.team)}</strong></div>
    </div>`;
  modal.classList.add('open'); modal.setAttribute('aria-hidden','false');
}
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');}
document.querySelectorAll('[data-close]').forEach(el=>el.addEventListener('click',closeModal));
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){closeModal();closeGallery();}
  if(document.querySelector('#gallery-lightbox')?.classList.contains('open')){
    if(e.key==='ArrowLeft')galleryPrev(); if(e.key==='ArrowRight')galleryNext();
  }
});
const toggle=document.querySelector('.menu-toggle'), nav=document.querySelector('.nav');
toggle.addEventListener('click',()=>nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

renderStandings();renderDrivers();renderWinners();renderNews();
loadGalleryFromGitHub().then(renderGallery);
