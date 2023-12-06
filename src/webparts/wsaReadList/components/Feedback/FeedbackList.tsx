import * as React from 'react';
// import styles from './FeedbackList.module.scss';
import type { IFeedbackListProps } from './IFeedbackListProps';
// import { escape } from '@microsoft/sp-lodash-subset';
import { IFeedBackService } from '../../../../services/business/feedbackService/IFeedBackService';
import { FeedBackService } from '../../../../services/business/feedbackService/FeedBackService';
import LogsHelper from '../../../../helpers/LogsHelper';
import { IFeedbackListState } from './IFeedbackListState';
import { DetailsList } from '@fluentui/react/lib/components/DetailsList/DetailsList';
import { DetailsListLayoutMode } from '@fluentui/react/lib/components/DetailsList/DetailsList.types';
import { FeedBackListColumns } from '../../../../common/DetailsListColumns';
import { Pagination } from '@pnp/spfx-controls-react/lib/controls/pagination/Pagination';

export default class FeedbackList extends React.Component<IFeedbackListProps, IFeedbackListState> {

  constructor(props: IFeedbackListProps){
    super(props);
    this.state = {
      feedbacks: [],
      isLoading: true,
      paginatedItems: []
    };
  }

  async componentDidMount(): Promise<void> {
    this.setState({isLoading: true});
    const feedbackService: IFeedBackService = this.props.wpContext.serviceScope.consume(FeedBackService.serviceKey);
    const feedbacks = await feedbackService.getFeedBack("Application Feedback");
    this.setState({feedbacks: feedbacks.data, paginatedItems: feedbacks.data.slice(0, this.props.itemsPerPage), isLoading: feedbacks.isPending});
    
    LogsHelper.logTable(feedbacks.data);
  }

  private _getPage(page: number) : void {
    // round a number up to the next largest integer.
    const roundupPage = Math.ceil(page) - 1;
    const itemsPerPage = this.props.itemsPerPage;
    this.setState({ paginatedItems: this.state.feedbacks.slice(roundupPage * itemsPerPage, (roundupPage * itemsPerPage) + itemsPerPage) });
  }

  public render(): React.ReactElement<IFeedbackListProps> {
  
    const { isLoading, paginatedItems, feedbacks } = this.state;
    const { itemsPerPage } = this.props;

    return (
      <>
        {
          isLoading && <div>Loading</div>
        }
        <DetailsList
            compact={true}
            items={paginatedItems}
            columns={FeedBackListColumns}
            setKey="set"
            layoutMode={DetailsListLayoutMode.justified}
            selectionPreservedOnEmptyClick={true}
        />
        <Pagination
              currentPage={1}
              totalPages={(feedbacks?.length / itemsPerPage) - 1}
              onChange={(page) => this._getPage(page)}
              limiter={3}
            />
      </>
    );
  }
}
