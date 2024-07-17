import PropTypes from "prop-types";
import "./css/RSSTile.css";

const RSSTile = ({ item }) => {
	const headerTile = "https://cdn.akamai.steamstatic.com/steam/apps/739630/header.jpg";
	const isNews = Object.keys(item.enclosure).length !== 0;

	const stripImages = (htmlString) => {
		const parser = new DOMParser();
		const doc = parser.parseFromString(htmlString, "text/html");
		doc.querySelectorAll("img").forEach((img) => img.remove());
		return doc.body.innerHTML;
	};

	const truncateContent = (htmlString, maxLength) => {
		// Strip images from the HTML string
		const strippedContent = stripImages(htmlString);
		// Truncate the content and add ellipses if it's longer than maxLength
		return strippedContent.length > maxLength
			? strippedContent.slice(0, maxLength) + "..."
			: strippedContent;
	};

	const cleanContent = truncateContent(item.content, 360);
	const contentString = item.title.toLowerCase().includes("major")
		? "MAJOR UPDATE"
		: item.title.toLowerCase().includes("hotfix")
		? "SMALL UPDATE"
		: "REGULAR UPDATE";

	return (
		<div className="rss-tile">
			<div className="rss-tile__content">
				<div>
					<h1 className="rss-tile__date-block">{item.title}</h1>
					<p>{item?.pubDate}</p>
				</div>
				{!isNews ? (
					<p className="color-accent">{contentString}</p>
				) : (
					<div dangerouslySetInnerHTML={{ __html: cleanContent }}></div>
				)}
			</div>
			<div className="rss-tile__image">
				{isNews ? (
					<img src={item.enclosure.link} className="rss-tile__large" />
				) : (
					<img src={headerTile} className="rss-tile__news" alt="" />
				)}
			</div>
		</div>
	);
};

RSSTile.propTypes = {
	item: PropTypes.object.isRequired,
};

export default RSSTile;
