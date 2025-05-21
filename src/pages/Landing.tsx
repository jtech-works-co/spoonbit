import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import TopBar from "../components/TopBar";
import useScrollToTop from "../hooks/useScrollToTop";

const INITIAL_COUNT = 30;
const LOAD_MORE_COUNT = 18;

const Landing: React.FC = () => {
	// useScrollToTop();
	
	const [cards, setCards] = useState<number[]>([]);

	// Initialize cards on mount
	useEffect(() => {
		const initialCards = Array.from({ length: INITIAL_COUNT }, (_, i) => i);
		setCards(initialCards);
	}, []);

	// Scroll handler to load more cards
	const handleScroll = useCallback(() => {
		const scrollable = document.documentElement;
		const scrollTop = scrollable.scrollTop;
		const windowHeight = window.innerHeight;
		const scrollHeight = scrollable.scrollHeight;

		// If user scrolled near bottom (e.g. 100px from bottom), load more
		if (scrollTop + windowHeight >= scrollHeight - 100) {
			setCards((prev) => {
				// Add LOAD_MORE_COUNT more cards
				const nextCards = Array.from(
					{ length: LOAD_MORE_COUNT },
					(_, i) => prev.length + i
				);
				return [...prev, ...nextCards];
			});
		}
	}, []);

	// Attach scroll event listener
	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		// Cleanup
		return () => window.removeEventListener("scroll", handleScroll);
	}, [handleScroll]);

	return (
		<div className="landing-page">
			<TopBar className="landing-page__topbar" />

			<main className="landing-page__content">
				{cards.map((cardId) => (
					<div key={cardId} className="card">
						Card {cardId + 1}
					</div>
				))}
			</main>
		</div>
	);
};

export default Landing;
