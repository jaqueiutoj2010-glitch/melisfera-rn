# MELISFERA RN — Next.js v0.4

Primeira versão do portal científico em Next.js, derivada de `MELISFERA_RN_dados_v03.json`.

## Executar localmente

Requisitos: Node.js 20.9+ e npm com acesso ao registro de pacotes.

```bash
npm install
npm run dev
```

Abrir http://localhost:3000

Para testar produção: `npm run build` e `npm run start`.

## Publicar no GitHub e Vercel

1. Crie um repositório GitHub e envie **o conteúdo desta pasta**.
2. Importe o repositório na Vercel como projeto Next.js.
3. A implantação utilizará o JSON versionado em `data/catalog.json` (não há credenciais nem Supabase nesta versão).
4. Configure domínio próprio quando desejar.

## Estrutura

- `data/catalog.json`: 150 táxons, 280 vínculos documentais, 8 referências.
- `app/page.tsx`: página inicial.
- `app/especies/page.tsx`: catálogo pesquisável com filtros e exportação CSV.
- `app/especies/[id]/page.tsx`: fichas individuais por identificador ARN.
- `app/fontes/page.tsx`: lista de fontes.
- `lib/catalog.ts`: acesso tipado ao conjunto de dados.

## Premissas científicas

As 150 entradas são **adotadas como válidas para o desenvolvimento** por decisão da coordenação. Não foi realizada nesta etapa revisão independente da taxonomia, localidades ou vouchers. As referências e os municípios são apresentados como declarados na base. A contagem de famílias inclui duas entradas com família não determinada. A plataforma não afirma que os 280 vínculos equivalem a ocorrências biológicas independentes.

Não foram inventados atributos funcionais, fotografias, geocoordenadas ou serviços ecossistêmicos. Módulos de mapas, análises R e Supabase ainda não estão conectados.

## Próxima etapa

Migrar o JSON para PostgreSQL/Supabase com tabelas `taxa`, `sources`, `taxon_source_links`, `occurrences`, `traits`, `services` e políticas de leitura pública / escrita autenticada. Manter ARN como chave externa estável. Conferir duplicatas de nomes e resolução taxonômica antes de publicar métricas como riqueza taxonômica definitiva.
