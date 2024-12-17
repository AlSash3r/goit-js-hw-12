import{i as c,S as g,a as b}from"./assets/vendor-D0cagnvz.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&r(u)}).observe(document,{childList:!0,subtree:!0});function i(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(t){if(t.ep)return;t.ep=!0;const s=i(t);fetch(t.href,s)}})();function y(o){return o.map(({webformatURL:e,largeImageURL:i,tags:r,likes:t,views:s,comments:u,downloads:h})=>`
                <a href="${i}" class="list-item">
                    <div class="describe">
                        <img src="${e}" alt="${r}" class="list-image">
                    </div>
                    <ul class="categories">
                        <li class="categories-item">
                            <h2 class="link-text">Likes</h2>
                            <p class="number">${t}</p>
                        </li>
                        <li class="categories-item">
                            <h2 class="link-text">Views</h2>
                            <p class="number">${s}</p>
                        </li>
                        <li class="categories-item">
                            <h2 class="link-text">Comments</h2>
                            <p class="number">${u}</p>
                        </li>
                        <li class="categories-item">
                            <h2 class="link-text">Downloads</h2>
                            <p class="number">${h}</p>
                        </li>
                    </ul>
                </a>
            </li>
        `).join("")}const L=document.querySelector(".form"),p=document.querySelector(".list"),n=document.querySelector(".loader"),a=document.querySelector(".load-button"),x=document.querySelector(".input");L.addEventListener("submit",w);a.addEventListener("click",q);let l,d;const S="47671198-bf70cd038d5f77d4168ecf4e9",v="https://pixabay.com/api/";async function m(o,e=1){const i=new URLSearchParams({key:S,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:e});return(await b.get(`${v}?${i}`)).data}async function w(o){if(o.preventDefault(),l=1,d=x.value.trim(),a.style.display="none",n.style.display="inline-block",p.innerHTML="",!d){n.style.display="none",c.warning({position:"topRight",message:"Please enter a search item."});return}try{const e=await m(d,l);if(e.total===0){n.style.display="none",P();return}p.innerHTML=y(e.hits),f();const i=e.totalHits,r=Math.ceil(i/15);if(l>=r){c.info({position:"topRight",message:"We're sorry, but there are no more images for your request."}),a.style.display="none";return}l++,a.style.display="block"}catch(e){n.style.display="none",c.error({position:"topRight",message:e.message,maxWidth:432})}finally{n.style.display="none"}}function P(){c.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!",maxWidth:432}),p.innerHTML="",a.style.display="none"}function f(){new g(".list-item",{captions:!0,captionsData:"alt",captionDelay:150}).refresh()}async function q(o){o.preventDefault(),a.style.display="none",n.style.display="inline-block";try{const e=await m(d,l);p.insertAdjacentHTML("beforeend",y(e.hits)),M(),f();const i=e.totalHits,r=Math.ceil(i/15);if(l>=r){c.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."}),a.style.display="none";return}l++,a.style.display="block"}catch(e){n.style.display="none",c.error({position:"topRight",message:e.message,maxWidth:432})}finally{n.style.display="none"}}function M(){const e=document.querySelector(".list-item").getBoundingClientRect().height;window.scrollBy({left:0,top:e*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
