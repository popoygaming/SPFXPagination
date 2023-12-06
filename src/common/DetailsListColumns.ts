import { IColumn } from "@fluentui/react/lib/components/DetailsList";

export const FeedBackListColumns: IColumn[] = [
    { key: 'applicationName', name: 'Application Name', fieldName: 'applicationName', minWidth: 100, maxWidth: 220, isResizable: true },
    { key: 'businessOwner', name: 'Business Owner', fieldName: 'businessOwner', minWidth: 100, maxWidth: 180, isResizable: true },
    { key: 'feedbackMessage', name: 'Feedback', fieldName: 'feedbackMessage', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'submittedBy', name: 'Submitted By', fieldName: 'submittedBy', minWidth: 100, maxWidth: 160, isResizable: true },
    { key: 'submittedDate', name: 'Submitted Date', fieldName: 'submittedDate', minWidth: 100, maxWidth: 160, isResizable: true },
]