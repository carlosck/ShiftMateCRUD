
export default class ReturnInfo{
    msg:string = ""
    error: boolean = false;
    data: {}

    constructor(_msg='', _error=false){
        this.msg=_msg;
        this.error= _error
        this.data={}
    }

    setMessage(_msg :string){
        this.msg= _msg;
    }
    
    setError(_error_msg: string){
        this.setMessage( _error_msg);
        this.error=true;        
    }
    setData(_data={}){
        this.data= _data;
    }
    show(){
        return ({msg: this.msg, error: this.error,data: this.data});
    }
        


}