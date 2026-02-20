import { useEffect, useState } from "react";
import type { PlanetDataList, PlanetData } from "../../types";
import './Planets.css'

function Planets() {
    const [planetData, setPlanetData] = useState<PlanetDataList>([]);
    
        useEffect(() => {
            const fetchPlanets = async () => {
                // In dev use the Vite proxy at /api which forwards to the remote backend.
                // In production use VITE_API_BASE if provided, otherwise fall back to the real backend URL.
                const API_BASE = import.meta.env.DEV
                    ? '/api'
                    : (import.meta.env.VITE_API_BASE ?? 'https://planets-backend-production.up.railway.app');
    
                const res = await fetch(`${API_BASE}/planets`);
                // optionally handle the response, e.g. const moons = await res.json();
                const planets = await res.json();
                console.log(planets);
                setPlanetData(planets);
            };
    
            fetchPlanets();
        }, [])

        const addPlanet = () => {

        }
    
        return (
            <div>
                <div className="cardContainer">
                    {planetData.map((moon: PlanetData) => {
                        return <div className="card" key={moon.id}>
                            <div>Name: {moon.name}</div>
                            <div>Id: {moon.id}</div>
                            {/* <div>PlanetID: {moon.planet_id}</div> */}
                            <div>Date discovered: {new Date(moon.discovered_at).toLocaleDateString()}</div>
                            <img height="256" width="256" src={moon.image} />
                        </div>
                    })}
                </div>

                <div className="formContainer">
                    <h2>Add a planet to database:</h2>
                    <form className="form">
                        <div>
                            <label htmlFor="planet-name">Planet Name:  </label>
                            <input name="planet-name"/>
                        </div>
                        <div>
                            <label htmlFor="discovered_at">Discovered at:  </label>
                            <input name="discovered_at" type="date" />
                        </div>
                        <div>
                            <label htmlFor="image_url">Image url: </label>
                            <input name="image_url" type="file"/>
                        </div>
                        <div>
                            <button name="submit-button">Add Planet</button>
                        </div>

                    </form>
                </div>
            </div>
        )
}

export default Planets;