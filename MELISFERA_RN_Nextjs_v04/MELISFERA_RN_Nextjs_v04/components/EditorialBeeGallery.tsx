/** Fotografia de abertura, no padrão da página Indicadores da biodiversidade. */
type EditorialBeeGalleryProps={label?:string};
export default function EditorialBeeGallery({label='Fotografia da biodiversidade do Rio Grande do Norte'}:EditorialBeeGalleryProps){
 return <div className="melisferaEditorialGallery melisferaSinglePhoto" role="img" aria-label={label}/>;
}
