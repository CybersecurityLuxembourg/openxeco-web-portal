import React from "react";
import "./InsideApp.css";
import { Route, Switch } from "react-router-dom";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../utils/request.jsx";
import Menu from "./bar/Menu.jsx";
import Footer from "./bar/Footer.jsx";
import PageHome from "./PageHome.jsx";
import PageEcosystem from "./PageEcosystem.jsx";
import PageNews from "./PageNews.jsx";
import PageJobs from "./PageJobs.jsx";
import PageEvents from "./PageEvents.jsx";
import PageArticle from "./PageArticle.jsx";
import PageEvent from "./PageEvent.jsx";
import PageJob from "./PageJob.jsx";
import PageCompany from "./PageCompany.jsx";
import PageAbout from "./PageAbout.jsx";
import PageSearch from "./PageSearch.jsx";

export default class InsideApp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			settings: null,
		};
	}

	componentDidMount() {
		getRequest.call(this, "public/get_public_settings", (data) => {
			this.setState({
				settings: data,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	render() {
		return (
			<div id="InsideApp">
				<Route path="/:path?" render={(props) => <Menu
					settings={this.state.settings}
					{...props}
				/>}/>

				<div id="InsideApp-content">
					<Switch>
						<Route path="/news/:handle" render={(props) => <PageArticle
							{...props} settings={this.state.settings}
						/>}/>
						<Route path="/event/:handle" render={(props) => <PageEvent
							{...props} settings={this.state.settings}
						/>}/>
						<Route path="/job/:handle" render={(props) => <PageJob
							{...props} settings={this.state.settings}
						/>}/>
						<Route path="/company/:handle" render={(props) => <PageCompany
							{...props} settings={this.state.settings}
						/>}/>

						<Route path="/ecosystem" render={(props) => <PageEcosystem
							{...props} settings={this.state.settings}
						/>}/>
						<Route path="/news" render={(props) => <PageNews
							{...props} settings={this.state.settings}
						/>}/>
						<Route path="/events" render={(props) => <PageEvents
							{...props} settings={this.state.settings}
						/>}/>
						<Route path="/jobs" render={(props) => <PageJobs
							{...props} settings={this.state.settings}
						/>}/>
						<Route path="/search" render={(props) => <PageSearch
							{...props} settings={this.state.settings}
						/>}/>
						<Route path="/about" render={(props) => <PageAbout
							{...props} settings={this.state.settings}
						/>}/>

						<Route path="/" render={(props) => <PageHome {...props} />}/>
					</Switch>
				</div>

				<Footer/>
			</div>
		);
	}
}
