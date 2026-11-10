'use client';
import {useCallback,useEffect,useRef,useState} from 'react';
import type {PointerEvent as ReactPointerEvent} from 'react';
import {NestWorkshop} from './nest-workshop';

const WIDTH=900,HEIGHT=440;
type Point={x:number;y:number};
type Flower=Point&{taken:boolean};
type Phase={name:string;season:string;goal:number;description:string;lesson:string;leaf:number;rain:number;flowers:Point[];hazards:Point[];nest?:Point;wind?:number;rocks?:boolean;threat?:'windfarm'|'solar'|'clearing';umburana?:boolean};
const phaseCatalog:Phase[]=[
{name:'A floresta resiste',season:'Pico da seca',goal:3,description:'Encontre três flores dispersas na floresta seca. A Caatinga continua viva mesmo quando muitas árvores estão sem folhas.',lesson:'Na seca, a deciduidade reduz a perda de água em muitas árvores. A disponibilidade de flores varia entre espécies.',leaf:.08,rain:0,flowers:[{x:205,y:125},{x:435,y:310},{x:720,y:150}],hazards:[{x:320,y:230},{x:595,y:245}]},
{name:'Os ocos das umburanas',umburana:true,season:'Final da seca',goal:3,description:'Reúna recursos e encontre uma cavidade adequada. Janda ajuda a reconhecer um local potencial para a colônia.',lesson:'Cavidades em árvores podem ser importantes para a nidificação de abelhas sem ferrão. A fundação de uma colônia envolve processos sociais e não ocorre por uma operária isolada.',leaf:.16,rain:0,flowers:[{x:160,y:300},{x:390,y:125},{x:660,y:315}],hazards:[{x:290,y:210},{x:530,y:200}],nest:{x:805,y:210}},
{name:'As primeiras chuvas',season:'Transição seca–chuva',goal:4,description:'A paisagem começa a rebrotar. Visite quatro flores para contribuir com as reservas da colônia.',lesson:'O rebrotamento após as primeiras chuvas pode ser rápido, mas não ocorre simultaneamente em todas as plantas.',leaf:.52,rain:.48,flowers:[{x:180,y:120},{x:330,y:325},{x:530,y:145},{x:730,y:310}],hazards:[{x:420,y:215},{x:640,y:225}]},
{name:'A floresta verdeja',season:'Estação chuvosa',goal:5,description:'A vegetação ganha folhas em muitos trechos. Visite cinco flores e retorne à colônia com os recursos.',lesson:'A Caatinga é uma floresta tropical sazonalmente seca. Folhagem, floração e frutificação têm calendários que variam entre espécies.',leaf:.95,rain:.8,flowers:[{x:155,y:135},{x:300,y:315},{x:455,y:125},{x:610,y:315},{x:760,y:150}],hazards:[{x:370,y:220},{x:675,y:220}]},
{name:'Uma colônia fortalecida',season:'Ciclo sazonal',goal:5,description:'Complete o último voo, reúna recursos e retorne ao ninho. A aventura mostra como a conservação ajuda a sustentar habitats ao longo do ano.',lesson:'O crescimento real de colônias depende de muitos fatores, incluindo rainha, operárias, cria, recursos e condições ambientais. Os números deste jogo são fictícios.',leaf:.7,rain:.4,flowers:[{x:180,y:305},{x:285,y:115},{x:460,y:310},{x:610,y:120},{x:770,y:305}],hazards:[{x:365,y:205},{x:550,y:220},{x:715,y:215}]},
{name:'Ventos do sertão',season:'Transição entre estações',goal:5,description:'Uma corrente de vento muda a direção do voo. Ajuste sua rota, visite flores e volte ao ninho.',lesson:'Ventos podem influenciar o voo de insetos. A intensidade e os efeitos variam conforme as condições e as espécies.',leaf:.38,rain:.2,wind:42,flowers:[{x:170,y:115},{x:295,y:310},{x:450,y:125},{x:615,y:300},{x:760,y:125}],hazards:[{x:360,y:210},{x:585,y:210}]},
{name:'Entre rochas e macambiras',umburana:true,season:'Afloramentos da Caatinga',goal:5,description:'Explore uma paisagem rochosa com bromélias rupícolas. Encontre flores ilustrativas e evite áreas de risco.',lesson:'Encholirium spectabile é uma bromélia rupícola, não um cacto. O jogo não afirma que Janda visite especificamente suas flores.',leaf:.4,rain:.3,rocks:true,flowers:[{x:175,y:130},{x:310,y:295},{x:460,y:125},{x:640,y:300},{x:775,y:120}],hazards:[{x:375,y:210},{x:550,y:230},{x:700,y:210}]},
{name:'O futuro da colônia',season:'Nova estação chuvosa',goal:6,description:'A vegetação volta a verdejar. Complete o circuito final para fortalecer as reservas e proteger a colônia.',lesson:'Uma colônia social mantém rainha, cria e operárias com funções diferentes. A expansão apresentada é uma simplificação educativa.',leaf:.95,rain:.7,flowers:[{x:145,y:115},{x:270,y:315},{x:390,y:110},{x:530,y:310},{x:660,y:115},{x:780,y:300}],hazards:[{x:340,y:210},{x:475,y:205},{x:690,y:220}]},
{name:'As estradas dos ventos',season:'Fragmentação por infraestrutura eólica',goal:5,description:'Atravesse uma área alterada por estradas e bases de aerogeradores. Desvie das estruturas e procure corredores com vegetação para levar recursos à colônia.',lesson:'Parques eólicos podem causar supressão vegetal, abertura de vias, fragmentação e outros impactos, dependendo da localização e do projeto. A energia eólica é renovável; o desafio é planejar sua implantação para reduzir danos à biodiversidade.',leaf:.2,rain:0,threat:'windfarm',flowers:[{x:165,y:115},{x:290,y:320},{x:420,y:120},{x:610,y:320},{x:780,y:125}],hazards:[{x:335,y:190},{x:570,y:210},{x:735,y:235}]},
{name:'O mar de painéis',season:'Mudança do uso do solo',goal:5,description:'Encontre rotas entre fragmentos de Caatinga próximos a uma usina solar de grande porte. Evite os obstáculos e preserve sua energia.',lesson:'Usinas solares em solo podem exigir remoção de vegetação e alterar habitats, mas os impactos dependem do local, do manejo e do projeto. Priorizar áreas já alteradas e soluções de menor impacto pode reduzir conflitos.',leaf:.18,rain:0,threat:'solar',flowers:[{x:165,y:402},{x:305,y:120},{x:455,y:402},{x:630,y:125},{x:770,y:402}],hazards:[{x:260,y:215},{x:490,y:205},{x:690,y:210}]},
{name:'As últimas umburanas',season:'Conservação de árvores com cavidades',goal:5,description:'Uma área sofre supressão vegetal. Encontre flores, reconheça as árvores remanescentes e retorne ao ninho antes que a energia termine.',lesson:'Árvores com cavidades, como umburanas, podem oferecer abrigo para diferentes animais. A conservação de árvores vivas, mortas e ocadas deve considerar segurança, manejo e o valor ecológico das cavidades.',leaf:.14,rain:0,umburana:true,threat:'clearing',flowers:[{x:160,y:115},{x:305,y:305},{x:450,y:120},{x:625,y:310},{x:765,y:130}],hazards:[{x:365,y:225},{x:550,y:220},{x:700,y:225}]},
{name:'Reconectar a Caatinga',season:'Restauração e conectividade',goal:6,description:'Janda percorre fragmentos com vegetação em recuperação. Reúna recursos, evite áreas de risco e ajude a colônia a atravessar a paisagem.',lesson:'Manter vegetação nativa, árvores com cavidades e conectividade entre manchas de habitat favorece diferentes componentes da biodiversidade. A restauração demanda tempo e planejamento local.',leaf:.68,rain:.38,umburana:true,rocks:true,flowers:[{x:145,y:120},{x:275,y:315},{x:405,y:115},{x:535,y:315},{x:665,y:125},{x:785,y:305}],hazards:[{x:350,y:210},{x:580,y:215}]}
];
// Progressão narrativa: da estação chuvosa ao pico da seca, com desafios humanos no trecho final.
const phases:Phase[]=[3,7,4,11,2,6,5,1,8,9,10,0].map((i,stage)=>{
 const p=phaseCatalog[i];
 if(stage===0)return {...p,name:'A Caatinga verdeja',goal:4,flowers:p.flowers.slice(0,4),hazards:[],description:'Comece na estação chuvosa: encontre quatro flores ilustrativas em uma paisagem verde, com poucos riscos. Aprenda os controles antes dos desafios mais difíceis.'};
 if(stage===1)return {...p,goal:5,flowers:p.flowers.slice(0,5),hazards:p.hazards.slice(0,1),season:'Estação chuvosa'};
 if(stage===9)return {...p,description:'Atravesse a borda dos painéis, alcance as flores nas faixas livres acima e abaixo das estruturas e volte à colônia. Encostar nos painéis custa uma vida.'};
 if(stage===8)return {...p,description:'Atravesse os corredores entre aerogeradores. Desvie das torres e pás, alcance as flores e retorne à colônia sem perder todas as vidas.'};
 if(stage===11)return {...p,goal:3,description:'No pico da seca, encontre três flores esparsas, descubra os micro-habitats das macambiras e da umburana e conserve energia para retornar à colônia.'};
 return p;
});
const isDryDiscovery=(g:Game)=>g.phase===phases.length-1;
type ConservationChoice={question:string;options:[string,string,string];correct:number;feedback:string};
const conservationChoices:Record<string,ConservationChoice>={
opening:{question:'Você encontrou macambiras e uma umburana com cavidade. Como proteger essa paisagem?',options:['Remover a umburana e limpar o afloramento para facilitar o acesso','Preservar a árvore com cavidade, o afloramento e a vegetação ao redor','Substituir a vegetação nativa por plantas ornamentais'],correct:1,feedback:'Proteger árvores com cavidades, afloramentos e vegetação nativa ajuda a manter micro-habitats e recursos para diferentes espécies.'},
windfarm:{question:'Como reduzir os impactos de um novo parque eólico sobre a Caatinga?',options:['Abrir novas estradas em todos os fragmentos','Priorizar áreas já alteradas e evitar habitats sensíveis','Retirar todas as árvores com cavidades'],correct:1,feedback:'O planejamento territorial e a avaliação de impactos ajudam a evitar supressão e fragmentação desnecessárias.'},
solar:{question:'Qual decisão pode diminuir o impacto territorial de uma usina solar?',options:['Avaliar alternativas locacionais e priorizar áreas já modificadas','Suprimir vegetação nativa sem levantamento','Isolar completamente os remanescentes de vegetação'],correct:0,feedback:'A localização e o manejo do empreendimento são fundamentais para reduzir perdas de habitat.'},
clearing:{question:'O que fazer ao encontrar uma umburana com cavidade usada pela fauna?',options:['Remover a árvore imediatamente','Fechar todos os ocos','Priorizar a conservação e avaliar o manejo com critérios técnicos'],correct:2,feedback:'Cavidades podem servir de abrigo a diferentes grupos; conservar estruturas-chave beneficia a biodiversidade.'}
};
type Mode='ready'|'playing'|'complete'|'failed'|'victory';
type Particle={x:number;y:number;vx:number;vy:number;life:number;maxLife:number;kind:'pollen'|'spark'|'danger'};
type Game={phase:number;mode:Mode;bee:Point;lives:number;energy:number;flowers:Flower[];hitTimer:number;resources:number;colony:number;nestFound:boolean;time:number;message:string;discoveries:boolean[]};
const start=(phase:number,resources:number,colony:number,nestFound:boolean):Game=>({phase,mode:'ready',bee:{x:90,y:215},lives:3,energy:100,flowers:phases[phase].flowers.map(f=>({...f,taken:false})),hitTimer:0,resources,colony,nestFound,time:0,message:'Prepare-se para voar',discoveries:[false,false]});
const clamp=(n:number,a:number,b:number)=>Math.max(a,Math.min(b,n));
function drawTree(ctx:CanvasRenderingContext2D,x:number,y:number,scale:number,leaf:number,index:number){
ctx.save();ctx.translate(x,y);ctx.scale(scale,scale);ctx.strokeStyle='#79583c';ctx.lineWidth=13;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(0,5);ctx.lineTo(0,-105);ctx.lineTo(-37,-150);ctx.moveTo(0,-105);ctx.lineTo(45,-156);ctx.moveTo(0,-70);ctx.lineTo(-59,-105);ctx.moveTo(0,-74);ctx.lineTo(60,-118);ctx.stroke();ctx.strokeStyle='rgba(235,197,133,.35)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-4,0);ctx.lineTo(-4,-95);ctx.moveTo(-4,-105);ctx.lineTo(-36,-149);ctx.stroke();ctx.strokeStyle='rgba(52,39,26,.3)';ctx.lineWidth=1.5;for(let k=0;k<5;k++){ctx.beginPath();ctx.moveTo(-5,-20-k*16);ctx.lineTo(5,-23-k*16);ctx.stroke()}
const positions:[number,number,number][]=[[-38,-151,39],[42,-158,42],[-57,-109,32],[56,-121,34],[0,-176,47]];
for(let i=0;i<Math.round(positions.length*leaf);i++){const [px,py,r]=positions[i];ctx.fillStyle=['#598d50','#76a45b','#89b965','#477c49'][((index+i)%4)];ctx.beginPath();ctx.ellipse(px,py,r,r*.76,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='rgba(198,230,150,.12)';ctx.beginPath();ctx.ellipse(px-8,py-9,r*.65,r*.45,0,0,Math.PI*2);ctx.fill()}ctx.restore()
}
function drawBee(ctx:CanvasRenderingContext2D,x:number,y:number,t:number,blink:boolean){
if(blink)return;
ctx.save();ctx.translate(x,y+Math.sin(t*5)*2);
ctx.fillStyle='rgba(38,48,29,.18)';ctx.beginPath();ctx.ellipse(0,31,27,6,0,0,Math.PI*2);ctx.fill();
for(const side of [-1,1]){ctx.save();ctx.rotate(side*.19);const wing=ctx.createLinearGradient(0,-37,0,0);wing.addColorStop(0,'rgba(238,251,246,.94)');wing.addColorStop(1,'rgba(130,186,180,.45)');ctx.fillStyle=wing;ctx.strokeStyle='rgba(89,136,131,.75)';ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(side*11,-19+Math.sin(t*35)*5,21,11,side*.35,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.restore()}
const body=ctx.createLinearGradient(-26,-18,22,19);body.addColorStop(0,'#e1ae69');body.addColorStop(.48,'#b9793d');body.addColorStop(1,'#70472d');ctx.fillStyle=body;ctx.beginPath();ctx.ellipse(-5,3,26,16,0,0,Math.PI*2);ctx.fill();
ctx.save();ctx.beginPath();ctx.ellipse(-5,3,26,16,0,0,Math.PI*2);ctx.clip();ctx.strokeStyle='#523725';ctx.lineWidth=7;for(const xx of [-16,-1,14]){ctx.beginPath();ctx.moveTo(xx,-20);ctx.lineTo(xx+2,23);ctx.stroke()}ctx.restore();
ctx.strokeStyle='#4d3428';ctx.lineWidth=2;for(const xx of [-14,-2,11]){ctx.beginPath();ctx.moveTo(xx,15);ctx.lineTo(xx-5,24);ctx.stroke()}
const head=ctx.createRadialGradient(16,-7,2,20,2,18);head.addColorStop(0,'#997044');head.addColorStop(1,'#4d3228');ctx.fillStyle=head;ctx.beginPath();ctx.arc(19,0,12,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#191e1c';ctx.beginPath();ctx.ellipse(25,-4,4,5,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#f5f6ed';ctx.beginPath();ctx.arc(26,-6,1.5,0,Math.PI*2);ctx.fill();
ctx.strokeStyle='#3b2c25';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(15,-10);ctx.quadraticCurveTo(10,-23,5,-22);ctx.moveTo(23,-10);ctx.quadraticCurveTo(27,-25,32,-22);ctx.stroke();
ctx.restore()
}
function drawFlower(ctx:CanvasRenderingContext2D,x:number,y:number,t:number){
ctx.save();ctx.translate(x,y);ctx.rotate(Math.sin(t*2+x)*.045);
ctx.strokeStyle='#4d8555';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(0,7);ctx.quadraticCurveTo(-6,24,2,42);ctx.stroke();
ctx.fillStyle='#638f55';ctx.beginPath();ctx.ellipse(-10,27,12,5,-.4,0,Math.PI*2);ctx.fill();
ctx.shadowColor='rgba(255,220,120,.5)';ctx.shadowBlur=15;
for(let i=0;i<6;i++){const a=i*Math.PI/3;const petal=ctx.createRadialGradient(Math.cos(a)*8,Math.sin(a)*8,1,Math.cos(a)*15,Math.sin(a)*15,16);petal.addColorStop(0,'#fff1b2');petal.addColorStop(1,i%2?'#d78b9e':'#e5b75d');ctx.fillStyle=petal;ctx.beginPath();ctx.ellipse(Math.cos(a)*14,Math.sin(a)*14,10,15,a,0,Math.PI*2);ctx.fill()}
ctx.shadowBlur=0;ctx.fillStyle='#8b6036';ctx.beginPath();ctx.arc(0,0,8,0,Math.PI*2);ctx.fill();for(let i=0;i<7;i++){const a=i*Math.PI*2/7;ctx.fillStyle='#f9db75';ctx.beginPath();ctx.arc(Math.cos(a)*5,Math.sin(a)*5,1.7,0,Math.PI*2);ctx.fill()}
ctx.restore()
}
function drawLandscapeDetails(ctx:CanvasRenderingContext2D,leaf:number,t:number){
for(let layer=0;layer<2;layer++){ctx.save();ctx.globalAlpha=layer===0?.25:.6;for(let i=0;i<22;i++){const x=(i*97+layer*37)%WIDTH,y=348+((i*41+layer*19)%85);const height=7+(i%5)*5;ctx.strokeStyle=leaf>.5?'#436f40':'#8d8455';ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-4,y-height);ctx.moveTo(x,y);ctx.lineTo(x+5,y-height*.75);ctx.stroke()}ctx.restore()}
for(let i=0;i<25;i++){const x=(i*131+17)%WIDTH,y=330+(i*59)%108;ctx.fillStyle=i%3===0?'#a48c69':'#cfb994';ctx.beginPath();ctx.ellipse(x,y,2+(i%4),1.5,0,0,Math.PI*2);ctx.fill()}
for(let i=0;i<9;i++){const x=(i*151+t*9)%WIDTH,y=88+(i*61)%245;ctx.fillStyle='rgba(255,244,191,.34)';ctx.beginPath();ctx.arc(x,y,1.4+(i%3),0,Math.PI*2);ctx.fill()}
}
function drawParticles(ctx:CanvasRenderingContext2D,particles:Particle[]){
for(const p of particles){ctx.save();ctx.globalAlpha=Math.max(0,p.life/p.maxLife);ctx.fillStyle=p.kind==='danger'?'#c86445':p.kind==='spark'?'#fff4bf':'#f4d05f';ctx.shadowColor=ctx.fillStyle;ctx.shadowBlur=p.kind==='spark'?14:6;ctx.beginPath();ctx.arc(p.x,p.y,p.kind==='spark'?3.2:2.5,0,Math.PI*2);ctx.fill();ctx.restore()}
}
function drawUmburana(ctx:CanvasRenderingContext2D,x:number,y:number,leaf:number,scale=1){
ctx.save();ctx.translate(x,y);ctx.scale(scale,scale);
ctx.lineCap='round';ctx.strokeStyle='#79624b';ctx.lineWidth=27;ctx.beginPath();ctx.moveTo(0,20);ctx.lineTo(-5,-100);ctx.lineTo(-47,-158);ctx.moveTo(-5,-100);ctx.lineTo(50,-153);ctx.moveTo(-6,-72);ctx.lineTo(65,-105);ctx.stroke();
ctx.strokeStyle='#c2a68b';ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(-9,10);ctx.lineTo(-12,-93);ctx.lineTo(-49,-154);ctx.stroke();
ctx.fillStyle='#322b24';ctx.beginPath();ctx.ellipse(0,-66,15,23,-.1,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#b89c7c';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(0,-66,19,27,-.1,0,Math.PI*2);ctx.stroke();
for(let i=0;i<Math.round(7*leaf);i++){const a=i*Math.PI*2/7;ctx.fillStyle=i%2?'#688c4f':'#88a75b';ctx.beginPath();ctx.ellipse(Math.cos(a)*64,-145+Math.sin(a)*35,30,21,a,0,Math.PI*2);ctx.fill()}
ctx.restore()
}
const turbines=[{x:260,y:285,scale:.68},{x:540,y:305,scale:1},{x:765,y:282,scale:.74}];
function hitsTurbine(bee:Point,t:number){
 return turbines.some(({x,y,scale})=>{
  // A torre e as pás seguem as mesmas dimensões e rotação do desenho.
  const dx=bee.x-x,dy=bee.y-y;
  const hubY=y-235*scale;
  if(Math.abs(dx)<12*scale+16&&bee.y>=hubY&&bee.y<=y+13)return true;
  const hx=bee.x-x,hy=bee.y-hubY;
  if(Math.hypot(hx,hy)<18)return true;
  for(let blade=0;blade<3;blade++){
   const angle=t*.65+(blade+1)*Math.PI*2/3-Math.PI/2;
   const tipX=x+Math.cos(angle)*65*scale,tipY=hubY+Math.sin(angle)*65*scale;
   const vx=tipX-x,vy=tipY-hubY;
   const u=clamp((hx*vx+hy*vy)/(vx*vx+vy*vy),0,1);
   if(Math.hypot(hx-vx*u,hy-vy*u)<13+7*scale)return true;
  }
  return false;
 });
}
function hitsSolarPanel(bee:Point){
 // Mesma grade de painéis desenhada na paisagem; compensação da inclinação do painel.
 for(let row=0;row<3;row++)for(let col=0;col<5;col++){
  const x=170+col*118+row*14,y=255+row*48;
  const localY=bee.y-y;
  const localX=bee.x-x+.22*localY;
  if(localX>=-13&&localX<=107&&localY>=-39&&localY<=22)return true;
 }
 return false;
}
function drawProximityWarning(ctx:CanvasRenderingContext2D,g:Game,t:number){
 const p=phases[g.phase];
 if(g.mode!=='playing'||(p.threat!=='solar'&&p.threat!=='windfarm'))return;
 const near=p.threat==='solar'
  ?[[-22,0],[22,0],[0,-22],[0,22]].some(([dx,dy])=>hitsSolarPanel({x:g.bee.x+dx,y:g.bee.y+dy}))
  :[[-30,0],[30,0],[0,-30],[0,30]].some(([dx,dy])=>hitsTurbine({x:g.bee.x+dx,y:g.bee.y+dy},t));
 if(!near)return;
 ctx.save();
 const a=.5+.3*Math.sin(t*8);
 ctx.strokeStyle='rgba(202,59,31,'+a+')';ctx.lineWidth=3;
 ctx.beginPath();ctx.arc(g.bee.x,g.bee.y,29+Math.sin(t*8)*3,0,Math.PI*2);ctx.stroke();
 ctx.fillStyle='#813a21';ctx.beginPath();ctx.roundRect(g.bee.x-35,g.bee.y-55,70,22,6);ctx.fill();
 ctx.fillStyle='#fff9e7';ctx.font='bold 12px system-ui';ctx.textAlign='center';ctx.fillText('⚠ DESVIE',g.bee.x,g.bee.y-39);
 ctx.restore();
}
function drawEnergyInfrastructure(ctx:CanvasRenderingContext2D,kind:'windfarm'|'solar'|'clearing',t:number){
ctx.save();
ctx.fillStyle='rgba(157,115,77,.34)';ctx.beginPath();ctx.moveTo(150,440);ctx.lineTo(385,290);ctx.lineTo(570,290);ctx.lineTo(750,440);ctx.fill();
if(kind==='windfarm'){for(const [x,y,scale] of [[260,285,.68],[540,305,1],[765,282,.74]] as [number,number,number][]){ctx.save();ctx.translate(x,y);ctx.scale(scale,scale);ctx.fillStyle='#c5c8c2';ctx.beginPath();ctx.moveTo(-10,0);ctx.lineTo(-4,-235);ctx.lineTo(4,-235);ctx.lineTo(12,0);ctx.closePath();ctx.fill();ctx.strokeStyle='#8b9895';ctx.lineWidth=3;ctx.stroke();ctx.translate(0,-235);ctx.fillStyle='#e7e9e3';ctx.beginPath();ctx.arc(0,0,11,0,Math.PI*2);ctx.fill();ctx.rotate(t*.65);for(let i=0;i<3;i++){ctx.rotate(Math.PI*2/3);ctx.beginPath();ctx.moveTo(0,-5);ctx.quadraticCurveTo(-9,-58,0,-91);ctx.quadraticCurveTo(8,-55,7,-5);ctx.fill()}ctx.restore()}}
if(kind==='solar'){for(let row=0;row<3;row++){for(let col=0;col<5;col++){const x=170+col*118+row*14,y=255+row*48;ctx.save();ctx.translate(x,y);ctx.transform(1,0,-.22,1,0,0);const panel=ctx.createLinearGradient(0,-28,90,5);panel.addColorStop(0,'#5b8390');panel.addColorStop(1,'#203d55');ctx.fillStyle=panel;ctx.fillRect(0,-26,94,35);ctx.strokeStyle='#c2ced0';ctx.lineWidth=2;ctx.strokeRect(0,-26,94,35);ctx.beginPath();ctx.moveTo(31,-26);ctx.lineTo(31,9);ctx.moveTo(62,-26);ctx.lineTo(62,9);ctx.moveTo(0,-8);ctx.lineTo(94,-8);ctx.stroke();ctx.restore()}}}
if(kind==='clearing'){for(const [x,y] of [[220,350],[450,350],[655,360]]){ctx.fillStyle='#78553b';ctx.fillRect(x-15,y-35,30,45);ctx.fillStyle='#ad8460';ctx.beginPath();ctx.ellipse(x,y-35,15,6,0,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#70513c';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(x,y-35,15,6,0,0,Math.PI*2);ctx.stroke()}ctx.fillStyle='rgba(166,129,91,.3)';ctx.fillRect(100,350,700,90)}
ctx.restore()
}
/** Camadas atmosféricas originais: silhuetas, serras, poeira e luz do sertão. */
function drawCinematicBackdrop(ctx:CanvasRenderingContext2D,leaf:number,rain:number,t:number){
 const wet=leaf>.55;
 ctx.save();
 // Horizonte com profundidade cromática e perspectiva atmosférica.
 for(let layer=0;layer<3;layer++){
  const base=200+layer*34,amp=12+layer*8;
  const gradient=ctx.createLinearGradient(0,base-85,0,base+110);
  gradient.addColorStop(0,wet?['#89ada2','#6c9485','#547e64'][layer]:['#c6b39e','#a99483','#8f7b66'][layer]);
  gradient.addColorStop(1,wet?['#9cbea6','#779f7e','#6c925f'][layer]:['#d6bea0','#c5a47f','#a98b6a'][layer]);
  ctx.globalAlpha=[.42,.53,.63][layer];ctx.fillStyle=gradient;
  ctx.beginPath();ctx.moveTo(0,HEIGHT);ctx.lineTo(0,base);
  for(let x=0;x<=WIDTH+10;x+=10){
   const y=base+Math.sin(x*.009+layer*1.8)*amp+Math.cos(x*.023+layer)*amp*.45;
   ctx.lineTo(x,y);
  }
  ctx.lineTo(WIDTH,HEIGHT);ctx.closePath();ctx.fill();
 }
 ctx.globalAlpha=1;
 // Escarpas distantes, com fissuras suaves e iluminação lateral.
 for(const [x,y,w,h] of [[80,255,100,57],[385,258,125,78],[700,259,112,64]]){
  ctx.fillStyle=wet?'rgba(75,101,80,.35)':'rgba(126,101,81,.38)';
  ctx.beginPath();ctx.moveTo(x-w,y+35);ctx.lineTo(x-w*.68,y-h*.3);
  ctx.lineTo(x-w*.22,y-h);ctx.lineTo(x+w*.15,y-h*.88);
  ctx.lineTo(x+w*.62,y-h*.2);ctx.lineTo(x+w,y+35);ctx.closePath();ctx.fill();
  ctx.strokeStyle='rgba(255,230,190,.18)';ctx.lineWidth=2;ctx.beginPath();
  ctx.moveTo(x-w*.22,y-h);ctx.lineTo(x-w*.12,y-h*.34);ctx.lineTo(x+w*.13,y+8);ctx.stroke();
 }
 // Névoa quente e poeira: movimento lento, sem prejudicar a leitura.
 const haze=ctx.createLinearGradient(0,185,0,330);
 haze.addColorStop(0,'rgba(255,244,211,0)');haze.addColorStop(.55,wet?'rgba(226,241,218,.11)':'rgba(255,230,182,.2)');
 haze.addColorStop(1,'rgba(255,244,211,0)');ctx.fillStyle=haze;ctx.fillRect(0,180,WIDTH,170);
 for(let i=0;i<20;i++){
  const x=(i*109+t*(rain>.4?3:8))%(WIDTH+50)-25;
  const y=70+(i*71)%215+Math.sin(t*.6+i)*5;
  ctx.globalAlpha=rain>.4?.12:.24;
  ctx.fillStyle=i%3?'#fff2c5':'#f6d8a1';ctx.beginPath();
  ctx.ellipse(x,y,1.2+(i%3)*.6,.9,0,0,Math.PI*2);ctx.fill();
 }
 ctx.restore();
}
/** Abertura autoral do capítulo da seca: uma paisagem viva, não um deserto. */
const firstChapterSites=[{x:625,y:325,label:'Afloramento com macambiras',message:'Macambiras são bromélias rupícolas e estruturam micro-habitats nos afloramentos.'},{x:800,y:255,label:'Umburana com cavidade',message:'Ocos de árvores oferecem abrigo para diferentes animais. Preserve as árvores maduras.'}];
function drawDiscoverySites(ctx:CanvasRenderingContext2D,g:Game,t:number){
 if(!isDryDiscovery(g))return;
 firstChapterSites.forEach((site,i)=>{
  const found=g.discoveries[i],pulse=1+Math.sin(t*3+i)*.1;
  ctx.save();ctx.translate(site.x,site.y);
  ctx.fillStyle=found?'rgba(83,160,91,.22)':'rgba(255,217,107,.22)';
  ctx.strokeStyle=found?'#9ad89b':'#fff2b6';ctx.lineWidth=2.5;
  ctx.beginPath();ctx.arc(0,0,(found?18:23)*pulse,0,Math.PI*2);ctx.fill();ctx.stroke();
  ctx.fillStyle=found?'#255b38':'#614b25';ctx.beginPath();ctx.arc(0,0,15,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#fff';ctx.font='bold 18px Arial';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(found?'✓':'?',0,0);
  ctx.restore();
 });
}
function drawOpeningChapter(ctx:CanvasRenderingContext2D,t:number){
 ctx.save();
 // Raios de luz que atravessam a copa; degradês leves para preservar desempenho.
 for(let i=0;i<5;i++){
  const x=585+i*54;
  const ray=ctx.createLinearGradient(x,40,x-140,440);
  ray.addColorStop(0,'rgba(255,244,190,.15)');ray.addColorStop(1,'rgba(255,231,175,0)');
  ctx.fillStyle=ray;ctx.beginPath();ctx.moveTo(x,34);ctx.lineTo(x+21,34);
  ctx.lineTo(x-85,440);ctx.lineTo(x-190,440);ctx.closePath();ctx.fill();
 }
 // Umburana antiga com oco; recurso de habitat, não mero elemento decorativo.
 drawUmburana(ctx,800,374,.12,1.25);
 ctx.fillStyle='rgba(42,34,23,.17)';ctx.beginPath();ctx.ellipse(795,391,75,12,0,0,Math.PI*2);ctx.fill();
 // Afloramento e macambiras ilustradas, bromélias rupícolas, sem associação floral presumida.
 drawRockFormation(ctx,625,405,.57,false);
 for(const [x,y,a] of [[598,366,-.2],[628,360,.15],[656,377,.4]]){
  ctx.save();ctx.translate(x,y);ctx.rotate(a);
  for(let k=-4;k<=4;k++){
   ctx.strokeStyle=k%2?'#7e9165':'#536c4e';ctx.lineWidth=4;
   ctx.beginPath();ctx.moveTo(0,8);ctx.quadraticCurveTo(k*4,-20,k*8,-37-Math.abs(k)*2);ctx.stroke();
  }
  ctx.restore();
 }
 // Vegetação espinhosa, serrapilheira e pedras em planos próximos.
 for(let i=0;i<11;i++){
  const x=32+i*79,y=404+(i%3)*10;
  ctx.strokeStyle=i%2?'#786c4a':'#867650';ctx.lineWidth=2.2;
  ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-6,y-15-(i%3)*5);
  ctx.moveTo(x,y);ctx.lineTo(x+8,y-10);ctx.stroke();
  ctx.fillStyle=i%2?'#aa916f':'#dbc19a';ctx.beginPath();
  ctx.ellipse(x+22,y+4,6+(i%3)*3,2.8,i*.4,0,Math.PI*2);ctx.fill();
 }
 // Pontos de luz suspensos, com cintilação discreta.
 for(let i=0;i<14;i++){
  const x=100+(i*137)%700,y=82+(i*53)%245;
  const a=.18+.15*(1+Math.sin(t*1.7+i*2))/2;
  ctx.fillStyle='rgba(255,231,153,'+a.toFixed(3)+')';
  ctx.beginPath();ctx.arc(x,y,1.4+(i%3)*.5,0,Math.PI*2);ctx.fill();
 }
 ctx.restore();
}
function drawMountainRange(ctx:CanvasRenderingContext2D,green:boolean,t:number){
ctx.save();ctx.globalAlpha=.48;const haze=ctx.createLinearGradient(0,170,0,360);haze.addColorStop(0,green?'#648c81':'#a28a78');haze.addColorStop(1,green?'#a4c1a0':'#d8b78a');ctx.fillStyle=haze;ctx.beginPath();ctx.moveTo(0,292);ctx.lineTo(0,252);for(let x=0;x<=WIDTH;x+=18){const y=238+Math.sin(x*.012)*23+Math.cos(x*.027)*13;ctx.lineTo(x,y)}ctx.lineTo(WIDTH,355);ctx.lineTo(0,355);ctx.fill();ctx.restore();
ctx.save();ctx.globalAlpha=.15;ctx.fillStyle='#fff5d5';ctx.fillRect(0,245+Math.sin(t*.3)*2,WIDTH,64);ctx.restore()
}
function drawRockFormation(ctx:CanvasRenderingContext2D,x:number,y:number,scale:number,green:boolean){
ctx.save();ctx.translate(x,y);ctx.scale(scale,scale);const rock=ctx.createLinearGradient(-60,-95,70,45);rock.addColorStop(0,'#d2ad85');rock.addColorStop(.5,'#a98267');rock.addColorStop(1,'#67584e');ctx.fillStyle=rock;ctx.beginPath();ctx.moveTo(-82,28);ctx.lineTo(-67,-34);ctx.lineTo(-26,-82);ctx.lineTo(17,-70);ctx.lineTo(62,-26);ctx.lineTo(84,30);ctx.closePath();ctx.fill();ctx.strokeStyle='rgba(65,53,47,.48)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-26,-82);ctx.lineTo(-9,-26);ctx.lineTo(10,20);ctx.moveTo(17,-70);ctx.lineTo(30,-20);ctx.lineTo(84,30);ctx.stroke();
ctx.fillStyle='rgba(255,226,186,.24)';ctx.beginPath();ctx.moveTo(-67,-34);ctx.lineTo(-26,-82);ctx.lineTo(-9,-26);ctx.lineTo(-35,24);ctx.lineTo(-82,28);ctx.closePath();ctx.fill();
for(let i=0;i<10;i++){const xx=-60+i*13,yy=2+(i%4)*5;ctx.strokeStyle=green?'#58704d':'#806e4c';ctx.lineWidth=1.6;ctx.beginPath();ctx.moveTo(xx,yy+23);ctx.lineTo(xx-3,yy+12);ctx.lineTo(xx+3,yy+5);ctx.stroke()}ctx.restore()
}
function drawForeground(ctx:CanvasRenderingContext2D,leaf:number,t:number){
ctx.save();const vignette=ctx.createRadialGradient(450,210,135,450,210,560);vignette.addColorStop(0,'rgba(34,29,22,0)');vignette.addColorStop(1,'rgba(36,28,23,.27)');ctx.fillStyle=vignette;ctx.fillRect(0,0,WIDTH,HEIGHT);
for(let i=0;i<9;i++){const x=i*129-30,y=HEIGHT+13;ctx.save();ctx.translate(x,y);ctx.rotate(Math.sin(t*1.1+i)*.025);ctx.strokeStyle=leaf>.5?'#426e43':'#8b784d';ctx.lineWidth=2.5;for(let k=-2;k<=2;k++){ctx.beginPath();ctx.moveTo(0,0);ctx.quadraticCurveTo(k*8,-20,k*11,-40-(i%3)*8);ctx.stroke()}ctx.restore()}ctx.restore()
}
function drawOpeningRestoration(ctx:CanvasRenderingContext2D,t:number){
 ctx.save();
 // A conservação preserva a paisagem e evidencia plantas nativas no primeiro plano.
 for(let i=0;i<14;i++){
  const x=130+i*54,y=381+(i%3)*14;
  ctx.strokeStyle=i%2?'#597a47':'#718b4c';ctx.lineWidth=2.8;
  ctx.beginPath();ctx.moveTo(x,y+11);ctx.quadraticCurveTo(x-6,y-8,x-9,y-19);ctx.moveTo(x,y+11);ctx.quadraticCurveTo(x+9,y-7,x+13,y-16);ctx.stroke();
  ctx.fillStyle=i%2?'#8da962':'#9cbb72';ctx.beginPath();ctx.ellipse(x-9,y-18,7,4,-.4,0,Math.PI*2);ctx.ellipse(x+13,y-16,7,4,.4,0,Math.PI*2);ctx.fill();
 }
 ctx.fillStyle='rgba(21,67,39,.87)';ctx.beginPath();ctx.roundRect(256,42,388,43,12);ctx.fill();
 ctx.textAlign='center';ctx.fillStyle='#fff6dc';ctx.font='bold 17px system-ui';
 ctx.fillText('✓ HABITATS PRESERVADOS',450,69);
 for(let i=0;i<10;i++){
  const x=155+i*67,y=110+(i%4)*39+Math.sin(t*2+i)*4;
  ctx.fillStyle='rgba(255,222,128,.6)';ctx.beginPath();ctx.arc(x,y,2.3,0,Math.PI*2);ctx.fill();
 }
 ctx.restore();
}
function drawConservationOutcome(ctx:CanvasRenderingContext2D,kind:'windfarm'|'solar'|'clearing',t:number){
ctx.save();
if(kind==='windfarm'){ctx.fillStyle='rgba(60,108,64,.26)';ctx.beginPath();ctx.moveTo(0,440);ctx.quadraticCurveTo(220,330,430,390);ctx.quadraticCurveTo(670,310,900,400);ctx.lineTo(900,440);ctx.fill();for(let i=0;i<11;i++){const x=115+i*66,y=370+Math.sin(i*2)*19;ctx.strokeStyle='#4c7644';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x,y-25);ctx.stroke();ctx.fillStyle=i%2?'#648f4b':'#86a85a';ctx.beginPath();ctx.arc(x,y-28,10,0,Math.PI*2);ctx.fill()}}
if(kind==='solar'){for(let i=0;i<8;i++){const x=115+i*91,y=355+(i%3)*12;ctx.fillStyle='#61894d';ctx.beginPath();ctx.ellipse(x,y,22,12,0,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#456d3c';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x,y+13);ctx.lineTo(x,y-20);ctx.stroke()}ctx.fillStyle='rgba(65,120,73,.18)';ctx.fillRect(0,370,WIDTH,70)}
if(kind==='clearing'){drawUmburana(ctx,390,360,.65,.85);drawUmburana(ctx,630,365,.7,.72);ctx.fillStyle='rgba(104,155,75,.18)';ctx.fillRect(0,370,WIDTH,70)}
ctx.fillStyle='rgba(21,67,39,.84)';ctx.beginPath();ctx.roundRect(265,35,370,43,12);ctx.fill();ctx.textAlign='center';ctx.fillStyle='#fff6dc';ctx.font='bold 17px system-ui';ctx.fillText('✓ PAISAGEM PROTEGIDA',450,62);
for(let i=0;i<12;i++){const x=100+i*71,y=110+(i%4)*50+Math.sin(t*2+i)*4;ctx.fillStyle='rgba(242,218,124,.55)';ctx.beginPath();ctx.arc(x,y,2,0,Math.PI*2);ctx.fill()}ctx.restore()
}
function paint(ctx:CanvasRenderingContext2D,g:Game,t:number,particles:Particle[],restored:boolean,trail:{x:number;y:number;life:number}[],tilt:number){
const p=phases[g.phase],green=p.leaf>.6;
const sky=ctx.createLinearGradient(0,0,0,HEIGHT);sky.addColorStop(0,p.rain>.4?'#a7d3d8':'#b7dce7');sky.addColorStop(1,p.rain>.4?'#e4f0d8':'#f7e6bf');ctx.fillStyle=sky;ctx.fillRect(0,0,WIDTH,HEIGHT);
const glow=ctx.createRadialGradient(790,76,6,790,76,110);glow.addColorStop(0,'rgba(255,244,184,.8)');glow.addColorStop(1,'rgba(255,244,184,0)');ctx.fillStyle=glow;ctx.fillRect(675,0,225,190);ctx.fillStyle=p.rain>.5?'#f6e3b3':'#ffdf98';ctx.beginPath();ctx.arc(790,76,29,0,Math.PI*2);ctx.fill();
if(p.rain>.2){ctx.fillStyle='#e5f0ef';for(const [x,y] of [[150,72],[470,55],[715,96]]){ctx.beginPath();ctx.ellipse(x,y,70,23,0,0,Math.PI*2);ctx.fill()}}
drawCinematicBackdrop(ctx,p.leaf,p.rain,t);
ctx.fillStyle=green?'#9abf7d':'#cbb48a';ctx.beginPath();ctx.moveTo(0,305);ctx.quadraticCurveTo(190,215,390,310);ctx.quadraticCurveTo(620,240,900,310);ctx.lineTo(900,440);ctx.lineTo(0,440);ctx.fill();
ctx.fillStyle=green?'#6b9e60':'#b89c70';ctx.beginPath();ctx.moveTo(0,370);ctx.quadraticCurveTo(230,320,430,370);ctx.quadraticCurveTo(710,325,900,360);ctx.lineTo(900,440);ctx.lineTo(0,440);ctx.fill();
for(let i=0;i<7;i++){ctx.save();ctx.globalAlpha=.42;drawTree(ctx,35+i*153,302+(i%2)*13,.43+(i%3)*.09,p.leaf,i);ctx.restore()}for(let i=0;i<7;i++)drawTree(ctx,65+i*137,337+(i%2)*20,.65+(i%3)*.12,p.leaf,i);drawLandscapeDetails(ctx,p.leaf,t);if(p.umburana){drawUmburana(ctx,745,350,p.leaf,.82);drawUmburana(ctx,190,355,p.leaf,.64)}if(p.threat)drawEnergyInfrastructure(ctx,p.threat,t);if(p.rocks){drawRockFormation(ctx,135,372,1.1,green);drawRockFormation(ctx,435,385,.8,green);drawRockFormation(ctx,725,375,1.05,green)}else{drawRockFormation(ctx,540,396,.38,green);drawRockFormation(ctx,285,411,.28,green)}
if(p.rocks){for(const [x,y] of [[140,365],[410,377],[680,370]]){ctx.fillStyle='#8b8b7b';ctx.beginPath();ctx.moveTo(x-85,y+30);ctx.lineTo(x-53,y-31);ctx.lineTo(x+12,y-56);ctx.lineTo(x+80,y+25);ctx.closePath();ctx.fill();ctx.strokeStyle='#6b746a';ctx.lineWidth=3;ctx.stroke();for(let k=0;k<5;k++){ctx.save();ctx.translate(x+(k-2)*17,y-37-(k%2)*6);ctx.rotate((k-2)*.28);ctx.fillStyle='#608d54';ctx.beginPath();ctx.ellipse(0,-19,5,31,0,0,Math.PI*2);ctx.fill();ctx.restore()}ctx.strokeStyle='#b69b46';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x,y-34);ctx.lineTo(x,y-76);ctx.stroke();for(let j=0;j<5;j++){ctx.fillStyle='#e7cc66';ctx.beginPath();ctx.arc(x+(j%2?5:-5),y-76+j*8,3,0,Math.PI*2);ctx.fill()}}}
if(isDryDiscovery(g)){drawOpeningChapter(ctx,t);drawDiscoverySites(ctx,g,t)}
if(p.wind){ctx.strokeStyle='#ffffff';ctx.lineWidth=3;ctx.globalAlpha=.6;for(let i=0;i<9;i++){const x=(i*137+t*90)%WIDTH,y=65+(i*47)%250;ctx.beginPath();ctx.moveTo(x,y);ctx.quadraticCurveTo(x+30,y-9,x+70,y);ctx.stroke()}ctx.globalAlpha=1}

ctx.fillStyle='#6d5036';ctx.fillRect(32,175,76,92);ctx.fillStyle='#4e3528';ctx.beginPath();ctx.ellipse(84,217,18,23,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#fff5e3';ctx.font='bold 15px system-ui';ctx.fillText('COLÔNIA',27,287);
ctx.save();ctx.translate(77,214);ctx.strokeStyle='#d9a44f';ctx.lineWidth=3;for(let k=0;k<5;k++){const a=k*Math.PI*2/5;ctx.beginPath();ctx.moveTo(Math.cos(a)*8,Math.sin(a)*8);ctx.lineTo(Math.cos(a)*16,Math.sin(a)*16);ctx.stroke()}ctx.restore();
if(p.nest){ctx.strokeStyle='#805b3b';ctx.lineWidth=17;ctx.beginPath();ctx.moveTo(p.nest.x,p.nest.y+75);ctx.lineTo(p.nest.x,p.nest.y-62);ctx.stroke();ctx.fillStyle='#4c3426';ctx.beginPath();ctx.ellipse(p.nest.x+8,p.nest.y,21,27,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#fff6dc';ctx.font='bold 15px system-ui';ctx.fillText('CAVIDADE',p.nest.x-43,p.nest.y-83)}
for(const f of g.flowers){if(!f.taken)drawFlower(ctx,f.x,f.y,t)}
for(const h of p.hazards){ctx.save();ctx.translate(h.x,h.y);ctx.shadowColor='rgba(64,35,22,.35)';ctx.shadowBlur=12;ctx.fillStyle='#b78b4d';ctx.beginPath();ctx.roundRect(-19,-21,38,42,5);ctx.fill();ctx.shadowBlur=0;ctx.fillStyle='#eee3be';ctx.fillRect(-16,-13,32,26);ctx.fillStyle='#694b35';ctx.font='bold 25px system-ui';ctx.fillText('!',-4,9);ctx.restore()}
if(p.rain>.2){ctx.strokeStyle='#5d9db8';ctx.lineWidth=1.8;ctx.globalAlpha=.48;for(let i=0;i<Math.round(p.rain*35);i++){const x=(i*91+t*48)%WIDTH,y=(i*49+t*95)%HEIGHT;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-6,y+15);ctx.stroke()}ctx.globalAlpha=1}
if(restored&&p.threat)drawConservationOutcome(ctx,p.threat,t);
if(restored&&isDryDiscovery(g))drawOpeningRestoration(ctx,t);drawParticles(ctx,particles);
ctx.save();for(const point of trail){ctx.globalAlpha=point.life/.36*.42;ctx.fillStyle='#fff4c9';ctx.beginPath();ctx.arc(point.x,point.y,2.5+point.life*3,0,Math.PI*2);ctx.fill()}ctx.restore();
ctx.save();ctx.translate(g.bee.x,g.bee.y);ctx.rotate(tilt);drawBee(ctx,0,0,t,g.hitTimer>0&&Math.floor(t*9)%2===0);ctx.restore();
drawProximityWarning(ctx,g,t);drawForeground(ctx,p.leaf,t);
if(g.mode==='ready'||g.mode==='complete'||g.mode==='failed'||g.mode==='victory'){ctx.save();ctx.fillStyle=restored?'rgba(19,46,35,.24)':'rgba(19,46,35,.65)';ctx.fillRect(0,0,WIDTH,HEIGHT);ctx.textAlign='center';ctx.fillStyle='#fff6df';ctx.font='bold 32px system-ui';ctx.fillText(g.mode==='ready'?(g.phase===0?'CAPÍTULO I · A CAATINGA VERDEJA':'JANDA · PRONTA PARA VOAR'):g.mode==='failed'?'ENERGIA ESGOTADA':g.mode==='victory'?'JORNADA CONCLUÍDA!':restored?'HABITAT PROTEGIDO!':'MISSÃO CUMPRIDA!',WIDTH/2,HEIGHT/2-14);ctx.font='17px system-ui';ctx.fillText(g.mode==='ready'?(g.phase===0?'A jornada começa na estação chuvosa':'Explore a Caatinga e descubra seus recursos'):g.mode==='failed'?'Recomece e experimente outra rota':g.mode==='victory'?'Você acompanhou um ciclo sazonal':restored?'Sua decisão mudou a paisagem':'Agora é hora de cuidar do ninho',WIDTH/2,HEIGHT/2+22);ctx.restore()}
ctx.fillStyle='#204e35';ctx.font='bold 17px system-ui';ctx.fillText('CAATINGA · FLORESTA TROPICAL SAZONALMENTE SECA',18,29);
if(g.flowers.every(f=>f.taken)){ctx.fillStyle='#1e6340';ctx.font='bold 21px system-ui';ctx.fillText(p.nest&&!g.nestFound?'Encontre a cavidade na árvore →':'Retorne à colônia ←',WIDTH/2-160,62)}
}
export function JandaAdventure(){
const canvas=useRef<HTMLCanvasElement>(null),keys=useRef<Set<string>>(new Set()),pointer=useRef<Point|null>(null),game=useRef<Game>(start(0,0,3,false)),particles=useRef<Particle[]>([]);
const [ui,setUi]=useState(()=>({...game.current,flowers:game.current.flowers.map(f=>({...f}))}));
const flight=useRef({vx:0,vy:0,tilt:0});
const flightTrail=useRef<{x:number;y:number;life:number}[]>([]);
const [introOpen,setIntroOpen]=useState(true);
const upgrades=useRef({speed:0,shields:0});
const [bonusStats,setBonusStats]=useState({speed:0,shields:0});
const [nestStep,setNestStep]=useState(false);
const [choiceResolved,setChoiceResolved]=useState(false);
const restoredScene=useRef(false);
const [choiceFeedback,setChoiceFeedback]=useState('');
const [choiceAttempts,setChoiceAttempts]=useState(0);

const sync=useCallback(()=>{const g=game.current;setUi({...g,bee:{...g.bee},flowers:g.flowers.map(f=>({...f}))})},[]);
const advance=useCallback(()=>{flight.current={vx:0,vy:0,tilt:0};flightTrail.current=[];particles.current=[];restoredScene.current=false;setNestStep(false);setChoiceResolved(false);setChoiceFeedback('');setChoiceAttempts(0);const g=game.current;if(g.phase===phases.length-1){g.mode='victory';sync();return}game.current=start(g.phase+1,g.resources,g.colony,g.nestFound);sync()},[sync]);
const finishNest=useCallback(()=>{upgrades.current.speed=Math.min(5,upgrades.current.speed+1);upgrades.current.shields=Math.min(5,upgrades.current.shields+1);setBonusStats({...upgrades.current});advance()},[advance]);
const retry=useCallback(()=>{flight.current={vx:0,vy:0,tilt:0};flightTrail.current=[];particles.current=[];setNestStep(false);setChoiceResolved(false);setChoiceFeedback('');setChoiceAttempts(0);const g=game.current;game.current=start(g.phase,Math.max(0,g.resources-g.flowers.filter(f=>f.taken).length),g.colony,g.nestFound);sync()},[sync]);
const restart=useCallback(()=>{upgrades.current={speed:0,shields:0};setBonusStats({speed:0,shields:0});setIntroOpen(true);flight.current={vx:0,vy:0,tilt:0};flightTrail.current=[];particles.current=[];setNestStep(false);setChoiceResolved(false);setChoiceFeedback('');setChoiceAttempts(0);game.current=start(0,0,3,false);sync()},[sync]);
useEffect(()=>{const down=(e:KeyboardEvent)=>{if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','w','a','s','d'].includes(e.key)){if(e.key.startsWith('Arrow'))e.preventDefault();keys.current.add(e.key.toLowerCase())}};const up=(e:KeyboardEvent)=>keys.current.delete(e.key.toLowerCase());window.addEventListener('keydown',down);window.addEventListener('keyup',up);return()=>{window.removeEventListener('keydown',down);window.removeEventListener('keyup',up)}},[]);
useEffect(()=>{const c=canvas.current,ctx=c?.getContext('2d');if(!c||!ctx)return;let raf=0,last=0,frames=0;
const burst=(x:number,y:number,kind:Particle['kind'])=>{for(let i=0;i<14;i++){const a=i*Math.PI*2/14,speed=38+(i%5)*20;particles.current.push({x,y,vx:Math.cos(a)*speed,vy:Math.sin(a)*speed-20,life:.6,maxLife:.6,kind})}};
const tick=(now:number)=>{const dt=Math.min((now-last)/1000||0,.04);last=now;const g=game.current,p=phases[g.phase];g.time+=dt;
if(g.mode==='playing'){let dx=0,dy=0;const k=keys.current;if(k.has('arrowleft')||k.has('a'))dx--;if(k.has('arrowright')||k.has('d'))dx++;if(k.has('arrowup')||k.has('w'))dy--;if(k.has('arrowdown')||k.has('s'))dy++;
if(pointer.current){dx=pointer.current.x-g.bee.x;dy=pointer.current.y-g.bee.y;const d=Math.hypot(dx,dy);if(d<10){dx=0;dy=0}else{dx/=d;dy/=d}}
const norm=Math.hypot(dx,dy)||1;
const flightSpeed=220*(1+upgrades.current.speed*.08);
const targetX=dx/norm*flightSpeed+(p.wind||0),targetY=dy/norm*flightSpeed;
const ease=1-Math.exp(-dt*7.5);
flight.current.vx+=(targetX-flight.current.vx)*ease;
flight.current.vy+=(targetY-flight.current.vy)*ease;
flight.current.tilt+=(clamp(flight.current.vy/400,-.28,.28)-flight.current.tilt)*ease;
g.bee.x=clamp(g.bee.x+flight.current.vx*dt,23,WIDTH-23);
g.bee.y=clamp(g.bee.y+flight.current.vy*dt,45,HEIGHT-28);
if(frames%3===0&&Math.hypot(flight.current.vx,flight.current.vy)>35)flightTrail.current.push({x:g.bee.x-18,y:g.bee.y+6,life:.36});
g.energy=clamp(g.energy-(1.25+g.phase*.19)*dt,0,100);g.hitTimer=Math.max(0,g.hitTimer-dt);
if(isDryDiscovery(g)){firstChapterSites.forEach((site,i)=>{
 if(!g.discoveries[i]&&Math.hypot(site.x-g.bee.x,site.y-g.bee.y)<42){
  g.discoveries[i]=true;g.energy=clamp(g.energy+10,0,100);
  g.message='Descoberta: '+site.message;burst(site.x,site.y,'spark');
 }
})}
for(const f of g.flowers){if(!f.taken&&Math.hypot(f.x-g.bee.x,f.y-g.bee.y)<34){f.taken=true;g.energy=clamp(g.energy+Math.max(6,20-g.phase),0,100);g.resources+=1;g.message='Flor visitada! Recurso educativo coletado.';burst(f.x,f.y,'pollen')}}
if(g.hitTimer===0&&((p.threat==='windfarm'&&hitsTurbine(g.bee,now/1000))||(p.threat==='solar'&&hitsSolarPanel(g.bee)))){
 if(upgrades.current.shields>0){upgrades.current.shields--;setBonusStats({...upgrades.current});g.message=p.threat==='solar'?'A proteção bônus absorveu a colisão com o painel solar!':'A proteção bônus absorveu o choque com o aerogerador!';}
 else{g.lives=Math.max(0,g.lives-1);g.message=g.lives>0?(p.threat==='solar'?'Colisão com painel solar! Você perdeu uma vida. Desvie das estruturas.':'Colisão com aerogerador! Você perdeu uma vida. Desvie das torres e das pás.'):'Janda perdeu todas as vidas nesta fase. Tente novamente.';}
 g.hitTimer=2;burst(g.bee.x,g.bee.y,'danger');
 g.bee.x=90;g.bee.y=215;flight.current={vx:0,vy:0,tilt:0};
 if(g.lives===0)g.mode='failed';
}
for(const h of p.hazards){if(g.hitTimer===0&&Math.hypot(h.x-g.bee.x,h.y-g.bee.y)<34){if(upgrades.current.shields>0){upgrades.current.shields--;setBonusStats({...upgrades.current});g.message='Proteção bônus do ninho utilizada!';}else{g.energy=clamp(g.energy-24,0,100);g.message='Obstáculo! Evite a área de risco.';}g.hitTimer=1.4;burst(g.bee.x,g.bee.y,'danger')}}
if(g.flowers.every(f=>f.taken)){if(p.nest&&!g.nestFound&&Math.hypot(p.nest.x+8-g.bee.x,p.nest.y-g.bee.y)<49){g.nestFound=true;g.message='Cavidade encontrada! Uma colônia social requer rainha e outras operárias.'}
if((!p.nest||g.nestFound)&&(!isDryDiscovery(g)||g.discoveries.every(Boolean))&&Math.hypot(84-g.bee.x,217-g.bee.y)<50){g.mode='complete';g.colony+=g.phase===0?3:g.phase===1?3:2;g.message='Fase concluída! Recursos entregues à colônia ilustrativa.';burst(84,217,'spark')}}
if(g.energy===0){g.mode='failed';g.message='Janda ficou sem energia. Experimente uma rota diferente.'}
if(frames%8===0||g.mode!=='playing')sync()}
flightTrail.current=flightTrail.current.filter(p=>(p.life-=dt)>0);
particles.current=particles.current.filter(p=>p.life>0);for(const p of particles.current){p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=65*dt;p.life-=dt}paint(ctx,g,now/1000,particles.current,restoredScene.current,flightTrail.current,flight.current.tilt);frames++;raf=requestAnimationFrame(tick)};raf=requestAnimationFrame(tick);return()=>cancelAnimationFrame(raf)},[sync]);
const phase=phases[ui.phase],taken=ui.flowers.filter(f=>f.taken).length;
const conservation=ui.phase===phases.length-1?conservationChoices.opening:phase.threat?conservationChoices[phase.threat]:undefined;
const handlePointer=(e:ReactPointerEvent<HTMLCanvasElement>)=>{const r=e.currentTarget.getBoundingClientRect();pointer.current={x:(e.clientX-r.left)*WIDTH/r.width,y:(e.clientY-r.top)*HEIGHT/r.height}};
return <div className="jandaAdventure"><div className="jandaHero"><div><span className="jandaEyebrow">MELISFERA PLAY · AVENTURA PRINCIPAL</span><h2>🐝 Janda — Uma Jornada pela Caatinga</h2><p>Das chuvas ao auge da seca: explore a Caatinga, encontre recursos cada vez mais escassos no jogo e supere desafios crescentes para ajudar a colônia.</p></div><div className="jandaPortrait"><picture><source media="(prefers-reduced-motion: reduce)" srcSet="/images/abelhas/Janda_sem_fundo.png"/><img src="/images/abelhas/Janda_acenando_sem_fundo.gif" alt="Janda, mascote da MELISFERA RN, com chapéu de couro nordestino e acessórios de campo, acenando para dar boas-vindas à aventura" width={240} height={310} loading="eager" decoding="async" className="jandaOfficialPortrait"/></picture></div></div>
<div className="jandaPhases" aria-label="Progresso da aventura">{phases.map((p,i)=><div key={p.name} className={'jandaPhase '+(i===ui.phase?'current':i<ui.phase?'passed':'locked')}><span>{['🌧️','🌿','🏡','🌱','🌦️','🪨','💨','🌳','🌬️','☀️','🪵','☀️'][i]}</span><strong>{i+1}. {p.name}</strong><small>{p.season}</small></div>)}</div>
<div className="jandaHud"><span>🌼 Flores: <strong>{taken}/{phase.goal}</strong></span><span>⚡ Energia: <strong>{Math.round(ui.energy)}%</strong></span>{(phase.threat==='windfarm'||phase.threat==='solar')&&<span>❤️ Vidas: <strong>{'❤️'.repeat(ui.lives)}{'♡'.repeat(3-ui.lives)}</strong></span>}<span>🍯 Recursos: <strong>{ui.resources}</strong></span><span>🐝 Colônia: <strong>{ui.colony} operárias fictícias</strong></span><span>🏡 Abrigo: <strong>{ui.nestFound?'Encontrado':'Em busca'}</strong></span><span>🗺️ Fase <strong>{ui.phase+1}/{phases.length}</strong></span><span>🎯 Dificuldade: <strong>{ui.phase<3?'Inicial':ui.phase<7?'Intermediária':'Avançada'}</strong></span>{bonusStats.speed>0&&<span>✨ Voo: <strong>+{bonusStats.speed*8}%</strong></span>}{bonusStats.shields>0&&<span>🛡️ Proteções: <strong>{bonusStats.shields}</strong></span>}{ui.phase===phases.length-1&&<span>🔎 Descobertas: <strong>{ui.discoveries.filter(Boolean).length}/2</strong></span>}</div>
<div className="jandaEnergy"><span style={{width:ui.energy+'%'}}/></div>
{ui.phase===0&&ui.mode==='ready'&&introOpen&&<section aria-label="Prólogo de Janda" style={{background:'linear-gradient(125deg,#183d31,#35503b 58%,#6e5636)',color:'#fff6df',borderRadius:18,padding:'clamp(20px,4vw,40px)',margin:'18px 0',boxShadow:'0 12px 32px rgba(27,45,31,.18)',border:'1px solid rgba(243,209,129,.36)'}}><span style={{fontSize:12,fontWeight:800,letterSpacing:3,color:'#f0d18c'}}>MELISFERA PLAY · PRÓLOGO</span><h3 style={{fontFamily:'Georgia,serif',fontSize:'clamp(26px,3.5vw,40px)',lineHeight:1.12,margin:'14px 0',color:'#fff6df'}}>Quando a Caatinga desperta</h3><p style={{maxWidth:690,fontSize:17,lineHeight:1.75,color:'#f3ead4'}}>As chuvas chegaram e muitas árvores recuperaram suas folhas. Entre flores, rochas, bromélias e umburanas, Janda, uma operária de jandaíra, começa a explorar a Caatinga em uma fase de maior disponibilidade ilustrativa de recursos.</p><p style={{maxWidth:690,lineHeight:1.7,color:'#f3ead4'}}>A jornada começa com rotas mais tranquilas. Com a passagem das estações, os recursos do jogo diminuem, o voo exige mais energia e novos obstáculos aparecem. A Caatinga continua sendo uma floresta tropical sazonalmente seca, rica em biodiversidade.</p><div style={{display:'flex',gap:12,flexWrap:'wrap',alignItems:'center',marginTop:22}}><button type="button" className="playBtn primary" onClick={()=>{setIntroOpen(false);game.current.mode='playing';game.current.message='Capítulo I: explore a Caatinga na estação chuvosa e visite as flores.';sync()}}>▶ Começar a jornada</button><button type="button" className="playBtn" onClick={()=>setIntroOpen(false)} style={{color:'#fff6df',borderColor:'#f0d18c',background:'transparent'}}>Ver cenário primeiro</button></div><p style={{fontSize:12,marginTop:18,color:'#e5d9bd'}}>Narrativa ficcional baseada em características ecológicas reais. Os desafios não representam medições de campo.</p></section>}
<canvas ref={canvas} width={WIDTH} height={HEIGHT} className="jandaCanvas" aria-label="Jogo de aventura com Janda, flores, árvores da Caatinga, ninho e obstáculos. Mova a abelha com setas, WASD ou arrastando o dedo." onPointerDown={e=>{e.currentTarget.setPointerCapture(e.pointerId);handlePointer(e)}} onPointerMove={e=>{if(pointer.current)handlePointer(e)}} onPointerUp={()=>{pointer.current=null}} onPointerCancel={()=>{pointer.current=null}}/>
<div className="jandaBottom"><div><h3>{phase.season} · {phase.name}</h3><p>{phase.description}</p>{phase.threat==='windfarm'&&<p className="jandaHint">⚠️ Atenção às torres e às pás giratórias! Desvie dos aerogeradores: cada colisão sem proteção bônus custa uma vida. Você começa esta fase com três vidas.</p>}{phase.threat==='solar'&&<p className="jandaHint">⚠️ Desvie dos painéis solares! Nesta fase, encostar nas estruturas custa uma vida, a menos que Janda tenha proteção bônus. Você começa com três vidas.</p>}{ui.mode==='complete'&&(!conservation||choiceResolved)&&<p className="jandaHint">Missão concluída! Você pode seguir diretamente para a próxima fase ou visitar o ninho (opcional) para ganhar +8% de velocidade de voo e uma proteção contra obstáculos. As melhorias são fictícias e exclusivas do jogo.</p>}{ui.phase===phases.length-1&&<p className="jandaHint">Explore os dois pontos marcados com ? (macambiras e umburana), visite as flores e retorne à colônia. Os caminhos são livres; os obstáculos podem ser contornados.</p>}<p className="jandaHint" role="status">{ui.message}</p></div><div className="jandaActions">{ui.mode==='ready'&&!introOpen&&<button className="playBtn primary" onClick={()=>{game.current.mode='playing';game.current.message='Voe até as flores e conserve energia!';sync()}}>▶ Iniciar fase</button>}{ui.mode==='complete'&&!nestStep&&(!conservation||choiceResolved)&&<><button className="playBtn primary" onClick={advance}>➡ Próxima fase</button><button className="playBtn" onClick={()=>setNestStep(true)}>🏡 Ninho bônus · ganhar melhorias</button></>}{ui.mode==='failed'&&<button className="playBtn primary" onClick={retry}>↻ Tentar novamente</button>}{ui.mode==='victory'&&<button className="playBtn primary" onClick={restart}>↻ Nova aventura</button>}{ui.mode==='playing'&&<button className="playBtn" onClick={()=>{game.current.mode='ready';game.current.message='Jogo pausado';sync()}}>⏸ Pausar</button>}<button className="playBtn" onClick={()=>{setNestStep(false);setChoiceResolved(false);restoredScene.current=false;setChoiceFeedback('');setChoiceAttempts(0);particles.current=[];const g=game.current;game.current=start(g.phase,Math.max(0,g.resources-taken),g.colony,g.nestFound&&g.phase!==7);sync()}}>Reiniciar fase</button></div></div>
{ui.mode==='complete'&&conservation&&!choiceResolved&&<section className="jandaDecision" aria-label="Decisão de conservação"><span className="jandaDecisionKicker">🌿 DESAFIO DE CONSERVAÇÃO · FASE {ui.phase+1}</span><h3>{conservation.question}</h3><p>Escolha a alternativa que melhor protege os habitats. Você pode tentar novamente. A decisão correta modifica a paisagem ilustrada.</p><div className="jandaDecisionOptions">{conservation.options.map((option,index)=><button type="button" key={index} onClick={()=>{setChoiceAttempts(n=>n+1);if(index===conservation.correct){setChoiceResolved(true);restoredScene.current=true;setChoiceFeedback('✓ '+conservation.feedback)}else{setChoiceFeedback('Essa alternativa pode ampliar os impactos. Considere a conservação da vegetação nativa e tente novamente.')}}}>{option}</button>)}</div>{choiceFeedback&&<p className="jandaDecisionFeedback" role="status">{choiceFeedback}</p>}</section>}
{ui.mode==='complete'&&conservation&&choiceResolved&&<div className="jandaDecisionSuccess" role="status"><strong>🌱 Decisão de conservação concluída!</strong><p>{choiceFeedback} Tentativas: {choiceAttempts}. Observe a mudança no cenário acima. Agora você pode entrar no ninho.</p></div>}
{ui.mode==='complete'&&nestStep&&<><div style={{display:'flex',justifyContent:'flex-end',margin:'12px 0'}}><button type="button" className="playBtn" onClick={advance}>Pular bônus e ir à próxima fase →</button></div><NestWorkshop key={ui.phase} phase={ui.phase} onFinished={finishNest}/></>}
{ui.mode==='complete'&&<div className="jandaLesson" role="status"><strong>🏅 Fase concluída!</strong><p>{phase.lesson}</p></div>}
{ui.mode==='victory'&&<div className="jandaLesson" role="status"><strong>🏆 Janda completou a jornada!</strong><p>Você começou na estação chuvosa, enfrentou desafios crescentes e chegou ao auge da seca, reconhecendo recursos, cavidades e a importância da conservação.</p><p>{phase.lesson}</p></div>}
<div className="jandaColony" aria-label="Desenvolvimento ilustrativo da colônia"><div><strong>🏡 A colônia de Janda</strong><p>Uma comunidade fictícia que cresce conforme os recursos são entregues.</p></div><div className="jandaColonyCells">{Array.from({length:Math.min(18,ui.colony)},(_,i)=><span key={i} title="Operária ilustrativa" aria-hidden="true">⬡</span>)}</div><div className="jandaColonyNote">👑 Rainha · 🥚 Cria · 🐝 Operárias · 🍯 Reservas</div></div><div className="jandaScience"><h3>🌿 Diário científico de Janda</h3><p>{phase.lesson}</p><p><strong>Importante:</strong> Janda representa uma operária de <em>Melipona subnitida</em>. Uma colônia real depende de rainha, operárias e cria; a formação de novas colônias envolve processos sociais. Os números de operárias, recursos, obstáculos e o calendário do jogo são ficcionais e não representam dados de campo.</p><p>Use as setas ou WASD no computador; em celulares, toque e arraste para guiar Janda. A trilha não pressupõe que todas as espécies floresçam ao mesmo tempo.</p></div></div>
}
