import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import RecipesMock from '../mock/recipes.json'
import type { Recipe } from '../schema'
import '../styles/RecipeEditPage.css'

export default function RecipeEditPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  const foundRecipe = (RecipesMock as Recipe[]).find((r) => r.id === id)
  const initialRecipe: Recipe = foundRecipe || {
    id: '',
    name: '',
    description: '',
    ingredients: [],
    instructions: [],
    thumbnail: '',
  }

  const [recipe, setRecipe] = useState<Recipe>(initialRecipe)

  const handleFieldChange = (field: keyof Recipe, value: any) => {
    setRecipe((prev) => ({ ...prev, [field]: value }))
  }

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...recipe.ingredients]
    newIngredients[index] = value
    setRecipe((prev) => ({ ...prev, ingredients: newIngredients }))
  }

  const handleAddIngredient = () => {
    setRecipe((prev) => ({ ...prev, ingredients: [...prev.ingredients, ''] }))
  }

  const handleRemoveIngredient = (index: number) => {
    setRecipe((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }))
  }

  const handleInstructionChange = (index: number, value: string) => {
    const newInstructions = [...recipe.instructions]
    newInstructions[index] = value
    setRecipe((prev) => ({ ...prev, instructions: newInstructions }))
  }

  const handleAddInstruction = () => {
    setRecipe((prev) => ({ ...prev, instructions: [...prev.instructions, ''] }))
  }

  const handleRemoveInstruction = (index: number) => {
    setRecipe((prev) => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Save to backend/database
    console.log('Submitting recipe:', recipe)
    navigate(`/recipe/${recipe.id}`)
  }

  return (
    <main className="page recipe-edit-page">
      <form onSubmit={handleSubmit} className="recipe-edit-form">
        <h1>Edit Recipe</h1>

        <div className="form-group">
          {/* <label htmlFor="name">Recipe Name</label> */}
          <input
            id="name"
            type="text"
            value={recipe.name}
            onChange={(e) => handleFieldChange('name', e.target.value)}
            placeholder="Recipe Title"
            required
          />
        </div>

        <div className="form-group">
          {/* <label htmlFor="description">Description</label> */}
          <textarea
            id="description"
            value={recipe.description || ''}
            onChange={(e) => handleFieldChange('description', e.target.value)}
            rows={3}
            placeholder="Description"
          />
        </div>

        <div className="form-group">
          <label htmlFor="thumbnail">Thumbnail URL</label>
          <input
            id="thumbnail"
            type="text"
            value={recipe.thumbnail || ''}
            onChange={(e) => handleFieldChange('thumbnail', e.target.value)}
          />
        </div>

        <fieldset className="form-group">
          <legend>Ingredients</legend>
          <div className="array-items">
            {recipe.ingredients.map((ingredient, index) => (
              <div key={index} className="array-item">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                  placeholder="e.g. 200|g||spaghetti"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(index)}
                  className="btn-remove"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleAddIngredient}
            className="btn-add"
          >
            + Add Ingredient
          </button>
        </fieldset>

        <fieldset className="form-group">
          <legend>Instructions</legend>
          <div className="array-items">
            {recipe.instructions.map((instruction, index) => (
              <div key={index} className="array-item">
                <textarea
                  value={instruction}
                  onChange={(e) => handleInstructionChange(index, e.target.value)}
                  rows={2}
                  placeholder={`Step ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveInstruction(index)}
                  className="btn-remove"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleAddInstruction}
            className="btn-add"
          >
            + Add Instruction
          </button>
        </fieldset>

        <div className="form-actions">
          <button type="submit" className="btn-submit">
            Save Recipe
          </button>
          <button
            type="button"
            onClick={() => navigate(`/recipe/${recipe.id}`)}
            className="btn-cancel"
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  )
}
