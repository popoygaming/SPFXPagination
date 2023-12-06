import { FeedBackResult } from "./FeedBackResult";

export interface IFeedBackService {
    getFeedBack(feedbackListTitle: string): Promise<FeedBackResult>;
}