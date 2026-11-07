import Link from 'next/link';
import {taxa} from '@/lib/catalog';
import {familyCounts,namedFamilies,unassignedFamilies,sourceCounts,ecologyRecords,taxaWithLocality,countLinks} from '@/lib/insights';
import './indicadores.css';

export const metadata={title:'Indicadores de biodiversidade'};

const metrics=[
  {label:'Entradas taxonômicas',icon:'✿',kind:'taxa'},
  {label:'Famílias identificadas',icon:'⬡',kind:'families'},
  {label:'Vínculos com fontes',icon:'▤',kind:'links'},
  {label:'Entradas com município declarado',icon:'⌖',kind:'locality'},
  {label:'Táxons com dados de visitas florais',icon:'❀',kind:'flowers'}
];

export default function Indicators(){
  const max=familyCounts[0]?.[1]||1;
  const values=[taxa.length,namedFamilies.length,countLinks,taxaWithLocality,ecologyRecords.length];
  const unassigned=unassignedFamilies.reduce((a,[,n])=>a+n,0);
  return <section className="shell section indicatorsPage">
    <div className="indicatorsHero"><div className="indicatorsHeading">
      <p className="eyebrow">PAINEL CIENTÍFICO <span className="indicatorRule" aria-hidden="true"/></p>
      <h1>Indicadores da biodiversidade</h1>
      <p className="intro">Um retrato da diversidade de abelhas documentada para o Rio Grande do Norte. Explore a composição taxonômica e a cobertura das fontes que sustentam o catálogo.</p>
      <p className="indicatorsCaution">Os números representam entradas e vínculos documentais da base atual. Não correspondem necessariamente a espécies distintas validadas, espécimes ou ocorrências únicas.</p>
    </div>
      <div className="indicatorsHeroPhoto" role="img" aria-label="Fotografia original de abelha visitando flor de maracujá"/></div>
    <div className="indicatorStats">
      {metrics.map((m,i)=><article className={'indicatorStat indicatorStat'+i} key={m.kind}>
        <span className="indicatorStatIcon" aria-hidden="true">{m.icon}</span>
        <div><strong>{values[i]}</strong><span>{m.label}</span></div>
      </article>)}
    </div>
    <div className="indicatorPanels">
      <article className="indicatorPanel">
        <h2><span aria-hidden="true">⬡</span> Composição por família</h2>
        <div className="indicatorPanelBody">
          {familyCounts.map(([f,n])=><div className="indicatorBarRow" key={f}>
            <div className="indicatorBarLabel"><span>{f}</span><strong>{n}</strong></div>
            <div className="indicatorBarTrack" role="img" aria-label={f+': '+n+' entradas'}><div style={{width:`${n/max*100}%`}}/></div>
          </div>)}
          <p className="indicatorPanelNote">{unassigned} {unassigned===1?'entrada sem família identificada':'entradas sem família identificada'}. “Não determinada” é uma categoria de classificação pendente, não uma família biológica.</p>
        </div>
      </article>
      <article className="indicatorPanel">
        <h2><span aria-hidden="true">▤</span> Cobertura por fonte</h2>
        <div className="indicatorPanelBody">
          {sourceCounts.filter(s=>s.n>0).map(s=><div className="indicatorSource" key={s.id}>
            <strong>{s.n}</strong><span><b>{s.id}</b> · {s.label}</span>
          </div>)}
          <p className="indicatorSourceNotice"><span aria-hidden="true">ⓘ</span> Uma entrada pode estar vinculada a várias fontes. Portanto, os totais se sobrepõem.</p>
        </div>
      </article>
    </div>
    <section className="indicatorExploreSection"><h2>Explore também <span aria-hidden="true"/></h2><div className="indicatorExploreCards"><Link href="/especies"><span className="exploreIcon">✿</span><span><strong>Espécies</strong><small>Catálogo de abelhas do RN</small></span><b aria-hidden="true">›</b></Link><Link href="/distribuicao"><span className="exploreIcon">⌖</span><span><strong>Distribuição</strong><small>Atlas e registros territoriais</small></span><b aria-hidden="true">›</b></Link><Link href="/ecologia"><span className="exploreIcon">❀</span><span><strong>Ecologia e serviços</strong><small>Interações e polinização</small></span><b aria-hidden="true">›</b></Link><Link href="/ameacas"><span className="exploreIcon">♧</span><span><strong>Ameaças</strong><small>Riscos e conservação</small></span><b aria-hidden="true">›</b></Link></div></section>
  </section>;
}
