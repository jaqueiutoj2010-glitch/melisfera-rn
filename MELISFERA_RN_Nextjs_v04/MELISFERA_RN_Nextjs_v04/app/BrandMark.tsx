import Image from 'next/image';

export default function BrandMark(){
  return <Image
    className="brandLogoOfficial"
    src="/images/abelhas/Logo_Melisfera_RN_Final.png"
    alt="MELISFERA RN — Observatório de Abelhas e Serviços Ecossistêmicos do Rio Grande do Norte"
    width={240}
    height={160}
    priority
  />;
}
