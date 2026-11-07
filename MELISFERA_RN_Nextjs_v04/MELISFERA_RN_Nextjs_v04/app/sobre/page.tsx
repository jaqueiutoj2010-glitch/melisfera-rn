import Link from 'next/link';
import type {Metadata} from 'next';

export const metadata:Metadata={
 title:'Sobre o MELISFERA RN',
 description:'Objetivos, vinculação institucional, escopo e política de evidências do observatório científico de abelhas do Rio Grande do Norte.'
};

export default function About(){return <main className="shell section">
 <p className="eyebrow">TRANSPARÊNCIA CIENTÍFICA</p>
 <h1>Sobre o MELISFERA RN</h1>
 <p className="intro">O MELISFERA RN é um observatório científico em desenvolvimento dedicado ao conhecimento das abelhas do Rio Grande do Norte. A plataforma reúne informações sobre diversidade, distribuição geográfica, interações ecológicas, polinização, serviços ecossistêmicos e conservação, com atenção à origem e à qualidade das evidências.</p>

 <div className="notice"><strong>Vinculação institucional:</strong> a proposta está inserida no <strong>Projeto CyanoServices</strong>, financiado pelo <strong>CNPq</strong> e desenvolvido na <strong>Universidade Federal do Rio Grande do Norte (UFRN)</strong>. A plataforma encontra-se em fase experimental de consolidação, auditoria bibliográfica e revisão científica. Instituições e organizações cadastradas como fontes ou iniciativas não são, por esse motivo, consideradas parceiras formais do projeto.</div>

 <div className="twoCol">
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
