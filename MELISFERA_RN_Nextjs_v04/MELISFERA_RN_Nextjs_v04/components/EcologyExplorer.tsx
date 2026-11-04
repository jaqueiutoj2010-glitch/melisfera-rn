'use client';
import {useMemo,useState} from 'react';
import Link from 'next/link';
import type {Taxon} from '@/lib/catalog';
type RecordItem={name:string;dry:number;rainy:number;total:number;note:string;sourceId:string;plant:string;interaction:string;service:string};
export default function EcologyExplorer({records,taxa}:{records:RecordItem[];taxa:Taxon[]}){
 const [query,setQuery]=useState('');const [mode,setMode]=useState<'all'|'interactions'|'services'>('all');
 const filtered=useMemo(()=>records.filter(r=>{const q=query.trim().toLocaleLowerCase('pt-BR');return (!q||[r.name,r.plant,r.interaction,r.service,r.note].some(v=>v.toLocaleLowerCase('pt-BR').includes(q)))&&(mode!=='services'||r.service.toLowerCase().includes('poliniza'))}),[query,mode,records]);
 return <section className="ecologyExplorer" aria-label="Consulta de interações ecológicas">
 <h2>Consultar interações por espécie</h2><p>Pesquise pelo nome da abelha, planta visitada ou tipo de interação. Os resultados abaixo representam exclusivamente evidências já inseridas na plataforma.</p>
 <div className="ecologyControls"><label>Pesquisar espécie, planta ou interação<input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Ex.: Melipona, Xylocopa, Encholirium"/></label><label>Tipo de informação<select value={mode} onChange={e=>setMode(e.target.value as typeof mode)}><option value="all">Todas as evidências</option><option value="interactions">Interações observadas</option><option value="services">Serviços potenciais relacionados</option></select></label></div>
 <p className="note" aria-live="polite">{filtered.length} táxon(s) encontrado(s) · Fonte atualmente cadastrada: Jorge et al. (2024)</p>
 <div className="ecologyResults">{filtered.map(r=>{const t=taxa.find(t=>t.name.toLowerCase()===r.name.toLowerCase());return <article className="ecologyResult" key={r.name}><h3>{t?<Link href={`/especies/${t.id}`}><i>{r.name}</i></Link>:<i>{r.name}</i>}</h3><p><strong>Planta:</strong> <i>{r.plant}</i></p><p><strong>Interação documentada:</strong> {r.interaction}</p><p><strong>Serviço ecossistêmico:</strong> {r.service}</p><p><strong>Registros no estudo:</strong> {r.total.toLocaleString('pt-BR')} (seca: {r.dry.toLocaleString('pt-BR')}; chuvosa: {r.rainy.toLocaleString('pt-BR')})</p><p className="note">{r.note}</p><p><a href="https://doi.org/10.1007/s13744-024-01152-7" target="_blank" rel="noreferrer">Fonte científica: Jorge et al. (2024)</a></p></article>})}</div>
 {filtered.length===0&&<p className="notice">Nenhuma evidência cadastrada corresponde à pesquisa. Isso não significa ausência de interação na natureza.</p>}
 </section>
}