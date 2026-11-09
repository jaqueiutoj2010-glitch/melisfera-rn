import Link from 'next/link';

export default function JandaWelcome() {
  return (
    <section className="shell jandaWelcome" aria-labelledby="janda-title">
      <div className="jandaWelcomeArt">
        <img src="/images/abelhas/Janda_Mascote.jpeg" alt="Janda, mascote da MELISFERA RN: abelha jandaíra exploradora com chapéu de couro nordestino, lupa, caderno de campo e dois pares de braços." loading="lazy" />
      </div>
      <div className="jandaWelcomeCopy">
        <p className="eyebrow">CONHEÇA NOSSA GUIA · GUARDIÃ DA CAATINGA</p>
        <h2 id="janda-title">Oi, eu sou a Janda!</h2>
        <p>Sou uma abelha nativa inspirada na jandaíra. Com minha lupa e meu caderno de campo, vou acompanhar você pelo mundo das abelhas do Rio Grande do Norte.</p>
        <p>Vamos descobrir como vivem, quais flores visitam e por que conservar seus habitats é tão importante?</p>
        <div className="actions">
          <Link className="button primary" href="/especies">Explorar espécies ↗</Link>
          <Link className="button ghost" href="/ecologia/servicos">Serviços ecossistêmicos</Link>
        </div>
        <p className="jandaWelcomeNote">Janda é uma personagem educativa inspirada nas abelhas nativas; as informações científicas são apresentadas nas fichas e fontes da plataforma.</p>
      </div>
    </section>
  );
}
