import{a as w,S,i as f}from"./assets/vendor-BzajH6aU.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const b=document.querySelector(".loader"),q="46100469-a9a71a6d23d5188e64cb63582";new URLSearchParams({image_type:"photo",orientation:"horizontal",safesearch:!0});function g(i){b.style.display=i?"block":"none"}document.querySelector('input[name="search"]').value;async function h(i,s,o){if(i===""){iziToast.show({});return}try{const r=await w.get(`https://pixabay.com/api/?key=${q}&q=${i}&page=${s}&per_page=${o}`);return{hits:r.data.hits,total:r.data.total}}catch{}}const $=document.querySelector(".search-form"),m=document.querySelector(".gallery");let n;const u=15;let d=1,y=0;const p=new S(".gallery a");document.querySelector(".loader");$.addEventListener("submit",async i=>{i.preventDefault();const s=document.querySelector('input[name="search"]').value.trim();m.innerHTML="",n&&n.remove(),g&&g(!1);let o=0;d=1;try{const{hits:r,total:e}=await h(s,d,u);if(y=Math.ceil(e/u),console.log(y),r.length===0){f.show({title:"Error",message:"Sorry",color:"red",position:"topCenter"});return}else{g(!0);const t=r.length;r.forEach(a=>{const l=document.createElement("li");l.classList.add("gallery-item"),l.innerHTML=`
          <a href="${a.largeImageURL}">
            <img src="${a.webformatURL}" alt="${a.tags}" class="gallery-image">
          </a>
        `,m.appendChild(l);const c=l.querySelector(".gallery-image");c.onload=()=>{o++,console.log(o),o===t&&g(!1)}}),p.refresh()}r.length>=u&&(n=document.createElement("button"),n.textContent="Load more",n.classList.add("load-more"),m.after(n)),n.addEventListener("click",async()=>{d++;const{hits:t}=await h(s,d,u);g(!0),t.forEach(l=>{const c=document.createElement("li");c.classList.add("gallery-item"),c.innerHTML=`
          <a href="${l.largeImageURL}">
            <img src="${l.webformatURL}" alt="${l.tags}" class="gallery-image">
          </a>
        `,m.appendChild(c),console.log(o);const L=c.querySelector(".gallery-image");o=0,L.onload=()=>{o++,console.log(o),console.log(t.length),o===t.length&&g(!1)}}),p.refresh();const a=document.querySelector(".gallery-item");if(a){const{height:l}=a.getBoundingClientRect();window.scrollBy({top:l*2,behavior:"smooth"})}d===y&&(f.show({title:"Infoline",message:"This is the last page",color:"green",position:"topCenter"}),n.remove())})}catch{f.show({title:"Error",message:"Вибачте, ви нічого не написали зрозумілою мовою. Введіть людське слово для пошуку!",color:"red",position:"topCenter"});return}finally{}});
//# sourceMappingURL=index.js.map
