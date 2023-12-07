export interface IFeedBack {
    id: number;
    applicationName: string;
    businessOwner: string;
    feedbackMessage: string;
    submittedBy: string;
    submittedDate: Date;

    listTitle: string; // to be used to identify which list it came from
}