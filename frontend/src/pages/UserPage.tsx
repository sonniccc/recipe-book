import {RecipeCard} from '../components/RecipeCard'
import type {Recipe} from '../schema'
import '../styles/Page.css'
import RecipesMock from'../mock/recipes.json'
import plusSignImage from '../assets/plusSign.png'

const emptyRecipe: Recipe = {
  id: "999",
  name: 'New Recipe',
  thumbnail: plusSignImage,
  description: '',
  ingredients: [],
  instructions: []
}

export default function UserPage() {
  const recipes: Recipe[] = RecipesMock as Recipe[]
  return (
    <main className="page">
      <h2>Hi User</h2>
      <p>Welcome — this is an empty home page.</p>
      <div className="recipe-card-container">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} {...recipe} />
        ))}
        <RecipeCard key={emptyRecipe.id} {...emptyRecipe} />
      </div>
    </main>
  )
}
