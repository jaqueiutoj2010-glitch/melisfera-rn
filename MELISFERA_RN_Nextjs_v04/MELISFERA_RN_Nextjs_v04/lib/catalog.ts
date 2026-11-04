import db from '@/data/catalog.json';
export type SourceLink=typeof db.taxa[number]['sources'][number];
export type Taxon=typeof db.taxa[number];
export const taxa=db.taxa;
export const references=db.references;
export const families=[...new Set(taxa.map(t=>t.family))].sort((a,b)=>a.localeCompare(b,'pt-BR'));
export const findTaxon=(id:string)=>taxa.find(t=>t.id===id);
export const countLinks=taxa.reduce((n,t)=>n+t.sources.length,0);
export const referenceById=(id:string)=>references.find(r=>r.FONTE_ID===id);
