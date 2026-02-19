import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Moons from './pages/Moons/Moons'
import Missions from "./pages/Missions/Missions"
import Planets from "./pages/Planets/Planets"
import './App.css'


function NotFound() {
  return <h1>404 - Not Found</h1>
}

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/moons" element={<Moons/>} />
        <Route path="/planets" element={<Planets/>} />
        <Route path="/missions" element={<Missions />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
