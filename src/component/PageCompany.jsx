import React from "react";
import "./PageCompany.css";
import { NotificationManager as nm } from "react-notifications";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import { getRequest } from "../utils/request.jsx";
import Loading from "./box/Loading.jsx";
import Message from "./box/Message.jsx";
import NoImage from "./box/NoImage.jsx";
import { getApiURL } from "../utils/env.jsx";
import { dictToURI } from "../utils/url.jsx";
import DynamicTable from "./table/DynamicTable.jsx";
import Tab from "./tab/Tab.jsx";
import Article from "./item/Article.jsx";
import Event from "./item/Event.jsx";
import JobOfferHorizontal from "./item/JobOfferHorizontal.jsx";
import { getSettingValue } from "../utils/setting.jsx";

export default class PageCompany extends React.Component {
	constructor(props) {
		super(props);

		this.getCompanyContent = this.getCompanyContent.bind(this);
		this.getCompanyNews = this.getCompanyNews.bind(this);
		this.getCompanyEvents = this.getCompanyEvents.bind(this);
		this.getCompanyJobOffers = this.getCompanyJobOffers.bind(this);

		this.state = {
			company: null,
			news: null,
			events: null,
			jobOffers: null,
			selectedMenu: null,
		};
	}

	componentDidMount() {
		this.getCompanyContent();
		this.getCompanyNews();
		this.getCompanyEvents();
		this.getCompanyJobOffers();
	}

	getCompanyContent() {
		getRequest.call(this, "public/get_public_company/" + this.props.match.params.handle, (data) => {
			this.setState({
				company: data,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	getCompanyNews(page) {
		const params = {
			type: "NEWS",
			companies: this.props.match.params.handle,
			page: page || 1,
			per_page: 3,
		};

		getRequest.call(this, "public/get_public_articles?"
			+ dictToURI(params), (data) => {
			this.setState({
				news: data,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	getCompanyEvents(page) {
		const params = {
			type: "EVENT",
			companies: this.props.match.params.handle,
			page: page || 1,
			per_page: 3,
		};

		getRequest.call(this, "public/get_public_articles?"
			+ dictToURI(params), (data) => {
			this.setState({
				events: data,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	getCompanyJobOffers(page) {
		const params = {
			type: "JOB OFFER",
			companies: this.props.match.params.handle,
			page: page || 1,
			per_page: 3,
		};

		getRequest.call(this, "public/get_public_articles?"
			+ dictToURI(params), (data) => {
			this.setState({
				jobOffers: data,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	render() {
		return (
			<div className={"PageCompany page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							{getSettingValue(this.props.settings, "PROJECT_NAME") !== null
								&& <Breadcrumb.Item>
									<Link to="/">{getSettingValue(this.props.settings, "PROJECT_NAME")}</Link>
								</Breadcrumb.Item>
							}
							<Breadcrumb.Item><Link to="/ecosystem">Ecosystem</Link></Breadcrumb.Item>
							{this.state.company !== null && !this.state.loading
								? <Breadcrumb.Item>
									<a href={"/company/" + this.state.company.id}>{this.state.company.name}</a>
								</Breadcrumb.Item>
								: ""}
						</Breadcrumb>
					</div>
				</div>

				{this.state.company !== null
					? <div className="row row-spaced">
						<div className="col-md-12">
							<div className="row">
								<div className={"col-md-3 "
									+ (this.state.company.image !== null
										&& this.state.company.image !== undefined
										? "PageCompany-logo" : "PageCompany-no-logo")}>
									{this.state.company.image !== null && this.state.company.image !== undefined
										? <img
											src={getApiURL() + "public/get_public_image/" + this.state.company.image}
											alt="Card image cap"
										/>
										: <NoImage/>
									}
								</div>
								<div className="col-md-9">
									<h3>{this.state.company.name}</h3>
								</div>
							</div>

							<div className="row">
								<div
									className="col-md-12"
									style={{ whiteSpace: "pre-line" }}>
									{this.state.company.description}
								</div>
							</div>

							<div className="row">
								{this.state.company.website !== undefined
									&& this.state.company.website !== null
									? <div className="col-md-12 right-buttons">
										<button
											className={"blue-background"}
											onClick={() => window.open(!/^(?:f|ht)tps?:\/\//.test(this.state.company.website)
												? "https://" + this.state.company.website
												: this.state.company.website,
											"_blank")}
										>
											<i className="fas fa-globe-europe"/> Visit website
										</button>
									</div>
									: ""
								}
							</div>

							<div className="row">
								{this.state.company.is_startup !== undefined
									&& this.state.company.is_startup
									? <div className="col-md-12 PageCompany-stamp">
										<i className="fas fa-check-circle"/> Start-up
									</div>
									: ""
								}
							</div>

							<div className="row">
								{this.state.company.rscl_number !== undefined
									&& this.state.company.rscl_number !== null
									? <div className="col-md-12">
										<b>Business register number:</b> {this.state.company.rscl_number}
									</div>
									: ""
								}

								{this.state.company.creation_date !== undefined
									&& this.state.company.creation_date !== null
									? <div className="col-md-12">
										<b>Creation date:</b> {this.state.company.creation_date}
									</div>
									: ""
								}
							</div>
						</div>
					</div>
					: <Loading
						height={400}
					/>
				}

				<div className="row row-spaced">
					<div className="col-md-12">
						<h3>Articles</h3>
					</div>

					<div className="col-md-12">
						<Tab
							selectedMenu={this.state.selectedMenu}
							keys={["NEWS", "EVENTS", "JOB OFFERS"]}
							labels={[
								"News (" + (this.state.news ? this.state.news.pagination.total : "?") + ")",
								"Events (" + (this.state.events ? this.state.events.pagination.total : "?") + ")",
								"Job offers (" + (this.state.jobOffers ? this.state.jobOffers.pagination.total : "?") + ")",
							]}
							content={[
								this.state.news !== null
									? <div className="col-md-12">
										{this.state.news.pagination.total > 0
											? <DynamicTable
												items={this.state.news.items}
												pagination={this.state.news.pagination}
												changePage={(page) => this.getCompanyNews(page)}
												buildElement={(a) => <div className="col-md-4">
													<Article
														info={a}
														analytics={this.props.analytics}
													/>
												</div>
												}
											/>
											: <Message
												text={"No news found"}
												height={150}
											/>
										}
									</div>
									: <Loading
										height={150}
									/>,
								this.state.events !== null
									? <div className="col-md-12">
										{this.state.events.pagination.total > 0
											? <DynamicTable
												items={this.state.events.items}
												pagination={this.state.events.pagination}
												changePage={(page) => this.getCompanyEvents(page)}
												buildElement={(a) => <div className="col-md-4">
													<Event
														info={a}
														analytics={this.props.analytics}
													/>
												</div>
												}
											/>
											: <Message
												text={"No event found"}
												height={150}
											/>
										}
									</div>
									: <Loading
										height={150}
									/>,
								this.state.jobOffers !== null
									? <div className="col-md-12">
										{this.state.jobOffers.pagination.total > 0
											? <DynamicTable
												items={this.state.jobOffers.items}
												pagination={this.state.jobOffers.pagination}
												changePage={(page) => this.getCompanyJobOffers(page)}
												buildElement={(a) => <div className="col-md-12">
													<JobOfferHorizontal
														info={a}
														analytics={this.props.analytics}
													/>
												</div>
												}
											/>
											: <Message
												text={"No job found"}
												height={150}
											/>
										}
									</div>
									: <Loading
										height={150}
									/>,
							]}
						/>
					</div>
				</div>
			</div>
		);
	}
}
