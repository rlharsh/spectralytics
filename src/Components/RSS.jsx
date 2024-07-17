import { useEffect, useState } from "react";
import RSSTile from "./RSSTile";
import PropTypes from "prop-types";
import "./css/RSS.css";

const RSS = ({ url }) => {
	const [feed, setFeed] = useState(null);
	const [loading, setLoading] = useState(true);
	//const { updateConsoleLogs } = useConsoleLogs();

	useEffect(() => {
		const fetchFeed = async () => {
			try {
				const response = await fetch(
					`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`
				);
				const data = await response.json();
				setFeed(data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching the RSS feed:", error);
				setLoading(false);
			}
		};

		fetchFeed();
	}, [url]);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="rss-container">
			{feed.items.map((item) => (
				<RSSTile key={item.title} item={item} />
			))}
		</div>
	);
};

RSS.propTypes = {
	url: PropTypes.string.isRequired,
};

export default RSS;
