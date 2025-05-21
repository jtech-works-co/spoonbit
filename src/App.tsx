import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import CreateRecipe from "./pages/CreateRecipe";
import useScrollToTop from "./hooks/useScrollToTop";

const App: React.FC = () => {
	useScrollToTop();
	
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Landing/>}/>
				<Route path="/create-recipe" element={<CreateRecipe/>}/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;