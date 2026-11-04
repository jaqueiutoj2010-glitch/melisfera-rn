# MELISFERA RN v0.5

Plataforma Next.js de biodiversidade, ecologia funcional e serviços ecossistêmicos das abelhas do Rio Grande do Norte.

## Conteúdo
- 150 táxons adotados como espécies válidas na base de trabalho, mantendo códigos ARN.
- 280 vínculos taxonômicos com fontes, com bibliografia rastreável.
- Catálogo pesquisável, fichas ampliadas, CSV, painel de famílias e fontes.
- Panorama de localidades **declaradas** (não mapa de coordenadas verificadas).
- Módulo ecológico com oito táxons reportados por Jorge et al. (2024); **não** extrapolar visitas florais para efetividade de polinização.
- Estrutura pública para futura Rede das Abelhas, sem cadastros pessoais publicados.

## Atualização do site já publicado
O repositório GitHub `melisfera-rn` contém o projeto dentro de `MELISFERA_RN_Nextjs_v04/`, configurado como Root Directory na Vercel. Para atualização sem mudar as configurações, envie os **arquivos internos** desta versão para a **mesma pasta `MELISFERA_RN_Nextjs_v04/` no GitHub**, substituindo os arquivos existentes. NÃO crie uma nova pasta `MELISFERA_RN_Nextjs_v05/` no repositório, a menos que altere o Root Directory na Vercel. Para facilitar, o ZIP de publicação também contém uma pasta `MELISFERA_RN_Nextjs_v04/` já com o código v0.5.

## Executar localmente
`npm install` e `npm run dev` (Node.js compatível com Next.js 15).

## Limitações
- A base de 150 é uma premissa do projeto; nem todos os nomes/localidades têm confirmação primária independente.
- Vínculos com fontes não são 280 ocorrências biológicas distintas.
- Sem dados de traços inferidos para espécies não documentadas.
- Nenhum endereço pessoal, API key ou credencial é incluído.
- Os módulos não estão conectados ao Supabase nesta etapa.
