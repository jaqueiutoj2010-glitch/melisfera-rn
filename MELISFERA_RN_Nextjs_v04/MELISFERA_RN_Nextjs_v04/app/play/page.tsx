'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {DetectiveGame,GuardianGame} from './new-games';
import {SeasonsGame} from './seasons-game';
import {BeeFlightGame} from './flight-game';
import {SeasonsSurvivalGame} from './survival-game';
import {PollinationPathsGame} from './paths-game';
import {JandaAdventure} from './janda-adventure';

const questions=[
{q:'Qual é uma das contribuições ecológicas das abelhas?',a:['Produzir sementes diretamente','Transportar pólen entre flores','Transformar folhas em solo'],ok:1,why:'A visitação pode transportar pólen. Para comprovar polinização efetiva, precisamos de evidências adicionais.'},
{q:'A Caatinga é...',a:['Uma floresta tropical sazonalmente seca','Um deserto sem biodiversidade','Uma floresta permanentemente alagada'],ok:0,why:'A Caatinga apresenta forte sazonalidade e uma biodiversidade adaptada às condições ambientais.'},
{q:'Qual abelha sem ferrão tem importância cultural no RN?',a:['Jandaíra (Melipona subnitida)','Abelha gigante do Himalaia','Abelha do Ártico'],ok:0,why:'A jandaíra é uma espécie associada à tradição da meliponicultura no Nordeste.'},
{q:'Uma abelha pousar em uma flor prova que ocorreu polinização?',a:['Sim, sempre','Não, é preciso investigar a transferência efetiva de pólen','Somente quando a flor é amarela'],ok:1,why:'Visita floral e polinização efetiva são fenômenos relacionados, mas distintos.'},
{q:'O que são as macambiras rupícolas?',a:['Insetos sociais','Bromélias associadas a ambientes rochosos','Tipos de colmeias artificiais'],ok:1,why:'Macambiras como Encholirium spectabile oferecem estrutura e recursos em afloramentos rochosos.'},
{q:'Qual atitude ajuda a conservar abelhas nativas?',a:['Eliminar toda vegetação espontânea','Proteger habitats e locais de nidificação','Aplicar inseticidas sem orientação'],ok:1,why:'Conservar a vegetação nativa e reduzir riscos ambientais ajuda a manter recursos para as abelhas.'}
];
const flowers=[{x:12,y:23},{x:42,y:12},{x:75,y:26},{x:24,y:68},{x:57,y:59},{x:85,y:78}];
const threats=[{x:35,y:39},{x:69,y:73}];
const missionScenes=[
{name:'Flores da Caatinga',subtitle:'Visite flores e descubra como as abelhas utilizam recursos florais.',fact:'A visita floral pode transportar pólen, mas não garante polinização efetiva.',tone:'spring'},
{name:'Afloramentos e macambiras',subtitle:'Explore a paisagem rochosa e aprenda sobre as bromélias rupícolas.',fact:'Encholirium spectabile é uma bromélia associada a afloramentos rochosos. Ela não é um cacto.',tone:'rock'},
{name:'Proteja os habitats',subtitle:'Encontre flores em uma paisagem com ameaças ambientais.',fact:'A exposição a determinadas substâncias tóxicas pode afetar abelhas; proteger habitats e reduzir riscos é importante.',tone:'dry'}
];
const memoryCards=[{id:'jandaira',emoji:'🐝',name:'Jandaíra',fact:'Melipona subnitida é uma abelha sem ferrão de importância cultural no Nordeste.'},{id:'flor',emoji:'🌼',name:'Flores',fact:'Flores oferecem recursos como néctar e pólen a diversos visitantes.'},{id:'macambira',emoji:'🌿',name:'Macambira',fact:'Encholirium spectabile é uma bromélia rupícola da Caatinga.'},{id:'ninho',emoji:'🏡',name:'Ninhos',fact:'Abelhas podem nidificar em cavidades, no solo e em outros substratos.'},{id:'caatinga',emoji:'🌳',name:'Caatinga',fact:'A Caatinga é uma floresta tropical sazonalmente seca.'},{id:'conservacao',emoji:'💚',name:'Conservação',fact:'A conservação da vegetação nativa ajuda a proteger recursos e habitats.'}];
const memoryDeck=[...memoryCards,...memoryCards];
function NatureIcon({kind}:{kind:string}){
 const common={viewBox:'0 0 100 100',width:76,height:76,fill:'none',role:'img' as const,'aria-label':kind};
 if(kind==='macambira')return <svg {...common}><path d="M50 88V38" stroke="#527c48" strokeWidth="5"/>{[-48,-32,-17,0,17,32,48].map((a,i)=><path key={i} d="M50 81 Q40 52 50 17 Q60 52 50 81" fill={i%2?'#83ae64':'#538b54'} stroke="#326b4c" strokeWidth="1.8" transform={`rotate(${a} 50 83)`}/>)}<path d="M50 47V8" stroke="#8b6534" strokeWidth="3"/>{[13,23,33].map((y,i)=><g key={i}><circle cx={50+(i%2?8:-8)} cy={y} r="5" fill="#f2d55e"/><circle cx={50+(i%2?8:-8)} cy={y} r="2" fill="#bb8c25"/></g>)}</svg>;
 if(kind==='jandaira')return <svg {...common}><ellipse cx="43" cy="43" rx="19" ry="13" fill="#d8e9ed" stroke="#8db5bd" strokeWidth="2" transform="rotate(-32 43 43)"/><ellipse cx="62" cy="40" rx="18" ry="12" fill="#e4eff0" stroke="#8db5bd" strokeWidth="2" transform="rotate(30 62 40)"/><ellipse cx="50" cy="60" rx="25" ry="17" fill="#a86b36" stroke="#68452c" strokeWidth="3"/><path d="M39 46L35 73M54 44L53 77M66 50L68 72" stroke="#3c332c" strokeWidth="5"/><circle cx="74" cy="57" r="11" fill="#3d352f"/><circle cx="78" cy="53" r="2" fill="white"/><path d="M77 46L82 38M70 46L69 36" stroke="#3d352f" strokeWidth="2"/></svg>;
 if(kind==='flor')return <svg {...common}>{[0,60,120,180,240,300].map(a=><ellipse key={a} cx="50" cy="30" rx="13" ry="23" fill="#e9a4c0" stroke="#bb658e" strokeWidth="2" transform={`rotate(${a} 50 51)`}/>)}<circle cx="50" cy="51" r="13" fill="#e9bf46" stroke="#9e7829" strokeWidth="2"/><circle cx="46" cy="47" r="2" fill="#8b6828"/><circle cx="55" cy="54" r="2" fill="#8b6828"/></svg>;
 if(kind==='ninho')return <svg {...common}><path d="M15 36L50 12L85 36V85H15Z" fill="#c78b51" stroke="#815332" strokeWidth="4"/><path d="M15 36L50 12L85 36" stroke="#6d5137" strokeWidth="7" strokeLinejoin="round"/><circle cx="50" cy="55" r="19" fill="#5b3d2a" stroke="#e0ad6b" strokeWidth="4"/><circle cx="43" cy="54" r="5" fill="#d9a75b"/><circle cx="57" cy="54" r="5" fill="#d9a75b"/><circle cx="50" cy="65" r="5" fill="#d9a75b"/></svg>;
 if(kind==='caatinga')return <svg {...common}><path d="M7 86H93" stroke="#a57d4a" strokeWidth="5"/><path d="M50 85V29M50 55L29 38M50 46L70 24" stroke="#805d3d" strokeWidth="8" strokeLinecap="round"/>{[[24,30],[41,21],[59,16],[74,29],[28,45],[66,44]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="13" fill={i%2?'#7ba66a':'#9abb79'} stroke="#568552" strokeWidth="2"/>)}<path d="M14 85L20 72L26 85M76 85L82 74L88 85" stroke="#739455" strokeWidth="4"/></svg>;
 return <svg {...common}><path d="M50 87C17 67 9 42 24 28C37 17 47 26 50 34C53 26 66 17 78 28C94 44 80 69 50 87Z" fill="#8acb96" stroke="#347a51" strokeWidth="4"/><path d="M50 71V41M50 58L38 48M50 53L63 43" stroke="#266745" strokeWidth="4" strokeLinecap="round"/><path d="M50 42C38 38 36 30 40 24C50 25 54 33 50 42Z" fill="#3c8c57"/></svg>;
}
function MissionBee(){return <svg viewBox="0 0 100 100" width="64" height="64" role="img" aria-label="Abelha nativa ilustrada em voo"><ellipse cx="38" cy="35" rx="22" ry="13" fill="#e3f4f6" stroke="#6d9ba5" strokeWidth="2" transform="rotate(-34 38 35)"/><ellipse cx="62" cy="34" rx="22" ry="13" fill="#e3f4f6" stroke="#6d9ba5" strokeWidth="2" transform="rotate(34 62 34)"/><ellipse cx="49" cy="61" rx="29" ry="21" fill="#b87839" stroke="#573c2b" strokeWidth="3"/><path d="M35 45L31 76M50 41L49 82M65 47L68 75" stroke="#4e382d" strokeWidth="7"/><circle cx="76" cy="59" r="13" fill="#44372e"/><circle cx="80" cy="54" r="2.7" fill="#fff"/><path d="M76 48L80 38M69 48L66 37" stroke="#44372e" strokeWidth="2.5" strokeLinecap="round"/><path d="M29 73L20 81M46 82L43 91M65 77L74 86" stroke="#44372e" strokeWidth="2.5" strokeLinecap="round"/></svg>}
function MissionFlower({variant}:{variant:number}){return <svg viewBox="0 0 90 110" width="56" height="68" role="img" aria-label="Flor ilustrada"><path d="M45 58V103" stroke="#43854f" strokeWidth="5" strokeLinecap="round"/><path d="M45 88Q17 68 16 85Q30 102 45 93M45 78Q70 55 76 74Q65 91 45 86" fill="#77b56b" stroke="#43854f" strokeWidth="2"/>{[0,60,120,180,240,300].map(a=><ellipse key={a} cx="45" cy="32" rx="12" ry="22" fill={variant%3===0?'#e7a6c5':variant%3===1?'#f0d66e':'#c4a4de'} stroke={variant%3===0?'#b56b92':variant%3===1?'#b99a3c':'#9074b4'} strokeWidth="1.8" transform={`rotate(${a} 45 49)`}/>)}<circle cx="45" cy="49" r="12" fill="#e8a943" stroke="#a9762f" strokeWidth="2"/><circle cx="42" cy="46" r="2" fill="#9a692e"/><circle cx="49" cy="52" r="2" fill="#9a692e"/></svg>}
function ToxicObstacle(){return <svg viewBox="0 0 80 95" width="48" height="57" role="img" aria-label="Frasco ilustrado de produto tóxico"><rect x="25" y="8" width="30" height="12" rx="3" fill="#4e6052"/><rect x="17" y="19" width="46" height="65" rx="8" fill="#f4eee1" stroke="#6d7968" strokeWidth="4"/><rect x="22" y="38" width="36" height="36" rx="4" fill="#f4c85d"/><path d="M40 42L55 69H25Z" fill="#fff4cc" stroke="#91691f" strokeWidth="2"/><text x="40" y="65" fontSize="21" textAnchor="middle" fill="#2e302d">☠</text></svg>}
const distance=(a:{x:number,y:number},b:{x:number,y:number})=>Math.hypot(a.x-b.x,a.y-b.y);
export default function Play(){
const [tab,setTab]=useState<'mission'|'quiz'|'memory'|'detective'|'guardian'|'seasons'|'flight'|'survival'|'paths'|'janda'>('janda');
const [level,setLevel]=useState(0);
const [highestScene,setHighestScene]=useState(0);
const [completedScenes,setCompletedScenes]=useState<number[]>([]);
const [bee,setBee]=useState({x:50,y:85});
const [collected,setCollected]=useState<number[]>([]);
const [hits,setHits]=useState(0);
const [started,setStarted]=useState(false);
const [earned,setEarned]=useState<string[]>([]);
const [discovery,setDiscovery]=useState('');
const [difficulty,setDifficulty]=useState<'leve'|'desafio'>('leve');
const [q,setQ]=useState(0);
const [chosen,setChosen]=useState<number|null>(null);
const [points,setPoints]=useState(0);
const [finished,setFinished]=useState(false);
const [memoryOpen,setMemoryOpen]=useState<number[]>([]);
const [memoryMatched,setMemoryMatched]=useState<string[]>([]);
const [memoryMoves,setMemoryMoves]=useState(0);
const [memoryFact,setMemoryFact]=useState('');
const [memoryOrder,setMemoryOrder]=useState<number[]>([5,0,9,2,11,7,3,8,1,10,6,4]);
const [memoryLocked,setMemoryLocked]=useState(false);
useEffect(()=>{function onKey(e:KeyboardEvent){if(tab!=='mission'||!started||collected.length===flowers.length||hits>=maxHits)return;const directions:Record<string,[number,number]>={ArrowUp:[0,-10],ArrowDown:[0,10],ArrowLeft:[-10,0],ArrowRight:[10,0]};const direction=directions[e.key];if(direction){e.preventDefault();move(direction[0],direction[1])}}window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey)});
function flipMemory(i:number){const card=memoryDeck[memoryOrder[i]];if(memoryLocked||memoryOpen.includes(i)||memoryMatched.includes(card.id))return;if(memoryOpen.length===0){setMemoryOpen([i]);return}const first=memoryDeck[memoryOrder[memoryOpen[0]]];setMemoryMoves(v=>v+1);if(first.id===card.id){setMemoryMatched(v=>[...v,card.id]);setMemoryFact(card.fact);setMemoryOpen([])}else{setMemoryOpen([memoryOpen[0],i]);setMemoryLocked(true);setTimeout(()=>{setMemoryOpen([]);setMemoryLocked(false)},850)}}
function resetMemory(){setMemoryOpen([]);setMemoryMatched([]);setMemoryMoves(0);setMemoryFact('');setMemoryLocked(false);setMemoryOrder(v=>[...v.slice(3),...v.slice(0,3)])}
const total=flowers.length;
const completed=collected.length===total;
const scene=missionScenes[level%missionScenes.length];
const currentScene=level%missionScenes.length;
const adventureComplete=completedScenes.length===missionScenes.length;
const maxHits=difficulty==='leve'?4:3;
const flowerTarget=difficulty==='leve'?17:13;
const hazardTarget=difficulty==='leve'?8:11;
const achievements=[
{icon:'🌼',title:'Primeiras flores',done:earned.includes('flores')||collected.length>=3,desc:'Visite três flores na missão.'},
{icon:'🏵️',title:'Missão completa',done:earned.includes('missao')||completed,desc:'Visite as seis flores.'},
{icon:'🧭',title:'Explorador da Caatinga',done:earned.includes('explorador')||level>=1,desc:'Avance para outra rodada.'},
{icon:'🧠',title:'Conhecimento em flor',done:earned.includes('quiz')||(finished&&points>=40),desc:'Acerte quatro perguntas ou mais.'},
{icon:'🃏',title:'Guardião da memória',done:earned.includes('memoria')||memoryMatched.length===6,desc:'Encontre todos os pares.'}
];
useEffect(()=>{const unlocked=[...(collected.length>=3?['flores']:[]),...(completed?['missao']:[]),...(level>=1?['explorador']:[]),...(finished&&points>=40?['quiz']:[]),...(memoryMatched.length===6?['memoria']:[])];if(unlocked.some(x=>!earned.includes(x)))setEarned(v=>Array.from(new Set([...v,...unlocked])))},[collected.length,completed,level,finished,points,memoryMatched.length,earned]);
function resetMission(next=0){setLevel(next);setBee({x:50,y:85});setCollected([]);setHits(0);setStarted(false);setDiscovery('')}
useEffect(()=>{if(completed){setCompletedScenes(prev=>prev.includes(currentScene)?prev:[...prev,currentScene]);setHighestScene(prev=>Math.max(prev,Math.min(2,currentScene+1)))}},[completed,currentScene]);
function move(dx:number,dy:number){
 if(!started||completed||hits>=maxHits)return;
 const next={x:Math.max(5,Math.min(95,bee.x+dx)),y:Math.max(7,Math.min(93,bee.y+dy))};
 setBee(next);
 const flower=flowers.findIndex((f,i)=>!collected.includes(i)&&distance({x:(f.x+level*7)%82+8,y:f.y},next)<flowerTarget);
 if(flower>=0){setCollected(prev=>[...prev,flower]);setDiscovery(collected.length===2?'Muito bem! Visitar flores permite às abelhas obter recursos como néctar e pólen.':collected.length===4?scene.fact:'Flor encontrada! Continue explorando a paisagem.')}
 if(threats.some(t=>distance({x:(t.x+level*4)%82+8,y:t.y},next)<hazardTarget)){setHits(h=>Math.min(maxHits,h+1));setBee({x:50,y:85});setDiscovery('Atenção: o símbolo ☠️ representa substâncias tóxicas. Na vida real, os riscos dependem do produto e da exposição.')}
}
function answer(i:number){if(chosen!==null||finished)return;setChosen(i);if(i===questions[q].ok)setPoints(p=>p+10)}
function nextQuestion(){if(q===questions.length-1){setFinished(true)}else{setQ(v=>v+1);setChosen(null)}}
function resetQuiz(){setQ(0);setChosen(null);setPoints(0);setFinished(false)}
return <main className="shell section playPage">
<style>{`
.playPage{--green:#24563a;color:#173a2a;font-size:17px;line-height:1.6}
.playHero{background:linear-gradient(120deg,#e6f3d8,#fdf4cf);border:1px solid #d3e3c4;border-radius:28px;padding:clamp(24px,5vw,54px);margin-bottom:24px;position:relative;overflow:hidden}
.playHero h1{font:700 clamp(38px,5vw,65px) Georgia,serif;line-height:1.05;margin:10px 0;color:#17462e}
.playHero p{max-width:700px;font-size:19px}
.playEyebrow{font-size:13px;font-weight:800;letter-spacing:.12em;color:#426d48;text-transform:uppercase}
.playTabs{display:flex;flex-wrap:wrap;gap:12px;margin:24px 0}
.playTabs button,.playBtn{border:1px solid #9bbd9a;border-radius:15px;padding:12px 20px;font:700 16px inherit;cursor:pointer;background:white;color:#174b31}
.playTabs button.active,.playBtn.primary{background:#225d3d;color:white;border-color:#225d3d}
.adventureMap{margin:0 0 24px;padding:20px;border:1px solid #c6ddbb;border-radius:22px;background:linear-gradient(130deg,#f4f9e9,#e5f0df)}
.adventureMap h2{font:600 clamp(23px,2.5vw,30px) Georgia,serif;margin:0 0 7px}
.adventureMap p{margin:0 0 16px;font-size:15px}
.adventureSteps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.adventureStep{border:2px solid #c4d7bc;background:#fff;border-radius:17px;padding:14px;display:flex;flex-direction:column;gap:6px;text-align:left;color:#234a34;cursor:pointer;min-height:132px}
.adventureStep strong{font-size:16px;line-height:1.25}.adventureStep small{font-size:13px;line-height:1.4}
.adventureStep .adventureIcon{font-size:29px}
.adventureStep.active{border-color:#327d4c;background:#e5f5df;box-shadow:0 0 0 2px #327d4c18}
.adventureStep:disabled{opacity:.55;cursor:not-allowed}
.adventureStep:focus-visible{outline:3px solid #2b7a4a;outline-offset:2px}
.adventureVictory{margin-top:14px;background:#d7efce;border-radius:13px;padding:12px 16px;font-weight:700}
@media(max-width:650px){.adventureSteps{grid-template-columns:1fr}.adventureStep{min-height:auto}}
.playGrid{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(260px,.7fr);gap:22px}
.playPanel{background:white;border:1px solid #d7e5d5;border-radius:22px;padding:clamp(18px,3vw,30px);box-shadow:0 6px 20px #1b42210c}
.playPanel h2{font:600 clamp(25px,2.7vw,34px) Georgia,serif;margin:0 0 14px}
.playField{position:relative;aspect-ratio:16/10;min-height:260px;background:linear-gradient(#d5f0e2,#eff6c6 65%,#b7d99e);border:3px solid #b2d4a9;border-radius:22px;overflow:hidden;touch-action:none;user-select:none}
.playField.rock{background:linear-gradient(#dbead8 0%,#ebedc5 56%,#d6c5a6 100%)}
.playField.dry{background:linear-gradient(#f6e8c5 0%,#f2e1b7 58%,#c8d7a0 100%)}
.sceneIntro{display:flex;flex-direction:column;gap:4px;background:#eaf4e4;border-left:5px solid #4c9663;padding:13px 17px;border-radius:12px;margin-bottom:12px}
.sceneIntro strong{font-size:18px}.sceneIntro span{font-size:15px}
.playDiscovery{background:#fff5d8;border:1px solid #e9d69b;border-radius:12px;padding:12px 15px;margin-top:12px;font-size:15px}
.playDifficulty{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin:15px 0}
.playDifficulty span{font-size:15px;font-weight:700}
.playDifficulty button{background:#f6faf3;border:1px solid #b8d4b2;border-radius:12px;padding:9px 12px;cursor:pointer}
.playDifficulty button.selected{background:#dcefd6;border-color:#47895b;font-weight:700}
.playField:after{content:'';position:absolute;bottom:-6%;left:-8%;width:116%;height:31%;background:radial-gradient(ellipse at 15% 100%,#7ca96a 0 33%,transparent 34%),radial-gradient(ellipse at 65% 110%,#92b979 0 36%,transparent 37%);opacity:.55;pointer-events:none}
.playField:before{content:'☁️　　　☁️';position:absolute;top:4%;left:10%;font-size:27px;opacity:.6}
.playField button{position:absolute;transform:translate(-50%,-50%);border:0;background:none;font-size:clamp(28px,4vw,44px);padding:4px;line-height:1;cursor:pointer}
.playField .bee svg{width:clamp(45px,5.5vw,70px);height:auto;display:block;animation:beeFloat 1.6s ease-in-out infinite}
.playField .flower svg{width:clamp(38px,4.7vw,62px);height:auto;display:block;animation:flowerSway 2.7s ease-in-out infinite;transform-origin:50% 95%}
.playField .threat svg{width:clamp(38px,4vw,54px);height:auto;display:block}
@keyframes beeFloat{0%,100%{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-5px) rotate(3deg)}}
@keyframes flowerSway{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}}
@media(prefers-reduced-motion:reduce){.playField .bee svg,.playField .flower svg{animation:none}.playField .bee{transition:none}}
.playField .bee{font-size:clamp(32px,5vw,49px);z-index:2;transition:left .13s,top .13s;filter:drop-shadow(0 4px 2px #325e3b44)}
.playField .threat{font-size:clamp(23px,3vw,34px)}
.playField .flower{filter:drop-shadow(0 3px 2px #52784a44)}
.playControls{display:grid;grid-template-columns:repeat(3,60px);gap:7px;justify-content:center;margin:16px 0}
.playControls button{height:52px;border:1px solid #9fbea0;border-radius:13px;background:#edf6e9;font-size:24px;cursor:pointer}
.playControls button:disabled{opacity:.4;cursor:not-allowed}
.playStats{display:flex;flex-wrap:wrap;gap:10px;margin:14px 0}
.playStat{background:#eaf3e5;border-radius:12px;padding:9px 13px;font-weight:700}
.playChoices{display:grid;gap:12px;margin-top:22px}
.playChoices button{text-align:left;padding:16px;border:1px solid #bbd4b7;background:#f9fcf7;border-radius:14px;font-size:17px;cursor:pointer;color:#173a2a}
.playChoices button:disabled{cursor:default}
.playChoices button.correct{background:#ddf1dd;border-color:#398b56}
.playChoices button.wrong{background:#fff0e7;border-color:#d08c65}
.playNote{background:#f2f7ee;padding:16px;border-radius:14px;margin-top:18px}
.memoryBoard{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-top:20px}
.memoryCard{aspect-ratio:1;border:2px solid #a7caa2;border-radius:15px;background:linear-gradient(135deg,#245f42,#4a9063);color:white;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:3px;cursor:pointer;font-size:clamp(25px,4vw,42px);transition:transform .15s}
.memoryCard:hover:not(:disabled){transform:translateY(-3px)}
.memoryCard.revealed{background:#eaf5e4;color:#234c33;border-color:#71a87c}
.memoryCard svg{width:min(72%,76px);height:auto;max-height:76px}
.memoryCard small{font-size:clamp(10px,1.3vw,14px);font-weight:700}
@media(max-width:480px){.memoryBoard{gap:7px}.memoryCard{border-radius:10px}}
.jandaAdventure{display:grid;gap:18px}
.jandaHero{background:linear-gradient(115deg,#214f3a,#4e8053);color:white;border-radius:22px;padding:25px 30px;display:flex;align-items:center;justify-content:space-between;gap:20px}
.jandaHero h2{font:700 clamp(25px,3vw,37px) Georgia,serif;margin:6px 0 10px;color:white}
.jandaHero p{font-size:17px;line-height:1.5;max-width:680px;margin:0;color:#e6f2e4}
.jandaEyebrow{font-size:12px;letter-spacing:.12em;font-weight:800;color:#d6edc1}
.jandaPortrait{font-size:74px;filter:drop-shadow(0 5px 8px #1b372b)}
.jandaPhases{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:9px}
.jandaPhase{display:flex;flex-direction:column;gap:5px;background:#f2f6ee;border:1px solid #d5e1ce;border-radius:14px;padding:13px;opacity:.56}
.jandaPhase span{font-size:25px}.jandaPhase strong{font-size:14px;line-height:1.25}.jandaPhase small{font-size:12px}
.jandaPhase.current{background:#e1f2d9;border:2px solid #3e8454;opacity:1}.jandaPhase.passed{opacity:1}
.jandaHud{display:flex;flex-wrap:wrap;gap:9px}.jandaHud span{background:#edf5e9;border:1px solid #d0e1c8;padding:9px 12px;border-radius:12px;font-size:14px}
.jandaEnergy{height:10px;background:#e3e8df;border-radius:10px;overflow:hidden;margin-top:-12px}.jandaEnergy span{display:block;height:100%;background:linear-gradient(90deg,#e3ad49,#58a466);transition:width .15s}
.jandaCanvas{width:100%;height:auto;display:block;border-radius:20px;border:2px solid #b6d3ae;touch-action:none;background:#e8f0d6}
.jandaBottom{display:flex;align-items:center;justify-content:space-between;gap:20px;background:#f3f8ef;border-radius:18px;padding:20px}
.jandaBottom h3{font-size:22px;margin:0 0 7px}.jandaBottom p{margin:0 0 7px;font-size:15px;line-height:1.5}
.jandaHint{font-weight:700;color:#276b45}.jandaActions{display:flex;gap:9px;flex-wrap:wrap;flex-shrink:0}
.jandaLesson{background:#e2f2da;border:1px solid #bbd9b0;border-radius:16px;padding:18px;font-size:16px}.jandaLesson p{margin:7px 0 0}
.jandaScience{background:#f8f6ed;border:1px solid #e5dec6;border-radius:18px;padding:20px}.jandaScience h3{margin:0 0 8px;font-size:21px}.jandaScience p{font-size:15px;line-height:1.6}
@media(max-width:720px){.jandaPhases{grid-template-columns:repeat(2,minmax(0,1fr))}.jandaBottom{flex-direction:column;align-items:stretch}.jandaHero{padding:18px}.jandaPortrait{font-size:46px}.jandaHud span{font-size:12px}}
.seasonResourceGrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin:20px 0}
.seasonResourceGrid>div{background:#f2f7ed;border:1px solid #d5e4d0;border-radius:14px;padding:12px}
.seasonResourceGrid strong{display:block;font-size:14px;min-height:44px}
.seasonResourceBar{height:12px;border-radius:20px;background:#d9e5d4;overflow:hidden;margin:10px 0}
.seasonResourceBar span{display:block;height:100%;background:#4a9762;transition:width .25s}
.seasonStage{background:linear-gradient(115deg,#f6efd9,#e8f3e2);border-radius:17px;padding:22px;margin:18px 0}
.seasonStage>span{font-weight:800;color:#3d744b}
.seasonStage h3{font-size:24px;margin:9px 0}
.seasonLog{margin-top:25px;border-top:1px solid #d9e6d5;padding-top:12px}
.seasonLog p{border-bottom:1px solid #e4ece1;padding:10px 0;font-size:15px}
.pathLevels{display:flex;gap:9px;flex-wrap:wrap;margin:16px 0}
.pathLevels button{padding:10px 14px;border-radius:12px;border:1px solid #9dbb9b;background:#f2f7ee;cursor:pointer}
.pathLevels button.selected{background:#225d3d;color:white}
.pathLevels button:disabled{opacity:.4;cursor:not-allowed}
.pathBoard{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:7px;max-width:560px;margin:20px auto}
.pathCell{aspect-ratio:1;border:2px solid #b5d0ad;border-radius:12px;background:#f4f8ef;font-size:clamp(20px,3vw,32px);cursor:pointer;color:#63826a}
.pathCell.used{background:#d4edcb;border-color:#448657}
.pathCell.blocked{background:#e4dfd5;border-color:#c6b9a6;cursor:not-allowed}
.pathCell:focus-visible{outline:3px solid #2b7a4a;outline-offset:2px}
@media(max-width:550px){.seasonResourceGrid{grid-template-columns:1fr}.seasonResourceGrid strong{min-height:0}.pathBoard{gap:4px}.pathCell{border-radius:8px}}
.seasonTimeline{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin:16px 0}
.seasonTimeline button{display:flex;flex-direction:column;gap:6px;align-items:center;justify-content:center;background:#f4f8f0;border:1px solid #c2d7bd;border-radius:13px;padding:10px 6px;cursor:pointer;font-size:23px}
.seasonTimeline button span{font-size:12px;font-weight:700;line-height:1.3;text-align:center}
.seasonTimeline button.current{border:2px solid #347d4e;background:#e1f2d8}
.seasonLegend{display:flex;gap:12px;flex-wrap:wrap;font-size:13px;margin:9px 0;color:#516f58}
.seasonQuestion{margin-top:18px;padding-top:12px;border-top:1px solid #d9e6d5}
.seasonQuestion h3{font-size:20px}
@media(max-width:550px){.seasonTimeline{grid-template-columns:repeat(2,minmax(0,1fr))}}
.detectiveClue,.guardianStory{display:flex;align-items:center;gap:18px;background:#edf5e9;border-radius:18px;padding:22px;margin:20px 0}
.detectiveClue>span{font-size:55px;flex-shrink:0}.detectiveClue h3,.guardianStory h3{font-size:23px;margin:0 0 7px}
.detectiveClue p,.guardianStory p{margin:0}.guardianStory{display:block;background:#f5f0df}
.guardianMeters{display:grid;gap:13px;margin:20px 0}.guardianMeterLabel{display:flex;justify-content:space-between;gap:10px;font-size:15px}
.guardianTrack{height:12px;background:#e4e9df;border-radius:20px;overflow:hidden;margin-top:5px}
.guardianTrack>div{height:100%;background:#4d9565;transition:width .3s}
.guardianHistory{margin-top:25px;border-top:1px solid #d8e5d5;padding-top:16px}
.guardianHistory>div{padding:12px 0;border-bottom:1px solid #e2eadf}.guardianHistory p{margin:4px 0;font-size:15px}
@media(max-width:550px){.detectiveClue{align-items:flex-start;gap:10px;padding:14px}.detectiveClue>span{font-size:36px}}
.playAwards{margin-top:30px}
.playAwards h2{font:600 clamp(26px,3vw,34px) Georgia,serif}
.playAwardsGrid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px;margin-top:16px}
.playAward{border:1px solid #d4e3d0;border-radius:16px;padding:17px 13px;background:#f7faf5;display:flex;flex-direction:column;gap:6px;min-height:145px}
.playAward.locked{filter:grayscale(1);opacity:.55}
.playAwardIcon{font-size:32px}
.playAward strong{font-size:15px;line-height:1.3}
.playAward small{font-size:13px;line-height:1.4}
@media(max-width:850px){.playAwardsGrid{grid-template-columns:repeat(3,minmax(0,1fr))}}
@media(max-width:500px){.playAwardsGrid{grid-template-columns:repeat(2,minmax(0,1fr))}}
.playProgress{height:10px;border-radius:20px;background:#dce8d6;overflow:hidden;margin:18px 0}
.playProgress>div{height:100%;background:#4b995f;transition:width .2s}
@media(max-width:780px){.playGrid{grid-template-columns:1fr}.playField{aspect-ratio:4/3}.playHero p{font-size:17px}}
`}</style>
<section className="playHero"><div className="playEyebrow">MELISFERA RN · APRENDA BRINCANDO</div><h1>🐝 MELISFERA PLAY</h1><p>Explore a Caatinga, descubra o mundo das abelhas e aprenda sobre conservação com desafios leves e divertidos.</p><Link href="/ecologia">Conhecer a ciência por trás dos jogos →</Link></section>
<div className="playTabs" role="tablist" aria-label="Escolher jogo"><button role="tab" aria-selected={tab==='janda'} className={tab==='janda'?'active':''} onClick={()=>setTab('janda')}>🐝 Janda · Aventura principal</button><button role="tab" aria-selected={tab==='mission'} className={tab==='mission'?'active':''} onClick={()=>setTab('mission')}>🌼 Missão Polinizadora</button><button role="tab" aria-selected={tab==='quiz'} className={tab==='quiz'?'active':''} onClick={()=>setTab('quiz')}>🧠 Desafio das Abelhas</button><button role="tab" aria-selected={tab==='memory'} className={tab==='memory'?'active':''} onClick={()=>setTab('memory')}>🃏 Memória da Caatinga</button><button role="tab" aria-selected={tab==='detective'} className={tab==='detective'?'active':''} onClick={()=>setTab('detective')}>🔎 Detetive das Abelhas</button><button role="tab" aria-selected={tab==='guardian'} className={tab==='guardian'?'active':''} onClick={()=>setTab('guardian')}>🌱 Guardiões da Caatinga</button><button role="tab" aria-selected={tab==='seasons'} className={tab==='seasons'?'active':''} onClick={()=>setTab('seasons')}>🌦️ As Duas Faces da Caatinga</button><button role="tab" aria-selected={tab==='flight'} className={tab==='flight'?'active':''} onClick={()=>setTab('flight')}>🐝 Voo da Jandaíra</button><button role="tab" aria-selected={tab==='survival'} className={tab==='survival'?'active':''} onClick={()=>setTab('survival')}>🌦️ Sobrevivendo às Estações</button><button role="tab" aria-selected={tab==='paths'} className={tab==='paths'?'active':''} onClick={()=>setTab('paths')}>🧩 Caminhos da Polinização</button></div>
{tab==='janda'?<JandaAdventure/>:tab==='mission'?<><section className="adventureMap" aria-label="Mapa de aventuras da Caatinga"><h2>🗺️ Mapa de aventuras da Caatinga</h2><p>Complete uma missão para desbloquear a próxima. Você pode revisitar as etapas já liberadas.</p><div className="adventureSteps">{missionScenes.map((item,i)=>{const unlocked=i<=highestScene;const active=currentScene===i;const done=completedScenes.includes(i);return <button key={item.name} type="button" className={'adventureStep '+(active?'active':'')} disabled={!unlocked} aria-current={active?'step':undefined} onClick={()=>resetMission(i)}><span className="adventureIcon" aria-hidden="true">{i===0?'🌼':i===1?'🪨':'🌿'}</span><strong>{i+1}. {item.name}</strong><small>{done?'✅ Missão concluída':active?'▶ Etapa atual':unlocked?'🔓 Disponível':'🔒 Desbloqueie a etapa anterior'}</small></button>})}</div>{adventureComplete&&<div className="adventureVictory" role="status">🏆 Você concluiu a aventura! Agora pode revisitar os três ambientes e continuar aprendendo.</div>}</section><div className="playGrid"><section className="playPanel"><h2>Missão Polinizadora</h2><div className="sceneIntro"><strong>🌿 Cenário {level%missionScenes.length+1}: {scene.name}</strong><span>{scene.subtitle}</span></div><p>Ajude a abelhinha a visitar as seis flores! Use as setas do teclado, os botões ou toque no campo para se mover. Evite os obstáculos e conclua a missão.</p><div className="playStats"><span className="playStat">🌼 Flores: {collected.length}/{total}</span><span className="playStat">⭐ Pontos: {collected.length*10+level*20}</span><span className="playStat">❤️ Vidas: {maxHits-hits}</span><span className="playStat">🏅 Rodada: {level+1}</span></div><div className={'playField '+scene.tone} role="group" aria-label="Campo da missão polinizadora" onPointerDown={e=>{if(!started||completed||hits>=maxHits)return;const rect=e.currentTarget.getBoundingClientRect();const x=100*(e.clientX-rect.left)/rect.width;const y=100*(e.clientY-rect.top)/rect.height;move(Math.max(-12,Math.min(12,x-bee.x)),Math.max(-12,Math.min(12,y-bee.y)))}}>
{flowers.map((f,i)=>!collected.includes(i)&&<span key={i} className="flower" aria-label="Flor" style={{position:'absolute',left:((f.x+level*7)%82+8)+'%',top:f.y+'%',fontSize:'clamp(28px,4vw,44px)',transform:'translate(-50%,-50%)'}}><MissionFlower variant={i}/></span>)}
{threats.map((t,i)=><span key={i} className="threat" aria-label="Produto tóxico: obstáculo no jogo" style={{position:'absolute',left:((t.x+level*4)%82+8)+'%',top:t.y+'%',transform:'translate(-50%,-50%)'}}><ToxicObstacle/></span>)}
<span className="bee" role="img" aria-label="Sua abelha" style={{position:'absolute',left:bee.x+'%',top:bee.y+'%',transform:'translate(-50%,-50%)'}}><MissionBee/></span>
</div>
{discovery&&<div className="playDiscovery" role="status">💡 {discovery}</div>}
<div className="playControls"><span/><button aria-label="Mover para cima" disabled={!started||completed||hits>=maxHits} onClick={()=>move(0,-10)}>↑</button><span/><button aria-label="Mover para esquerda" disabled={!started||completed||hits>=maxHits} onClick={()=>move(-10,0)}>←</button><button aria-label="Mover para baixo" disabled={!started||completed||hits>=maxHits} onClick={()=>move(0,10)}>↓</button><button aria-label="Mover para direita" disabled={!started||completed||hits>=maxHits} onClick={()=>move(10,0)}>→</button></div>
{!started?<><div className="playDifficulty"><span>Escolha a dificuldade:</span><button className={difficulty==='leve'?'selected':''} onClick={()=>setDifficulty('leve')}>🌱 Explorador · 4 vidas</button><button className={difficulty==='desafio'?'selected':''} onClick={()=>setDifficulty('desafio')}>🏅 Desafio · 3 vidas</button></div><button className="playBtn primary" onClick={()=>setStarted(true)}>▶ Começar a missão</button></>:completed?<div className="playNote"><strong>🎉 Missão concluída!</strong><p>Você visitou todas as flores. Na natureza, visitar flores não significa necessariamente realizar polinização efetiva.</p><button className="playBtn primary" onClick={()=>resetMission(currentScene===2?0:currentScene+1)}>{currentScene===2?'Revisitar a primeira missão →':'Próxima missão →'}</button></div>:hits>=maxHits?<div className="playNote"><strong>Fim da rodada!</strong><p>As ameaças dificultam a vida das abelhas. Tente outra vez!</p><button className="playBtn primary" onClick={()=>resetMission(level)}>Tentar novamente</button></div>:<button className="playBtn" onClick={()=>resetMission(level)}>Reiniciar missão</button>}
</section><aside className="playPanel"><h2>🌵 Diário de campo</h2><p><strong>{scene.name}.</strong> {scene.fact}</p><p>A Caatinga é uma floresta tropical sazonalmente seca, com plantas e animais adaptados à alternância das estações.</p><p>As macambiras, incluindo <em>Encholirium spectabile</em>, podem oferecer recursos e micro-habitats para diferentes organismos.</p><p><strong>Importante:</strong> este é um jogo ilustrativo. A abelha, as flores e os obstáculos são representações lúdicas, não um registro de interação entre espécies.</p><Link href="/ecologia">Descubra os serviços ecossistêmicos →</Link></aside></div></>:tab==='quiz'?
<div className="playGrid"><section className="playPanel"><h2>Desafio das Abelhas</h2>{finished?<><h3>🎉 Você concluiu o desafio!</h3><p style={{fontSize:24,fontWeight:700}}>⭐ {points} de {questions.length*10} pontos</p><p>Continue explorando a MELISFERA RN para conhecer mais sobre as abelhas potiguares.</p><button className="playBtn primary" onClick={resetQuiz}>Jogar novamente</button></>:<><div className="playStats"><span className="playStat">Pergunta {q+1} de {questions.length}</span><span className="playStat">⭐ {points} pontos</span></div><div className="playProgress"><div style={{width:((q+1)/questions.length*100)+'%'}}/></div><h3 style={{fontSize:23,lineHeight:1.4}}>{questions[q].q}</h3><div className="playChoices">{questions[q].a.map((a,i)=><button key={i} disabled={chosen!==null} className={chosen!==null&&i===questions[q].ok?'correct':chosen===i?'wrong':''} onClick={()=>answer(i)}>{a}</button>)}</div>{chosen!==null&&<div className="playNote"><strong>{chosen===questions[q].ok?'✅ Resposta correta!':'💡 Vamos aprender!'}</strong><p>{questions[q].why}</p><button className="playBtn primary" onClick={nextQuestion}>{q===questions.length-1?'Ver resultado':'Próxima pergunta →'}</button></div>}</>}</section><aside className="playPanel"><h2>📚 Ciência e diversão</h2><p>As perguntas abordam biodiversidade, visitação floral, conservação e espécies relacionadas ao Rio Grande do Norte.</p><p>Para conhecer as evidências científicas, explore o catálogo da plataforma.</p><Link href="/especies">Consultar espécies →</Link></aside></div>:tab==='detective'?<DetectiveGame/>:tab==='guardian'?<GuardianGame/>:tab==='seasons'?<SeasonsGame/>:tab==='flight'?<BeeFlightGame/>:tab==='survival'?<SeasonsSurvivalGame/>:tab==='paths'?<PollinationPathsGame/>:<div className="playGrid"><section className="playPanel"><h2>🃏 Memória da Caatinga</h2><p>Encontre seis pares de cartas. Cada acerto revela uma curiosidade sobre as abelhas e a biodiversidade potiguar.</p><div className="playStats"><span className="playStat">🧩 Pares: {memoryMatched.length}/6</span><span className="playStat">🎯 Tentativas: {memoryMoves}</span></div><div className="memoryBoard">{memoryOrder.map((index,i)=>{const card=memoryDeck[index];const visible=memoryOpen.includes(i)||memoryMatched.includes(card.id);return <button key={i} className={'memoryCard '+(visible?'revealed':'')} aria-label={visible?card.name:'Carta virada '+(i+1)} aria-pressed={visible} disabled={visible||memoryLocked} onClick={()=>flipMemory(i)}>{visible?<><NatureIcon kind={card.id}/><small>{card.name}</small></>:<span>❀</span>}</button>})}</div>{memoryFact&&<div className="playNote"><strong>💡 Descoberta!</strong><p>{memoryFact}</p></div>}{memoryMatched.length===6&&<div className="playNote"><strong>🎉 Parabéns, explorador da Caatinga!</strong><p>Você encontrou todos os pares em {memoryMoves} tentativas.</p></div>}<button className="playBtn primary" style={{marginTop:18}} onClick={resetMemory}>🔄 Nova rodada</button></section><aside className="playPanel"><h2>🌿 Conheça e proteja</h2><p>O jogo apresenta conceitos ecológicos de forma lúdica, sem afirmar interações específicas não documentadas.</p><p>Quer aprender mais sobre espécies e ambientes?</p><Link href="/ecologia">Explorar ecologia e serviços →</Link></aside></div>}
<section className="playAwards" aria-label="Conquistas educativas"><h2>🏆 Seu álbum de conquistas</h2><p>Complete desafios e desbloqueie medalhas durante esta visita. As conquistas são locais e reiniciam ao atualizar a página.</p><div className="playAwardsGrid">{achievements.map(a=><div className={'playAward '+(a.done?'':'locked')} key={a.title}><span className="playAwardIcon" aria-hidden="true">{a.icon}</span><strong>{a.title}</strong><small>{a.done?'✓ Conquista desbloqueada':a.desc}</small></div>)}</div></section>
<p style={{marginTop:28,fontSize:14,color:'#57715d'}}>MELISFERA PLAY · Protótipo educativo sem coleta de dados pessoais, sem classificação pública e sem publicidade.</p>
</main>
}