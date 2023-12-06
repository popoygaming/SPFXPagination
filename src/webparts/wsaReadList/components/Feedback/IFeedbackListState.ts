import { IFeedBack } from "../../../../models/IFeedBack";

export interface IFeedbackListState {
  feedbacks: IFeedBack[];
  isLoading: boolean;
  paginatedItems: IFeedBack[];
  top: number;
}
