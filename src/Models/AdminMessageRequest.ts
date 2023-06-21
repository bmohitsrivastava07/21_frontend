class AdminMessageRequest{
    messageId:number;
    response:string;

    constructor(messageId:number,response:string){
        this.messageId=messageId;
        this.response=response;
    }
}
export default AdminMessageRequest;