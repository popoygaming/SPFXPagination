export default class LogsHelper{
  
    public static logInformation(infoMsg: string){
        console.log(infoMsg);
    }
    public static logWarning(warningMsg: string){
      console.warn(warningMsg);
    }
    public static logError(errorMsg: string){
      console.error(errorMsg);
    }
    public static logTable(obj: any){
      console.table(obj);
    }
    
}