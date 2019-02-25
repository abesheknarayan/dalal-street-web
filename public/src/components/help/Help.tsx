import * as React from "react";
import { Notification } from "../common/Notification";
import { TinyNetworth } from "../common/TinyNetworth";
import { Notification as Notification_pb } from "../../../proto_build/models/Notification_pb";
import { Fragment } from "react";

declare var $: any;

export interface HelpProps {
    userCash: number,
    userReservedCash: number,
    userTotal: number,
    connectionStatus: boolean,
    isMarketOpen: boolean,
    notifications: Notification_pb[],
    disclaimerElement: JSX.Element,
}
export class Help extends React.Component<HelpProps, {}> {
    componentDidMount() {
        $("#help-tab .item").tab();
        $("#help-content .accordion").accordion();
    }

    render() {
        return (
            <Fragment>
                <div className="row" id="top_bar">
                    <TinyNetworth userCash={this.props.userCash} userReservedCash={this.props.userReservedCash} userTotal={this.props.userTotal} connectionStatus={this.props.connectionStatus} isMarketOpen={this.props.isMarketOpen}/>
                    <div id="notif-component">
                        <Notification notifications={this.props.notifications} icon={"open envelope icon"} />
                    </div>
                </div>
                <div id="help-container" className="ui stackable grid pusher main-container">
                    <div className="row">
                        <h1 className="ui center aligned icon header inverted">
                            <i className="help icon"></i>
                            <div className="content">
                                Help
                            <div className="grey sub header">
                                    Need some assistance?
                            </div>
                            </div>
                        </h1>
                    </div>
                    <div className="row">
                        <div className="one wide column"></div>
                        <div id="help-content" className="fourteen wide column">
                            <h2 className="ui header inverted lighter">Welcome to Dalal Street's official Help Page!</h2>
                            <h2 className="ui header inverted lighter">Please read our Getting Started section before playing the game.</h2>
                            <br />
                            <div id="help-tab" className="ui top attached tabular menu">
                                <a className="active item" data-tab="gettingstarted">Getting Started</a>
                                <a className="item" data-tab="faqs">FAQ</a>
                                <a className="item" data-tab="forum">Forum</a>
                            </div>
                            <div className="ui bottom attached active tab segment" data-tab="gettingstarted">

                                <div className="ui styled fluid accordion">

                                    <div className="title">
                                        <i className="dropdown icon inverted"></i>
                                        <span className="faq-questions lighter">The Objective</span>
                                    </div>
                                    <div className="content">
                                        <p>Each player begins the game with ₹2,00,000. Your objective is to use this money to maximise your profit at the end of 7 days.</p>
                                    </div>

                                    <div className="title">
                                        <i className="dropdown icon inverted"></i>
                                        <span className="faq-questions lighter">How do I make money?</span>
                                    </div>
                                    <div className="content">
                                        <p>These are the two ways to make money :-</p>
                                        <ul>
                                            <li>Buying stocks at low prices and selling them at higher prices.</li>
                                            <li>Short selling stocks and then buying them back for a lower price.</li>
                                        </ul>
                                        <p><em>If you’re unsure of what short selling means, check out our FAQ section.</em></p>
                                    </div>

                                    <div className="title">
                                        <i className="dropdown icon inverted"></i>
                                        <span className="faq-questions lighter">The Basics</span>
                                    </div>
                                    <div className="content">
                                        <p>There are a total of 12 companies trading publicly on the Dalal Street Exchange. To know more about each company, check out the <strong>Companies Page</strong>, which is shown in the image below. On this page, you’ll find a short description about each company as well as its latest stock price information.</p>
                                        <p className="image-wrapper"><img src="./public/src/images/help/Dalal_Companies_Page.png" alt="Company Image" /></p>
                                        <p>Please note that the companies on the Dalal Street Exchange are <strong>in no way related to any real world companies</strong>. The stock prices and news articles released in this game are entirely fictitious and will NOT be affected by real world events.</p>
                                        <p>Before the game begins, all stocks will be held by the exchange. As soon as the market opens on Day 1, the stocks will be open for all of the players to buy. Buying stocks from the exchange can be done from the <strong>Exchange Page</strong>, as shown below.</p>
                                        <p className="image-wrapper"><img src="./public/src/images/help/Dalal_Market_Available.png" alt="Exchange Image" /></p>
                                        <p>We also recommend that you pay close attention to the <strong>News Page</strong>. This page will constantly be updated with articles about company news, scandals, rumours,
                                    or even political developments. Staying connected with these updates can give you an edge over other players as this is the best way to predict the future performance of a company.</p>
                                        <p><em>Pro Tip</em>: If you’re using the <a target="_blank" href="https://play.google.com/store/apps/details?id=org.pragyan.dalal18">Dalal Street Android App</a>, you will receive a notification on your phone every time a new article is published.</p>
                                    </div>

                                    <div className="title">
                                        <i className="dropdown icon inverted"></i>
                                        <span className="faq-questions lighter">Buying and Selling Stocks</span>
                                    </div>
                                    <div className="content">
                                        <p>All trading related tasks are performed on the <strong>Trading Page</strong>, which is shown in the image below.</p>
                                        <p className="image-wrapper"><img src="./public/src/images/help/Dalal_Trading_Page.png" alt="Trading Image" /></p>
                                        <p>Lets walk through all the elements of this page.</p>
                                        <p><strong>Order Book</strong> - The Market Depth lists all <em>open</em> buy and sell orders. This includes orders issued by <em>all players</em> that have not been filled yet. By observing the Market Depth, you can see the prices at which other players are placing their orders and judge the current mood of the market. The Trading History displays the last 15 transactions that have been executed for the company you’ve chosen.</p>
                                        <p><strong>Place Orders</strong> - There are 3 different types of orders you can place - Market, Limit and Stoploss. <em>(You can read more about these terms in our FAQ section)</em>. Once your orders are placed, we will fill the order based on a <em>best match</em> algorithm.</p>
                                        <p><strong>Open Orders</strong> - These are the orders that you have placed but have not been filled yet. After you place an order, the order will appear here until it is successfully filled.</p>
                                        <p><strong>Price Chart</strong> - This shows how the stock price of the selected company has changed over time. You can view the chart with different time intervals by using the dropdown above the chart. This allows you to analyse the data at different levels of detail.</p>
                                        <p>Once you’ve bought some stocks, you can view all the stocks you own as well as your <em>Net Worth</em> on the <strong>Portfolios Page</strong>, as shown in the image below. This page also displays a list of all your <strong>executed transactions</strong>.</p>
                                        <p className="image-wrapper"><img src="./public/src/images/help/Dalal_Portfolio_Page.png" alt="Portfolio Image" /></p>
                                        <p>Hopefully, this should be enough to get you going and start trading! If you still have some questions, please read our FAQ section where we address some more common doubts that players may have.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="ui bottom attached tab segment" data-tab="faqs">
                                <div className="ui styled fluid accordion">

                                    <div className="title">
                                        <i className="dropdown icon inverted"></i>
                                        <span className="faq-questions">Help! I don’t know what Market, Limit and Stoploss orders are!</span>
                                    </div>
                                    <div className="content">
                                        <p>These are the 3 types of orders that you can place. The type of order you select can change the trade price as well as how soon your order gets filled.</p>
                                        <ol>
                                            <li><strong>Market Orders</strong>: If your primary concern is to have your order filled ASAP, and you’re not too worried about the price at which the transaction is carried out, you should use a Market Order. Once you place a Market Buy Order for a certain company, we will find the <em>least priced</em> Market Sell Order (for the same company) and execute the transaction. (vice-versa for Market Sell)</li>
                                        </ol>
                                        <ol start={2}>
                                            <li><strong>Limit Orders</strong>: Limit Orders allow you to specify a <em>maximum</em> trade price in case of a Limit Buy, and a <em>minimum</em> trade price in case of a Limit Sell. While these may take more time to be filled than a Market Order, they provide you with more control over the price at which the transaction is executed a.k.a <em>trade price</em>.</li>
                                        </ol>
                                        <ol start={3}>
                                            <li><strong>Stoploss Orders</strong>: Stoploss orders are converted to Market Orders once the price crosses the Stoploss price that you set :- </li>
                                            <ul>
                                                <li>Stopless Buys are converted to <em>Market Buys</em> as soon as the stocks price rises <em>above</em> the Stoploss price that you set.</li>
                                                <li>Stopless Sells are converted to <em>Market Sells</em> as soon as the stocks price falls <em>below</em> the Stoploss price that you set.</li>
                                            </ul><br />
                                            <p><em>Pro Tip</em>: Since the market is open 24/7, Stoploss orders can be very useful in case the market fluctuates wildly when you're not online! You can use Stopless Buy Orders to jump on a rising trend and you can use Stoploss Sell Orders to lock in a profit/limit your losses.</p>
                                        </ol>
                                    </div>

                                    <div className="title">
                                        <i className="dropdown icon inverted"></i>
                                        <span className="faq-questions">What exactly is this <em>trade price</em> and how is it determined?</span>
                                    </div>
                                    <div className="content">
                                        <p>The trade price is the price at which a transaction is executed. Our algorithm uses a <strong>best match approach</strong> to match Buy Orders to Sell orders as well as to determine the price at which the trade is executed. You can view the trade price of all of your executed transactions on the <strong>Portfolio Page</strong>.</p>
                                    </div>

                                    <div className="title">
                                        <i className="dropdown icon inverted"></i>
                                        <span className="faq-questions">What is my Net Worth and how is it calculated?</span>
                                    </div>
                                    <div className="content">
                                        <p>The player with the highest Net Worth at the end of 7 days is the winner. Your Net Worth is split into two parts - <em>Cash In Hand</em> and <em>Stock Worth</em>. You can view these values on the <strong>Portfolio page</strong>. Here’s a table explaining how your Net Worth will change in response to different events :-</p>
                                        <table className="ui inverted table">
                                            <thead>
                                                <tr>
                                                    <th>Event</th>
                                                    <th>Cash In Hand</th>
                                                    <th>Stock Worth</th>
                                                    <th>Net Worth</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Buy stocks</td>
                                                    <td className="red">Decreases</td>
                                                    <td className="green">Increases</td>
                                                    <td className="cyan">Constant</td>
                                                </tr>
                                                <tr>
                                                    <td>Sell stocks</td>
                                                    <td className="green">Increases</td>
                                                    <td className="red">Decreases</td>
                                                    <td className="cyan">Constant</td>
                                                </tr>
                                                <tr>
                                                    <td>Stock price rises</td>
                                                    <td className="cyan">Constant</td>
                                                    <td className="green">Increases</td>
                                                    <td className="green">Increases</td>
                                                </tr>
                                                <tr>
                                                    <td>Stock price falls</td>
                                                    <td className="cyan">Constant</td>
                                                    <td className="red">Decreases</td>
                                                    <td className="red">Decreases</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="title">
                                        <i className="dropdown icon inverted"></i>
                                        <span className="faq-questions">What is this short selling you speak of?</span>
                                    </div>
                                    <div className="content">
                                        <div className="transition hidden">
                                            <p>While you will <em>buy</em> a company’s stock if you expect its price to go up, <strong>you can <em>short sell</em> a company’s stock if you expect its price to go down</strong>. In a nutshell, short selling means to sell stocks that you don’t own so that you can buy them back at a lower price.</p>
                                            <p>For example, short selling 5 shares of a company XYZ is mathematically equivalent to buying -5 shares of XYZ. When you short sell, your <em>Cash In Hand</em> will increase and your <em>Stock Worth</em> will accordingly decrease such that your <strong><em>Net Worth</em> remains the same</strong> <em>(Remember: Net Worth = Cash In Hand + Stock Worth)</em>.</p>
                                            <p>After you short sell a company, if the stock price dips below the price you sold it for, then you will have made a profit and vice-versa.</p>
                                            <p><em>Note: You can only short sell a maximum of 50 stocks per company</em></p>
                                        </div>
                                    </div>

                                    <div className="title">
                                        <i className="dropdown icon inverted"></i>
                                        <span className="faq-questions">What is the difference between <em>Stocks in Exchange</em> and <em>Stocks in Market</em>?</span>
                                    </div>
                                    <div className="content">
                                        <p>In the <strong>Companies Page</strong>, you’ll find an entry for Stocks in Exchange as well as an entry for Stocks in Market. Let’s clarify the difference between the two :-</p>
                                        <ul>
                                            <li><strong>Stocks in Exchange</strong> - The number of stocks that the Dalal Street Exchange currently holds. This number will be the same as the number found under the <em>Available</em> column in the <strong>Exchange Page</strong>.</li>
                                            <li><strong>Stocks in Market</strong> - The number of stocks that are currently held by all of the players in the game.</li>
                                        </ul>
                                        <p>When the game begins, the <em>Stocks in Market</em> will be <strong>zero</strong> since all stocks are initially held by the exchange. As soon as the market opens on Day 1 and players begin buying from the exchange, the number of <em>Stocks in Market</em> will increase and the number of <em>Stocks in Exchange</em> will decrease.</p>
                                        <p>If the number of Stocks in Exchange is zero, it means that all shares of this company are currently in the hands of the players. Therefore, you can no longer buy shares from the exchange and instead, you'll have to place Buy Orders on the <strong>Trading Page</strong> to buy any stock.</p>
                                    </div>

                                    <div className="title">
                                        <i className="dropdown icon inverted"></i>
                                        <span className="faq-questions">How does mortgaging work?</span>
                                    </div>
                                    <div className="content">
                                        <div className="transition hidden">
                                            <p>Mortgaging is a great tactic to use if you are in need of cash but are not willing to sell your stocks to other players. It consists of 2 steps :-</p>
                                            <ol>
                                                <li><strong>Mortgage</strong> - In this step, you will be selling your stocks to the exchange at the Deposit Rate <em>(80% of the Current Stock Price).</em></li>
                                                <br /><p className="image-wrapper"><img src="./public/src/images/help/Dalal_Mortgage.png" alt="Mortgage Image" /></p>
                                                <li><strong>Retrieval</strong> - Here, you will be retrieving the stocks you initially mortgaged by paying the exchange at the Retrieval Rate <em>(90% of the Current Stock Price).</em></li>
                                                <br /><p className="image-wrapper"><img src="./public/src/images/help/Dalal_Retrieve.png" alt="Retrieval Image" /></p>
                                            </ol>
                                            <p><em>Note</em> : After you mortgage a stock, it is no longer a part of your portfolio and hence, will not contribute to your stock worth (until you retrieve it).</p>
                                        </div>
                                    </div>

                                    <div className="title">
                                        <i className="dropdown icon inverted"></i>
                                        <span className="faq-questions">Can I expect any new companies to pop up over the course of the game?</span>
                                    </div>
                                    <div className="content">
                                        <p>While we don’t expect any more companies to go public over the course of this game, existing companies may release more shares in the middle. If this happens, then the number of <em>Stocks in Exchange</em> will increase, and you can buy these stocks from the <strong>Exchange Page</strong>. Stay tuned to the <strong>News Page</strong> or download the <a target="_blank" href="https://play.google.com/store/apps/details?id=org.pragyan.dalal18">Dalal Street Android App</a> to be the first to know when to expect more shares.</p>
                                        <p>If you still have any queries, please feel free to ask it on our <a target="_blank" href="https://www.allanswered.com/community/s/dalal-street/">Official Forum</a> and we'll try to get back to you as soon as possible. Happy Trading!</p>
                                    </div>
                                </div>
                            </div>
                            <div className="ui bottom attached tab segment" data-tab="forum">
                                For further queries, feel free to post your doubts on the
                            <a href="https://www.allanswered.com/community/s/dalal-street/" target="_blank">
                                    &nbsp;forum
                            </a>
                            </div>
                        </div>
                        <div className="one wide column"></div>
                    </div>
                    {this.props.disclaimerElement}
                </div>
            </Fragment>
        );
    }
}
