import{a as y,S as L,i as n}from"./assets/vendor-Rdv7LHNr.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))u(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const m of a.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&u(m)}).observe(document,{childList:!0,subtree:!0});function s(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function u(t){if(t.ep)return;t.ep=!0;const a=s(t);fetch(t.href,a)}})();const w="46100469-a9a71a6d23d5188e64cb63582";async function g(r,e){return(await y.get("https://pixabay.com/api/",{params:{key:w,q:r,image_type:"photo",orientation:"",safesearch:"true",page:e,per_page:15}})).data}const p=document.querySelector(".gallery");let b=new L(".gallery a",{captionsData:"alt",captionDelay:250});function f(r){const e=r.map(s=>`
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

      </li> `).join("");p.insertAdjacentHTML("beforeend",e),b.refresh()}function v(){p.innerHTML=""}const S=document.querySelector(".search-form"),q=document.querySelector(".search"),o=document.querySelector(".load-more"),i=document.querySelector(".loader");let c="",d=1,l=0,h=0;S.addEventListener("submit",async r=>{if(r.preventDefault(),d=1,c=q.value.trim(),c===""){n.warning({message:"Please fill this field",position:"topRight"});return}v(),l=0;try{const{hits:e,totalHits:s}=await g(c,d);if(i.classList.add("hidden"),e.length===0){n.info({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),i.classList.add("hidden"),o.classList.add("hidden");return}h=s,l+=e.length,f(e),o.classList.remove("hidden"),i.classList.add("hidden"),l>=h&&(o.classList.add("hidden"),i.classList.add("hidden"),n.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch(e){console.error("Error during receiving images:",e),n.error({message:"Something went wrong! Please try again later.",position:"topRight"}),i.classList.add("hidden")}});o.addEventListener("click",async()=>{d++;try{o.classList.add("hidden");const{hits:r}=await g(c,d);l+=r.length,i.classList.add("hidden"),o.classList.remove("hidden"),f(r),l>=h&&(o.classList.add("hidden"),i.classList.add("hidden"),n.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}));const{height:e}=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}catch(r){console.error("Error loading additional images:",r)}});
//# sourceMappingURL=index.js.map
