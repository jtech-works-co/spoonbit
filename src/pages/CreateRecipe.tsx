import * as React from "react";
import { Recipe } from "../types/Recipe";
import TextareaAutosize from "react-textarea-autosize";
import InstructionInfo from "../components/info/InstructionInfo";
import { LucideArrowLeft } from "lucide-react";

// Convert image file to base64 string
function imageToBase64(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			if (typeof reader.result === "string") {
				resolve(reader.result);
			} else {
				reject("Failed to convert image to base64 string.");
			}
		};
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
}

const defaultRecipe: Recipe = {
	id: "",
	name: "",
	time: [0, 0],
	ingredients: '',
	instructions: [],
	servings: 1,
	difficulty: "easy",
	category: "Miscellaneous",
	isVegetarian: false,
	createdAt: new Date(),
	imageUrl: "",
};

const CreateRecipe: React.FC = () => {
	const [recipe, setRecipe] = React.useState<Recipe>({ ...defaultRecipe });
	const [imageData, setImageData] = React.useState<string>("");

	const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const base64 = await imageToBase64(file);
			setImageData(base64);
		} else {
			setImageData("");
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Submitting recipe:", { ...recipe, imageData });
	};

	return (
		<div className="create-recipe-page">
			<header>
				<LucideArrowLeft className="btn-back"/>
				<h1>Create Recipe</h1>
			</header>

			<form onSubmit={handleSubmit} className="create-recipe-page__form">
				<div className="image">
					{imageData ? (
						<img src={imageData} alt="Preview" className="image-preview" />
					) : (
						<div className="image-preview"></div>
					)}
					{/* Hide this */}
					<input className="image-input" id="image-input" type="file" name="image" accept="image/*" onChange={handleImageChange} />
					<label htmlFor="image-input">Select Image</label>
				</div>

				<div className="basic-info">
					<div className="group">
						<input type="text" name="name" placeholder="" />
						<label>Name</label>
					</div>

					<div className="group">
						<select name="category" defaultValue={recipe.category}>
							<option value="Appetizers">Appetizers</option>
							<option value="Beverages">Beverages</option>
							<option value="Soups">Soups</option>
							<option value="Salads">Salads</option>
							<option value="Vegetables">Vegetables</option>
							<option value="Main Dishes">Main Dishes</option>
							<option value="Breads">Breads</option>
							<option value="Rolls">Rolls</option>
							<option value="Desserts">Desserts</option>
							<option value="Miscellaneous">Miscellaneous</option>
						</select>
						<label>Category: </label>
					</div>
				</div>


				<div className="time-difficulty">
					<div className="group servings">
						<input type="number" name="servings" min={1} placeholder="" />
						<label>Servings:</label>
					</div>

					<div className="group difficulty">
						<select name="difficulty" defaultValue={recipe.difficulty}>
							<option value="easy">Easy</option>
							<option value="medium">Medium</option>
							<option value="hard">Hard</option>
						</select>
						<label>Difficulty:</label>
					</div>

					<div className="is-vegetarian">
						<label>Is Vegetarian</label>
						<input type="checkbox" name="isVegetarian" />
					</div>

					<div className="group min-max">
						<input type="number" name="timeMin" min={0} placeholder="" />
						<label>Min (min):</label>
					</div>

					<div className="group min-max">
						<input type="number" name="timeMax" min={0} placeholder="" />
						<label>Max (min):</label>
					</div>
				</div>

				<fieldset className="ingredients field-grid">
					<legend>Ingredients</legend>
					<TextareaAutosize
						placeholder="Separate by comma (e.g. flour, sugar, eggs)"
						name="ingredients"
						maxRows={5}
						className="ingredients-box" />
				</fieldset>

				<fieldset className="instructions field-grid">
					<legend>
						Instructions
						<InstructionInfo />
					</legend>
					<TextareaAutosize
						placeholder="Step-by-step instructions..."
						name="instructions"
						className="instructions-box"
						onChange={() => {
							const id = setTimeout(() => {
								window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
							}, 500);

							return () => {
								clearTimeout(id);
							}
						}}
					/>
				</fieldset>

				<button className="submit" type="submit">Submit Recipe</button>
			</form>
		</div>
	);
};

export default CreateRecipe;
