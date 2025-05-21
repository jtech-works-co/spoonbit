import { useEffect } from "react";

const useScrollToTop = () => {
	useEffect(() => {
		setTimeout(() => {
			window.scrollTo({ top: 0, behavior: "smooth" });
		}, 0);
	}, []);
};

export default useScrollToTop;
