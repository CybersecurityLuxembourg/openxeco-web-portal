import React from "react";
import "./ArticleSearch.css";
import FormLine from "./FormLine.jsx";

export default class ArticleSearch extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		return (
			<div className={"ArticleSearch row"}>
				<div className={"col-md-12"}>
					<FormLine
						label={"Topic"}
						value={this.props.filters.title === undefined
							? [] : this.props.filters.title}
						onChange={(v) => this.props.onChange("title", v)}
					/>
					<FormLine
						label={"Show member news only"}
						type={"checkbox"}
						value={this.props.filters.member_news_only}
						onChange={() => this.props
							.onChange("member_news_only", !this.props.filters.member_news_only)
						}
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
