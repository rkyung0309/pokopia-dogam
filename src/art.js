/* ---------- habitat illustrations (procedural, drawn from each habitat's recipe) ---------- */
const ART=(function(){
  const hash=s=>{let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0};
  const rng=seed=>()=>{seed=(seed+0x6D2B79F5)|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
  const G=(x,y,s,body)=>`<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${s.toFixed(2)})">${body}</g>`;
  const OL='stroke="#2B2A26" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round"';

  const GRASS={초록:'#5DAE4B',노란:'#D9C13B',빨간:'#D35E43',분홍:'#E890B5',마른:'#C8A86A',해저:'#3FA08E'};
  const FLOWER={들판:'#F6D04D',해안:'#7DB4EE',바위:'#B57DDD',부유섬:'#F39DC3',해저:'#FF8A7A',민들레:'#F4C430'};

  /* ---- primitives: drawn around (0,0) = bottom centre ---- */
  const P={
    grass:c=>`<path d="M-9 0 Q-7 -9 -4 -13 Q-4 -6 -2 0 Q-1 -11 1 -16 Q2 -8 3 0 Q5 -10 8 -12 Q6 -5 9 0Z" fill="${c}" ${OL}/>`,
    seaweed:()=>`<path d="M-3 0 Q-8 -8 -3 -16 Q2 -24 -2 -32 M3 0 Q8 -9 3 -18 Q-1 -25 4 -30" fill="none" stroke="#2F8F5B" stroke-width="3.2" stroke-linecap="round"/>`,
    lily:()=>`<ellipse cx="0" cy="-2" rx="8" ry="3" fill="#69B35A" ${OL}/><circle cx="2" cy="-4" r="2" fill="#F7A8C4"/>`,
    flower:c=>`<path d="M0 0 V-11" stroke="#4E9A43" stroke-width="1.6"/><g transform="translate(0 -13)">${[0,72,144,216,288].map(a=>`<ellipse cx="0" cy="-3.6" rx="2.4" ry="3.6" fill="${c}" transform="rotate(${a})" stroke="#2B2A26" stroke-width=".9"/>`).join('')}<circle r="2.1" fill="#FFF3C4" stroke="#2B2A26" stroke-width=".9"/></g>`,
    crops:()=>`<rect x="-12" y="-4" width="24" height="5" rx="2" fill="#8A5A3A" ${OL}/>${[-7,0,7].map(x=>`<path d="M${x} -4 q-3 -6 0 -9 q3 3 0 9" fill="#6CBF4E" stroke="#2B2A26" stroke-width=".9"/>`).join('')}`,
    tree:(c,berry)=>`<rect x="-3" y="-20" width="6" height="20" fill="#8A5A3A" ${OL}/><circle cx="0" cy="-30" r="15" fill="${c||'#4E9E4B'}" ${OL}/><circle cx="-7" cy="-34" r="4" fill="#fff" opacity=".18"/>${berry?[[-6,-26],[5,-33],[6,-22],[-3,-38]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2.3" fill="#E4573D" stroke="#2B2A26" stroke-width=".8"/>`).join(''):''}`,
    palm:()=>`<path d="M0 0 Q3 -16 1 -34" fill="none" stroke="#9A6B43" stroke-width="5" stroke-linecap="round"/><path d="M1 -34 q-14 -4 -20 6 M1 -34 q14 -4 20 6 M1 -34 q-8 -10 -18 -9 M1 -34 q8 -10 18 -9 M1 -34 q0 -9 -2 -12" fill="none" stroke="#3E9B4F" stroke-width="4.5" stroke-linecap="round"/>`,
    pine:()=>`<rect x="-2.5" y="-8" width="5" height="8" fill="#8A5A3A" ${OL}/><path d="M0 -40 L13 -8 H-13Z" fill="#3F8A55" ${OL}/><path d="M0 -40 L6 -24 H-6Z" fill="#fff" opacity=".12"/>`,
    stump:()=>`<path d="M-8 0 V-8 Q0 -11 8 -8 V0Z" fill="#9A6B43" ${OL}/><ellipse cx="0" cy="-8" rx="8" ry="2.6" fill="#D6AE78" ${OL}/>`,
    bush:()=>`<path d="M-12 0 Q-15 -10 -6 -12 Q-3 -20 5 -15 Q14 -14 12 0Z" fill="#4F9C49" ${OL}/><circle cx="-2" cy="-8" r="1.8" fill="#F5D24B"/><circle cx="5" cy="-5" r="1.8" fill="#F5D24B"/>`,
    rock:c=>`<path d="M-12 0 Q-13 -9 -6 -13 Q1 -17 8 -11 Q13 -7 12 0Z" fill="${c}" ${OL}/><path d="M-5 -10 Q0 -13 5 -10" stroke="#fff" stroke-width="1.4" opacity=".35" fill="none"/>`,
    hotrock:()=>`<path d="M-12 0 Q-13 -9 -6 -13 Q1 -17 8 -11 Q13 -7 12 0Z" fill="#9C3B25" ${OL}/><path d="M-6 -3 L-2 -8 L1 -4 L5 -10" stroke="#FFB23F" stroke-width="1.8" fill="none"/>`,
    chimney:()=>`<path d="M-9 0 L-6 -24 H6 L9 0Z" fill="#6D6A73" ${OL}/><ellipse cx="0" cy="-24" rx="6" ry="2" fill="#3C3A40"/><circle cx="-1" cy="-30" r="3" fill="#fff" opacity=".55"/><circle cx="3" cy="-36" r="2.2" fill="#fff" opacity=".4"/>`,
    stalag:()=>`<path d="M-7 0 L0 -26 L7 0Z" fill="#E8E1D2" ${OL}/>`,
    moss:()=>`<path d="M-11 0 Q-10 -5 -5 -5 Q-2 -9 3 -6 Q9 -7 11 0Z" fill="#6E9A45" ${OL}/><circle cx="-3" cy="-3" r="1.2" fill="#A8D06A"/><circle cx="4" cy="-3" r="1.2" fill="#A8D06A"/>`,
    coral:c=>`<path d="M0 0 V-10 M0 -10 L-6 -18 M0 -10 L6 -20 M-6 -18 L-8 -24 M6 -20 L9 -25 M-3 -14 L-9 -14" stroke="${c}" stroke-width="3.6" stroke-linecap="round" fill="none"/>`,
    cliff:()=>`<path d="M-26 0 V-26 Q-24 -30 -18 -30 H18 Q24 -30 26 -26 V0Z" fill="#B99466" ${OL}/><path d="M-26 -26 Q-24 -30 -18 -30 H18 Q24 -30 26 -26 V-22 H-26Z" fill="#6FAF55"/><path d="M-14 -16 H-6 M4 -10 H14" stroke="#8C6B45" stroke-width="1.4"/>`,
    pool:c=>`<ellipse cx="0" cy="-3" rx="18" ry="5" fill="${c}" ${OL}/><path d="M-9 -4 q3 -2 6 0 M3 -2 q3 -2 6 0" stroke="#fff" stroke-width="1.1" opacity=".6" fill="none"/>`,
    steam:()=>`<path d="M-6 -8 q-3 -5 0 -9 q3 -4 0 -8 M5 -8 q-3 -5 0 -9 q3 -4 0 -8" stroke="#fff" stroke-width="2" fill="none" opacity=".8" stroke-linecap="round"/>`,
    fall:()=>`<rect x="-12" y="-46" width="24" height="46" rx="3" fill="#8C8A94" ${OL}/><rect x="-7" y="-46" width="14" height="46" fill="#7CC4F0"/><path d="M-4 -40 V-8 M1 -44 V-12 M5 -36 V-6" stroke="#fff" stroke-width="1.3" opacity=".8"/><ellipse cx="0" cy="-1" rx="14" ry="3" fill="#BDE6FA" ${OL}/>`,
    fire:()=>`<path d="M-9 0 L9 -3 M-9 -3 L9 0" stroke="#7A4A2C" stroke-width="3" stroke-linecap="round"/><path d="M0 -3 Q-8 -10 -3 -18 Q-2 -12 1 -14 Q0 -20 4 -24 Q10 -14 5 -3Z" fill="#F28A2E" ${OL}/><path d="M1 -4 Q-3 -9 0 -13 Q3 -9 2 -4Z" fill="#FFD24A"/>`,
    candle:()=>`<rect x="-2.5" y="-14" width="5" height="14" fill="#F6EEDC" ${OL}/><path d="M0 -15 q-3 -4 0 -8 q3 4 0 8" fill="#FFB23F"/>`,
    lamp:()=>`<rect x="-1.4" y="-26" width="2.8" height="26" fill="#4A4A52"/><path d="M-7 -26 L-4 -34 H4 L7 -26Z" fill="#FFE08A" ${OL}/><circle cx="0" cy="-28" r="9" fill="#FFE9A6" opacity=".35"/>`,
    lantern:()=>`<rect x="-5" y="-14" width="10" height="13" rx="2" fill="#FFD36B" ${OL}/><path d="M-3 -14 V-17 H3 V-14" fill="none" ${OL}/><circle cx="0" cy="-8" r="8" fill="#FFE9A6" opacity=".35"/>`,
    chair:c=>`<path d="M-6 0 V-9 H6 V0 M-6 -9 V-20 H-2 V-9" fill="none" stroke="#2B2A26" stroke-width="1.4"/><rect x="-7" y="-11" width="14" height="3" rx="1" fill="${c||'#C98B55'}" ${OL}/><rect x="-7" y="-21" width="4" height="12" rx="1" fill="${c||'#C98B55'}" ${OL}/>`,
    sofa:c=>`<rect x="-15" y="-13" width="30" height="9" rx="3" fill="${c||'#7FA7D9'}" ${OL}/><rect x="-18" y="-10" width="6" height="10" rx="2" fill="${c||'#7FA7D9'}" ${OL}/><rect x="12" y="-10" width="6" height="10" rx="2" fill="${c||'#7FA7D9'}" ${OL}/><rect x="-12" y="-7" width="24" height="5" rx="1.5" fill="#fff" opacity=".25"/>`,
    table:c=>`<rect x="-14" y="-13" width="28" height="3.5" rx="1" fill="${c||'#B8844F'}" ${OL}/><path d="M-11 -10 V0 M11 -10 V0" stroke="#2B2A26" stroke-width="2"/>`,
    bed:c=>`<rect x="-17" y="-9" width="34" height="7" rx="2" fill="#F4F0E6" ${OL}/><rect x="-19" y="-17" width="5" height="17" rx="1.5" fill="#B8844F" ${OL}/><rect x="-6" y="-12" width="22" height="6" rx="2" fill="${c||'#8FC1E3'}" ${OL}/><rect x="-13" y="-13" width="7" height="4" rx="2" fill="#fff" ${OL}/>`,
    cabinet:c=>`<rect x="-10" y="-30" width="20" height="30" rx="2" fill="${c||'#B8844F'}" ${OL}/><path d="M0 -29 V-1" stroke="#2B2A26" stroke-width="1.2"/><circle cx="-2.5" cy="-15" r="1" fill="#2B2A26"/><circle cx="2.5" cy="-15" r="1" fill="#2B2A26"/>`,
    books:()=>`<rect x="-11" y="-30" width="22" height="30" rx="1.5" fill="#9A6B43" ${OL}/><path d="M-10 -20 H10 M-10 -10 H10" stroke="#2B2A26" stroke-width="1.2"/>${[['#E4573D',-8,-29],['#4F8FD6',-4,-28],['#F2C14E',0,-29],['#6CBF4E',-7,-19],['#B57DDD',-2,-18],['#E4573D',3,-19]].map(([c,x,y])=>`<rect x="${x}" y="${y}" width="3.2" height="8.5" fill="${c}"/>`).join('')}`,
    mirror:()=>`<rect x="-10" y="-11" width="20" height="11" rx="1.5" fill="#E7C8D8" ${OL}/><ellipse cx="0" cy="-20" rx="7" ry="9" fill="#CFE9F5" ${OL}/><path d="M-3 -24 L1 -17" stroke="#fff" stroke-width="1.4"/>`,
    crate:()=>`<rect x="-9" y="-16" width="18" height="16" fill="#C6904F" ${OL}/><path d="M-9 -16 L9 0 M9 -16 L-9 0" stroke="#8A5A3A" stroke-width="1.3"/>`,
    barrel:()=>`<path d="M-8 0 Q-10 -9 -8 -18 H8 Q10 -9 8 0Z" fill="#A8703F" ${OL}/><path d="M-9 -5 H9 M-9 -13 H9" stroke="#55545C" stroke-width="1.6"/>`,
    carton:()=>`<rect x="-10" y="-13" width="20" height="13" fill="#D8B27C" ${OL}/><path d="M-10 -13 L-6 -17 H14 L10 -13 M10 -13 V0 M14 -17 V-4 L10 0" fill="#C79D65" ${OL}/>`,
    chest:()=>`<rect x="-11" y="-11" width="22" height="11" fill="#B06B34" ${OL}/><path d="M-11 -11 Q0 -21 11 -11Z" fill="#C98147" ${OL}/><rect x="-2" y="-12" width="4" height="5" fill="#F2C14E" ${OL}/><circle cx="7" cy="-18" r="1.4" fill="#FFF3A8"/>`,
    trash:()=>`<path d="M-7 0 L-8 -16 H8 L7 0Z" fill="#8FA3AE" ${OL}/><rect x="-9" y="-19" width="18" height="3" rx="1" fill="#6F8490" ${OL}/><path d="M-3 -13 V-4 M3 -13 V-4" stroke="#2B2A26" stroke-width="1"/>`,
    bag:()=>`<path d="M-8 0 Q-11 -8 -5 -13 L-2 -16 L2 -16 L5 -13 Q11 -8 8 0Z" fill="#4A5566" ${OL}/>`,
    sign:()=>`<rect x="-1.4" y="-22" width="2.8" height="22" fill="#8A5A3A"/><path d="M-11 -24 H8 L12 -19 L8 -14 H-11Z" fill="#E8C98E" ${OL}/>`,
    food:()=>`<ellipse cx="0" cy="-2" rx="11" ry="3" fill="#fff" ${OL}/><path d="M-7 -3 Q0 -12 7 -3Z" fill="#F29A4A" ${OL}/><circle cx="-2" cy="-6" r="1.5" fill="#6CBF4E"/>`,
    cup:()=>`<path d="M-5 0 L-6 -10 H6 L5 0Z" fill="#fff" ${OL}/><path d="M6 -8 q4 0 3 4 q-1 2 -4 1" fill="none" ${OL}/><path d="M-2 -13 q-2 -3 0 -5 M2 -13 q-2 -3 0 -5" stroke="#9AA" stroke-width="1" fill="none"/>`,
    basket:()=>`<path d="M-10 -9 H10 L7 0 H-7Z" fill="#D9A35B" ${OL}/><path d="M-8 -9 Q0 -22 8 -9" fill="none" ${OL}/><circle cx="-3" cy="-10" r="2.4" fill="#E4573D" ${OL}/><circle cx="3" cy="-10" r="2.4" fill="#F2C14E" ${OL}/>`,
    plush:()=>`<circle cx="0" cy="-7" r="7" fill="#E9B98C" ${OL}/><circle cx="0" cy="-17" r="6" fill="#E9B98C" ${OL}/><circle cx="-5" cy="-22" r="2.4" fill="#E9B98C" ${OL}/><circle cx="5" cy="-22" r="2.4" fill="#E9B98C" ${OL}/><circle cx="-2" cy="-17.5" r=".9" fill="#2B2A26"/><circle cx="2" cy="-17.5" r=".9" fill="#2B2A26"/><ellipse cx="0" cy="-15" rx="1.6" ry="1.1" fill="#9A6B43"/>`,
    screen:()=>`<rect x="-13" y="-22" width="26" height="17" rx="2" fill="#3A4150" ${OL}/><rect x="-10" y="-19" width="20" height="11" fill="#7FD1E8"/><path d="M-8 -12 L-3 -16 L2 -11 L6 -15" stroke="#fff" stroke-width="1.2" fill="none"/><path d="M-4 -5 H4 V0 H-4Z" fill="#3A4150" ${OL}/>`,
    arcade:()=>`<path d="M-9 0 V-28 H9 V0Z" fill="#D9534F" ${OL}/><rect x="-6" y="-25" width="12" height="9" fill="#7FD1E8" ${OL}/><circle cx="-3" cy="-11" r="1.6" fill="#F2C14E"/><circle cx="3" cy="-11" r="1.6" fill="#4F8FD6"/>`,
    speaker:()=>`<rect x="-7" y="-22" width="14" height="22" rx="2" fill="#3A3A42" ${OL}/><circle cx="0" cy="-8" r="4.5" fill="#6D6D78"/><circle cx="0" cy="-17" r="2.4" fill="#6D6D78"/>`,
    mic:()=>`<path d="M0 0 V-18 M-5 0 H5" stroke="#2B2A26" stroke-width="1.6"/><rect x="-2.6" y="-26" width="5.2" height="8" rx="2.6" fill="#8A8F99" ${OL}/>`,
    stage:()=>`<rect x="-22" y="-7" width="44" height="7" fill="#8A4FB0" ${OL}/><path d="M-20 -7 V-30 M20 -7 V-30" stroke="#2B2A26" stroke-width="1.6"/><path d="M-20 -30 H20" stroke="#E4573D" stroke-width="4"/><circle cx="-10" cy="-23" r="2" fill="#FFE08A"/><circle cx="10" cy="-23" r="2" fill="#FFE08A"/>`,
    fence:()=>`<path d="M-12 0 V-12 M-4 0 V-13 M4 0 V-12 M12 0 V-13" stroke="#8A5A3A" stroke-width="3" stroke-linecap="round"/><path d="M-13 -9 H13 M-13 -4 H13" stroke="#B8844F" stroke-width="2.4"/>`,
    path:()=>`<path d="M-14 -1 H-5 M-3 -1 H6 M8 -1 H14" stroke="#C69A62" stroke-width="4" stroke-linecap="round"/>`,
    cart:()=>`<rect x="-14" y="-16" width="26" height="9" fill="#B8844F" ${OL}/><circle cx="-7" cy="-5" r="5" fill="#8A5A3A" ${OL}/><circle cx="7" cy="-5" r="5" fill="#8A5A3A" ${OL}/><path d="M12 -12 L20 -8" stroke="#2B2A26" stroke-width="1.8"/>`,
    boat:()=>`<path d="M-18 -8 Q0 4 18 -8 Z" fill="#D9793E" ${OL}/><path d="M-12 -7 H12" stroke="#fff" stroke-width="1" opacity=".5"/>`,
    bike:()=>`<circle cx="-9" cy="-6" r="6" fill="none" ${OL}/><circle cx="9" cy="-6" r="6" fill="none" ${OL}/><path d="M-9 -6 L-2 -16 H6 L9 -6 M-2 -16 L2 -6 L9 -6 M6 -16 L5 -20" stroke="#D9534F" stroke-width="2" fill="none"/>`,
    grave:()=>`<path d="M-7 0 V-14 Q0 -22 7 -14 V0Z" fill="#A9A7B0" ${OL}/><path d="M0 -15 V-7 M-3 -12 H3" stroke="#6D6A73" stroke-width="1.4"/>`,
    rod:()=>`<path d="M-8 0 L10 -30" stroke="#8A5A3A" stroke-width="2"/><path d="M10 -30 Q16 -18 14 -6" stroke="#2B2A26" stroke-width=".8" fill="none"/><circle cx="14" cy="-6" r="1.8" fill="#E4573D"/>`,
    fossil:()=>`<rect x="-9" y="-12" width="18" height="12" fill="#D9D3C4" ${OL}/><rect x="-12" y="-14" width="24" height="3" fill="#B7AF9C" ${OL}/><path d="M-6 -20 Q0 -26 6 -20 M-6 -20 Q-8 -17 -5 -16 M6 -20 Q8 -17 5 -16 M-3 -22 V-17 M0 -23 V-17 M3 -22 V-17" stroke="#F4EEDD" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M-6 -20 Q0 -26 6 -20" stroke="#2B2A26" stroke-width=".8" fill="none"/>`,
    sandbag:()=>`<path d="M0 -34 V-28" stroke="#2B2A26" stroke-width="1.4"/><rect x="-6" y="-28" width="12" height="22" rx="5" fill="#C9553F" ${OL}/><path d="M-6 -20 H6" stroke="#2B2A26" stroke-width="1"/>`,
    vending:()=>`<rect x="-10" y="-30" width="20" height="30" rx="2" fill="#4F8FD6" ${OL}/><rect x="-7" y="-27" width="10" height="16" fill="#DDEFFB"/>${[-24,-19,-14].map(y=>`<rect x="-6" y="${y}" width="8" height="2.5" fill="#E4573D"/>`).join('')}<rect x="5" y="-24" width="3" height="6" fill="#2B2A26"/><rect x="-7" y="-7" width="14" height="4" fill="#2B2A26"/>`,
    steel:()=>`<path d="M-14 0 V-26 M14 0 V-26 M-14 -26 H14 M-14 0 L14 -26 M-14 -26 L14 0" stroke="#7B8794" stroke-width="3" fill="none"/>`,
    cone:()=>`<path d="M-6 0 L0 -16 L6 0Z" fill="#F28A2E" ${OL}/><path d="M-4 -5 H4" stroke="#fff" stroke-width="2"/><rect x="-8" y="-1.5" width="16" height="2" fill="#2B2A26"/>`,
    shovel:()=>`<path d="M-8 -30 L4 -6" stroke="#8A5A3A" stroke-width="2.4"/><path d="M2 -10 L10 -4 L6 4 L-2 -2Z" fill="#9AA3AD" ${OL}/>`,
    furnace:()=>`<path d="M-11 0 V-20 Q0 -30 11 -20 V0Z" fill="#8C7B6E" ${OL}/><path d="M-5 0 V-8 Q0 -13 5 -8 V0Z" fill="#F28A2E"/><rect x="4" y="-32" width="5" height="10" fill="#6D6A73" ${OL}/>`,
    tire:()=>`<circle cx="0" cy="-9" r="9" fill="#3A3A42" ${OL}/><circle cx="0" cy="-9" r="4" fill="#8FA3AE"/>`,
    slide:()=>`<path d="M-14 0 L-10 -24 H-4 L14 -2" fill="none" stroke="#E4573D" stroke-width="3.2" stroke-linecap="round"/><path d="M-10 -24 V0 M-4 -24 V-14" stroke="#4F8FD6" stroke-width="2"/>`,
    balloon:()=>`<path d="M0 0 Q-2 -8 0 -16" stroke="#2B2A26" stroke-width=".8" fill="none"/><ellipse cx="0" cy="-22" rx="6" ry="7.5" fill="#F29DC3" ${OL}/><ellipse cx="-2" cy="-25" rx="1.4" ry="2.2" fill="#fff" opacity=".6"/>`,
    jack:()=>`<rect x="-9" y="-16" width="18" height="16" fill="#F2C14E" ${OL}/><path d="M-9 -16 L-13 -22 M9 -16 L13 -22" stroke="#2B2A26" stroke-width="1.4"/><path d="M0 -16 q-4 -6 0 -9 q4 -3 0 -8" stroke="#E4573D" stroke-width="1.8" fill="none"/><circle cx="0" cy="-34" r="3.5" fill="#E4573D" ${OL}/>`,
    register:()=>`<rect x="-10" y="-12" width="20" height="12" rx="1" fill="#6F8490" ${OL}/><rect x="-7" y="-19" width="10" height="7" fill="#DDEFFB" ${OL}/><path d="M-6 -7 H6 M-6 -4 H6" stroke="#fff" stroke-width="1.2"/>`,
    canvas:()=>`<path d="M-9 0 L0 -30 L9 0 M-4 -8 H4" stroke="#8A5A3A" stroke-width="1.6" fill="none"/><rect x="-9" y="-28" width="18" height="16" fill="#fff" ${OL}/><circle cx="-3" cy="-21" r="3" fill="#F29DC3"/><path d="M-6 -15 L0 -19 L6 -14" stroke="#6CBF4E" stroke-width="2" fill="none"/>`,
    crystal:()=>`<path d="M-8 -8 L-6 -18 L0 -8 Z M0 -8 L3 -24 L8 -8Z" fill="#A9E4F5" ${OL}/><rect x="-10" y="-8" width="20" height="8" rx="2" fill="#6D5A8E" ${OL}/>`,
    windmill:()=>`<path d="M-6 0 L-3 -26 H3 L6 0Z" fill="#F1E6D0" ${OL}/><g transform="translate(0 -26)">${[0,90,180,270].map(a=>`<rect x="-2" y="-16" width="4" height="15" fill="#B8844F" transform="rotate(${a+20})" ${OL}/>`).join('')}<circle r="2.4" fill="#8A5A3A"/></g>`,
    pillar:()=>`<rect x="-5" y="-28" width="10" height="26" fill="#EDE8DA" ${OL}/><rect x="-7" y="-31" width="14" height="4" fill="#DCD5C3" ${OL}/><rect x="-7" y="-3" width="14" height="3" fill="#DCD5C3" ${OL}/>`,
    bubble:()=>`<rect x="-8" y="-11" width="16" height="11" rx="2" fill="#7DB4EE" ${OL}/>${[[-4,-18,3],[3,-22,4],[-1,-28,2.4],[6,-31,2]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#EAF7FF" stroke="#7DB4EE" stroke-width=".9"/>`).join('')}`,
    tub:()=>`<path d="M-16 -12 H16 Q15 0 0 0 Q-15 0 -16 -12Z" fill="#fff" ${OL}/><path d="M-13 -11 H13" stroke="#7FD1E8" stroke-width="2.4"/><circle cx="-6" cy="-15" r="2.2" fill="#EAF7FF" stroke="#7FD1E8" stroke-width=".8"/><circle cx="4" cy="-17" r="2.8" fill="#EAF7FF" stroke="#7FD1E8" stroke-width=".8"/>`,
    gift:()=>`<rect x="-8" y="-13" width="16" height="13" fill="#9ED0A9" ${OL}/><path d="M0 -13 V0 M-8 -8 H8" stroke="#E4573D" stroke-width="2"/><path d="M0 -13 q-5 -6 -6 -2 q1 2 6 2 q5 -6 6 -2 q-1 2 -6 2" fill="#E4573D"/>`,
    shell:()=>`<path d="M-8 0 Q-9 -10 0 -12 Q9 -10 8 0Z" fill="#F7C9C0" ${OL}/><path d="M0 0 V-11 M-4 0 L-3 -10 M4 0 L3 -10" stroke="#2B2A26" stroke-width=".8"/>`,
  };

  /* ---- material -> drawable ---- */
  function classify(name){
    const n=name.replace(/\s*\(.*?\)\s*/g,' ').trim();
    const pick=(k,a,b)=>({k,a,b});
    if(/폭포/.test(n))return pick('fall',null,'back');
    if(/높은 곳/.test(n))return pick('cliff',null,'back');
    if(/야자/.test(n))return pick('palm',null,'back');
    if(/세모난 나무|뾰족한 나무/.test(n))return pick('pine',null,'back');
    if(/나무열매나무/.test(n))return pick('tree','#4E9E4B','back',true);
    if(/큰 나무/.test(n))return pick('tree','#4E9E4B','back');
    if(/풍차/.test(n))return pick('windmill',null,'back');
    if(/용암/.test(n))return pick('pool','#F2732E','ground');
    if(/온천수/.test(n))return pick('hot',null,'ground');
    if(/흙탕물/.test(n))return pick('pool','#9C7A55','ground');
    if(/바닷물/.test(n))return pick('pool','#3FA7C9','ground');
    if(/^물$/.test(n))return pick('pool','#6CC3EE','ground');
    if(/해초/.test(n))return pick('seaweed',null,'cover');
    if(/개구리밥/.test(n))return pick('lily',null,'cover');
    if(/해저 풀숲/.test(n))return pick('grass',GRASS.해저,'cover');
    if(/풀숲|풀$/.test(n)){const c=Object.keys(GRASS).find(k=>n.includes(k));return pick('grass',GRASS[c]||GRASS.초록,'cover')}
    if(/수풀|정원수/.test(n))return pick('bush',null,'obj');
    if(/채소밭/.test(n))return pick('crops',null,'cover');
    if(/꽃병|꽃가방|꽃 쿠션|테이블 세팅/.test(n)){}
    else if(/꽃/.test(n)){const c=Object.keys(FLOWER).find(k=>n.includes(k));return pick('flower',FLOWER[c]||'#F48FB1','cover')}
    if(/산호/.test(n)){const c=/컬러풀/.test(n)?'#FF8A7A':/길쭉/.test(n)?'#F6B24B':'#F28FB0';return pick('coral',c,'cover')}
    if(/이글이글 바위/.test(n))return pick('hotrock',null,'obj');
    if(/굴뚝 바위/.test(n))return pick('chimney',null,'obj');
    if(/석순/.test(n))return pick('stalag',null,'obj');
    if(/이끼 바위/.test(n))return pick('rock','#7E9A5A','obj');
    if(/보송보송바위/.test(n))return pick('rock','#E3D3B4','obj');
    if(/바위|큰 돌/.test(n))return pick('rock','#A5A3AB','obj');
    if(/이끼/.test(n))return pick('moss',null,'cover');
    if(/그루터기/.test(n))return pick('stump',null,'obj');
    if(/모래 더미/.test(n))return pick('rock','#E8CF96','obj');
    if(/캠프파이어|화톳불|횃불|모닥불|벽난로/.test(n))return pick('fire',null,'obj');
    if(/양초/.test(n))return pick('candle',null,'obj');
    if(/랜턴|초롱/.test(n))return pick('lantern',null,'obj');
    if(/가로등|스포트라이트|조명|램프|라이트/.test(n))return pick('lamp',null,'obj');
    if(/소파/.test(n))return pick('sofa',/피카츄|팝/.test(n)?'#F2C14E':/럭셔리|리조트/.test(n)?'#C7A3D9':/깜찍/.test(n)?'#F29DC3':/마린/.test(n)?'#7DB4EE':'#7FA7D9','obj');
    if(/침대|해먹/.test(n))return pick('bed',/깜찍/.test(n)?'#F29DC3':/몬스터볼/.test(n)?'#E4573D':'#8FC1E3','obj');
    if(/좌석|의자|걸상|벤치|쿠션|체어|방석/.test(n))return pick('chair',/시크/.test(n)?'#7A4A6B':/철|파이프/.test(n)?'#8FA3AE':null,'obj');
    if(/계산대/.test(n))return pick('register',null,'obj');
    if(/책꽂이/.test(n))return pick('books',null,'obj');
    if(/옷장|수납장|장식장|라커|사물함|선반/.test(n))return pick('cabinet',/마린/.test(n)?'#7DB4EE':/사무실/.test(n)?'#9AA7B2':null,'obj');
    if(/화장대|거울|세면대/.test(n))return pick('mirror',null,'obj');
    if(/테이블|데스크|카운터|책상|식탁/.test(n))return pick('table',/시크/.test(n)?'#6B4A5E':/철|인더스트리얼/.test(n)?'#8FA3AE':null,'obj');
    if(/보물 상자|보물$|보물 더미/.test(n))return pick('chest',null,'obj');
    if(/골판지/.test(n))return pick('carton',null,'obj');
    if(/나무통|드럼통/.test(n))return pick('barrel',null,'obj');
    if(/상자/.test(n)&&!/깜짝/.test(n))return pick('crate',null,'obj');
    if(/쓰레기봉투/.test(n))return pick('bag',null,'obj');
    if(/쓰레기통/.test(n))return pick('trash',null,'obj');
    if(/간판|표지판|안내/.test(n))return pick('sign',null,'obj');
    if(/머그|컵|티 세트/.test(n))return pick('cup',null,'obj');
    if(/바구니/.test(n))return pick('basket',null,'obj');
    if(/음식|피자|감자튀김|케이크|쿠키|샌드위치|빙수|플로트|공물|도시락|접시|믹서|티 세트/.test(n))return pick('food',null,'obj');
    if(/인형/.test(n))return pick('plush',null,'obj');
    if(/아케이드|펀치 머신|게임 머신/.test(n))return pick('arcade',null,'obj');
    if(/텔레비전|TV|컴퓨터|노트북|태블릿|PC|모니터/.test(n))return pick('screen',null,'obj');
    if(/스테이지|무대/.test(n))return pick('stage',null,'back');
    if(/스피커|CD|기타|북|하프|오르골/.test(n))return pick('speaker',null,'obj');
    if(/마이크/.test(n))return pick('mic',null,'obj');
    if(/^네트$/.test(n))return pick('fence',null,'obj');
    if(/울타리|파티션/.test(n))return pick('fence',null,'obj');
    if(/나무 길|디딤돌|잔교|떠 있는 통나무|철 발판/.test(n))return pick('path',null,'cover');
    if(/카누|보트/.test(n))return pick('boat',null,'obj');
    if(/자전거/.test(n))return pick('bike',null,'obj');
    if(/달구지|손수레/.test(n))return pick('cart',null,'obj');
    if(/묘비/.test(n))return pick('grave',null,'obj');
    if(/낚싯대/.test(n))return pick('rod',null,'obj');
    if(/화석|전시대|받침대|기둥/.test(n))return /화석/.test(n)||/전시대/.test(n)?pick('fossil',null,'obj'):pick('pillar',null,'obj');
    if(/샌드백|모래주머니/.test(n))return pick('sandbag',null,'obj');
    if(/자판기/.test(n))return pick('vending',null,'obj');
    if(/철빔|철 파이프|선로|차단기|맨홀|전봇대|엉킨 코드|조작 기계/.test(n))return pick('steel',null,'obj');
    if(/삼각 콘/.test(n))return pick('cone',null,'obj');
    if(/땅파기/.test(n))return pick('shovel',null,'obj');
    if(/용광로|물레방아/.test(n))return pick('furnace',null,'obj');
    if(/타이어/.test(n))return pick('tire',null,'obj');
    if(/미끄럼틀|장난감/.test(n))return pick('slide',null,'obj');
    if(/풍선/.test(n))return pick('balloon',null,'obj');
    if(/깜짝 상자/.test(n))return pick('jack',null,'obj');
    if(/캔버스/.test(n))return pick('canvas',null,'obj');
    if(/수정 구슬|크리스탈/.test(n))return pick('crystal',null,'obj');
    if(/비눗방울/.test(n))return pick('bubble',null,'obj');
    if(/욕조|샤워|수전|물통/.test(n))return pick('tub',null,'obj');
    if(/조개|진주|액세서리/.test(n))return pick('shell',null,'obj');
    return pick('gift',null,'obj');
  }
  const draw=(it,x,y,s)=>{const f=it.k==='hot'?(P.pool('#9ED9E8')+P.steam()):it.k==='tree'?P.tree(it.a,/나무열매나무/.test(it.name)):(P[it.k]||P.gift)(it.a);return G(x,y,s,f)};

  function scene(h){
    const r=rng(hash(h.name));
    const items=h.mats.map(m=>{const mm=m.match(/^(.*?) x(\d+)$/);const name=mm?mm[1]:m;const q=mm?+mm[2]:1;const c=classify(name);return {...c,name,q}});
    const sea=h.region==='해저';
    const nature=items.some(i=>i.b!=='obj'||/rock|moss|stump|bush|hotrock|chimney|stalag/.test(i.k));
    const indoor=!sea&&!nature;
    const grassItem=items.find(i=>i.k==='grass');
    const lava=items.some(i=>i.a==='#F2732E');
    let bg;
    if(sea){bg=`<defs><linearGradient id="g${hash(h.name)}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5BB7E0"/><stop offset="1" stop-color="#1F6FA3"/></linearGradient></defs><rect width="200" height="120" fill="url(#g${hash(h.name)})"/><path d="M0 18 q25 -6 50 0 t50 0 t50 0 t50 0" stroke="#BDE8FA" stroke-width="2" fill="none" opacity=".5"/>${Array.from({length:6},()=>`<circle cx="${(r()*190+5).toFixed(0)}" cy="${(r()*60+20).toFixed(0)}" r="${(r()*2.5+1).toFixed(1)}" fill="none" stroke="#E6F7FF" stroke-width="1" opacity=".7"/>`).join('')}<path d="M0 100 Q50 92 100 98 T200 96 V120 H0Z" fill="#E8D39B"/><path d="M0 100 Q50 92 100 98 T200 96" stroke="#C9B27A" stroke-width="1.2" fill="none"/>`}
    else if(indoor){const wall=['#F3E3CF','#E4EEF3','#F2E0E6','#E6EEDC','#EFE6D2'][hash(h.name)%5];bg=`<rect width="200" height="120" fill="${wall}"/><rect x="138" y="16" width="38" height="30" rx="2" fill="#CFE9F5" stroke="#2B2A26" stroke-width="1.4"/><path d="M157 16 V46 M138 31 H176" stroke="#2B2A26" stroke-width="1.2"/><rect y="94" width="200" height="26" fill="#C9975E"/>${[20,60,100,140,180].map(x=>`<path d="M${x} 94 V120" stroke="#B0804B" stroke-width="1"/>`).join('')}<path d="M0 94 H200" stroke="#2B2A26" stroke-width="1.4"/>`}
    else{const gc=grassItem?grassItem.a:'#8FC66F';const sky=lava?'#F6C7A0':'#CDEBF7';bg=`<rect width="200" height="120" fill="${sky}"/><circle cx="${(r()*40+150).toFixed(0)}" cy="22" r="10" fill="${lava?'#F28A2E':'#FFE08A'}"/><ellipse cx="${(r()*50+30).toFixed(0)}" cy="26" rx="16" ry="5" fill="#fff" opacity=".85"/><path d="M0 92 Q60 84 110 90 T200 88 V120 H0Z" fill="${lava?'#6B4A3A':gc}" opacity="${lava?1:.55}"/><path d="M0 100 Q70 94 130 99 T200 97 V120 H0Z" fill="${lava?'#5A3C2E':gc}" opacity="${lava?1:.85}"/>`}
    let out='';
    // back row
    const back=items.filter(i=>i.b==='back');
    back.forEach((it,i)=>{const n=Math.min(it.q,it.k==='cliff'?1:3);for(let j=0;j<n;j++){const x=back.length===1&&n===1?(it.k==='stage'?100:40+r()*20):20+((i*n+j)+.5)*(160/(back.length*n))+r()*8;out+=draw(it,x,it.k==='cliff'?98:93,it.k==='stage'?1.35:1.5)}});
    // objects
    const objs=items.filter(i=>i.b==='obj');const list=[];objs.forEach(it=>{for(let j=0;j<Math.min(it.q,it.k==='fire'&&it.q>4?5:3);j++)list.push(it)});
    const onCliff=back.some(b=>b.k==='cliff');
    const n=list.length;
    list.forEach((it,i)=>{const x=n===1?100+(r()-.5)*20:24+(i+.5)*(152/n)+(r()-.5)*6;out+=draw(it,x,onCliff&&i===0&&n>1&&x<70?68:(indoor?106:104),n>5?1.15:n>3?1.35:1.6)});
    // ground cover (front)
    const cov=items.filter(i=>i.b==='cover'||i.b==='ground');
    cov.forEach((it,ci)=>{const k=it.b==='ground'?Math.min(it.q,2):Math.min(it.q,6);for(let j=0;j<k;j++){const x=it.b==='ground'?(k===1?(ci%2?140:60):50+j*90)+(r()-.5)*14:12+r()*176;const y=it.b==='ground'?114:108+r()*9;out+=draw(it,x,y,it.b==='ground'?1.5:1.2+r()*.35)}});
    return `<svg viewBox="0 0 200 120" role="img" aria-label="${h.name} 그림" preserveAspectRatio="xMidYMid slice">${bg}${out}</svg>`;
  }
  const cache={};
  return h=>cache[h.name]||(cache[h.name]=scene(h));
})();
