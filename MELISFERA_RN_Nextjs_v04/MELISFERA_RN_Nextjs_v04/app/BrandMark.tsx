import Image from 'next/image';

export default function BrandMark(){
  return <Image
    className="brandLogoOfficial"
    src="/images/abelhas/Logo%20Abelha%20e%20Melisfera%20RN.png?v=20261107"
    alt="MELISFERA RN — Observatório de Abelhas e Serviços Ecossistêmicos do Rio Grande do Norte"
    width={240}
    height={160}
    priority
  />;
}
