class HistoryModel{
    historyId:number;
    userEmail:string;
    checkoutDate:string;
    returnedDate:string;
    title:string;
    artist:string;
    productDescription:string;
    image:string;

    constructor(historyId:number,userEmail:string,checkoutDate:string,returnedDate:string,title:string, artist:string,productDescription:string,image:string){
        this.historyId=historyId;
    this.userEmail=userEmail;
this.checkoutDate  =checkoutDate;
this.returnedDate=returnedDate;
this.artist=artist;
this.title=title;
this.productDescription=productDescription;
this.image=image;  }
}
export default HistoryModel;