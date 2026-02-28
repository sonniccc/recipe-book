import '../styles/RecipePage.css'
import RecipesMock from '../mock/recipes.json'
import { useParams } from 'react-router-dom'
import type { Recipe } from '../schema'
import emptyImage from '../assets/emptyImage.png'

export default function RecipePage() {
  const { id } = useParams<{ id: string }>()
  const recipe = (RecipesMock as Recipe[]).find((r) => r.id === id) || 
  {id: '', name: 'Recipe Not Found', thumbnail: '', description: '', ingredients: [], instructions: []}

  const parseIngredient = (ing: string) => {
    const parts = ing.split('|')
    const amount = parts[0] ? parts[0].trim() : ''
    const unit = parts[1] ? parts[1].trim() : ''
    const processMethod = parts[2] ? parts[2].trim() : ''
    const namePart = parts[3] ? parts[3].trim() : ''
    return [amount, unit, processMethod, namePart]
  }

  return (
    <main className="page recipe-page">
      <section className="recipe-view">
        <img src={recipe.thumbnail || emptyImage} 
          alt={recipe.name} className="recipe-thumb" />
        <h1 className="recipe-title">{recipe.name}</h1>
        {recipe.description && <p className="recipe-description">{recipe.description}</p>}

        <h2 className="section-heading">Ingredients</h2>
        <ul className="ingredients-list">
          {recipe.ingredients && recipe.ingredients.map((ing, i) => {
            const [amount, unit, processMethod, namePart] = parseIngredient(ing)
            return <li key={i}>{amount}{unit} {processMethod} {namePart}</li>
            })}
        </ul>

        <h2 className="section-heading">Instructions</h2>
        <ol className="instructions-list">
          {recipe.instructions && recipe.instructions.map((step, i) => <li key={i}>{step}</li>)}
        </ol>
      </section>
    </main>
  )
}
