import * as React from "react";
import { Fragment } from "react";

import { Metadata } from "grpc-web-client";
import { DalalActionService, DalalStreamService } from "../../proto_build/DalalMessage_pb_service";
import { LoginResponse } from "../../proto_build/actions/Login_pb";
import { LogoutRequest, LogoutResponse } from "../../proto_build/actions/Logout_pb";
import { GetPortfolioRequest, GetPortfolioResponse } from "../../proto_build/actions/GetPortfolio_pb"
import { User as User_pb } from "../../proto_build/models/User_pb";
import { Stock as Stock_pb } from "../../proto_build/models/Stock_pb";
import { Login } from "./login/Login"
import { Register } from "./register/Register"
import { IntroScreen } from "./intro/IntroScreen";
import { LoadingScreen } from "./common/LoadingScreen";
import {Forgotpassword} from "./forgotpassword/forgotpassword";
import { Navbar } from "./common/Navbar";
import { Main } from "./Main";
import { RegisterResponse } from "../../proto_build/actions/Register_pb";

const LOGIN = 1;
const SIGNUP = 2;
const MAIN = 3;
const LOADING = 4;
const SPLASH = 5;
const FORGOTPASSWORD=6;

interface AppState {
	isLoading: boolean // Waiting for response from login
	isLoggedIn: boolean // To check if a successful login response has been handled
	sessionMd: Metadata
	user: User_pb

	stocksOwnedMap: { [index: number]: number } // stocks owned by user for a given stockid
	stockDetailsMap: { [index: number]: Stock_pb } // get stock detail for a given stockid
	stocksReservedMap: {[index: number]: number} //stocks reserved from user for a given stockid
	constantsMap: { [index: string]: number } // various constants. Documentation found in server/actionservice/Login method

	marketIsOpenHackyNotif: string
	marketIsClosedHackyNotif: string
	isMarketOpen: boolean
}

export class App extends React.Component<{}, AppState> {
	constructor(props: AppState) {
		super(props);

		// DalalActionService.serviceURL = "https://139.59.47.250";
		// DalalStreamService.serviceURL = "https://139.59.47.250";

		DalalActionService.serviceURL = "https://0.0.0.0:8000";
		DalalStreamService.serviceURL = "https://0.0.0.0:8000";

		this.state = {
			isLoading: true,
			isLoggedIn: false,
			sessionMd: new Metadata(),
			user: new User_pb(),
			stocksOwnedMap: {},
			stockDetailsMap: {},
			stocksReservedMap:{},
			constantsMap: {},
			marketIsClosedHackyNotif: "",
			marketIsOpenHackyNotif: "",
			isMarketOpen: false,
		};
	}

	async componentDidMount() {
		//Initially when page loads no user info will be available
		//Hence a request to login
		//If it fails (throws an error) isLoggedin and isLoading is set to false
		//So that Login Component renders
		this.setState({
			isLoading: true,
			isLoggedIn: false,
		});

		try {
			const resp = await Login.getLoginResponseFromSession();
			this.parseLoginResponse(resp);
			this.setState({
				isLoading: false,
				isLoggedIn: true,
			});
		} catch (e) {
			this.setState({
				isLoading: false,
				isLoggedIn: false,
			});
		}
	}
	logOut = async () => {
		const logoutRequest: LogoutRequest = new LogoutRequest()
		try {
			await DalalActionService.logout(logoutRequest);
		} catch (e) {
			//Cant do anything
		}
	}

	parseLoginResponse = (resp: LoginResponse) => {
		// map is weirdly constructed by grpc-web. Gotta convert it to regular map.
		const stocksOwnedMap: { [index: number]: number } = {};
		resp.getStocksOwnedMap().forEach((stocksOwned, stockId) => {
			stocksOwnedMap[stockId] = stocksOwned;
		});

		const stockDetailsMap: { [index: number]: Stock_pb } = {};
		resp.getStockListMap().forEach((stock, stockId) => {
			stockDetailsMap[stockId] = stock;
		});

		const stockReservedMap: { [index: number]: number } = {};
		resp.getReservedStocksOwnedMap().forEach((stock, stockId) => {
			stockReservedMap[stockId] = stock;
		});

		const constantsMap: { [index: string]: number } = {};
		resp.getConstantsMap().forEach((value, name) => {
			constantsMap[name] = value;
		});
		const shouldRedirect = ["", "/", "/login", "/register", "/home"].indexOf(window.location.pathname) != -1;
		if (shouldRedirect) {
			window.history.replaceState({}, "Dalal Street", "/trade");
		}
		this.setState({
			isLoggedIn: true,
			sessionMd: new Metadata({ "sessionid": resp.getSessionId() }),
			user: resp.getUser()!,
			stocksOwnedMap: stocksOwnedMap,
			stockDetailsMap: stockDetailsMap,
			stocksReservedMap: stockReservedMap,
			constantsMap: constantsMap,
			marketIsOpenHackyNotif: resp.getMarketIsOpenHackyNotif(),
			marketIsClosedHackyNotif: resp.getMarketIsClosedHackyNotif(),
			isMarketOpen: resp.getIsMarketOpen()
		});
	}

	handleUrlChange = () => {
		//Navbar has to have a function which force updates because
		//this render function handles the routing
		//The route is changed when you click on anything there
		//and Main has to accordingly switch
		if (window.location.pathname == "/logout") {
			this.logOut()
			localStorage.removeItem("sessionid");
			this.setState({
				isLoading: false,
				isLoggedIn: false,
				sessionMd: new Metadata(),
				user: new User_pb(),
				stocksOwnedMap: {},
				stockDetailsMap: {},
				stocksReservedMap: {},
				constantsMap: {},
				marketIsClosedHackyNotif: "",
				marketIsOpenHackyNotif: "",
				isMarketOpen: false,
			})
			this.forceUpdate()
		} else {
			this.forceUpdate()
		}
	}
	loginRedirect = () => {
		window.history.replaceState({}, "Dalal Street | Register", "/login");
		this.forceUpdate()
	}

	signUpRedirect = () => {
		window.history.replaceState({}, "Dalal Street | Register", "/register");
		this.forceUpdate()
	}
	forgotpasswordRedirect = () =>{
		window.history.replaceState({},"Dalal Street | Login ","/forgotpassword");
		this.forceUpdate();
	}
	routeMe = () => {
		const path = window.location.pathname
		if (this.state.isLoading) {
			return LOADING;
		}
		if (this.state.isLoggedIn) {
			return MAIN;
		}
		if (path == "/register") {
			return SIGNUP
		}
		if (path == "/login") {
			return LOGIN;
		}
		if(path == "/forgotpassword") {
            return FORGOTPASSWORD;
        }
		//If render ever reaches here it means that login response was an error
		//and it is loading hence has to be rerouted to /login and the login component
		//has to be rendered
		window.history.replaceState({}, "Dalal Street | Login", "/home");
		return SPLASH;
	}

	componentWillMount() {
		const path = window.location.pathname;
		if (path == "/logout") {
			localStorage.removeItem("sessionid");
			window.history.replaceState({}, "Dalal Street", "/login");
			this.setState({
				isLoading: false,
				isLoggedIn: false,
				sessionMd: new Metadata(),
				user: new User_pb(),
				stocksOwnedMap: {},
				stockDetailsMap: {},
				stocksReservedMap: {},
				constantsMap: {},
				marketIsClosedHackyNotif: "",
				marketIsOpenHackyNotif: "",
				isMarketOpen: false,
			})
		}
		if (this.state.isLoggedIn) {
			//Getting the path
			const path = window.location.pathname;
			//If it's logged in and is hitting "" or "/" or "/login" redirect to /trade by default
			//Issues:If you hit /leaderboard say you'll be redirected to /login and then
			//be routed to /trade
			const shouldRedirect = ["", "/", "/login", "/register", "/home"].indexOf(path) != -1;
			if (shouldRedirect) {
				window.history.replaceState({}, "Dalal Street", "/trade");
			}
		}
	}

	render() {

		/*
			page loads:
				=> make bg req get loginresponse
				=> if loginresponse ok:
					render main
				=> else redirect to login, render login

				TODO: (@Ar-Sibi):
					document this stuff. Especially the forceUpdate.
					Also we're not using react router

					basically forceUpdate()ing whenever we change url. Have to do this because
					react-router doesn't give a good way to redirect programmatically. It's horrible.
					It's simply horrible.
					It's really horrible.
					- Parth.
		*/
		switch (this.routeMe()) {
			case MAIN:
				return (
					<Fragment>
						<Navbar handleUrlChange={this.handleUrlChange} />
						<Main
							sessionMd={this.state.sessionMd!}
							user={this.state.user!}
							stocksOwnedMap={this.state.stocksOwnedMap!}
							stockDetailsMap={this.state.stockDetailsMap!}
							stocksReservedMap={this.state.stocksReservedMap!}
							constantsMap={this.state.constantsMap!}
							marketIsOpenHackyNotif={this.state.marketIsOpenHackyNotif!}
							marketIsClosedHackyNotif={this.state.marketIsClosedHackyNotif!}
							isMarketOpen={this.state.isMarketOpen!}
						/>
					</Fragment>
				);
			case SIGNUP:
				return <Register loginRedirect={this.loginRedirect}/>

			case LOGIN:
				return <Login loginSuccessHandler={this.parseLoginResponse}
					signUpRedirect={this.signUpRedirect}
					forgotpasswordRedirect={this.forgotpasswordRedirect}
				/>;
			case LOADING:
				return <LoadingScreen />;
			case SPLASH:
				return <div id="intro-div"><IntroScreen /></div>;
			case FORGOTPASSWORD:
				return <Forgotpassword />	
		}

		// if (this.state.isLoggedIn) {

		//Getting the path
		// const path = window.location.pathname;
		// If anything breaks put this on top of render :)
		// //If it's logged in and is hitting "" or "/" or "/login" redirect to /trade by default
		// //Issues:If you hit /leaderboard say you'll be redirected to /login and then
		// //be routed to /trade
		// const shouldRedirect = ["", "/", "/login"].indexOf(path) != -1;
		// if (shouldRedirect) {
		// 	window.history.replaceState({}, "Dalal Street", "/trade");
		// 	this.forceUpdate();
		// }
		// }
	}
}
