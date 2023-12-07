import { IFeedBack } from "../../../models/IFeedBack";

export interface IFeedBackService {
    getFeedBack(feedbackListTitle: string, top: number, skip: number): Promise<IFeedBack[]>;
}