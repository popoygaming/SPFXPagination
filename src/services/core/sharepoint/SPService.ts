import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { ISPService } from "./ISPService";
import { SPFI, SPFx, spfi } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { PageContext } from "@microsoft/sp-page-context";
import LogsHelper from "../../../helpers/LogsHelper";

export class SPService implements ISPService {
  public static readonly serviceKey: ServiceKey<ISPService> =
    ServiceKey.create<ISPService>("WSA.SPService", SPService);
  private sp: SPFI;

  constructor(serviceScope: ServiceScope) {
    serviceScope.whenFinished(() => {
      const pageContext: PageContext = serviceScope.consume(
        PageContext.serviceKey
      );
      this.sp = spfi().using(SPFx({ pageContext }));
    });
  }

  public async getListItems(listTitle: string, selectProps: string, expandProps: string): Promise<any[]> {
    return await this.sp.web.lists
      .getByTitle(listTitle)
      .items
      .select(selectProps)
      .expand(expandProps)
      ()
      .then((response: any) => {
        return response;
      })
      .catch((error) => {
        // throw new Error(error);
        LogsHelper.logError(`getListItems: error encountered: ${error}`);
      });
  }

  getTerms(termSetName: string): Promise<any[]> {
    throw new Error("Method not implemented.");
  }
}
