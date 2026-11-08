/** Galeria fotográfica reutilizável para as aberturas editoriais do observatório. */
type EditorialBeeGalleryProps={label?:string};
export default function EditorialBeeGallery({label='Fotografias de abelhas e flores do Rio Grande do Norte'}:EditorialBeeGalleryProps){
 return <div className="heroGallery melisferaEditorialGallery" aria-label={label}>
  <div className="heroPhoto heroPhotoOne" role="img" aria-label="Flor de maracujá fotografada em campo"/>
  <div className="heroPhoto heroPhotoTwo" role="img" aria-label="Abelha em inflorescência amarela"/>
 </div>;
}
