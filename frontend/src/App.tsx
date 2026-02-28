import { Routes, Route, Link } from 'react-router-dom'
import './styles/App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import UserPage from './pages/UserPage'
import RecipePage from './pages/RecipePage'
import RecipeEditPage from './pages/RecipeEditPage'

function App() {
  return (
    <>
      <nav className="main-nav">
        <Link to="/">Home</Link>
        <span> | </span>
        <Link to="/login">Login</Link>
        <span> | </span>
        <Link to="/user">User Page</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
        <Route path="/recipe/:id/edit" element={<RecipeEditPage />} />
      </Routes>
    </>
  )
}

export default App
