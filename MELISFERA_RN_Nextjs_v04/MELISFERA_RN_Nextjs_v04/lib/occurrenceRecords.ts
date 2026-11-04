/** Modelo para importação futura de registros primários auditáveis. Não representa ocorrências já verificadas. */
export type EvidenceStatus='researcher_reported'|'source_inherited'|'verified';
export type OccurrenceRecord={
 id:string;
 taxonId:string;
 municipality:string;
 state:'RN';
 evidenceStatus:EvidenceStatus;
 sourceTitle:string;
 sourceUrl?:string;
 observedOn?:string; // ISO YYYY-MM-DD, quando conhecida
 latitude?:number;
 longitude?:number;
 coordinateUncertaintyMeters?:number;
 evidenceType?:'photograph'|'specimen'|'observation'|'literature'|'dataset';
 evidenceReference?:string;
 recordedBy?:string;
 notes?:string;
};
/** Sem registros primários publicados até a conferência de suas evidências. */
export const verifiedOccurrences:OccurrenceRecord[]=[];
