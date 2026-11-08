'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';

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
const memoryCards=[{id:'jandaira',emoji:'🐝',name:'Jandaíra',fact:'Melipona subnitida é uma abelha sem ferrão de importância cultural no Nordeste.'},{id:'flor',emoji:'🌼',name:'Flores',fact:'Flores oferecem recursos como néctar e pólen a diversos visitantes.'},{id:'macambira',emoji:'🌵',name:'Macambira',fact:'Encholirium spectabile é uma bromélia rupícola da Caatinga.'},{id:'ninho',emoji:'🏡',name:'Ninhos',fact:'Abelhas podem nidificar em cavidades, no solo e em outros substratos.'},{id:'caatinga',emoji:'🌳',name:'Caatinga',fact:'A Caatinga é uma floresta tropical sazonalmente seca.'},{id:'conservacao',emoji:'💚',name:'Conservação',fact:'A conservação da vegetação nativa ajuda a proteger recursos e habitats.'}];
const memoryDeck=[...memoryCards,...memoryCards];
const distance=(a:{x:number,y:number},b:{x:number,y:number})=>Math.hypot(a.x-b.x,a.y-b.y);
export default function Play(){
const [tab,setTab]=useState<'mission'|'quiz'|'memory'>('mission');
const [level,setLevel]=useState(0);
const [bee,setBee]=useState({x:50,y:85});
const [collected,setCollected]=useState<number[]>([]);
const [hits,setHits]=useState(0);
const [started,setStarted]=useState(false);
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
useEffect(()=>{function onKey(e:KeyboardEvent){if(tab!=='mission'||!started||collected.length===flowers.length||hits>=3)return;const directions:Record<string,[number,number]>={ArrowUp:[0,-10],ArrowDown:[0,10],ArrowLeft:[-10,0],ArrowRight:[10,0]};const direction=directions[e.key];if(direction){e.preventDefault();move(direction[0],direction[1])}}window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey)});
function flipMemory(i:number){const card=memoryDeck[memoryOrder[i]];if(memoryLocked||memoryOpen.includes(i)||memoryMatched.includes(card.id))return;if(memoryOpen.length===0){setMemoryOpen([i]);return}const first=memoryDeck[memoryOrder[memoryOpen[0]]];setMemoryMoves(v=>v+1);if(first.id===card.id){setMemoryMatched(v=>[...v,card.id]);setMemoryFact(card.fact);setMemoryOpen([])}else{setMemoryOpen([memoryOpen[0],i]);setMemoryLocked(true);setTimeout(()=>{setMemoryOpen([]);setMemoryLocked(false)},850)}}
function resetMemory(){setMemoryOpen([]);setMemoryMatched([]);setMemoryMoves(0);setMemoryFact('');setMemoryLocked(false);setMemoryOrder(v=>[...v.slice(3),...v.slice(0,3)])}
const total=flowers.length;
const completed=collected.length===total;
function resetMission(next=0){setLevel(next);setBee({x:50,y:85});setCollected([]);setHits(0);setStarted(false)}
function move(dx:number,dy:number){
 if(!started||completed||hits>=3)return;
 const next={x:Math.max(5,Math.min(95,bee.x+dx)),y:Math.max(7,Math.min(93,bee.y+dy))};
 setBee(next);
 const flower=flowers.findIndex((f,i)=>!collected.includes(i)&&distance({x:(f.x+level*7)%82+8,y:f.y},next)<13);
 if(flower>=0)setCollected(prev=>[...prev,flower]);
 if(threats.some(t=>distance({x:(t.x+level*4)%82+8,y:t.y},next)<11)){setHits(h=>Math.min(3,h+1));setBee({x:50,y:85})}
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
.playGrid{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(260px,.7fr);gap:22px}
.playPanel{background:white;border:1px solid #d7e5d5;border-radius:22px;padding:clamp(18px,3vw,30px);box-shadow:0 6px 20px #1b42210c}
.playPanel h2{font:600 clamp(25px,2.7vw,34px) Georgia,serif;margin:0 0 14px}
.playField{position:relative;aspect-ratio:16/10;min-height:260px;background:linear-gradient(#d5f0e2,#eff6c6 65%,#b7d99e);border:3px solid #b2d4a9;border-radius:22px;overflow:hidden;touch-action:none;user-select:none}
.playField:before{content:'☁️　　　☁️';position:absolute;top:4%;left:10%;font-size:27px;opacity:.6}
.playField button{position:absolute;transform:translate(-50%,-50%);border:0;background:none;font-size:clamp(28px,4vw,44px);padding:4px;line-height:1;cursor:pointer}
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
.memoryCard small{font-size:clamp(10px,1.3vw,14px);font-weight:700}
@media(max-width:480px){.memoryBoard{gap:7px}.memoryCard{border-radius:10px}}
.playProgress{height:10px;border-radius:20px;background:#dce8d6;overflow:hidden;margin:18px 0}
.playProgress>div{height:100%;background:#4b995f;transition:width .2s}
@media(max-width:780px){.playGrid{grid-template-columns:1fr}.playField{aspect-ratio:4/3}.playHero p{font-size:17px}}
`}</style>
<section className="playHero"><div className="playEyebrow">MELISFERA RN · APRENDA BRINCANDO</div><h1>🐝 MELISFERA PLAY</h1><p>Explore a Caatinga, descubra o mundo das abelhas e aprenda sobre conservação com desafios leves e divertidos.</p><Link href="/ecologia">Conhecer a ciência por trás dos jogos →</Link></section>
<div className="playTabs" role="tablist" aria-label="Escolher jogo"><button role="tab" aria-selected={tab==='mission'} className={tab==='mission'?'active':''} onClick={()=>setTab('mission')}>🌼 Missão Polinizadora</button><button role="tab" aria-selected={tab==='quiz'} className={tab==='quiz'?'active':''} onClick={()=>setTab('quiz')}>🧠 Desafio das Abelhas</button><button role="tab" aria-selected={tab==='memory'} className={tab==='memory'?'active':''} onClick={()=>setTab('memory')}>🃏 Memória da Caatinga</button></div>
{tab==='mission'?<div className="playGrid"><section className="playPanel"><h2>Missão Polinizadora</h2><p>Ajude a abelhinha a visitar as seis flores! Use as setas do teclado, os botões ou toque no campo para se mover. Evite os obstáculos e conclua a missão.</p><div className="playStats"><span className="playStat">🌼 Flores: {collected.length}/{total}</span><span className="playStat">⭐ Pontos: {collected.length*10+level*20}</span><span className="playStat">❤️ Vidas: {3-hits}</span><span className="playStat">🏅 Rodada: {level+1}</span></div><div className="playField" role="group" aria-label="Campo da missão polinizadora" onPointerDown={e=>{if(!started||completed||hits>=3)return;const rect=e.currentTarget.getBoundingClientRect();const x=100*(e.clientX-rect.left)/rect.width;const y=100*(e.clientY-rect.top)/rect.height;move(Math.max(-12,Math.min(12,x-bee.x)),Math.max(-12,Math.min(12,y-bee.y)))}}>
{flowers.map((f,i)=>!collected.includes(i)&&<span key={i} className="flower" aria-label="Flor" style={{position:'absolute',left:((f.x+level*7)%82+8)+'%',top:f.y+'%',fontSize:'clamp(28px,4vw,44px)',transform:'translate(-50%,-50%)'}}>🌼</span>)}
{threats.map((t,i)=><span key={i} className="threat" aria-label="Obstáculo" style={{position:'absolute',left:((t.x+level*4)%82+8)+'%',top:t.y+'%',transform:'translate(-50%,-50%)'}}>⚠️</span>)}
<span className="bee" role="img" aria-label="Sua abelha" style={{position:'absolute',left:bee.x+'%',top:bee.y+'%',transform:'translate(-50%,-50%)'}}>🐝</span>
</div>
<div className="playControls"><span/><button aria-label="Mover para cima" disabled={!started||completed||hits>=3} onClick={()=>move(0,-10)}>↑</button><span/><button aria-label="Mover para esquerda" disabled={!started||completed||hits>=3} onClick={()=>move(-10,0)}>←</button><button aria-label="Mover para baixo" disabled={!started||completed||hits>=3} onClick={()=>move(0,10)}>↓</button><button aria-label="Mover para direita" disabled={!started||completed||hits>=3} onClick={()=>move(10,0)}>→</button></div>
{!started?<button className="playBtn primary" onClick={()=>setStarted(true)}>▶ Começar a missão</button>:completed?<div className="playNote"><strong>🎉 Missão concluída!</strong><p>Você visitou todas as flores. Na natureza, visitar flores não significa necessariamente realizar polinização efetiva.</p><button className="playBtn primary" onClick={()=>resetMission(level+1)}>Próxima rodada →</button></div>:hits>=3?<div className="playNote"><strong>Fim da rodada!</strong><p>As ameaças dificultam a vida das abelhas. Tente outra vez!</p><button className="playBtn primary" onClick={()=>resetMission(level)}>Tentar novamente</button></div>:<button className="playBtn" onClick={()=>resetMission(level)}>Reiniciar missão</button>}
</section><aside className="playPanel"><h2>🌵 Você sabia?</h2><p>A Caatinga é uma floresta tropical sazonalmente seca, com plantas e animais adaptados à alternância das estações.</p><p>As macambiras, incluindo <em>Encholirium spectabile</em>, podem oferecer recursos e micro-habitats para diferentes organismos.</p><p><strong>Importante:</strong> este é um jogo ilustrativo. A abelha, as flores e os obstáculos são representações lúdicas, não um registro de interação entre espécies.</p><Link href="/ecologia">Descubra os serviços ecossistêmicos →</Link></aside></div>:tab==='quiz'?
<div className="playGrid"><section className="playPanel"><h2>Desafio das Abelhas</h2>{finished?<><h3>🎉 Você concluiu o desafio!</h3><p style={{fontSize:24,fontWeight:700}}>⭐ {points} de {questions.length*10} pontos</p><p>Continue explorando a MELISFERA RN para conhecer mais sobre as abelhas potiguares.</p><button className="playBtn primary" onClick={resetQuiz}>Jogar novamente</button></>:<><div className="playStats"><span className="playStat">Pergunta {q+1} de {questions.length}</span><span className="playStat">⭐ {points} pontos</span></div><div className="playProgress"><div style={{width:((q+1)/questions.length*100)+'%'}}/></div><h3 style={{fontSize:23,lineHeight:1.4}}>{questions[q].q}</h3><div className="playChoices">{questions[q].a.map((a,i)=><button key={i} disabled={chosen!==null} className={chosen!==null&&i===questions[q].ok?'correct':chosen===i?'wrong':''} onClick={()=>answer(i)}>{a}</button>)}</div>{chosen!==null&&<div className="playNote"><strong>{chosen===questions[q].ok?'✅ Resposta correta!':'💡 Vamos aprender!'}</strong><p>{questions[q].why}</p><button className="playBtn primary" onClick={nextQuestion}>{q===questions.length-1?'Ver resultado':'Próxima pergunta →'}</button></div>}</>}</section><aside className="playPanel"><h2>📚 Ciência e diversão</h2><p>As perguntas abordam biodiversidade, visitação floral, conservação e espécies relacionadas ao Rio Grande do Norte.</p><p>Para conhecer as evidências científicas, explore o catálogo da plataforma.</p><Link href="/especies">Consultar espécies →</Link></aside></div>:<div className="playGrid"><section className="playPanel"><h2>🃏 Memória da Caatinga</h2><p>Encontre seis pares de cartas. Cada acerto revela uma curiosidade sobre as abelhas e a biodiversidade potiguar.</p><div className="playStats"><span className="playStat">🧩 Pares: {memoryMatched.length}/6</span><span className="playStat">🎯 Tentativas: {memoryMoves}</span></div><div className="memoryBoard">{memoryOrder.map((index,i)=>{const card=memoryDeck[index];const visible=memoryOpen.includes(i)||memoryMatched.includes(card.id);return <button key={i} className={'memoryCard '+(visible?'revealed':'')} aria-label={visible?card.name:'Carta virada '+(i+1)} aria-pressed={visible} disabled={visible||memoryLocked} onClick={()=>flipMemory(i)}>{visible?<><span>{card.emoji}</span><small>{card.name}</small></>:<span>❀</span>}</button>})}</div>{memoryFact&&<div className="playNote"><strong>💡 Descoberta!</strong><p>{memoryFact}</p></div>}{memoryMatched.length===6&&<div className="playNote"><strong>🎉 Parabéns, explorador da Caatinga!</strong><p>Você encontrou todos os pares em {memoryMoves} tentativas.</p></div>}<button className="playBtn primary" style={{marginTop:18}} onClick={resetMemory}>🔄 Nova rodada</button></section><aside className="playPanel"><h2>🌿 Conheça e proteja</h2><p>O jogo apresenta conceitos ecológicos de forma lúdica, sem afirmar interações específicas não documentadas.</p><p>Quer aprender mais sobre espécies e ambientes?</p><Link href="/ecologia">Explorar ecologia e serviços →</Link></aside></div>}
<p style={{marginTop:28,fontSize:14,color:'#57715d'}}>MELISFERA PLAY · Protótipo educativo sem coleta de dados pessoais, sem classificação pública e sem publicidade.</p>
</main>
}