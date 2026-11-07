import Image from 'next/image';

export default function BrandMark(){
  return <Image
    className="brandLogoOfficial"
    src="/images/abelhas/Logo%20Abelha%20e%20Melisfera%20RN%20(2).png"
    alt="MELISFERA RN — Observatório de Abelhas e Serviços Ecossistêmicos do Rio Grande do Norte"
    width={240}
    height={160}
    priority
  />;
}
