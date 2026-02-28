import '../styles/Page.css'
import {useEffect, useState} from "react";
import type {Meal, RemoteRandomMeal} from "../data/RemoteRandomMeal.ts";
import {RecipeCard} from "../components/RecipeCard.tsx";
import type {Recipe} from "../schema.ts";
import plusSignImage from "../assets/plusSign.png";


export default function Home() {
    const emptyRecipe: Recipe = {
        id: "999",
        name: 'New Recipe',
        thumbnail: plusSignImage,
        description: '',
        ingredients: [],
        instructions: []
    }

    const [famousRecepes, setFamousRecepes] = useState<Meal[]>([]);


    useEffect(() => {
        const promises = [];
        for (let counter = 0; counter < 10; counter++) {
            promises.push(
                fetch('https://www.themealdb.com/api/json/v1/1/random.php')
                    .then(response => response.json())
                    .then((data: RemoteRandomMeal) => data.meals[0])
            );
        }
        Promise.all(promises).then(meals => setFamousRecepes(meals));
    }, [])

    return (
        <main className="page home-page">
            <h2>Home</h2>
            <p>Welcome — this is an empty home page.</p>
            <div className="recipe-card-container">
                {famousRecepes.map((recipe) => (
                    <RecipeCard key={recipe.idMeal} {...{
                        id: recipe.idMeal,
                        name: recipe.strMeal,
                        thumbnail: recipe.strMealThumb,
                        description: '',
                        ingredients: [],
                        instructions: []
                    }} />
                ))}


            </div>
        </main>
    )
}
