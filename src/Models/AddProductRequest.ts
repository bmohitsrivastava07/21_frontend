class AddProductRequests{
    title:string;
    artist:string;
    productDescription:string;
    quantities:number;
    category:string;
    image?:string;
    constructor(title:string,artist:string,productDescription:string,quantities:number,category:string){
        this.title=title;
        this.artist=artist;
        this.productDescription=productDescription;
        this.quantities=quantities;
        this.category=category;
    }
}
export default AddProductRequests;