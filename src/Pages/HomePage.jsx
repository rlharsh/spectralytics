import React from "react";
import RSS from "../Components/RSS";

const HomePage = () => {
	return (
		<div className="page-container">
			<div className="center">
				<h1 className="large-header">Phasmophobia News</h1>
				<RSS url="https://store.steampowered.com/feeds/news/app/739630" />
			</div>
		</div>
	);
};

export default HomePage;
