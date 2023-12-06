import * as React from 'react';
// import styles from './FeedbackList.module.scss';
import type { IFeedbackListProps } from './IFeedbackListProps';
// import { escape } from '@microsoft/sp-lodash-subset';
import { IFeedBackService } from '../../../services/business/feedbackService/IFeedBackService';
import { FeedBackService } from '../../../services/business/feedbackService/FeedBackService';
import LogsHelper from '../../../helpers/LogsHelper';
import { IFeedbackListState } from './IFeedbackListState';

export default class FeedbackList extends React.Component<IFeedbackListProps, IFeedbackListState> {

  async componentDidMount(): Promise<void> {
    this.setState({isLoading: true});
    const feedbackService: IFeedBackService = this.props.wpContext.serviceScope.consume(FeedBackService.serviceKey);
    const feedbacks = await feedbackService.getFeedBack("Application Feedback");
    this.setState({feedbacks: feedbacks.data, isLoading: feedbacks.isPending});

    LogsHelper.logTable(feedbacks.data);
  }

  public render(): React.ReactElement<IFeedbackListProps> {
    // const {
    //   description,
    //   isDarkTheme,
    //   environmentMessage,
    //   hasTeamsContext,
    //   userDisplayName
    // } = this.props;

    // const {isLoading} = this.state;

    return (
      <>
        {/* {isLoading} */}
      </>
    );
  }
}
