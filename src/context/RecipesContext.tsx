import React, { createContext, useContext, useState } from "react";
import { Recipe } from "../types/Recipe";
import generateID from "../utils/generateID";

export type RecipesContextType = {
	recipes: Recipe[];
	upload: (recipe: Recipe) => void;
	loadMore: () => void;
};

export const RecipesContext = createContext<RecipesContextType | undefined>(undefined);

export const useRecipesContext = () => {
	const context = useContext(RecipesContext);
	if (!context) throw new Error("useRecipesContext must be inside of RecipesContextProvider");
	return context;
};

const INITIAL_LOAD = 30;

const RecipesContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	// Load all recipes from localStorage
	const allRecipesData: Record<string, Recipe> = JSON.parse(localStorage.getItem("recipes") || '{}');

	// Convert to array of recipes, you can sort if you have timestamps or IDs
	const allRecipesArray = Object.values(allRecipesData);

	// State to hold currently shown recipes (initially first 30)
	const [recipes, setRecipes] = useState<Recipe[]>(allRecipesArray.slice(0, INITIAL_LOAD));

	// Track how many recipes are loaded so far
	const [loadedCount, setLoadedCount] = useState(INITIAL_LOAD);

	const upload = (recipe: Recipe) => {
		const data = JSON.parse(localStorage.getItem("recipes") || '{}');

		const id = generateID({ prefix: "R-" });
		data[id] = recipe;

		localStorage.setItem("recipes", JSON.stringify(data));

		// Add new recipe to top of current state
		setRecipes(prev => [recipe, ...prev]);
		setLoadedCount(prev => prev + 1);
	};

	const loadMore = () => {
		// Load next batch of recipes from allRecipesArray, based on current loadedCount
		const nextCount = loadedCount + INITIAL_LOAD;
		setRecipes(allRecipesArray.slice(0, nextCount));
		setLoadedCount(nextCount);
	};

	const value: RecipesContextType = {
		recipes,
		upload,
		loadMore,
	};

	return (
		<RecipesContext.Provider value={value}>
			{children}
		</RecipesContext.Provider>
	);
};

export default RecipesContextProvider;
