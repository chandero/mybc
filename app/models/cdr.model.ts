export class cdr {
    public callId:string;
    public callNumber:string;
    public callDisposition:string;
    public callDate:string;
    public callCall:string;

    constructor(callerId:string, 
                callerNumber:string, 
                callerDisposition:string,
                callerDate:string,
                callerCall:string){
        this.callId = callerId;
        this.callNumber = callerNumber;
        this.callDisposition = callerDisposition;
        this.callDate = callerDate;
        this.callCall = callerCall;
    }
}