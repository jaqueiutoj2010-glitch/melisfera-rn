import EditorialBeeGallery from '@/components/EditorialBeeGallery';
import Link from 'next/link';
import EcologyExplorer from '@/components/EcologyExplorer';
import {ecologyRecords} from '@/lib/insights';
import {taxa} from '@/lib/catalog';
export const metadata={title:'Interações e serviços ecossistêmicos das abelhas no RN',description:'Evidências, mecanismos e benefícios das abelhas para a Caatinga, a agricultura, a meliponicultura e a conservação no Rio Grande do Norte.'};
const pilares=[
{icon:'🌼',title:'Polinização da flora nativa',text:'O transporte de pólen entre flores pode sustentar a reprodução de plantas e a oferta de frutos e sementes para outras espécies. Na Caatinga, o resultado depende da identidade e da eficiência dos visitantes, da fenologia e da disponibilidade de recursos.',limite:'Visitação floral documentada não é prova de fecundação ou produção de sementes.',link:'polinizacao-nativa'},
{icon:'🍈',title:'Produção agrícola',text:'No RN, fruticultura irrigada, agricultura familiar e cultivos dependentes de visitantes florais oferecem oportunidades para estudar a contribuição de polinizadores nativos e manejados à produtividade e à qualidade dos frutos.',limite:'Não extrapolar taxas globais de dependência ou valores monetários para os municípios potiguares.',link:'agricultura'},
{icon:'🌵',title:'Recursos durante a estação seca',text:'A floração, a estrutura e os micro-habitats de macambiras rupícolas podem manter recursos e oportunidades de uso por himenópteros em paisagens sazonalmente secas. A conservação dos afloramentos integra a proteção dessas interações.',limite:'O benefício é contextual: não implica que toda espécie de abelha dependa da macambira.',link:'polinizacao-nativa'},
{icon:'🍯',title:'Mel e produtos da colmeia',text:'A apicultura e a meliponicultura podem gerar alimentos, renda e oportunidades de manejo sustentável. A jandaíra (Melipona subnitida) tem importância particular na tradição de criação de abelhas sem ferrão do estado.',limite:'Colônias manejadas não são evidência automática de ocorrência silvestre local.',link:'produtos-colmeia'},
{icon:'🎓',title:'Educação, cultura e conhecimento',text:'Abelhas, flores e meliponários oferecem oportunidades de educação ambiental, pesquisa participativa e valorização dos saberes locais sobre a Caatinga e outros ambientes do RN.',limite:'Valores culturais devem ser documentados com participação das comunidades.',link:'socioculturais'},
{icon:'📈',title:'Economia e segurança alimentar',text:'Polinização e produtos apícolas podem contribuir para cadeias produtivas e meios de vida. Avaliações econômicas exigem dados locais de produção, dependência de polinizadores, preços, custos e incerteza.',limite:'Potencial econômico não equivale a benefício já medido.',link:'economia-rural'}];
const steps=[['01','Visita floral','A abelha utiliza néctar ou pólen; observação comportamental.'],['02','Transporte de pólen','Identificação de pólen aderido e sua compatibilidade com a planta.'],['03','Polinização efetiva','Deposição de pólen compatível ou resultado reprodutivo atribuível ao visitante.'],['04','Benefício mensurado','Frutos, sementes, qualidade, estabilidade ou valor econômico avaliados experimentalmente.']];
export default function Ecology(){return <main className="shell section melisferaEcologyPage melisferaStandardPage">
<style>{`
.melisferaEcologyPage{font-size:17px;line-height:1.7}
.melisferaEcologyPage>h1{font-size:clamp(34px,3.3vw,46px);line-height:1.14;letter-spacing:-.025em;max-width:1050px}
.melisferaEcologyPage>section>h2{font-size:clamp(27px,2.6vw,36px);line-height:1.2;margin-bottom:20px}
.melisferaEcologyPage .intro{font-size:clamp(18px,1.5vw,20px);line-height:1.75}
.melisferaEcologyPage .eyebrow{font-size:13px;letter-spacing:.09em;font-weight:700}
.melisferaEcologyPage .notice{font-size:16px;line-height:1.65}
.melisferaEcologyPage .jumpLinks{font-size:15px;line-height:1.5;gap:10px}
.melisferaEcologyPage .melisferaCaseStudy p{font-size:17px;line-height:1.8}
.melisferaEcologyPage .melisferaCaseStudy figcaption{font-size:14px;line-height:1.55}
.melisferaEcologyPage .melisferaServiceBody h3{font-size:clamp(23px,1.85vw,28px);line-height:1.22}
.melisferaEcologyPage .melisferaServiceBody>p:not(.melisferaEvidence){font-size:17px;line-height:1.7}
.melisferaEcologyPage .melisferaEvidence{font-size:14px;line-height:1.6}
.melisferaEcologyPage .melisferaServiceBody>a{font-size:16px;line-height:1.5}
.melisferaEcologyPage .melisferaServicePhoto figcaption{font-size:14px;line-height:1.4}
.melisferaEcologyPage .melisferaServiceIllustration small{font-size:14px}
.melisferaEcologyPage .twoCol .panel h3{font-size:clamp(21px,1.7vw,25px);line-height:1.3}
.melisferaEcologyPage .twoCol .panel p{font-size:16px;line-height:1.75}
.melisferaEcologyPage .statCard span{font-size:15px;line-height:1.5}
.melisferaEcologyPage .note{font-size:14px;line-height:1.6}
.melisferaEcologyPage .sourceItem{font-size:15px;line-height:1.65}
.melisferaEcologyPage #evidencias h3{font-size:19px;line-height:1.35}
.melisferaEcologyPage #evidencias div[style] p{font-size:15px!important;line-height:1.65}
.melisferaEcologyPage #dados{font-size:16px;line-height:1.65}
.melisferaEcologyPage #dados input,.melisferaEcologyPage #dados select{font-size:16px;min-height:44px}
@media(max-width:570px){.melisferaEcologyPage{font-size:16px}.melisferaEcologyPage .melisferaServiceBody{padding:20px}.melisferaEcologyPage .melisferaCaseStudy p{font-size:16px}.melisferaEcologyPage .melisferaServiceBody>p:not(.melisferaEvidence){font-size:16px}}

.melisferaCaseStudy{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:30px;align-items:center;background:#f5f8f1;border:1px solid #dce8d8;border-radius:22px;padding:clamp(18px,3vw,34px);margin-top:22px}
.melisferaCaseStudy p{line-height:1.75}
.melisferaCaseStudy figure{margin:0;min-width:0}
.melisferaCaseStudy img{display:block;width:100%;height:clamp(280px,32vw,440px);object-fit:cover;object-position:center;border-radius:16px}
.melisferaCaseStudy figcaption{font-size:12px;color:#526c59;margin-top:10px;line-height:1.5}
.melisferaCaseStudy a{font-weight:650}
@media(max-width:740px){.melisferaCaseStudy{grid-template-columns:1fr}.melisferaCaseStudy img{height:300px}}
.melisferaServicesGrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px;margin-top:26px}
.melisferaServiceCard{margin:0!important;padding:0!important;overflow:hidden;display:flex;flex-direction:column;min-width:0}
.melisferaServicePhoto{margin:0;position:relative;aspect-ratio:4/3;overflow:hidden;background:#eaf0e7}
.melisferaServicePhoto img{width:100%;height:100%;object-fit:cover;display:block}
.melisferaServicePhoto figcaption{position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(0,35,22,.82));color:white;padding:24px 14px 12px;font-size:12px}
.melisferaServiceIllustration{aspect-ratio:4/3;background:linear-gradient(135deg,#eaf1e4,#d9e8d5);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px}
.melisferaServiceIllustration span{font-size:64px}.melisferaServiceIllustration small{color:#46674c;font-size:12px}
.melisferaServiceBody{padding:22px;display:flex;flex-direction:column;flex:1}
.melisferaServiceBody h3{font:500 clamp(21px,2vw,27px) Georgia,serif;margin:10px 0 16px;line-height:1.18}
.melisferaServiceBody>p:not(.melisferaEvidence){line-height:1.65;flex:1}
.melisferaEvidence{font-size:13px;color:#667668;border-top:1px solid #e3e9e0;padding-top:14px;margin-top:20px}
.melisferaServiceBody>a{margin-top:10px;font-weight:600}
@media(max-width:850px){.melisferaServicesGrid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:570px){.melisferaServicesGrid{grid-template-columns:1fr}.melisferaServicePhoto,.melisferaServiceIllustration{aspect-ratio:16/10}}
`}</style>
<div className="melisferaEditorialHero"><div className="melisferaEditorialCopy"><p className="eyebrow">ECOLOGIA FUNCIONAL · MELISFERA RN</p>
<h1>As abelhas e os serviços ecossistêmicos no Rio Grande do Norte</h1>
<p className="intro" style={{maxWidth:990}}>Muito além da produção de mel, as abelhas participam de processos ecológicos que conectam plantas, paisagens e comunidades humanas. Entenda o que já foi observado na Caatinga potiguar, quais benefícios podem decorrer dessas interações e o que ainda precisa ser demonstrado.</p></div><EditorialBeeGallery label="Abelhas e flores ilustrando serviços ecossistêmicos"/></div><div className="notice"><strong>Explore o catálogo completo:</strong> seis fichas sobre polinização da flora nativa, agricultura, segurança alimentar, produtos da colmeia, cultura e economia. <Link href="/ecologia/servicos">Abrir catálogo de serviços →</Link></div>
<nav aria-label="Navegação nesta página" className="jumpLinks"><a href="#macambiras">Estudo de caso</a><a href="#servicos-rn">Serviços no RN</a><a href="#evidencias">Níveis de evidência</a><a href="#dados">Dados de campo</a><a href="#conservacao">Conservação</a><a href="#referencias">Referências</a></nav>
<section id="macambiras" style={{margin:'44px 0'}}>
<p className="eyebrow">CIÊNCIA PRODUZIDA NO SEMIÁRIDO POTIGUAR</p><h2>Macambiras: um exemplo de como o habitat sustenta interações ecológicas</h2>
<div className="melisferaCaseStudy">
<div><p>Em <strong>Jorge et al. (2024)</strong>, publicado na <em>Neotropical Entomology</em>, a bromélia rupícola <em>Encholirium spectabile</em> foi investigada como estrutura ecológica associada a himenópteros em afloramentos rochosos da Caatinga. O trabalho discute como a bromélia oferece recursos e habitat e como abelhas, formigas e vespas se relacionam a diferentes funções e serviços ecossistêmicos.</p>
<p>O estudo destaca a relevância das interações para <strong>polinização potencial, produção de mel, controle biológico, valores culturais e educação</strong>, considerando a sazonalidade. Esses serviços não foram todos quantificados experimentalmente, e os resultados sobre o conjunto de Hymenoptera não devem ser atribuídos exclusivamente às abelhas.</p>
<p><a href="https://doi.org/10.1007/s13744-024-01152-7" target="_blank" rel="noopener noreferrer">Ler Jorge et al. (2024) · DOI ↗</a></p></div>
<figure><img src="/images/abelhas/abelhas-inflorescencia.jpg" alt="Abelha visitando uma inflorescência; registro de interação floral na plataforma MELISFERA RN"/><figcaption>Registro de visitação floral do acervo MELISFERA RN. A visita, por si só, não comprova polinização efetiva.</figcaption></figure>
</div>
<div className="statGrid"><div className="statCard"><strong>{ecologyRecords.length}</strong><span>Táxons de abelhas na tabela de interações utilizada pela plataforma</span></div><div className="statCard"><strong>{ecologyRecords.reduce((a,x)=>a+x.total,0).toLocaleString('pt-BR')}</strong><span>Registros somados na tabela de referência; não são indivíduos únicos nem estimativa estadual</span></div></div>
<p className="note">A tabela de abelhas é um recorte do levantamento de Hymenoptera; os totais não representam riqueza, abundância ou volume de polinização para todo o Rio Grande do Norte.</p>
</section>
<section id="servicos-rn" style={{margin:'55px 0'}}>
<p className="eyebrow">DA FUNÇÃO ECOLÓGICA AO BEM-ESTAR HUMANO</p>
<h2>Seis dimensões importantes para o RN</h2>
<p style={{maxWidth:800}}>As fotografias documentam interações e práticas de campo; os cartões sem registro específico usam ilustrações identificadas, evitando associar uma imagem a um serviço não demonstrado.</p>
<div className="melisferaServicesGrid">
{pilares.map((p,i)=>{
const photos=[
{src:'/images/abelhas/abelhas-inflorescencia.jpg',alt:'Abelha visitando flores; registro de visitação floral',caption:'Visitação floral documentada'},
null,
null,
{src:'/images/abelhas/'+encodeURIComponent('WhatsApp Image 2026-11-04 at 00.46.47 (1).jpeg'),alt:'Estruturas de colônia de abelhas observadas em campo',caption:'Estruturas de nidificação'},
{src:'/images/abelhas/'+encodeURIComponent('WhatsApp Image 2026-11-04 at 00.46.47.jpeg'),alt:'Abelhas e estruturas de uma colônia manejada',caption:'Colônia e organização social'},
{src:'/images/abelhas/'+encodeURIComponent('WhatsApp Image 2026-11-04 at 00.46.42.jpeg'),alt:'Pessoas com vestimentas de proteção realizando manejo de colmeia',caption:'Manejo apícola em campo'}
];
const photo=photos[i];
return <article className="panel melisferaServiceCard" key={p.title}>
{photo?<figure className="melisferaServicePhoto"><img loading="lazy" decoding="async" src={photo.src} alt={photo.alt}/><figcaption>{photo.caption}</figcaption></figure>:<div className="melisferaServiceIllustration" role="img" aria-label={i===1?'Representação gráfica da agricultura e polinização':'Representação gráfica da sazonalidade na Caatinga'}><span aria-hidden="true">{i===1?'🌱':'🌵'}</span><small>{i===1?'Agricultura e polinização':'Caatinga e sazonalidade'} · ilustração</small></div>}
<div className="melisferaServiceBody"><span style={{fontSize:28}} aria-hidden="true">{p.icon}</span><h3>{p.title}</h3><p>{p.text}</p><p className="melisferaEvidence"><strong>Limite da evidência:</strong> {p.limite}</p><Link href={'/ecologia/servicos/'+p.link}>Explorar a ficha temática →</Link></div>
</article>})}
</div>
</section>
<section style={{margin:'55px 0'}}><p className="eyebrow">DIVERSIDADE DE PAISAGENS</p><h2>Por que o contexto potiguar importa?</h2><div className="twoCol"><article className="panel"><h3>Caatinga e afloramentos rochosos</h3><p>Em uma floresta tropical sazonalmente seca, a disponibilidade temporal de flores, abrigo e locais de nidificação é determinante. A manutenção de macambiras e da vegetação nativa pode conservar recursos e conexões ecológicas durante a seca.</p></article><article className="panel"><h3>Fruticultura e mosaicos agrícolas</h3><p>As culturas, os remanescentes de vegetação e o manejo agrícola podem influenciar visitantes florais. Para estimar serviços agrícolas, é necessário avaliar cada cultura, localidade, manejo e período de floração.</p></article><article className="panel"><h3>Mata Atlântica, restinga e litoral</h3><p>Fragmentos florestais, vegetação costeira e áreas urbanas apresentam comunidades e recursos diferentes daqueles da Caatinga. Não se deve extrapolar diretamente os resultados de um ambiente para outro.</p></article><article className="panel"><h3>Meliponicultura e comunidades</h3><p>A criação de abelhas sem ferrão tem relevância social e econômica, mas seus indicadores são distintos dos dados de ocorrência silvestre. Consulte a <Link href="/rede">Rede das Abelhas</Link> para organizações, projetos e acervos.</p></article></div></section>
<section id="evidencias" style={{margin:'55px 0'}}><p className="eyebrow">TRANSPARÊNCIA CIENTÍFICA</p><h2>O caminho entre observar uma abelha e demonstrar um serviço</h2><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(205px,1fr))',gap:12,margin:'22px 0'}}>{steps.map(s=><div key={s[0]} style={{background:'#f0f5ee',border:'1px solid #dce7d9',borderRadius:13,padding:20}}><span style={{font:'500 29px Georgia,serif',color:'#497d57'}}>{s[0]}</span><h3>{s[1]}</h3><p style={{fontSize:14}}>{s[2]}</p></div>)}</div><p>Além desses níveis, serviços culturais e produtos da colmeia requerem métodos próprios, como entrevistas, documentação de práticas, dados de produção e análises econômicas. <strong>Uma visita floral não equivale a polinização efetiva</strong>; e um serviço potencial não equivale a um benefício quantificado.</p></section>

<section id="dados"><EcologyExplorer records={ecologyRecords} taxa={taxa}/></section>
<section id="conservacao" style={{margin:'55px 0'}}><p className="eyebrow">CONSERVAÇÃO E GESTÃO</p><h2>O que pode favorecer a continuidade desses serviços?</h2><div className="twoCol"><article className="panel"><h3>Conservar habitats e locais de nidificação</h3><p>Proteger afloramentos rochosos, macambiras, árvores com cavidades e remanescentes de vegetação, considerando as necessidades de diferentes grupos de abelhas.</p></article><article className="panel"><h3>Manter recursos florais ao longo do ano</h3><p>Conservar mosaicos de vegetação nativa e diversidade de plantas com diferentes períodos de floração, sobretudo em paisagens com forte sazonalidade.</p></article><article className="panel"><h3>Reduzir pressões ambientais</h3><p>Investigar e mitigar perda de habitat, uso inadequado de agrotóxicos, fogo e alterações climáticas, respeitando a evidência disponível para cada ameaça e região.</p></article><article className="panel"><h3>Monitorar e medir resultados</h3><p>Combinar inventários, identificação de visitantes, experimentos de exclusão, deposição de pólen, frutificação, produção e documentação dos saberes locais.</p></article></div></section>
<section id="referencias" style={{margin:'48px 0 20px'}}><h2>Referências e leituras complementares</h2><div className="sourceItem"><strong>Jorge, J. S., Duarte, A. F. V., Santos, R. L., Freire, E. M. X. & Caliman, A. (2024).</strong> Semi-arid’s Unsung Heroes: Hymenoptera and the Vital Ecosystem Services Enabled by <em>Encholirium spectabile</em>, a Rupicolous Bromeliad in the Brazilian Semi-arid Region. <em>Neotropical Entomology</em>, 53, 514–530. <a href="https://doi.org/10.1007/s13744-024-01152-7" target="_blank" rel="noopener noreferrer">Artigo ↗</a></div><div className="sourceItem"><strong>Jorge et al. (2024).</strong> The Arrow Macambira (<em>Encholirium spectabile</em>: Bromeliaceae) as an Important Habitat for the Arthropod Fauna in Rocky Outcrops of the Brazilian Semi-Arid Region. <em>Neotropical Entomology</em>. <a href="https://doi.org/10.1007/s13744-024-01145-6" target="_blank" rel="noopener noreferrer">Artigo ↗</a></div><div className="sourceItem"><strong>Garibaldi et al. (2013).</strong> Wild pollinators enhance fruit set of crops regardless of honey bee abundance. <em>Science</em>. <a href="https://doi.org/10.1126/science.1230200" target="_blank" rel="noopener noreferrer">Artigo ↗</a></div><div className="sourceItem"><strong>Pereira et al. (2011); Maia et al. (2015).</strong> Levantamentos de meliponicultura no RN. <a href="https://doi.org/10.21708/avb.2011.5.1.2015" target="_blank" rel="noopener noreferrer">Pereira et al. ↗</a> · <a href="https://rbmv.emnuvens.com.br/BJVM/article/view/425" target="_blank" rel="noopener noreferrer">Maia et al. ↗</a></div><p className="note">Os trabalhos internacionais oferecem contexto conceitual e comparativo, não estimativas específicas de serviços para o RN. Os estudos de criação documentam meliponicultura, não populações silvestres em cada município.</p></section>
<div className="notice"><strong>Estado da evidência:</strong> o MELISFERA RN distingue processos observados, serviços potenciais e benefícios demonstrados. A ausência de dados não significa ausência de serviço; os resultados de Jorge et al. (2024) não devem ser generalizados automaticamente para todo o estado.</div>
</main>}