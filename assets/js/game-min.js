const game=(()=>{"use strict";let e=[],t=["C","D","H","S"],r=["A","J","Q","K"],l=[],n=document.querySelector("#btnTake"),s=document.querySelector("#btnStop"),o=document.querySelector("#btnNew"),d=document.querySelectorAll("small"),a=document.querySelectorAll(".cardsDiv"),i=document.querySelector("span"),c=()=>{swal("Set your player name:",{content:"input"}).then(e=>{i.innerText=e||"Player 1"})},u=()=>{e=[];for(let l=2;l<=10;l++)for(let n of t)e.push(`${l}${n}`);for(let s of t)for(let o of r)e.push(`${o}${s}`);return _.shuffle(e)},$=(t=2)=>{c(),e=u(),l=[];for(let r=0;r<t;r++)l.push(0);d.forEach(e=>{e.innerText=0}),a.forEach(e=>{e.innerText=""}),n.disabled=!1},p=()=>{if(s.disabled=!1,0===e.length)throw"No cards in the deck";return e.pop()},b=e=>{let t=e.substring(0,e.length-1);return isNaN(t)?"A"===t?11:10:+t},f=(e,t)=>(l[t]+=b(e),d[t].innerText=l[t],l[t]),h=(e,t)=>{let r=document.createElement("img");r.src=`./assets/cards/${e}.png`,r.classList.add("cards"),a[t].append(r)},m=()=>{let[e,t]=l;setTimeout(()=>{t===e?swal("Hmmm!","Its a Deuce!","info"):e>21?swal("Ups!","Computer won!","error"):t>21?swal("Good job!","You won!","success"):swal("Ups!","Computer won!","error")},100)},y=e=>{let t=0;do{let r=p();t=f(r,l.length-1),h(r,l.length-1)}while(t<e&&e<=21);m(),o.disabled=!1,s.disabled=!0};return n.addEventListener("click",()=>{let e=p(),t=f(e,0);h(e,0),t>21?(n.disabled=!0,s.disabled=!0,y(t)):21===t&&(n.disabled=!0)}),s.addEventListener("click",()=>{n.disabled=!0,s.disabled=!0,y(l[0])}),{newGame:$}})();