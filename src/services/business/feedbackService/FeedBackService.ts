import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { IFeedBackService } from "./IFeedBackService";
import { ISPService } from "../../core/sharepoint/ISPService";
import { SPService } from "../../core/sharepoint/SPService";
import { IFeedBack } from "../../../models/IFeedBack";
import LogsHelper from "../../../helpers/LogsHelper";
import { FEEDBACK_FIELDNAME_APPNAME, FEEDBACK_FIELDNAME_BUSINESSOWNER, FEEDBACK_FIELDNAME_MESSAGE, FEEDBACK_FIELDNAME_SUBMITBY, FEEDBACK_FIELDNAME_SUBMITDATE } from "../../../common/Constants";

export class FeedBackService implements IFeedBackService {

    public static readonly serviceKey: ServiceKey<IFeedBackService> = ServiceKey.create<IFeedBackService>('WSA.ProductService', FeedBackService);
    private _SPService: ISPService;

    constructor(serviceScope: ServiceScope) {
        serviceScope.whenFinished(() => {
            this._SPService = serviceScope.consume(SPService.serviceKey);
        });
    }
    
    public async getFeedBack(listTitle: string, top: number, skip: number): Promise<IFeedBack[]> {
        const ret: IFeedBack[] = [];
        try {
            await this.sleep(2000); // to test shimmer effect

            const response = await this._SPService.getListItems(
                listTitle,
                "ID,ApplicationName,BusinessOwner/FirstName,BusinessOwner/LastName,FeedBackMessage,Created,SubmittedBy/FirstName,SubmittedBy/LastName", 
                "BusinessOwner,SubmittedBy", top, skip
                );
            
                if(response !== null && response !== undefined){
                    const feedbacks: IFeedBack[] = this.convertToFeedback(response, listTitle);
                    return feedbacks;
                }
            
            LogsHelper.logInformation(`Successfully fetch list items of list ${listTitle}`);
        } 
        catch (error) {
            LogsHelper.logError(`getFeedBack: error encountered: ${error}`);
        }
        return ret;
    }

    private convertToFeedback(results: any[], listTitle: string): IFeedBack[] {
        return results.map(r => {
            return {
                id: r["ID"],
                applicationName: r[FEEDBACK_FIELDNAME_APPNAME],
                businessOwner: `${r[FEEDBACK_FIELDNAME_BUSINESSOWNER]?.FirstName} ${r[FEEDBACK_FIELDNAME_BUSINESSOWNER]?.LastName}`,
                feedbackMessage: r[FEEDBACK_FIELDNAME_MESSAGE],
                submittedBy: `${r[FEEDBACK_FIELDNAME_SUBMITBY]?.FirstName} ${r[FEEDBACK_FIELDNAME_SUBMITBY]?.LastName}`,
                submittedDate: r[FEEDBACK_FIELDNAME_SUBMITDATE],
                listTitle: listTitle
            };
        });
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    private sleep = async (milliseconds: number) => {
        await new Promise(resolve => {
            return setTimeout(resolve, milliseconds)
        });
    };
}