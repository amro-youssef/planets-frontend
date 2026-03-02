import { useEffect, useState, type ChangeEvent, type SubmitEvent } from "react"
import type { MoonData, MoonDataList, MoonFormData } from "../../types";
import { getApiBase, isValidImageUrl } from "../../utils";
import "./Moons.css";


function Moons() {
    const [moonData, setMoonData] = useState<MoonDataList>([]);
    const formDataDefault: MoonFormData = {
            name: "",
            discovered_at: "",
            image: "",
            planet_name: ""
    }
    const [formData, setFormData] = useState<MoonFormData>(formDataDefault);
    const API_BASE = getApiBase();

    const fetchMoons = async () => {

        const res = await fetch(`${API_BASE}/moons`);
        const moons = await res.json();
        console.log(moons);
        setMoonData(moons);
    };

    useEffect(() => {
        fetchMoons();
    }, [])

    const onSubmit = async (e: SubmitEvent) : Promise<void> => {
            e.preventDefault();
            if (!formData.name || !formData.discovered_at || !formData.image || !formData.planet_name) {
                alert("Missing form data");
                return;
            }
    
            const validImageUrl= await isValidImageUrl(formData.image);
            if (!validImageUrl) {
                alert("Invalid Image Url")
                return;
            }

            // check if planet entered exists
            const planetResponse = await fetch(`${API_BASE}/planets/name/${formData.planet_name}`);
            if (!planetResponse.ok) {
                alert(`Error (status ${planetResponse.status}). No planet found in database with given name`);
                return;
            }
            const planetData = await planetResponse.json();

            // add new moon
            const body = {
                name: formData.name,
                planet_id: planetData.id,
                discovered_at: formData.discovered_at,
                image: formData.image
            }
    
            const response = await fetch(`${API_BASE}/moons`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();
            console.log(data);
            console.log("Planet lookup response:", planetData);

            if (response.ok) {
                alert("Moon added");
            } else {
                alert("Issue adding moon")
            }
            // reset form
            setFormData(formDataDefault);
            fetchMoons();
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
                {moonData.map((moon: MoonData) => {
                    return <div className="card" key={moon.id}>
                        <div>Name: {moon.name}</div>
                        {/* <div>Id: {moon.id}</div> */}
                        {/* <div>PlanetID: {moon.planet_id}</div> */}
                        <div>Date discovered: {new Date(moon.discovered_at).toLocaleDateString()}</div>
                        <img height="256" width="256" src={moon.image} />
                    </div>
                })}
            </div>

            <div className="formContainer">
                <h2>Add a moon to database:</h2>
                <form className="form" onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="name">Moon Name:  </label>
                        <input name="name" value={formData.name} onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="planet_name">Name of Planet:  </label>
                        <input id="planet_name" name="planet_name" value={formData.planet_name} onChange={handleChange}/>
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

export default Moons