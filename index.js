import{a as w,S,i as f}from"./assets/vendor-BzajH6aU.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const b=document.querySelector(".loader"),q="46100469-a9a71a6d23d5188e64cb63582";new URLSearchParams({_limit:15,image_type:"photo",orientation:"horizontal",safesearch:!0});function m(i){b.style.display=i?"block":"none"}document.querySelector('input[name="search"]').value;async function y(i,n,r){if(i===""){iziToast.show({});return}try{const o=await w.get(`https://pixabay.com/api/?key=${q}&q=${i}&page=${n}&per_page=${r}`);return{hits:o.data.hits,total:o.data.total}}catch{}}const v=document.querySelector(".search-form"),d=document.querySelector(".gallery");let s;const u=15;let g=1,h=0;const p=new S(".gallery a");document.querySelector(".loader");v.addEventListener("submit",async i=>{i.preventDefault();const n=document.querySelector('input[name="search"]').value.trim();d.innerHTML="",s&&s.remove();let r=0;g=1;try{const{hits:o,total:e}=await y(n,g,u);if(h=Math.ceil(e/u),console.log(h),o.length===0){f.show({title:"Error",message:"Sorry, your search query is incorrect. Please, change something there!",color:"red",position:"topCenter"});return}else{m(!0);const t=o.length;o.forEach(a=>{const l=document.createElement("li");l.classList.add("gallery-item"),l.innerHTML=`
          <a href="${a.largeImageURL}">
            <img src="${a.webformatURL}" alt="${a.tags}" class="gallery-image">
          </a>
        `,d.appendChild(l);const c=l.querySelector(".gallery-image");c.onload=()=>{r++,console.log(r),r===t&&m(!1)}}),p.refresh()}o.length>=u&&(s=document.createElement("button"),s.textContent="Load more",s.classList.add("load-more"),d.after(s)),s.addEventListener("click",async()=>{g++;const{hits:t}=await y(n,g,u);m(!0),t.forEach(l=>{const c=document.createElement("li");c.classList.add("gallery-item"),c.innerHTML=`
          <a href="${l.largeImageURL}">
            <img src="${l.webformatURL}" alt="${l.tags}" class="gallery-image">
          </a>
        `,d.appendChild(c),console.log(r);const L=c.querySelector(".gallery-image");r=0,L.onload=()=>{r++,console.log(r),console.log(t.length),r===t.length&&m(!1)}}),p.refresh();const a=document.querySelector(".gallery-item");if(a){const{height:l}=a.getBoundingClientRect();window.scrollBy({top:l*2,behavior:"smooth"})}g===h&&(f.show({title:"Infoline",message:"This is the last page",color:"green",position:"topCenter"}),s.remove())})}catch{f.show({title:"Error",message:"Sorry, you have not written anything. Еnter a few letters to search!",color:"red",position:"topCenter"});return}finally{}});
//# sourceMappingURL=index.js.map
