import Link from 'next/link';
import type {Metadata} from 'next';

export const metadata:Metadata={
 title:'Sobre o MELISFERA RN',
 description:'Objetivos, vinculação institucional, escopo e política de evidências do observatório científico de abelhas do Rio Grande do Norte.'
};

export default function About(){return <main className="shell section melisferaStandardPage">
 <div className="melisferaEditorialHero"><div className="melisferaEditorialCopy"><p className="eyebrow">TRANSPARÊNCIA CIENTÍFICA</p>
 <h1>Sobre o MELISFERA RN</h1>
 <p className="intro">O MELISFERA RN é um observatório científico em desenvolvimento dedicado ao conhecimento das abelhas do Rio Grande do Norte. A plataforma reúne informações sobre diversidade, distribuição geográfica, interações ecológicas, polinização, serviços ecossistêmicos e conservação, com atenção à origem e à qualidade das evidências.</p></div><div className="heroGallery melisferaEditorialGallery" aria-label="Fotografias de abelhas em flores"><div className="heroPhoto heroPhotoOne" role="img" aria-label="Abelha em flor de maracujá"/><div className="heroPhoto heroPhotoTwo" role="img" aria-label="Abelhas em inflorescência amarela"/></div></div>

 <div className="notice"><strong>Vinculação institucional:</strong> a ideia do MELISFERA RN foi concebida inicialmente por <strong>Jaqueiuto Jorge</strong> e começou a ser desenvolvida por meio de uma parceria entre o <strong>Projeto Macambiras</strong> e o <strong>Projeto CyanoServices</strong>, em colaboração com pesquisadores do <strong>Departamento de Ecologia (DECOL/UFRN)</strong> e da <strong>Escola Agrícola de Jundiaí (EAJ/UFRN)</strong>. O CyanoServices conta com financiamento do <strong>CNPq</strong>. A plataforma está em fase experimental de consolidação, auditoria bibliográfica e revisão científica.</div>

 <section aria-labelledby="logos-parceiros" style={{margin:'34px 0 38px'}}>
  <p className="eyebrow">RECONHECIMENTO INSTITUCIONAL</p>
  <h2 id="logos-parceiros" style={{marginBottom:10}}>Projetos e apoio institucional</h2>
  <p style={{maxWidth:850,lineHeight:1.75}}>O desenvolvimento inicial do MELISFERA RN reúne os projetos Macambiras e CyanoServices, em colaboração com pesquisadores do DECOL/UFRN e da EAJ/UFRN. O CNPq é reconhecido pelo financiamento ao Projeto CyanoServices.</p>
  <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:16,marginTop:20}}>
   <figure style={{margin:0,border:'1px solid #d9e6d5',borderRadius:16,padding:'24px 17px',background:'#fff',textAlign:'center'}}>
    <div style={{height:115,display:'flex',alignItems:'center',justifyContent:'center'}}>
     <img src="/images/abelhas/Logo_Prpjeto_Macambiras.png" alt="Logomarca do Projeto Macambiras — Bromélias do Semiárido" style={{maxWidth:'100%',maxHeight:'100%',width:'auto',height:'auto',objectFit:'contain'}}/>
    </div>
    <figcaption style={{fontSize:14,marginTop:16,lineHeight:1.5}}><strong>Projeto Macambiras</strong><br/>Projeto de desenvolvimento inicial</figcaption>
   </figure>
   <figure style={{margin:0,border:'1px solid #d9e6d5',borderRadius:16,padding:'24px 17px',background:'#fff',textAlign:'center'}}>
    <div style={{height:115,display:'flex',alignItems:'center',justifyContent:'center'}}>
     <img src="/images/abelhas/CyaNoServices.jpeg" alt="Logomarca do Projeto CyanoServices" style={{maxWidth:'100%',maxHeight:'100%',width:'auto',height:'auto',objectFit:'contain'}}/>
    </div>
    <figcaption style={{fontSize:14,marginTop:16,lineHeight:1.5}}><strong>Projeto CyanoServices</strong><br/>Projeto de desenvolvimento inicial</figcaption>
   </figure>
   <figure style={{margin:0,border:'1px solid #d9e6d5',borderRadius:16,padding:'24px 17px',background:'#fff',textAlign:'center'}}>
    <div style={{height:115,display:'flex',alignItems:'center',justifyContent:'center'}}>
     <img src="/images/abelhas/logobitmap.jpg" alt="Logomarca do Conselho Nacional de Desenvolvimento Científico e Tecnológico, CNPq" style={{maxWidth:'100%',maxHeight:'100%',width:'auto',height:'auto',objectFit:'contain'}}/>
    </div>
    <figcaption style={{fontSize:14,marginTop:16,lineHeight:1.5}}><strong>CNPq</strong><br/>Financiamento do Projeto CyanoServices</figcaption>
   </figure>
  </div>
  <p style={{fontSize:13,color:'#597062',marginTop:15}}>A seção poderá incorporar novas instituições parceiras, conforme a confirmação de suas contribuições ao observatório.</p>
 </section>
 <div className="twoCol">\n <article className="panel"><h2>Origem e desenvolvimento</h2><p>O MELISFERA RN nasceu de uma ideia inicialmente concebida por <strong>Jaqueiuto Jorge</strong>, com a proposta de reunir e tornar acessível o conhecimento científico sobre as abelhas do Rio Grande do Norte.</p><p>Sua implementação inicial resulta da colaboração entre os projetos <strong>Macambiras</strong> e <strong>CyanoServices</strong>, com a participação de pesquisadores do <strong>DECOL/UFRN</strong> e da <strong>EAJ/UFRN</strong>. A plataforma permanece aberta à ampliação de sua rede de colaboradores e à futura inclusão de outras instituições parceiras, mediante confirmação de sua participação.</p></article>
 <article className="panel">
 <h2>Objetivos e abrangência</h2>
 <p>Organizar e tornar consultáveis informações sobre as abelhas do estado, relacionando espécies, municípios, ambientes, interações ecológicas e fontes documentais.</p>
 <p>O observatório busca apoiar pesquisa, educação ambiental, conservação e identificação de lacunas de conhecimento, sem substituir inventários de campo ou revisões taxonômicas especializadas.</p>
 </article>
 <article className="panel">
 <h2>Escopo atual</h2>
 <p>O catálogo de referência reúne <strong>150 entradas taxonômicas candidatas</strong>, ainda sujeitas à revisão de nomes, sinonímias, identificação e distribuição. Esse total <strong>não representa a riqueza estadual confirmada</strong>.</p>
 <p>Os registros municipais são incorporados progressivamente a partir de artigos, coleções, diagnósticos ambientais e observações documentadas. Uma fonte que cita um município não confirma automaticamente todas as espécies do trabalho naquela localidade.</p>
 </article>
 <article className="panel">
 <h2>Política de evidências</h2>
 <p>São diferenciados registros de espécimes com voucher, levantamentos primários, observações de campo, referências bibliográficas, associações ainda não verificadas e informações de criação e manejo.</p>
 <p>Uma visita floral não demonstra, isoladamente, polinização efetiva. Do mesmo modo, a presença de colônias em meliponários ou de exemplares em uma coleção não comprova ocorrência silvestre no município onde a instituição está instalada.</p>
 </article>
 <article className="panel">
 <h2>Rastreabilidade e reprodutibilidade</h2>
 <p>Os vínculos devem preservar, sempre que disponíveis, nome taxonômico, localidade, período, método, autoria, publicação, identificador de ocorrência e número de tombo.</p>
 <p>As informações exibidas são versionadas no projeto e podem ser corrigidas conforme novas fontes e verificações. Consulte as <Link href="/fontes">fontes bibliográficas</Link> e os <Link href="/distribuicao/municipios">registros por município</Link>.</p>
 </article>
 <article className="panel">
 <h2>Meliponicultura e instituições</h2>
 <p>Meliponários, associações de criadores, cooperativas, centros de pesquisa e coleções científicas integram um cadastro institucional próprio. Os dados históricos são apresentados com referência temporal e não indicam necessariamente funcionamento atual.</p>
 <p>Conheça o <Link href="/instituicoes">cadastro de meliponários, associações e coleções</Link>.</p>
 </article>
 <article className="panel">
 <h2>Colaboração, autoria e imagens</h2>
 <p>Correções taxonômicas, referências, registros de campo e imagens podem contribuir para aprimorar a base, desde que acompanhados de informações suficientes para verificação.</p>
 <p>Fotografias e outros materiais devem respeitar autoria, autorização de uso e licenças aplicáveis. Informações sensíveis sobre ninhos, espécies vulneráveis e propriedades particulares devem ser tratadas com cautela.</p>
 </article>
 </div>
 <div className="notice" style={{marginTop:28}}>
 <strong>Estado da plataforma:</strong> versão pública em desenvolvimento. Indicadores, mapas e listas representam o conjunto de dados disponível e seu nível de revisão no momento da consulta; ausência de registros não deve ser interpretada como ausência de espécies.
 </div>
 </main>}
