import{a as y,S as L,i as l}from"./assets/vendor-Rdv7LHNr.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))h(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const g of i.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&h(g)}).observe(document,{childList:!0,subtree:!0});function s(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function h(t){if(t.ep)return;t.ep=!0;const i=s(t);fetch(t.href,i)}})();const v="46100469-a9a71a6d23d5188e64cb63582";async function u(r,e){return(await y.get("https://pixabay.com/api/",{params:{key:v,q:r,image_type:"photo",orientation:"",safesearch:"true",page:e,per_page:15}})).data}const p=document.querySelector(".gallery");let w=new L(".gallery a",{captionsData:"alt",captionDelay:250});function f(r){const e=r.map(s=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${s.largeImageURL}">
            <img class="gallery-img" src="${s.webformatURL}" alt="${s.tags}" loading="lazy" width="360px" height="200px" />
        </a>

        <ul class="image-info">
          <li class="image-item">
            Likes
            <p class="image-name">${s.likes}</p>
          </li>
          <li class="image-item">
            Views
            <p class="image-name">${s.views}</p>
          </li>
          <li class="image-item">
            Comments
            <p class="image-name">${s.comments}</p>
          </li>
          <li class="image-item">
            Downloads
            <p class="image-name">${s.downloads}</p>
          </li>
        </ul>

      </li> `).join("");p.insertAdjacentHTML("beforeend",e),w.refresh()}function b(){p.innerHTML=""}const S=document.querySelector(".search-form"),q=document.querySelector(".search"),n=document.querySelector(".load-more");n.classList.add("hidden");const a=document.querySelector(".loader");a.classList.add("hidden");let d="",m=1,o=0,c=0;S.addEventListener("submit",async r=>{if(r.preventDefault(),a.classList.remove("hidden"),m=1,d=q.value.trim(),d===""){l.warning({message:"Please fill this field",position:"topRight"});return}b(),o=0;try{const{hits:e,totalHits:s}=await u(d,m);if(a.classList.add("hidden"),e.length===0){l.info({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),a.classList.add("hidden"),n.classList.add("hidden");return}c=s,o+=e.length,f(e),n.classList.remove("hidden"),a.classList.add("hidden"),console.log(o),console.log(c),o>=c&&(n.classList.remove("hidden"),a.classList.add("hidden"),l.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch(e){console.error("Error during receiving images:",e),l.error({message:"Something went wrong! Please try again later.",position:"topRight"}),a.classList.add("hidden")}});n.addEventListener("click",async()=>{m++,a.classList.remove("hidden");try{n.classList.add("hidden");const{hits:r}=await u(d,m);o+=r.length,a.classList.add("hidden"),f(r),console.log(o),console.log(c),o>=c&&(n.classList.remove("hidden"),a.classList.add("hidden"),l.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}));const{height:e}=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}catch(r){console.error("Error loading additional images:",r)}});
//# sourceMappingURL=index.js.map
