import { FeedBackResult } from "./FeedBackResult";

export interface IFeedBackService {
    getFeedBack(feedbackListTitle: string, top: number, skip: number): Promise<FeedBackResult>;
}