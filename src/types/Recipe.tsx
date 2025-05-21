export type Recipe = {
	id?: string; //Only for Rendering
	imageUrl?: string;
	name: string;
	time: [number, number];
	ingredients: string;
	instructions: string[];
	servings: number;
	difficulty: 'easy' | 'medium' | 'hard';
	category: "Appetizers" | "Beverages" | "Soups" | "Salads" | "Vegetables" | "Main Dishes" | "Breads" | "Rolls" | "Desserts" | "Miscellaneous";
	isVegetarian: boolean;
	createdAt: Date;
	updatedAt?: Date;
};
