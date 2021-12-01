import React from "react";
import "./PageEcosystem.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../utils/request.jsx";
import Loading from "./box/Loading.jsx";
import Message from "./box/Message.jsx";
import Company from "./item/Company.jsx";
import SimpleTable from "./table/SimpleTable.jsx";
import CompanySearch from "./form/CompanySearch.jsx";
import { getUrlParameter, dictToURI } from "../utils/url.jsx";
import { getSettingValue } from "../utils/setting.jsx";

export default class PageEcosystem extends React.Component {
	constructor(props) {
		super(props);

		this.getPublicCompany = this.getPublicCompany.bind(this);
		this.onSearch = this.onSearch.bind(this);
		this.modifyFilters = this.modifyFilters.bind(this);

		this.state = {
			companies: null,
			filters: {
				name: getUrlParameter("name"),
			},
		};
	}

	componentDidMount() {
		this.getPublicCompany();
	}

	getPublicCompany() {
		this.setState({
			companies: null,
		}, () => {
			getRequest.call(this, "public/get_public_companies?"
				+ dictToURI(this.state.filters), (data) => {
				this.setState({
					companies: data.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)),
				});
			}, (response) => {
				nm.warning(response.statusText);
			}, (error) => {
				nm.error(error.message);
			});
		});
	}

	onSearch() {
		// eslint-disable-next-line no-restricted-globals
		history.replaceState(null, null, "?" + dictToURI(this.state.filters));

		this.getPublicCompany();
	}

	modifyFilters(field, value) {
		const filters = { ...this.state.filters };
		filters[field] = value;
		this.setState({ filters });
	}

	render() {
		return (
			<div className={"PageEcosystem page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							{getSettingValue(this.props.settings, "PROJECT_NAME") !== null
								&& <Breadcrumb.Item>
									<Link to="/">{getSettingValue(this.props.settings, "PROJECT_NAME")}</Link>
								</Breadcrumb.Item>
							}
							<Breadcrumb.Item><Link to="/ecosystem">Ecosystem</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<CompanySearch
					filters={this.state.filters}
					onChange={this.modifyFilters}
					onSearch={this.onSearch}
				/>

				<div className="row">
					<div className="col-md-12">
						<h1>Companies</h1>
					</div>
				</div>

				{this.state.companies !== null && this.state.companies.length > 0
					&& <SimpleTable
						numberDisplayed={10}
						elements={this.state.companies.map((a, i) => [a, i])}
						buildElement={(a) => (
							<div className="col-md-6">
								<Company
									info={a}
								/>
							</div>
						)}
					/>
				}

				{this.state.companies !== null && this.state.companies.length === 0
					&& <Message
						text={"No entity found"}
						height={300}
					/>
				}

				{this.state.companies === null
					&& <div className="row">
						<div className="col-md-12">
							<Loading
								height={400}
							/>
						</div>
					</div>
				}
			</div>
		);
	}
}
