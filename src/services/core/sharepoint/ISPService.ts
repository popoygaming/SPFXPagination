export interface ISPService {
    getListItems(listTitle: string, selectProps: string, expandProps: string): Promise<any[]>;
    getTerms(termSetName: string): Promise<any[]>;
}