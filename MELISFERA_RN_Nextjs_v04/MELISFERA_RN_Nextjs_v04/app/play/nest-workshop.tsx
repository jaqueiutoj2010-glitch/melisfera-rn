'use client';
import {useState} from 'react';
type Task='food'|'brood'|'guard';
const tasks:{id:Task;title:string;icon:string;detail:string;note:string}[]=[
{id:'food',title:'Organizar reservas',icon:'🍯',detail:'Leve recursos aos potes de alimento.',note:'Abelhas sem ferrão podem armazenar alimento em potes de cerume; o formato varia entre grupos.'},
{id:'brood',title:'Cuidar da cria',icon:'🥚',detail:'Observe as células de cria próximas à área central.',note:'A criação de novas operárias depende da rainha e dos processos sociais da colônia.'},
{id:'guard',title:'Proteger a entrada',icon:'🛡️',detail:'Mantenha a entrada do ninho protegida.',note:'A defesa e manutenção do ninho envolvem comportamentos sociais; este desafio é ilustrativo.'}
];
export function NestWorkshop({phase,onFinished}:{phase:number;onFinished:()=>void}){
const [done,setDone]=useState<Task[]>([]);
const [selected,setSelected]=useState<Task|null>(null);
const complete=done.length===3;
function perform(id:Task){if(done.includes(id))return;setSelected(id);setDone(d=>[...d,id])}
return <section className="nestWorkshop" aria-label="Interior interativo da colônia">
<div className="nestHeader"><div><span className="nestKicker">MISSÃO EXTRA · INTERIOR DO NINHO</span><h3>🏡 A casa de Janda</h3><p>Depois do voo, ajude as operárias com três atividades no ninho antes de seguir viagem.</p></div><span className="nestProgress">{done.length}/3 tarefas</span></div>
<div className="nestScene">
<svg viewBox="0 0 760 360" role="img" aria-label="Corte ilustrado do ninho com potes de alimento, células de cria e entrada; selecione as atividades nos botões abaixo">
<defs><radialGradient id="nestBg"><stop stopColor="#ac7849"/><stop offset="1" stopColor="#68452e"/></radialGradient><linearGradient id="nestHoney" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#ffdb77"/><stop offset="1" stopColor="#bc7d2b"/></linearGradient></defs>
<rect width="760" height="360" rx="20" fill="#d9b587"/>
<path d="M35 0Q10 120 40 205T20 360M725 0Q750 110 730 190T750 360" stroke="#986943" strokeWidth="28" fill="none"/>
<ellipse cx="378" cy="183" rx="316" ry="153" fill="url(#nestBg)" stroke="#765031" strokeWidth="15"/>
<path d="M665 190Q720 174 760 187" stroke="#493326" strokeWidth="28" fill="none"/>
<g opacity={done.includes('food')?1:.55}>{[145,200,255].map((x,i)=><g key={x}><path d={`M${x-23} 175Q${x-31} 215 ${x-18} 251Q${x} 268 ${x+18} 251Q${x+31} 215 ${x+23} 175Z`} fill={done.includes('food')?'url(#nestHoney)':'#c5a27a'} stroke="#5d3b25" strokeWidth="5"/><ellipse cx={x} cy="175" rx="24" ry="9" fill="#553d2d"/><ellipse cx={x} cy="179" rx="17" ry="5" fill={done.includes('food')?'#f7d477':'#967858'}/></g>)}</g>
<g>{Array.from({length:24},(_,i)=>{const row=Math.floor(i/8),col=i%8,x=315+col*31+(row%2)*15,y=140+row*37;return <g key={i}><path d={`M${x} ${y-15}l14 8v16l-14 8l-14 -8v-16Z`} fill={done.includes('brood')?'#e4ba6d':'#b48b5d'} stroke="#6c472a" strokeWidth="3"/>{done.includes('brood')&&i%4===0&&<circle cx={x} cy={y} r="5" fill="#f9eac6"/>}</g>})}</g>
<g transform="translate(632 183)"><ellipse cx="0" cy="0" rx="21" ry="13" fill="#b67e42"/><path d="M-8 -12V12M4 -12V12" stroke="#4c3525" strokeWidth="5"/><circle cx="19" cy="-2" r="9" fill="#563c2b"/><ellipse cx="-4" cy="-15" rx="15" ry="9" fill="#d8edeb" opacity=".85"/><ellipse cx="11" cy="-17" rx="15" ry="9" fill="#d8edeb" opacity=".85"/></g>
{done.includes('guard')&&<g><circle cx="704" cy="185" r="21" fill="none" stroke="#e7cb73" strokeWidth="5"/><path d="M696 185l6 7l12 -16" fill="none" stroke="#f8e9ad" strokeWidth="5"/></g>}
<g fill="#fff3cf" fontFamily="system-ui" fontWeight="700" fontSize="17"><text x="143" y="116">Potes</text><text x="380" y="100">Cria</text><text x="612" y="120">Entrada</text></g>
</svg>
</div>
<div className="nestTasks">{tasks.map(t=><button key={t.id} type="button" onClick={()=>perform(t.id)} disabled={done.includes(t.id)} className={'nestTask '+(done.includes(t.id)?'done':'')}><span className="nestTaskIcon">{t.icon}</span><strong>{t.title}</strong><small>{done.includes(t.id)?'✓ Concluída':t.detail}</small></button>)}</div>
{selected&&<p className="nestFeedback" role="status"><strong>💡 {tasks.find(t=>t.id===selected)?.title}:</strong> {tasks.find(t=>t.id===selected)?.note}</p>}
{complete&&<div className="nestFinished" role="status"><strong>🎉 Trabalho em equipe!</strong><p>Janda ajudou sua colônia na etapa {phase+1}. A organização mostrada é didática, não uma planta anatômica fiel de um ninho real.</p><button className="playBtn primary" onClick={onFinished}>Continuar aventura →</button></div>}
</section>
}
