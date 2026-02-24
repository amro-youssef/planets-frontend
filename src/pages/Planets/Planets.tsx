import { useEffect, useState, type ChangeEvent, type SubmitEvent } from "react";
import { type PlanetDataList, type PlanetData, type PlanetFormData } from "../../types";
import './Planets.css'
import { isValidImageUrl } from "../../utils";

function Planets() {
    const [planetData, setPlanetData] = useState<PlanetDataList>([]);
    const [formData, setFormData] = useState<PlanetFormData>({
        name: "",
        discovered_at: "",
        image: ""
    })

    const API_BASE = import.meta.env.DEV
                    ? '/api'
                    : (import.meta.env.VITE_API_BASE ?? 'https://planets-backend-production.up.railway.app');
    
    useEffect(() => {
        const fetchPlanets = async () => {
            // In dev use the Vite proxy at /api which forwards to the remote backend.
            // In production use VITE_API_BASE if provided, otherwise fall back to the real backend URL.
            

            const res = await fetch(`${API_BASE}/planets`);
            // optionally handle the response, e.g. const moons = await res.json();
            const planets = await res.json();
            console.log(planets);
            setPlanetData(planets);
        };

        fetchPlanets();
    }, [])

    const onSubmit = async (e: SubmitEvent) : Promise<void> => {
        e.preventDefault();
        if (!formData.name || !formData.discovered_at || !formData.image) {
            alert("Missing form data");
            return;
        }

        const validImageUrl= await isValidImageUrl(formData.image);
        if (!validImageUrl) {
            alert("Invalid Image Url")
            return;
        }

        console.log("formData", formData)

        const response = await fetch(`${API_BASE}/planets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        console.log("Server response:" + data);

    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }
    
    return (
        <div>
            <div className="cardContainer">
                {planetData.map((moon: PlanetData) => {
                    return <div className="card" key={moon.id}>
                        <div className="text">
                        <div>Name: {moon.name}</div>
                        {/* <div>Id: {moon.id}</div> */}
                        {/* <div>PlanetID: {moon.planet_id}</div> */}
                        <div>Date discovered: {new Date(moon.discovered_at).toLocaleDateString()}</div>
                        </div>
                        <img height="256" width="256" src={moon.image} />
                    </div>
                })}
            </div>

            <div className="formContainer">
                <h2>Add a planet to database:</h2>
                <form className="form" onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="name">Planet Name:  </label>
                        <input name="name" value={formData.name} onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="discovered_at">Discovered at:  </label>
                        <input name="discovered_at" type="date" value={formData.discovered_at} onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="image">Image URL: </label>
                        <input name="image" value={formData.image} onChange={handleChange}/>
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