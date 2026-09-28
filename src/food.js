/* ---------- food illustrations (drawn icons in a round plate frame) ---------- */
const FOOD=(function(){
  const O='stroke="#3A3530" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"';
  const BERRY={과사:'#E0483A',유루:'#3E5FB8',복분:'#45B3B0',배리:'#C9D35A',복숭:'#F4A6B5',리샘:'#6DBF5A'};
  const SOUP={한방:'#8FBF55',쥬시:'#A0703E',버섯:'#E07B4F',해초:'#3F6B45',찌릿찌릿:'#F2C64A',플레인:'#F1D9A4',톡톡:'#8E5AA8'};
  const berry=c=>`<path d="M0 -4 q-3 -9 5 -12" fill="none" stroke="#3E8A3A" stroke-width="2.2"/><path d="M4 -14 q8 -3 10 3 q-7 3 -10 -3Z" fill="#6CBF4E" ${O}/><circle cx="-2" cy="8" r="13" fill="${c}" ${O}/><ellipse cx="-7" cy="3" rx="3.5" ry="5" fill="#fff" opacity=".35"/>`;
  const bottle=(c,l)=>`<rect x="-7" y="-10" width="14" height="28" rx="4" fill="${c}" ${O}/><rect x="-4" y="-18" width="8" height="9" rx="2" fill="${c}" ${O}/><rect x="-4.5" y="-22" width="9" height="5" rx="1.5" fill="${l||'#E4573D'}" ${O}/><rect x="-7" y="0" width="14" height="9" fill="#fff" opacity=".7"/><rect x="-5" y="-7" width="2.5" height="14" rx="1" fill="#fff" opacity=".45"/>`;
  const bowl=(greens,top)=>`<path d="M-20 0 H20 Q18 18 0 19 Q-18 18 -20 0Z" fill="#E9B45C" ${O}/><path d="M-16 5 Q0 9 16 5" stroke="#C98B3E" stroke-width="1.4" fill="none"/>${[[-12,-3],[-4,-7],[5,-6],[13,-2],[0,-2]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="7" ry="5" fill="${greens}" ${O}/>`).join('')}${top}`;
  const cup=c=>`<path d="M-19 -4 H17 Q16 16 -1 17 Q-18 16 -19 -4Z" fill="#fff" ${O}/><path d="M17 0 q9 0 8 7 q-2 6 -10 4" fill="none" ${O}/><ellipse cx="-1" cy="-4" rx="18" ry="5" fill="${c}" ${O}/><circle cx="-6" cy="-5" r="1.6" fill="#fff" opacity=".6"/><circle cx="4" cy="-4" r="1.2" fill="#fff" opacity=".5"/>`;
  const loaf=(c,top)=>`<path d="M-18 16 V-2 Q-18 -16 0 -16 Q18 -16 18 -2 V16Z" fill="${c}" ${O}/><path d="M-18 -2 Q-18 -16 0 -16 Q18 -16 18 -2 Q10 -8 0 -8 Q-10 -8 -18 -2Z" fill="#C97A3A" opacity=".55"/>${top||''}<path d="M-12 6 H12" stroke="#fff" stroke-width="1.2" opacity=".35"/>`;
  const skillet=(nap,top)=>`<path d="M-24 14 L-8 22 L26 8 L10 0Z" fill="${nap}" ${O}/><ellipse cx="0" cy="6" rx="19" ry="10" fill="#34313A" ${O}/><path d="M17 3 L27 -2" stroke="#34313A" stroke-width="4" stroke-linecap="round"/><ellipse cx="-1" cy="3" rx="12" ry="7" fill="#7A3E2A" ${O}/><ellipse cx="-4" cy="0" rx="4" ry="2" fill="#fff" opacity=".2"/>${top||''}`;
  const P={
    salad:v=>{const g={해초:'#3F7A4A',분쇄:'#9CCB5A',칼질:'#7CC45A',과사:'#8FD06A',크루통:'#8FD06A',톡톡:'#6DB65A'}[v]||'#7CC45A';
      const top={해초:`<path d="M-8 -8 q4 -4 8 0 q4 4 8 0" stroke="#8E3B4F" stroke-width="3" fill="none"/>`,분쇄:`<circle cx="-3" cy="-6" r="3" fill="#6C7BD8" ${O}/><circle cx="5" cy="-5" r="2.4" fill="#6C7BD8" ${O}/>`,칼질:`<path d="M-10 -6 L10 -4 M-8 -2 L9 -8" stroke="#E4573D" stroke-width="2"/>`,과사:`<circle cx="0" cy="-6" r="3.4" fill="#E0483A" ${O}/><circle cx="8" cy="-3" r="2.6" fill="#F2C14E" ${O}/>`,크루통:`<rect x="-6" y="-9" width="5" height="5" fill="#E2A34B" ${O}/><rect x="3" y="-7" width="5" height="5" fill="#E2A34B" ${O}/>`,톡톡:`${[[-5,-6],[0,-8],[5,-6],[2,-3]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2.3" fill="#8E5AA8" ${O}/>`).join('')}`}[v]||`<circle cx="-5" cy="-6" r="2.6" fill="#E4573D" ${O}/><circle cx="6" cy="-5" r="2.6" fill="#F2C14E" ${O}/>`;
      return bowl(g,top)},
    soup:v=>cup(SOUP[v]||'#F1D9A4'),
    bread:v=>{const c={폭신폭신:'#F2B6A8',과사:'#EC9F4E',리메이크:'#F0D07A',당근:'#B96B3A',수박:'#F28C8C'}[v]||'#F3D199';
      const top=v==='과사'?`<rect x="-8" y="-6" width="16" height="10" rx="2" fill="#F6C24E" ${O}/>`:v==='리메이크'?`<circle cx="-6" cy="2" r="1.5" fill="#6CBF4E"/><circle cx="5" cy="6" r="1.5" fill="#E4573D"/><circle cx="2" cy="-2" r="1.5" fill="#6CBF4E"/>`:v==='수박'?`<circle cx="-5" cy="3" r="1.4" fill="#2B2A26"/><circle cx="5" cy="6" r="1.4" fill="#2B2A26"/>`:'';
      return loaf(c,top)},
    soupbread:()=>`<rect x="-17" y="-6" width="34" height="24" rx="5" fill="#E2A34B" ${O}/><ellipse cx="0" cy="-5" rx="13" ry="5" fill="#F4D58A" ${O}/><circle cx="-4" cy="-6" r="1.6" fill="#6CBF4E"/><circle cx="4" cy="-4" r="1.6" fill="#E4573D"/>`,
    hamburg:v=>{const nap={토마토:'#F2C14E',버섯:'#6C7BD8',감자:'#F29DC3',어른:'#6DBF5A',다채로운:'#E4573D',플레인:'#E08A4A',펑펑:'#8E5AA8'}[v]||'#E08A4A';
      const top={토마토:`<circle cx="-1" cy="1" r="4.5" fill="#E4432F" ${O}/>`,버섯:`<path d="M-6 2 q3 -6 6 0Z M1 3 q3 -6 6 0Z" fill="#F08A5A" ${O}/>`,감자:`<ellipse cx="-3" cy="2" rx="4" ry="3" fill="#F2D07A" ${O}/><ellipse cx="4" cy="3" rx="3" ry="2.4" fill="#F2D07A" ${O}/>`,어른:`<path d="M-8 0 q3 -5 6 0 q3 -5 6 0" stroke="#6DBF5A" stroke-width="3" fill="none"/>`,다채로운:`<circle cx="-5" cy="1" r="2.2" fill="#F2C14E"/><circle cx="0" cy="-1" r="2.2" fill="#6CBF4E"/><circle cx="5" cy="1" r="2.2" fill="#E4573D"/>`,펑펑:`<circle cx="-3" cy="1" r="2" fill="#8E5AA8"/><circle cx="2" cy="0" r="2" fill="#8E5AA8"/><circle cx="5" cy="3" r="2" fill="#8E5AA8"/>`}[v]||'';
      return skillet(nap,top)},
    smoothie:c=>`<path d="M-12 -14 H12 L9 18 H-9Z" fill="#fff" ${O}/><path d="M-11 -6 H11 L9 18 H-9Z" fill="${c}" ${O}/><path d="M3 -22 L6 -6" stroke="#E4573D" stroke-width="3" stroke-linecap="round"/><circle cx="-5" cy="-9" r="4" fill="#F28C8C" ${O}/>`,
    curry:()=>`<ellipse cx="0" cy="6" rx="22" ry="11" fill="#fff" ${O}/><path d="M-16 6 Q-8 -4 2 2 Q-4 12 -16 6Z" fill="#fff" stroke="#DDD" stroke-width="1"/><path d="M-2 4 Q8 -6 18 4 Q10 14 -2 4Z" fill="#D98A2B" ${O}/><circle cx="6" cy="3" r="2" fill="#E4573D"/><circle cx="11" cy="5" r="2" fill="#F2C14E"/>`,
    berry:k=>berry(BERRY[k]||'#E0483A'),
    tomato:()=>`<circle cx="0" cy="4" r="15" fill="#E4432F" ${O}/><path d="M-7 -9 L0 -5 L7 -9 L3 -3 H-3Z" fill="#4E9A43" ${O}/><ellipse cx="-6" cy="0" rx="3" ry="5" fill="#fff" opacity=".3"/>`,
    potato:()=>`<ellipse cx="0" cy="3" rx="17" ry="13" fill="#E3BD6E" ${O}/><circle cx="-6" cy="0" r="1.2" fill="#9A6B3A"/><circle cx="5" cy="5" r="1.2" fill="#9A6B3A"/><circle cx="2" cy="-4" r="1" fill="#9A6B3A"/>`,
    carrot:()=>`<path d="M-12 14 L8 -8 Q13 -8 12 -3 Z" fill="#F08A2E" ${O}/><path d="M8 -8 q2 -9 -3 -12 M10 -7 q7 -6 10 -2 M11 -5 q8 0 8 5" stroke="#4E9A43" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M-4 6 l3 2 M1 0 l3 2" stroke="#B75C1C" stroke-width="1.2"/>`,
    bean:()=>`<path d="M-17 6 Q-18 -6 -4 -4 Q6 -12 17 -2 Q14 8 2 4 Q-8 12 -17 6Z" fill="#8FC85A" ${O}/><circle cx="-8" cy="1" r="3" fill="#A9D873"/><circle cx="1" cy="-1" r="3" fill="#A9D873"/><circle cx="10" cy="-1" r="3" fill="#A9D873"/>`,
    wheat:()=>`<path d="M-12 16 L10 -14" stroke="#C9A24A" stroke-width="2"/>${[0,1,2,3].map(i=>`<ellipse cx="${-3+i*4.5}" cy="${-1-i*5.5}" rx="3" ry="5.5" fill="#F0CF5A" transform="rotate(35 ${-3+i*4.5} ${-1-i*5.5})" ${O}/><ellipse cx="${1+i*4.5}" cy="${2-i*5.5}" rx="3" ry="5.5" fill="#F0CF5A" transform="rotate(-55 ${1+i*4.5} ${2-i*5.5})" ${O}/>`).join('')}`,
    mushroom:()=>`<rect x="-4" y="0" width="8" height="14" rx="3" fill="#F6EEDC" ${O}/><path d="M-16 2 Q-16 -16 0 -16 Q16 -16 16 2Z" fill="#E4432F" ${O}/><circle cx="-7" cy="-7" r="2.4" fill="#fff"/><circle cx="4" cy="-10" r="2" fill="#fff"/><circle cx="8" cy="-3" r="2" fill="#fff"/>`,
    seaweed:()=>`<path d="M-10 14 Q-16 0 -8 -8 Q-2 -14 -6 -20 M0 14 Q6 2 0 -6 Q-5 -12 2 -20 M9 14 Q16 4 10 -4" stroke="#6B8A3A" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M-10 14 Q-16 0 -8 -8 M0 14 Q6 2 0 -6" stroke="#A6C45A" stroke-width="1.6" fill="none"/>`,
    leaf:()=>`<path d="M-14 12 Q-16 -12 14 -14 Q14 12 -14 12Z" fill="#6CBF4E" ${O}/><path d="M-12 10 L10 -10" stroke="#3E8A3A" stroke-width="1.4"/>`,
    honey:()=>`<path d="M-12 -6 H12 V14 Q12 18 8 18 H-8 Q-12 18 -12 14Z" fill="#F2B233" ${O}/><rect x="-14" y="-12" width="28" height="7" rx="2" fill="#C97A3A" ${O}/><path d="M-6 -5 q0 8 3 8 q3 0 3 -8" fill="#F7CC5A"/>`,
    melon:()=>`<path d="M-18 -4 A18 18 0 0 0 18 -4Z" fill="#E4573D" ${O}/><path d="M-18 -4 A18 18 0 0 0 18 -4" stroke="#4E9A43" stroke-width="4" fill="none"/>${[[-8,2],[0,6],[8,2]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="1.3" ry="2" fill="#2B2A26"/>`).join('')}`,
    seagrape:()=>`<path d="M0 16 V-16" stroke="#4E9A43" stroke-width="2"/>${[-14,-8,-2,4,10].map((y,i)=>`<circle cx="${i%2?5:-5}" cy="${y}" r="4" fill="#5CB88A" ${O}/>`).join('')}`,
    water:()=>bottle('#CFE9F5','#5C9BD6'),
    cider:()=>bottle('#E4F4FB','#4F8FD6'),
    coffee:()=>bottle('#C98B55','#6B3E26'),
    tea:()=>bottle('#F4E27A','#E4573D'),
    chili:()=>bottle('#D93A2E','#2B2A26'),
    any:()=>`<circle cx="0" cy="2" r="14" fill="#F4F0E6" stroke="#3A3530" stroke-width="1.6" stroke-dasharray="3 3"/><text x="0" y="8" text-anchor="middle" font-size="16" font-family="sans-serif" fill="#8A847A">?</text>`,
  };
  function kind(n){
    n=n.replace(/\s/g,'');
    let m;
    if(/카레/.test(n))return P.curry();
    if(/스무디/.test(n))return P.smoothie(/바다포도/.test(n)?'#7CC7A0':/레드핫/.test(n)?'#E4573D':/소다/.test(n)?'#9FD8F0':/커피/.test(n)?'#B8845A':/자뭉|과사/.test(n)?'#F29DC3':'#F28C8C');
    if(/수프빵/.test(n))return P.soupbread();
    if((m=n.match(/(해초|분쇄|칼질|과사|자뭉|크루통|톡톡|플레인|기본)?샐러드/)))return P.salad((m[1]||'').replace('자뭉','과사'));
    if(/임의의빵/.test(n))return P.bread('');
    if((m=n.match(/(폭신폭신|과사|자뭉|리메이크|당근|수박|플레인|기본)?빵/)))return P.bread((m[1]||'').replace('자뭉','과사'));
    if((m=n.match(/(한방|약선|쥬시|버섯|해초|찌릿찌릿|플레인|기본|톡톡)?수프/)))return P.soup((m[1]||'').replace('약선','한방'));
    if((m=n.match(/(토마토|버섯|감자|어른의|다채로운|오색|플레인|기본|펑펑|폭발)?(햄버그|함박)/)))return P.hamburg((m[1]||'').replace('어른의','어른').replace('오색','다채로운').replace('폭발','펑펑'));
    if((m=n.match(/(과사|유루|복분|배리|복숭|리샘)열매/)))return P.berry(m[1]);
    if(/토마토/.test(n))return P.tomato();
    if(/감자/.test(n))return P.potato();
    if(/당근/.test(n))return P.carrot();
    if(/^콩/.test(n))return P.bean();
    if(/밀$|^밀×|^밀/.test(n))return P.wheat();
    if(/버섯/.test(n))return P.mushroom();
    if(/바다포도/.test(n))return P.seagrape();
    if(/해초/.test(n))return P.seaweed();
    if(/잎사귀|나뭇잎/.test(n))return P.leaf();
    if(/꿀/.test(n))return P.honey();
    if(/수박/.test(n))return P.melon();
    if(/맛있는물|^물$/.test(n))return P.water();
    if(/사이다/.test(n))return P.cider();
    if(/커피/.test(n))return P.coffee();
    if(/로즈레이티/.test(n))return P.tea();
    if(/칠리/.test(n))return P.chili();
    return P.any();
  }
  const cache={};
  /* frame=true draws the round plate border like a menu card */
  return (name,frame=true)=>{const k=name+'|'+frame;if(cache[k])return cache[k];
    const body=kind(name);
    return cache[k]=`<svg viewBox="-30 -30 60 60" aria-hidden="true">${frame?`<circle r="28" fill="#FFF9EA" stroke="#4A4540" stroke-width="2.4"/>`:''}${body}</svg>`};
})();
