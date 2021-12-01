export function getApiURL() {
	if (window.location.hostname === "localhost"
		|| window.location.hostname === "127.0.0.1"
		|| window.location.hostname === "") {
		return "http://localhost:5000/";
	}
	return "https://api.cybersecurity-luxembourg.com/";
}

export function getCommunityAppURL() {
	if (window.location.hostname === "localhost"
		|| window.location.hostname === "127.0.0.1"
		|| window.location.hostname === "") {
		return "http://localhost:5000/";
	}
	return "https://community.cybersecurity-luxembourg.com/";
}

export function isInternetExplorer() {
	const ua = window.navigator.userAgent;
	const msie = ua.indexOf("MSIE ");

	return msie > 0 || !!navigator.userAgent.match(/Trident.*rv:11\./);
}
