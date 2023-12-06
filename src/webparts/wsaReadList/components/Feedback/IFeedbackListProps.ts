import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IFeedbackListTitle } from "../../../../models/IFeedbackListTitle";

export interface IFeedbackListProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  itemsPerPage: number;
  itemsPerLoad: number;
  listTitles: IFeedbackListTitle[];
  wpContext: WebPartContext;
}
