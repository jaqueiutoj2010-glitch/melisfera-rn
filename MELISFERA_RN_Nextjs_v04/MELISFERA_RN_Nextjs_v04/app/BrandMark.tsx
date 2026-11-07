import Image from 'next/image';

export default function BrandMark(){
  return <Image
    className="brandLogoOfficial"
    src="/images/abelhas/Logo_Melisfera_RN_Final.png"
    alt="MELISFERA RN — Observatório de Abelhas e Serviços Ecossistêmicos do Rio Grande do Norte"
    width={1200}
    height={800}
    sizes="(max-width: 650px) 215px, (max-width: 1200px) 260px, 315px"
    unoptimized
    priority
  />;
}
