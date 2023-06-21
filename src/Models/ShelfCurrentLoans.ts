import ProductModel from "./ProductModel";

class ShelfCurrentLoans{
    product: ProductModel;
    daysLeft: number;

    constructor(product:ProductModel,daysLeft:number){
        this.product=product;
        this.daysLeft=daysLeft;
    }
}
export default ShelfCurrentLoans;