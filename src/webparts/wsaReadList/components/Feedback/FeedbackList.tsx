import * as React from 'react';
// import styles from './FeedbackList.module.scss';
import type { IFeedbackListProps } from './IFeedbackListProps';
import { IFeedBackService } from '../../../../services/business/feedbackService/IFeedBackService';
import { FeedBackService } from '../../../../services/business/feedbackService/FeedBackService';
import { IFeedbackListState } from './IFeedbackListState';
import { DetailsListLayoutMode } from '@fluentui/react/lib/components/DetailsList/DetailsList.types';
import { FeedBackListColumns } from '../../../../common/DetailsListColumns';
import { Pagination } from '@pnp/spfx-controls-react/lib/controls/pagination/Pagination';
import { DefaultButton } from '@fluentui/react/lib/components/Button/DefaultButton/DefaultButton';
import { ShimmeredDetailsList } from '@fluentui/react/lib/components/DetailsList/ShimmeredDetailsList';

export default class FeedbackList extends React.Component<IFeedbackListProps, IFeedbackListState> {

  private feedbackService: IFeedBackService;

  constructor(props: IFeedbackListProps){
    super(props);
    this.feedbackService = this.props.wpContext.serviceScope.consume(FeedBackService.serviceKey);
    this.state = {
      feedbacks: [],
      isLoading: true,
      paginatedItems: []
    };
  }

  async componentDidMount(): Promise<void> {
    this.fetchFeedbackList();
  }

  private fetchFeedbackList(): void {
    this.props.listTitles.map(async (o)=>{
      const response = await this.feedbackService.getFeedBack(o.listTitle);
      this.setState({feedbacks: [...this.state.feedbacks, ...response.data]});     
      this.setState({ paginatedItems: this.state.feedbacks.slice(0, this.props.itemsPerPage)});
    });
  }

  private getPage(page: number) : void {
    const roundupPage = Math.ceil(page);
    const pageSize = this.props.itemsPerPage;
    const startIndex = (roundupPage - 1) * pageSize;
    this.setState({ paginatedItems: this.state.feedbacks.slice(startIndex, startIndex + pageSize) });
  }

  private onLoadMoreClick = async (): Promise<void> =>{
    // const feedbacks = await this.feedbackService.getFeedBack("Application Feedback");
    // this.setState({feedbacks: [...this.state.feedbacks, ...feedbacks.data] });
  }

  public render(): React.ReactElement<IFeedbackListProps> {
    const { paginatedItems, feedbacks } = this.state;
    const { itemsPerPage } = this.props;

    return (
      <>
        <ShimmeredDetailsList
            compact={true}
            items={paginatedItems || []}
            columns={FeedBackListColumns}
            setKey="set"
            layoutMode={DetailsListLayoutMode.justified}
            selectionPreservedOnEmptyClick={true}
            enableShimmer={paginatedItems?.length === 0}
          />
        <Pagination
              currentPage={1}
              totalPages={(feedbacks?.length / itemsPerPage)}
              onChange={(page) => this.getPage(page)}
            />
        <DefaultButton text="Load More" onClick={this.onLoadMoreClick} allowDisabledFocus />
      </>
    );
  }
}
