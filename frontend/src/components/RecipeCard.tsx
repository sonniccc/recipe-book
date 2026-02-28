import '../styles/RecipeCard.css'
import type { Recipe } from '../schema'
import { useNavigate } from 'react-router-dom'
import emptyImage from '../assets/emptyImage.png'

export function RecipeCard(recipe: Recipe) {
  const navigate = useNavigate()
  const handleClick = () => {
    if (recipe.id !== undefined) {
      navigate(`/recipe/${recipe.id}`)
    }
  }

  return (
    <button className="recipe-card" onClick={handleClick}>
        <img
          src={recipe.thumbnail || emptyImage}
          alt={recipe.name}
          className="recipe-card-image"
        />
      <div className="recipe-card-content">
        <h3 className="recipe-card-name">{recipe.name}</h3>
      </div>
    </button>
  )
}
