import React from "react";
import "./EventSearch.css";
import FormLine from "./FormLine.jsx";

export default class EventSearch extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		return (
			<div className={"EventSearch row"}>
				<div className={"col-md-12"}>
					<FormLine
						label={"Topic"}
						value={this.props.filters.title === undefined
							? [] : this.props.filters.title}
						onChange={(v) => this.props.onChange("title", v)}
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
