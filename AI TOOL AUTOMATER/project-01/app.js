/* ---------- THEME ---------- */
const toggleBtn = document.getElementById('theme-toggle');
const html = document.documentElement;
const saved = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme',saved);
toggleBtn.addEventListener('click',()=>{
  const current = html.getAttribute('data-theme');
  const next = current==='dark'?'light':'dark';
  html.setAttribute('data-theme',next);
  localStorage.setItem('theme',next);
});

/* ---------- CURSOR ---------- */
const cursor = document.getElementById('cursor');
window.addEventListener('mousemove',e=>{
  gsap.to(cursor,{x:e.clientX,y:e.clientY,duration:.1});
});

/* ---------- LOADER ---------- */
window.addEventListener('load',()=>{
  gsap.to('#loader',{opacity:0,duration:.6,onComplete:()=>loader.remove()});
});

/* ---------- PRODUCTS ---------- */
const products = [
  {id:1,name:'ERROR JACKET',price:499,img:'https://i.imgur.com/3bKj0bE.jpg',desc:'Zero-weight polymer shell with embedded glitch pattern.'},
  {id:2,name:'GLITCH HOODIE',price:220,img:'https://i.imgur.com/7K4zLHp.jpg',desc:'Double-layer knit with heat-reactive thread.'},
  {id:3,name:'NULL CAP',price:90,img:'https://i.imgur.com/8xKsTXr.jpg',desc:'Memory-foam brim, matte-black metal clasp.'},
  {id:4,name:'404 PANTS',price:270,img:'https://i.imgur.com/2w8VfTL.jpg',desc:'Modular cargo panels, reflective piping.'},
  {id:5,name:'DUMP TEE',price:150,img:'https://i.imgur.com/0dY4x7U.jpg',desc:'Heavyweight 260 gsm cotton, oversized boxy fit.'},
  {id:6,name:'VOID BAG',price:330,img:'https://i.imgur.com/7p7p7p7.jpg',desc:'Waterproof roll-top, welded seams, 18 L.'}
];

/* ---------- RENDER CARDS ---------- */
if(document.getElementById('product-grid')){
  const grid = document.getElementById('product-grid');
  products.forEach(p=>{
    const card = document.createElement('div');
    card.className='card';
    card.innerHTML=`
      <div class="img" style="background-image:url(${p.img})"></div>
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <button class="quick" onclick="viewProduct(${p.id})">VIEW</button>
      <button class="add-btn" onclick="addToBag(${p.id})">ADD</button>
    `;
    grid.appendChild(card);
  });
}

/* ---------- PRODUCT DETAIL PAGE ---------- */
function viewProduct(id){
  localStorage.setItem('selectedProduct',id);
  location.href='product.html';
}
if(location.pathname.includes('product.html')){
  const id = +localStorage.getItem('selectedProduct') || 1;
  const p = products.find(pr=>pr.id===id);
  document.getElementById('p-img').src=p.img;
  document.getElementById('p-name').textContent=p.name;
  document.getElementById('p-price').textContent=`$${p.price}`;
  document.getElementById('p-desc').textContent=p.desc;
  document.getElementById('p-add').onclick=()=>addToBag(id);
}

/* ---------- BAG ---------- */
let bag = JSON.parse(localStorage.getItem('bag'))||[];
function save(){localStorage.setItem('bag',JSON.stringify(bag))}
function renderBag(){
  const list = document.getElementById('bag-list');
  if(!list) return;
  list.innerHTML='';
  bag.forEach((item,i)=>{
    const li=document.createElement('li');
    li.innerHTML=`${item.name} — $${item.price} <span onclick="removeFromBag(${i})">✕</span>`;
    list.appendChild(li);
  });
}
function addToBag(id){
  bag.push(products.find(p=>p.id===id));
  document.getElementById('bag-count').textContent=bag.length;
  save();
}
function removeFromBag(i){
  bag.splice(i,1);
  save();
  renderBag();
  document.getElementById('bag-count').textContent=bag.length;
}
document.getElementById('bag-count').textContent=bag.length;

/* ---------- MODAL ---------- */
const bagBtn=document.getElementById('bag-btn');
const bagModal=document.getElementById('bag-modal');
if(bagBtn){
  bagBtn.addEventListener('click',()=>{
    renderBag();
    bagModal.style.display='flex';
  });
  document.querySelector('.close').addEventListener('click',()=>bagModal.style.display='none');
  window.addEventListener('click',e=>{if(e.target===bagModal)bagModal.style.display='none'});
}

/* ---------- MENU ---------- */
const menuToggle=document.getElementById('menu-toggle');
const menu=document.getElementById('menu');
if(menuToggle){
  menuToggle.addEventListener('click',()=>menu.style.display=menu.style.display==='flex'?'none':'flex');
}

/* ---------- GSAP PARALLAX ---------- */
gsap.registerPlugin(ScrollTrigger);
gsap.from('#hero h2',{y:100,opacity:0,duration:1.2,ease:'power3.out'});
gsap.from('.card',{
  y:80,opacity:0,stagger:.1,duration:.8,
  scrollTrigger:{trigger:'#shop',start:'top 95%'}
});
