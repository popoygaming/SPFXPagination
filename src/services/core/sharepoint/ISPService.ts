export interface ISPService {
    getListItems(listTitle: string, selectProps: string, expandProps: string, top: number, skip: number): Promise<any[]>;
    getTerms(termSetName: string): Promise<any[]>;
}