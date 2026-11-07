import type {Metadata} from 'next';
import Link from 'next/link';
export const metadata:Metadata={title:'Meliponários, associações e coleções | MELISFERA RN',description:'Cadastro de instituições de criação, pesquisa e coleções de abelhas do Rio Grande do Norte, com fontes e limites de evidência.'};
const registros=[
  {
    "nome": "Meliponário educativo do IFRN",
    "municipio": "Pau dos Ferros",
    "categoria": "Meliponário institucional",
    "evidencia": "Projeto de extensão em execução em 2026; espécies e número de colônias não informados na página.",
    "fonte": "IFRN — Uso de meliponário como ferramenta de ligação da comunidade com o meio ambiente",
    "url": "https://portal.ifrn.edu.br/projetos-de-extensao/8264/",
    "ano": "2026"
  },
  {
    "nome": "Coleção de Abelhas do IFRN",
    "municipio": "Pau dos Ferros",
    "categoria": "Coleção científica",
    "evidencia": "Acervo institucional com curadoria em 2026; não confundir local de guarda com município de coleta.",
    "fonte": "IFRN — Curadoria aplicada à coleção de abelhas",
    "url": "https://portal.ifrn.edu.br/projetos-de-pesquisa/8783/",
    "ano": "2026"
  },
  {
    "nome": "Hotéis de abelhas solitárias do IFRN",
    "municipio": "Pau dos Ferros",
    "categoria": "Pesquisa e conservação",
    "evidencia": "Projeto de implantação e monitoramento de hotéis de abelhas; sem lista de espécies confirmada nesta fonte.",
    "fonte": "IFRN — Conservação de polinizadores nativos",
    "url": "https://portal.ifrn.edu.br/projetos-de-pesquisa/9026/",
    "ano": "2026"
  },
  {
    "nome": "Coleção Entomológica Adalberto Antônio Varela-Freire",
    "municipio": "Natal",
    "categoria": "Coleção científica",
    "evidencia": "Acervo histórico de insetos da UFRN; registros de coleta provenientes de vários municípios ainda não individualizados.",
    "fonte": "UFRN — Coleção Entomológica AAVF",
    "url": "https://entomologia.cb.ufrn.br/colecao.html",
    "ano": "página institucional"
  },
  {
    "nome": "CETAPIS — UFERSA",
    "municipio": "Mossoró",
    "categoria": "Centro de pesquisa e criação",
    "evidencia": "Centro institucional de apicultura e meliponicultura; quantidade histórica de colônias não é inventário atual.",
    "fonte": "UFERSA — Centro Tecnológico de Apicultura",
    "url": "https://eeu.ufersa.edu.br/centro-tecnologico-de-apicultura-cetec/",
    "ano": "registro institucional histórico"
  },
  {
    "nome": "Associação JOCA",
    "municipio": "Jandaíra",
    "categoria": "Associação comunitária",
    "evidencia": "Vínculo com produção sustentável de mel de jandaíra; conferir cadastro e situação atual.",
    "fonte": "Governo do RN — notícia institucional",
    "url": "",
    "ano": "registro institucional"
  },
  {
    "nome": "AMEP — Associação de Meliponicultores e Meliponicultoras Potiguar",
    "municipio": "Mossoró",
    "categoria": "Associação de criadores",
    "evidencia": "Referência regional ao polo Mossoró; sede jurídica e municípios dos associados ainda a verificar.",
    "fonte": "PEIEX / documentos públicos citados na auditoria",
    "url": "",
    "ano": "referência institucional"
  },
  {
    "nome": "APROMEL",
    "municipio": "Lajes",
    "categoria": "Associação de produtores",
    "evidencia": "Associação dos Produtores de Mel de Lajes em relação histórica; atividade atual não confirmada.",
    "fonte": "Relação histórica de estabelecimentos — MAPA",
    "url": "",
    "ano": "histórico"
  },
  {
    "nome": "ACOCAS",
    "municipio": "São João do Sabugi",
    "categoria": "Associação de criadores",
    "evidencia": "Associação Comunitária dos Criadores de Abelhas Sabugienses; atividade atual não confirmada.",
    "fonte": "Relação histórica de estabelecimentos — MAPA",
    "url": "",
    "ano": "histórico"
  },
  {
    "nome": "APRAP",
    "municipio": "Portalegre",
    "categoria": "Associação rural",
    "evidencia": "Associação dos Produtores Rurais do Sítio Alexandre Pinto; não presumir especialização em meliponicultura.",
    "fonte": "Relação histórica de estabelecimentos — MAPA",
    "url": "",
    "ano": "histórico"
  },
  {
    "nome": "COAAF",
    "municipio": "Marcelino Vieira",
    "categoria": "Cooperativa rural",
    "evidencia": "Cooperativa Agroindustrial de Agricultores de Marcelino Vieira; vínculo específico com abelhas a verificar.",
    "fonte": "Relação histórica de estabelecimentos — MAPA",
    "url": "",
    "ano": "histórico"
  },
  {
    "nome": "APRGA",
    "municipio": "Carnaúba",
    "categoria": "Associação rural",
    "evidencia": "Associação dos Produtores Rurais de Galho do Angico; município e atividade atual a confirmar.",
    "fonte": "Relação histórica de estabelecimentos — MAPA",
    "url": "",
    "ano": "histórico"
  }
];
const municipios=Array.from(new Set(registros.map(r=>r.municipio))).sort((a,b)=>a.localeCompare(b,'pt-BR'));
export default function Instituicoes(){return <main className="shell section">
<p className="eyebrow">MELISFERA RN · CADASTRO INSTITUCIONAL</p><h1>Meliponários, associações e coleções</h1>
<p className="intro">Instituições e iniciativas documentadas em fontes públicas, organizadas por município e natureza da atividade. O município indicado é o da instituição ou da referência territorial, não necessariamente o local de origem das abelhas.</p>
<div style={{background:'#edf4e9',border:'1px solid #d5e3d3',borderRadius:16,padding:22,margin:'25px 0 36px',lineHeight:1.7}}><strong>Limite científico:</strong> abelhas mantidas em meliponários, acervos sediados em um município e organizações de criadores não comprovam ocorrência silvestre local. Registros históricos não comprovam funcionamento atual. Não utilizar estes dados nos cálculos de riqueza de espécies.</div>
<p><strong>{registros.length}</strong> iniciativas ou organizações cadastradas em <strong>{municipios.length}</strong> municípios de referência. Trata-se de um levantamento parcial, não de um censo estadual.</p>
{municipios.map(m=><section key={m} style={{margin:'26px 0',border:'1px solid #d7e3d8',borderRadius:16,padding:22}}><h2>{m}</h2><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:15}}>{registros.filter(r=>r.municipio===m).map(r=><article key={r.nome} style={{padding:16,background:'#f6f8f2',borderRadius:12}}><p className="eyebrow">{r.categoria}</p><h3>{r.nome}</h3><p>{r.evidencia}</p><p style={{fontSize:13}}><strong>Fonte:</strong> {r.fonte}<br/><strong>Referência temporal:</strong> {r.ano}</p>{r.url?<a href={r.url} target="_blank" rel="noopener noreferrer">Consultar documento original ↗</a>:<p style={{fontSize:12,color:'#85622b'}}>Link primário ainda não conferido; cadastro provisório.</p>}</article>)}</div></section>)}
<h2>Critérios para atualização</h2><p>Para associações: confirmar denominação, CNPJ, município-sede e situação cadastral. Para meliponários: distinguir unidades de criação, espécies mantidas e origem das colônias. Para coleções: importar espécimes somente com município de coleta, táxon e identificador rastreável.</p>
<p><Link href="/distribuicao/municipios">Ver registros científicos por município →</Link> · <Link href="/fontes">Consultar fontes científicas</Link></p>
</main>}