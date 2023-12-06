import { IFeedBack } from "../../../models/IFeedBack";

export class FeedBackResult implements IResult {
    data: IFeedBack[];
    isPending: boolean;
    error: any;
}