import * as React from "react";
import { Metadata } from "grpc-web-client";
import ReactPaginate from "react-paginate";
import { DalalActionService } from "../../../proto_build/DalalMessage_pb_service";
import { Notification } from "../common/Notification";
import { TinyNetworth } from "../common/TinyNetworth";
import { Notification as Notification_pb } from "../../../proto_build/models/Notification_pb";
import { GetLeaderboardRequest, GetLeaderboardResponse } from "../../../proto_build/actions/GetLeaderboard_pb";
import { LeaderboardRow as LeaderboardRow_pb } from "../../../proto_build/models/LeaderboardRow_pb";
import { Fragment } from "react";
import { addCommas, showErrorNotif } from "../../utils";

export interface LeaderboardProps {
    userCash: number,
    userReservedCash: number,
    userTotal: number,
    connectionStatus: boolean,
    isMarketOpen: boolean,
    sessionMd: Metadata,
    leaderboardCount: number,
    notifications: Notification_pb[],
    disclaimerElement: JSX.Element
}

interface LeaderboardState {
    totalPages: number,
    leaderboardEntries: LeaderboardRow_pb[],
    userRank: number,
}

export class Leaderboard extends React.Component<LeaderboardProps, LeaderboardState> {
    constructor(props: LeaderboardProps) {
        super(props);

        this.state = {
            totalPages: 1,
            leaderboardEntries: [],
            userRank: 0,
        };
    }

    componentDidMount() {
        this.getLeaderboard(1);
    }

    getLeaderboard = async (offset: number) => {
        // No idea why this is required but react-paginate breaks if you change state while it's state change is happening
        // this.setState({
        //     isLoading: true,
        // });
        const leaderboardRequest = new GetLeaderboardRequest();
        leaderboardRequest.setStartingId(offset);
        leaderboardRequest.setCount(this.props.leaderboardCount);

        try {
            const resp = await DalalActionService.getLeaderboard(leaderboardRequest, this.props.sessionMd);
            this.setState({
                totalPages: Math.ceil(resp.getTotalUsers() / this.props.leaderboardCount),
                leaderboardEntries: resp.getRankListList(),
                userRank: resp.getMyRank(),
            });
        }
        catch (e) {
            // error could be grpc error or Dalal error. Both handled in exception
            console.log("Error happened! ", e.statusCode, e.statusMessage, e);
            showErrorNotif("Error fetching leaderboard. Try refreshing.");
        }
    };

    handlePageChange = async (data: any) => {
        const startPage = data.selected as number;
        const offset = startPage * this.props.leaderboardCount + 1;

        await this.getLeaderboard(offset);
    }

    render() {
        const state = this.state;

        const leaderboardEntries = state.leaderboardEntries.map((entry, index) => (
            <tr key={index}>
                <td><strong>{entry.getRank()}</strong></td>
                <td><strong>{entry.getUserName()}</strong></td>
                <td><strong>{addCommas(entry.getCash())}</strong></td>
                <td className={entry.getStockWorth() >= 0 ? "green" : "red"}><strong>{addCommas(entry.getStockWorth())}</strong></td>
                <td className={entry.getTotalWorth() >= 0 ? "green" : "red"}><strong>{addCommas(entry.getTotalWorth())}</strong></td>
            </tr>
        ));

        return (
            <Fragment>
                <div className="row" id="top_bar">
                    <TinyNetworth userCash={this.props.userCash} userReservedCash={this.props.userReservedCash} userTotal={this.props.userTotal} connectionStatus={this.props.connectionStatus} isMarketOpen={this.props.isMarketOpen}/>
                    <div id="notif-component">
                        <Notification notifications={this.props.notifications} icon={"open envelope icon"} />
                    </div>
                </div>
                <div id="leaderboard-container" className="ui stackable grid pusher main-container">
                    <div className="row">
                        <h2 className="ui center aligned icon header inverted">
                            <i className="trophy icon"></i>
                            <div className="content">
                                Leaderboard
                            <div className="grey sub header">
                                    This is what it all comes down to
                            </div>
                            <br></br>
                            <div className="grey sub header">
                                   <b>Reserved stocks and cash are considered towards leaderboard rankings only at the end of the game.</b>
                                   <button  id="help-icon" data-tooltip="Check FAQ section of the Help Page for more information">
                                      <i className=" small question circle icon "></i>
                                   </button>
                            </div>
                            </div>
                        </h2>
                    </div>

                    <div id="my-rank" className="row">
                        <div className="one wide column"></div>
                        <div className="eight wide column">
                            <div className="ui header inverted">
                                <i className="star icon"></i>
                                Your rank : {state.userRank}
                            </div>
                        </div>
                        <div className="six wide column">
                            <div className="ui small right aligned header inverted">
                                Leaderboard will be updated every 2 minutes
                            </div>
                        </div>
                        <div className="one wide column"></div>
                    </div>

                    <div className="row fourteen wide column centered">
                        <table className="ui inverted table unstackable">
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Username</th>
                                    <th>Cash (₹)</th>
                                    <th>StockWorth (₹)</th>
                                    <th>Net Worth (₹)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaderboardEntries}
                            </tbody>
                        </table>
                    </div>

                    <div className="row">
                        <ReactPaginate
                            previousLabel={"<"}
                            nextLabel={">"}
                            breakLabel={<a href="">...</a>}
                            breakClassName={"break-me"}
                            pageCount={state.totalPages}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageChange}
                            containerClassName={"leaderboard-pagination"}
                            activeClassName={"active-leaderboard-page"}
                        />
                    </div>
                    {this.props.disclaimerElement}
                </div>
            </Fragment>
        );
    }
}
