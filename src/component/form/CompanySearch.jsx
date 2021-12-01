import React from "react";
import "./CompanySearch.css";
import FormLine from "./FormLine.jsx";

export default class CompanySearch extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isTaxonomyDetailOpen: false,
		};
	}

	render() {
		return (
			<div className={"CompanySearch row"}>
				<div className={"col-md-12"}>
					<FormLine
						label={"Entity name"}
						value={this.props.filters.name === undefined
							? [] : this.props.filters.name}
						onChange={(v) => this.props.onChange("name", v)}
					/>
				</div>

				<div className={"col-md-12"}>
					<div className="right-buttons">
						<button
							className={"blue-background"}
							onClick={this.props.onSearch}
						>
							<i className="fas fa-arrow-alt-circle-right"/> Apply filters
						</button>
					</div>
				</div>
			</div>
		);
	}
}
