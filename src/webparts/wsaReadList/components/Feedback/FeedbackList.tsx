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
import LogsHelper from '../../../../helpers/LogsHelper';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';

export default class FeedbackList extends React.Component<IFeedbackListProps, IFeedbackListState> {

  private feedbackService: IFeedBackService;

  constructor(props: IFeedbackListProps){
    super(props);
    this.feedbackService = this.props.wpContext.serviceScope.consume(FeedBackService.serviceKey);
    this.state = {
      feedbacks: [],
      isLoading: true,
      paginatedItems: [],
      top: props.itemsPerLoad
    };
  }

  async componentDidMount(): Promise<void> {
    // initial load
    await Promise.all(
      this.props.listTitles.map(async (o, i)=>{
        const response = await this.feedbackService.getFeedBack(o.listTitle, this.state.top, 0);
        this.setState({feedbacks: [...this.state.feedbacks, ...response]});     
        this.setState({ paginatedItems: this.state.feedbacks.slice(0, this.props.itemsPerPage)});
      })
    );
    this.setState({isLoading: false});
  }

  private getPage(page: number) : void {
    const roundupPage = Math.ceil(page);
    const pageSize = this.props.itemsPerPage;
    const startIndex = (roundupPage - 1) * pageSize;
    this.setState({ paginatedItems: this.state.feedbacks.slice(startIndex, startIndex + pageSize) });
  }

  private onLoadMoreClick = async (): Promise<void> =>{
    this.setState({isLoading: true});
    await Promise.all(
      this.props.listTitles.map(async (o, i)=>{
        const listItems = this.state.feedbacks.filter((obj) => obj.listTitle === o.listTitle);
        const skip = Math.max(...listItems.map(o => o.id)); /// get the highest item id in the list items we already fetched
  
        if(skip !== undefined && skip !== null){
          const response = await this.feedbackService.getFeedBack(o.listTitle, this.state.top, skip);
          this.setState({feedbacks: [...this.state.feedbacks, ...response]});
        }
        else{
          LogsHelper.logWarning(`Unable to load more items for list ${o.listTitle}`);
        }
      })
    );
    this.setState({isLoading: false});
  }

  public render(): React.ReactElement<IFeedbackListProps> {
    const { paginatedItems, feedbacks, isLoading } = this.state;
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
            enableShimmer={isLoading}
          />
        {
          !isLoading && 
            <Stack enableScopedSelectors horizontal horizontalAlign="center" tokens={{childrenGap: 20}}>
                <Pagination
                  currentPage={1}
                  totalPages={(feedbacks?.length / itemsPerPage)}
                  onChange={(page) => this.getPage(page)}
                />
                <DefaultButton text="Load More" onClick={this.onLoadMoreClick} allowDisabledFocus />
            </Stack>
        }
      </>
    );
  }
}
