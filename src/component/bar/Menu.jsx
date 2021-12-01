import React from "react";
import "./Menu.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import SearchField from "../form/SearchField.jsx";
import { getSettingValue } from "../../utils/setting.jsx";
import { getApiURL } from "../../utils/env.jsx";

export default class Menu extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showFlyingMenu: false,
		};
	}

	componentDidMount() {
		document.querySelector("#root").addEventListener("scroll", () => {
			const currentScrollPos = document.getElementById("root").scrollTop;

			if (currentScrollPos !== undefined && currentScrollPos !== 0) {
				if (currentScrollPos > 300 && !this.state.showFlyingMenu) {
					this.setState({ showFlyingMenu: true });
				} else if (currentScrollPos < 300) {
					this.setState({ showFlyingMenu: false });
				}
			}
		});
	}

	// eslint-disable-next-line class-methods-use-this
	getNavBar() {
		return <Nav className="mr-sm-2 ml-auto">
			<Nav.Link>
				<Link to="/ecosystem">
					<div className="Menu-title">Ecosystem</div>
					<div className="Menu-description">View on the community</div>
				</Link>
			</Nav.Link>
			<Nav.Link>
				<Link to="/news">
					<div className="Menu-title">News</div>
					<div className="Menu-description">View on the community</div>
				</Link>
			</Nav.Link>
			<Nav.Link>
				<Link to="/events">
					<div className="Menu-title">Events</div>
					<div className="Menu-description">View on the community</div>
				</Link>
			</Nav.Link>
			<Nav.Link>
				<Link to="/jobs">
					<div className="Menu-title">Jobs</div>
					<div className="Menu-description">View on the community</div>
				</Link>
			</Nav.Link>
		</Nav>;
	}

	render() {
		return (
			<div className={"Menu page max-sized-page"}>
				<Navbar expand="lg">
					<Navbar.Brand>
						<Link to="/">
							<img
								className={"Menu-logo"}
								src={getApiURL() + "public/get_public_image/logo.png"}
								alt={getSettingValue(this.props.settings, "PROJECT_NAME")
									? getSettingValue(this.props.settings, "PROJECT_NAME")
									: "Edit 'PROJECT_NAME' setting or add a logo via the administration platform"
								}
							/>
						</Link>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						{this.getNavBar()}
					</Navbar.Collapse>
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="Menu-top-right-about mr-sm-2 ml-auto">
							<SearchField/>
							<Nav.Link eventKey="about">
								<Link to="/about">
									<div className="Menu-title">About</div>
									<div className="Menu-description">What about us?</div>
								</Link>
							</Nav.Link>
							<a
								className="nav-link"
								href={"e"}
								rel="noreferrer"
							>
								<div className="Menu-title">
									{getSettingValue(this.props.settings, "ADMIN_PLATFORM_NAME")
										? getSettingValue(this.props.settings, "ADMIN_PLATFORM_NAME")
										: "COMMUNITY"
									}
								</div>
								<div className="Menu-description">Login or register</div>
							</a>
						</Nav>
					</Navbar.Collapse>
				</Navbar>

				{this.state.showFlyingMenu
					&& <div className={"Menu-flying-menu-wrapper"}>
						<div className="Menu-flying-menu max-sized-page">
							<Link to="/">
								<img
									className={"logo"}
									src={getApiURL() + "public/get_public_image/logo.png"}
									alt={getSettingValue(this.props.settings, "PROJECT_NAME")
										? getSettingValue(this.props.settings, "PROJECT_NAME")
										: "Edit 'PROJECT_NAME' setting or add a logo via the administration platform"
									}
								/>
							</Link>
							<div className="navbar navbar-nav">
								{this.getNavBar()}
							</div>
						</div>
					</div>
				}
			</div>
		);
	}
}
