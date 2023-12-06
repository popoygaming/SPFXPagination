import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IFeedbackListProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  itemsPerPage: number;
  wpContext: WebPartContext;
}
