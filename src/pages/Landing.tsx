import * as React from "react";
import TopBar from "../components/TopBar";

const Landing: React.FC = () => {

	return (
		<div className="landing-page">
			<TopBar className="landing-page__topbar" />

			<main className="landing-page__content">
			</main>
		</div>
	);
};

export default Landing;
