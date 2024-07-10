import React, { useEffect, useState } from "react";
import RSSTile from "./RSSTile";
import "./css/RSS.css";
import useConsoleLogs from "../Helpers/useConsoleLogs";

const RSS = ({ url }) => {
	const [feed, setFeed] = useState(null);
	const [loading, setLoading] = useState(true);
	const { updateConsoleLogs } = useConsoleLogs();

	useEffect(() => {
		const fetchFeed = async () => {
			try {
				updateConsoleLogs(`Attempting to fetch RSS from [${url}]`);
				const response = await fetch(
					`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`
				);
				const data = await response.json();
				setFeed(data);
				setLoading(false);
				updateConsoleLogs(`RSS acknowledged.`);
			} catch (error) {
				updateConsoleLogs("Error occurred fetching RSS news feed from:", url);
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

export default RSS;
