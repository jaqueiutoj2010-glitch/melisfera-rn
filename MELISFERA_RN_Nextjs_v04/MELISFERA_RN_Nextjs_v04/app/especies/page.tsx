import CatalogClient from '@/components/CatalogClient';
import {taxa,families} from '@/lib/catalog';

export default function Species(){
  return <section className="shell section">
    <p className="eyebrow">BIODIVERSIDADE</p>
    <h1>Catálogo de espécies</h1>
    <div className="catalogIntroEditorial">
      <p className="catalogIntroLead">O Rio Grande do Norte abriga uma diversidade expressiva de abelhas, moldada pela variedade de paisagens, formações vegetais e condições ambientais do estado. Essa riqueza não se manifesta apenas no número de espécies, mas também nas diferentes formas de viver e nas funções ecológicas que desempenham.</p>
      <p>Da Caatinga, uma Floresta Tropical Sazonalmente Seca, aos remanescentes de Mata Atlântica, passando por restingas, manguezais, dunas, áreas serranas e ambientes agrícolas, diferentes ecossistemas oferecem recursos florais, substratos para nidificação e condições para comunidades de polinizadores com características distintas.</p>
      <p>Essa <strong>diversidade funcional</strong> pode ser percebida em contrastes marcantes: das diminutas abelhas conhecidas popularmente como <strong>abelhas-mosquito</strong> às grandes <strong>mamangavas do gênero <em>Xylocopa</em></strong>, capazes de visitar flores de estruturas e dimensões muito diferentes. O tamanho corporal, a morfologia, o comportamento de forrageamento e a capacidade de deslocamento influenciam quais flores cada abelha visita e como o pólen pode ser transportado.</p>
      <p>As diferenças também aparecem nos modos de vida. Há abelhas <strong>solitárias</strong>, em que cada fêmea geralmente constrói e abastece seu próprio ninho, e espécies <strong>sociais</strong>, que vivem em colônias com divisão de tarefas. Algumas escavam ninhos no solo; outras utilizam cavidades preexistentes, ocos de árvores ou madeira, enquanto certas mamangavas de <em>Xylocopa</em> escavam galerias em substratos lenhosos adequados. Essas estratégias conectam a conservação das abelhas à disponibilidade de solo, vegetação, árvores e micro-hábitats.</p>
      <p>Mais do que componentes da biodiversidade, as abelhas participam de processos essenciais ao funcionamento dos ecossistemas. Ao buscar néctar, pólen e outros recursos, muitas espécies transferem pólen entre flores, contribuindo para a reprodução de plantas nativas, a manutenção da diversidade vegetal e a produção agrícola. Um exemplo é a polinização de maracujazeiros, para a qual mamangavas de grande porte podem desempenhar papel importante. <strong>Espécies diferentes não são necessariamente substituíveis:</strong> suas características podem complementar as funções realizadas nas comunidades de plantas.</p>
      <p>A <strong>MELISFERA RN</strong> reúne, nesta etapa, <strong>cerca de 150 entradas taxonômicas de abelhas</strong> provenientes de literatura e fontes documentais. Esse número descreve o conjunto atualmente organizado na plataforma, não uma estimativa definitiva da riqueza estadual nem 150 ocorrências individualmente validadas. À medida que os dados forem revisados, o catálogo poderá ampliar a compreensão da distribuição, dos atributos funcionais e das interações ecológicas dessas abelhas.</p>
      <p><strong>Conhecer essa diversidade é também compreender os serviços ecossistêmicos que ela sustenta e as ameaças à sua conservação.</strong> Por isso, o catálogo articula taxonomia, distribuição geográfica, história natural e serviços ecossistêmicos, distinguindo informações documentadas, ocorrências informadas e evidências ainda pendentes de validação.</p>
    </div>
    <CatalogClient taxa={taxa} families={families}/>
  </section>;
}
