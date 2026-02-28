import '../styles/Page.css'
import {useEffect} from "react";


export default function Home() {


    useEffect(()=>{
        for (let counter =0; counter<10;counter++){
            fetch('https://www.themealdb.com/api/json/v1/1/random.php')
                .then(response => response.json())
                .then(data => console.log(data.meals[0]));
        }

    }, [])

  return (
    <main className="page home-page">
      <h2>Home</h2>
      <p>Welcome — this is an empty home page.</p>
    </main>
  )
}
