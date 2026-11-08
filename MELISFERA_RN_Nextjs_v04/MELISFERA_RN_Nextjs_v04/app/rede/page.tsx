import EditorialBeeGallery from '@/components/EditorialBeeGallery';
import Link from 'next/link';
import type {Metadata} from 'next';
import {registrosInstitucionais} from '@/lib/registros-institucionais';

export const metadata:Metadata={title:'Rede das Abelhas | MELISFERA RN',description:'Produtores, meliponários, associações, cooperativas, coleções científicas e projetos relacionados às abelhas do Rio Grande do Norte.'};
const grupos=[
 {titulo:'Criadores, meliponários e centros de criação',teste:(c:string)=>/Meliponário|Centro de pesquisa e criação/.test(c),descricao:'Unidades institucionais de criação e iniciativas educativas identificadas em fontes públicas.'},
 {titulo:'Associações, cooperativas e produtores',teste:(c:string)=>/Associação|Cooperativa/.test(c),descricao:'Organizações comunitárias e rurais, incluindo referências históricas cuja situação atual ainda precisa ser confirmada.'},
 {titulo:'Coleções científicas',teste:(c:string)=>/Coleção científica/.test(c),descricao:'Acervos e instituições que preservam espécimes e documentação científica.'},
 {titulo:'Pesquisa, educação e conservação',teste:(c:string)=>/Pesquisa e conservação/.test(c),descricao:'Iniciativas institucionais de pesquisa aplicada, extensão e conservação.'}
];
const municipios=Array.from(new Set(registrosInstitucionais.map(r=>r.municipio)));
export default function Network(){return <main className="shell section melisferaStandardPage">
<div className="melisferaEditorialHero"><div className="melisferaEditorialCopy"><p className="eyebrow">PESSOAS · INSTITUIÇÕES · CIÊNCIA</p><h1>Rede das Abelhas</h1>
<p className="intro">Conheça os criadores, meliponários institucionais, associações, cooperativas, coleções e projetos documentados no Rio Grande do Norte. Este diretório reúne evidências públicas e está aberto à ampliação e à revisão de seus cadastros.</p></div><EditorialBeeGallery label="Fotografias de abelhas em flores"/></div>
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:15,margin:'28px 0'}}>
 <div className="panel"><strong style={{fontSize:30,color:'#174a2f'}}>{registrosInstitucionais.length}</strong><p>Iniciativas e organizações cadastradas</p></div>
 <div className="panel"><strong style={{fontSize:30,color:'#174a2f'}}>{municipios.length}</strong><p>Municípios de referência</p></div>
 <div className="panel"><strong style={{fontSize:30,color:'#174a2f'}}>4</strong><p>Áreas de atuação organizadas</p></div>
</div>
<div className="notice"><strong>Transparência:</strong> este levantamento é parcial, não um cadastro oficial ou censo de produtores ativos. As organizações podem estar registradas em fontes históricas. O município informado é uma referência institucional, não necessariamente a localização de criatórios ou a origem das colônias.</div>
{grupos.map(g=>{const itens=registrosInstitucionais.filter(r=>g.teste(r.categoria));return <section key={g.titulo} style={{marginTop:35}}><h2>{g.titulo}</h2><p>{g.descricao}</p><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(265px,1fr))',gap:16,marginTop:18}}>{itens.map(r=><article className="panel" key={r.nome} style={{padding:22}}><p className="eyebrow">{r.categoria}</p><h3>{r.nome}</h3><p><strong>Município de referência:</strong> {r.municipio}</p><p>{r.evidencia}</p><p style={{fontSize:13,color:'#536b5c'}}><strong>Fonte:</strong> {r.fonte}<br/><strong>Período:</strong> {r.ano}</p>{r.url?<a href={r.url} target="_blank" rel="noopener noreferrer">Consultar fonte original ↗</a>:<p style={{fontSize:13,color:'#886b32'}}>Referência documental sem link primário confirmado · cadastro provisório</p>}</article>)}</div></section>})}
<section className="panel" style={{marginTop:36}}><h2>Produtores e meliponários particulares</h2><p>Os levantamentos históricos de meliponicultura no RN documentam criadores e colônias em diversos municípios, mas não permitem identificar com segurança quais estabelecimentos continuam ativos. Não publicamos nomes, contatos ou endereços pessoais sem autorização e verificação.</p><p>O cadastro poderá ser ampliado mediante participação voluntária e comprovação de vínculo com a atividade, mantendo separados os registros de criação e os de ocorrência silvestre.</p></section>
<div className="notice" style={{marginTop:26}}><strong>Privacidade e ciência:</strong> não divulgar endereços residenciais ou coordenadas precisas de criatórios sem base legal adequada. Espécies mantidas em cativeiro não são automaticamente registros de ocorrência natural.</div>
<p style={{marginTop:26}}><Link href="/instituicoes">Consultar cadastro institucional por município →</Link> · <Link href="/distribuicao/municipios">Ocorrências científicas por município</Link> · <Link href="/fontes">Fontes</Link></p>
</main>}
