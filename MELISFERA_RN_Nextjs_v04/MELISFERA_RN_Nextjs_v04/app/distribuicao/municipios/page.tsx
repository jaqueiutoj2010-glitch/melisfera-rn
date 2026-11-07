import type {Metadata} from 'next';
import Link from 'next/link';
import {taxa} from '@/lib/catalog';
import {registrosMunicipais} from '@/lib/registros-municipais';

export const metadata:Metadata={title:'Registros por município | MELISFERA RN',description:'Ocorrências de abelhas por município, com fontes, autoria e níveis de evidência.'};
const fontes=[
{id:'eiajoaocamara2025',title:'Diagnóstico de abelhas — Complexo Fotovoltaico João Câmara (EIA, 2025)',url:'',tipo:'EIA · dados primários',status:'14 espécies em duas campanhas; documento fornecido pelo pesquisador',municipios:['João Câmara'],nota:'Planoambiental (2025), seção Abelhas do EIA: campanhas em dezembro de 2024 e março de 2025, 418 indivíduos, 14 espécies detectadas exclusivamente por busca ativa. A tabela inclui também espécies de dados secundários: não tratá-las como ocorrências locais. Documento fornecido pelo pesquisador, sem URL pública verificada.'},
{id:'macambira2024',title:'Semi-arid’s Unsung Heroes: Hymenoptera and the Vital Ecosystem Services Enabled by Encholirium spectabile',url:'https://doi.org/10.1007/s13744-024-01152-7',tipo:'Inventário e interações · macambiras',status:'Santa Maria: estudo principal; João Câmara: amostragem complementar informada',municipios:['Santa Maria','João Câmara'],nota:'Tabela 1 apresenta oito táxons de abelhas no conjunto do estudo, sete até espécie e Centris sp. até gênero. O monitoramento principal ocorreu em Santa Maria; o texto informa observações complementares em João Câmara. Não atribuir abundâncias da tabela a cada município separadamente.'},
{id:'artropodes2024',title:'The Arrow Macambira as an Important Habitat for the Arthropod Fauna in Rocky Outcrops of the Brazilian Semi-Arid Region',url:'https://doi.org/10.1007/s13744-024-01145-6',tipo:'Inventário de artrópodes · macambiras',status:'Santa Maria: localidade explicitamente documentada',municipios:['Santa Maria'],nota:'Estudo de 2011–2018 em Santa Maria; registra Apidae no nível de família e menciona Apis mellifera e Trigona spinipes. Não converter os totais de Apidae em contagens por espécie.'},
{id:'ifrn2025',title:'Digitalização e curadoria de dados da coleção científica de abelhas no Rio Grande do Norte',url:'https://ojs.revistagesec.org.br/secretariado/article/view/4726',tipo:'Coleção científica',status:'Localidades citadas em estudo; registros individuais pendentes',municipios:['Martins','Pau dos Ferros','Portalegre'],nota:'O estudo informa 1.207 exemplares coletados em 29 municípios entre 2015 e 2023; apenas três municípios destacados são individualizados aqui. Os demais dependem de extração da publicação ou do acervo.'},
{id:'euglossina2017',title:'Fauna de Euglossina de um fragmento de Mata Atlântica do Alto Oeste Potiguar',url:'https://doi.org/10.18378/rvads.v12i3.4832',tipo:'Inventário faunístico',status:'Município da pesquisa identificado; lista de espécies por local pendente',municipios:['Portalegre'],nota:'Amostragens em fragmento de Mata Atlântica/brejo de altitude. Os táxons serão associados ao município somente após conferência do texto integral.'},
{id:'flona2013',title:'Origem floral dos recursos coletados por Melipona subnitida e Plebeia aff. flavocincta',url:'https://www.gvaa.com.br/revista/index.php/CVADS/article/view/2434',tipo:'Interação ecológica',status:'Área de estudo identificada; não é inventário municipal completo',municipios:['Assú'],nota:'Análise polínica de recursos armazenados em ninhos na FLONA do Assú. Não confundir presença de pólen com prova direta de polinização.'},
{id:'flora2021',title:'Percepção etnobotânica associada à apicultura no Semiárido Potiguar',url:'https://doi.org/10.1590/2236-8906-10/2021',tipo:'Conhecimento etnobotânico',status:'Município de pesquisa identificado; sem inventário faunístico',municipios:['Marcelino Vieira'],nota:'Fonte sobre flora de interesse apícola, não para acrescentar espécies de abelhas.'},
{id:'melip2011',title:'Abelhas indígenas criadas no Rio Grande do Norte',url:'https://doi.org/10.21708/avb.2011.5.1.2015',tipo:'Meliponicultura',status:'29 municípios pesquisados; localidades individuais não extraídas',municipios:[],nota:'104 meliponários em 29 municípios. A fonte documenta criação; não autoriza transformar municípios de criatórios em ocorrências silvestres.'}
];

const fontesSerra=[{title:'Zanella (2000) — The bees of the Caatinga',url:'https://doi.org/10.1051/apido:2000148',nota:'Inventário anual na ESEC-Seridó; 83 espécies em uma área de Serra Negra do Norte na Tabela I. A lista de 187 espécies refere-se à Caatinga como um todo. No apêndice, o código 8 identifica material coletado em Serra Negra do Norte; extração taxonômica completa pendente.'},{title:'Zanella (2003) — Abelhas da Estação Ecológica do Seridó',url:'https://periodicos.uefs.br/index.php/sociobiology/article/view/3372/0',nota:'Capítulo de livro citado em literatura posterior; a lista de espécies deve ser conferida no texto integral.'},{title:'Melo & Zanella (2010) — Sazonalidade da nidificação',url:'https://doi.org/10.13102/scb7971',nota:'Estudo na ESEC-Seridó com nove táxons de abelhas; verificar sobreposição de amostragem com a publicação de 2012, sem somar automaticamente as contagens.'},{title:'Melo & Zanella (2012) — Dinâmica de fundação de ninhos',url:'https://doi.org/10.5039/agraria.v7i4a1966',nota:'Tabela 1: nove táxons de abelhas, 46 ninhos e 111 indivíduos emergidos, entre 2004 e 2006.'}];
const coordenadasSede:Record<string,{lat:number;lon:number;ibge:string}>={
 'João Câmara':{lat:-5.54,lon:-35.82,ibge:'2405801'},
 'Santa Maria':{lat:-5.84,lon:-35.69,ibge:'2409332'}
};
const estudoMacambira={title:'Jorge et al. (2024) — Hymenoptera e serviços ecossistêmicos em Encholirium spectabile',url:'https://doi.org/10.1007/s13744-024-01152-7',nota:'Oito táxons de abelhas no conjunto do estudo; abundâncias não devem ser repartidas entre municípios.'};
const especiesMacambira=['Apis mellifera','Centris sp.','Melipona mandacaia','Melipona subnitida','Plebeia flavocincta','Trigona spinipes','Xylocopa abbreviata','Xylocopa macambirae'];
const norm=(v:string)=>v.normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase();
const municipiosCatalogo=taxa.flatMap(t=>t.sources.map(s=>(s.municipality||'').trim())).filter(v=>v&&v!=='Não informado'&&!v.startsWith('RN;'));
const municipios=Array.from(new Set([...municipiosCatalogo,...fontes.flatMap(f=>f.municipios),...registrosMunicipais.map(r=>r.municipio)])).sort((a,b)=>a.localeCompare(b,'pt-BR'));
const situacao:Record<string,string>={
 primario_documentado:'EIA · dado primário',
 autoral_a_documentar:'Observação autoral · metadados a complementar',
 fonte_primaria_a_conferir:'Catálogo · fonte primária a conferir'
};
export default function Municipios(){return <main className="shell section">
<p className="eyebrow">MELISFERA RN · RASTREABILIDADE TERRITORIAL</p>
<h1>Registros de abelhas por município</h1>
<p className="intro">Uma ficha por município, reunindo táxons, fontes científicas, observações de campo e documentos ambientais. A mesma espécie pode ter múltiplas fontes sem ser contada duas vezes.</p>
<div style={{background:'#edf4e9',border:'1px solid #d5e3d3',borderRadius:16,padding:22,margin:'25px 0 36px',lineHeight:1.7}}>
<strong>Critério de interpretação:</strong> cada vínculo representa uma associação entre táxon, município e fonte, não um exemplar único. A presença em catálogo, um registro autoral e um levantamento com dados primários são evidências de naturezas diferentes. Coordenadas municipais representam apenas a sede, não os locais de coleta.
</div>
<h2>Fichas municipais</h2>
<p>Municípios sem espécies individualizadas permanecem identificados para extração futura. Os números abaixo não substituem indicadores de riqueza validada.</p>
<div style={{display:'grid',gap:18,margin:'24px 0 44px'}}>
{municipios.map(m=>{
const registros=registrosMunicipais.filter(r=>norm(r.municipio)===norm(m));
const especies=Array.from(new Set(registros.map(r=>r.taxon))).sort((a,b)=>a.localeCompare(b,'pt-BR'));
const estudos=fontes.filter(f=>f.municipios.some(v=>norm(v)===norm(m)));
const candidatos=taxa.filter(t=>t.sources.some(s=>norm(s.municipality||'')===norm(m)));
const sede=coordenadasSede[m];
const macambira=m==='Santa Maria'||m==='João Câmara';
return <section key={m} style={{border:'1px solid #d7e3d8',borderRadius:18,padding:'22px 25px',background:'#fbfcf8'}}>
<details open={macambira}>
<summary style={{cursor:'pointer',fontSize:23,fontFamily:'Georgia,serif',color:'#194a30',fontWeight:600}}>{m} <span style={{fontFamily:'Arial,sans-serif',fontSize:13,fontWeight:400,color:'#587061'}}>· {especies.length} táxons individualizados</span></summary>
<div style={{marginTop:17}}>
{sede&&<p style={{fontSize:13}}><strong>Sede municipal (coordenadas aproximadas):</strong> {sede.lat.toFixed(2)}, {sede.lon.toFixed(2)} · IBGE {sede.ibge} · <a href={'https://www.openstreetmap.org/?mlat='+sede.lat+'&mlon='+sede.lon+'#map=11/'+sede.lat+'/'+sede.lon} target="_blank" rel="noopener noreferrer">Ver mapa ↗</a></p>}
{m==='João Câmara'&&<p><strong>Fonte principal:</strong> Planoambiental (2025), EIA do Complexo Fotovoltaico João Câmara, seção Abelhas. Foram informadas 14 espécies e 418 indivíduos em duas campanhas (dezembro de 2024 e março de 2025). Os 418 indivíduos pertencem exclusivamente ao EIA e não devem ser somados a Santa Maria.</p>}
{m==='Santa Maria'&&<p><strong>Fonte principal:</strong> Jaqueiuto S. Jorge, registros de campo informados pelo autor, com as mesmas 14 espécies da lista primária do EIA de João Câmara. Datas, vouchers e abundâncias individuais ainda não foram anexados.</p>}
{especies.length>0?<div style={{overflowX:'auto'}}><table style={{width:'100%',borderCollapse:'collapse',textAlign:'left'}}><thead><tr><th style={{padding:10}}>Táxon</th><th style={{padding:10}}>Fonte</th><th style={{padding:10}}>Situação</th></tr></thead><tbody>{especies.map(nome=>{const fontesTaxon=registros.filter(r=>r.taxon===nome);return <tr key={nome} style={{borderTop:'1px solid #dce5db'}}><td style={{padding:10}}><i>{nome}</i></td><td style={{padding:10,fontSize:13}}>{fontesTaxon.map(r=><div key={r.fonte}>{r.url?<a href={r.url} target="_blank" rel="noopener noreferrer">{r.fonte} ↗</a>:r.fonte}</div>)}</td><td style={{padding:10,fontSize:13}}>{fontesTaxon.map(r=><div key={r.fonte}>{situacao[r.status]||r.status}{'ninhos' in r&&'individuos' in r?' · '+String(r.ninhos)+' ninhos / '+String(r.individuos)+' emergidos':''}</div>)}</td></tr>})}</tbody></table></div>:<p>Nenhuma espécie individualizada nesta rodada. A fonte municipal está identificada, mas a extração taxonômica ainda é necessária.</p>}
{macambira&&<div style={{background:'#f1f5ed',padding:17,borderRadius:12,marginTop:22}}>
<h3 style={{margin:'0 0 8px'}}>Publicações complementares sobre macambiras</h3>
<p>O artigo de Hymenoptera apresenta oito táxons no conjunto da pesquisa: {especiesMacambira.map((n,i)=><span key={n}><i>{n}</i>{i<especiesMacambira.length-1?', ':'.'}</span>)} Esses dados não constituem oito ocorrências municipais adicionais automaticamente, nem permitem distribuir as abundâncias publicadas entre Santa Maria e João Câmara.</p>
<p><a href={estudoMacambira.url} target="_blank" rel="noopener noreferrer">{estudoMacambira.title} ↗</a></p>
{m==='Santa Maria'&&<p><a href="https://doi.org/10.1007/s13744-024-01145-6" target="_blank" rel="noopener noreferrer">Jorge et al. (2024) — Artrópodes associados às macambiras ↗</a> · O estudo também inclui outros artrópodes; não transformar totais de Apidae em abundâncias por espécie.</p>}
</div>}
{m==='Serra Negra do Norte'&&<div style={{background:'#f1f5ed',padding:17,borderRadius:12,marginTop:22}}><h3>Levantamentos específicos da ESEC-Seridó</h3>{fontesSerra.map(f=><p key={f.title}><a href={f.url} target="_blank" rel="noopener noreferrer">{f.title} ↗</a> — {f.nota}</p>)}<p><strong>Atenção:</strong> os registros de Melo &amp; Zanella (2010, 2012) podem compartilhar material amostral; não somar indivíduos, ninhos ou espécies sem conferir a correspondência entre as publicações.</p></div>}
{estudos.length>0&&<div style={{marginTop:20}}><h3>Fontes adicionais associadas ao município</h3>{estudos.map(f=><p key={f.id} style={{lineHeight:1.65}}><strong>{f.tipo}:</strong> {f.url?<a href={f.url} target="_blank" rel="noopener noreferrer">{f.title} ↗</a>:f.title}. <span style={{color:'#587061'}}>{f.status}.</span></p>)}</div>}
<p style={{fontSize:13,color:'#617468',marginTop:18}}>{candidatos.length} entradas candidatas vinculadas ao município no catálogo geral, ainda sujeitas à auditoria de fonte e duplicatas.</p>
</div></details></section>})}
</div>
<h2>Fontes estaduais sem município individualizado</h2>
<p>As referências abaixo estão disponíveis para a próxima etapa de extração. Não foram convertidas em ocorrências municipais.</p>
<div className="taxaList">{fontes.filter(f=>f.municipios.length===0).map(f=><article className="reference" key={f.id}><h3>{f.title}</h3><p>{f.nota}</p>{f.url&&<a href={f.url} target="_blank" rel="noopener noreferrer">Consultar fonte ↗</a>}</article>)}</div>
<p style={{marginTop:30}}><Link href="/distribuicao">← Voltar ao atlas</Link> · <Link href="/fontes">Todas as fontes</Link></p>
</main>}
