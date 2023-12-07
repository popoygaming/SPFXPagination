import { IColumn } from "@fluentui/react/lib/components/DetailsList";

export const FeedBackListColumns: IColumn[] = [
    { key: 'applicationName', name: 'Application Name', fieldName: 'applicationName', minWidth: 100, maxWidth: 220, isResizable: true },
    { key: 'businessOwner', name: 'Business Owner', fieldName: 'businessOwner', minWidth: 60, maxWidth: 80, isResizable: true },
    { key: 'feedbackMessage', name: 'Feedback', fieldName: 'feedbackMessage', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'submittedBy', name: 'Submitted By', fieldName: 'submittedBy', minWidth: 60, maxWidth: 80, isResizable: true },
    { key: 'submittedDate', name: 'Submitted Date', fieldName: 'submittedDate', minWidth: 100, maxWidth: 160, isResizable: true },
    { key: 'id', name: 'Id', fieldName: 'id', minWidth: 50, maxWidth: 50, isResizable: true },
    { key: 'listTitle', name: 'List Title', fieldName: 'listTitle', minWidth: 100, maxWidth: 100, isResizable: true },

]