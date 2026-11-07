import CatalogClient from '@/components/CatalogClient';
import {taxa,families} from '@/lib/catalog';

export default function Species(){
  return <section className="shell section">
    <p className="eyebrow">BIODIVERSIDADE</p>
    <h1>Catálogo de espécies</h1>
    <div className="catalogIntroEditorial">
      <p className="catalogIntroLead">O Rio Grande do Norte abriga uma diversidade expressiva de abelhas, associada à variedade de paisagens, formações vegetais e condições ambientais do estado.</p>
      <p>Da Caatinga, uma Floresta Tropical Sazonalmente Seca, aos remanescentes de Mata Atlântica, passando por restingas, manguezais, dunas, áreas serranas e ambientes agrícolas, diferentes ecossistemas oferecem recursos florais, locais de nidificação e condições para a manutenção de comunidades de polinizadores.</p>
      <p>A <strong>MELISFERA RN</strong> reúne, nesta etapa, <strong>cerca de 150 entradas taxonômicas de abelhas</strong>, constituindo uma base inicial para conhecer e organizar a diversidade registrada na literatura e em fontes documentais. Esse conjunto reflete a heterogeneidade ambiental do estado e a diversidade de formas de vida, estratégias de nidificação e relações ecológicas entre abelhas e plantas. As entradas ainda não equivalem, necessariamente, a 150 espécies com ocorrências individualmente validadas.</p>
      <p>Mais do que componentes da biodiversidade, as abelhas desempenham funções fundamentais para o funcionamento dos ecossistemas. Ao visitar flores em busca de néctar, pólen e outros recursos, muitas espécies promovem a transferência de pólen, contribuindo para a reprodução de plantas nativas, a manutenção da diversidade vegetal e a produção de alimentos. Na agricultura, esses serviços incluem a polinização de culturas como o maracujá, cuja reprodução pode depender fortemente da atividade de mamangavas.</p>
      <p><strong>Conhecer essa diversidade é também compreender os serviços que ela sustenta e as ameaças à sua conservação.</strong> Por isso, o catálogo integra informações taxonômicas, distribuição geográfica, ecologia e serviços ecossistêmicos, distinguindo registros documentais, ocorrências informadas e evidências ainda pendentes de validação.</p>
    </div>
    <CatalogClient taxa={taxa} families={families}/>
  </section>;
}
