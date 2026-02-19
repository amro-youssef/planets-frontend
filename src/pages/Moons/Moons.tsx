import { useEffect, useState } from "react"
import type { MoonData, MoonDataList } from "../../types";

function Moons() {
    const [moonData, setMoonData] = useState<MoonDataList>([]);

    useEffect(() => {
        const fetchMoons = async () => {
            // In dev use the Vite proxy at /api which forwards to the remote backend.
            // In production use VITE_API_BASE if provided, otherwise fall back to the real backend URL.
            const API_BASE = import.meta.env.DEV
                ? '/api'
                : (import.meta.env.VITE_API_BASE ?? 'https://planets-backend-production.up.railway.app');

            const res = await fetch(`${API_BASE}/moons`);
            // optionally handle the response, e.g. const moons = await res.json();
            const moons = await res.json();
            console.log(moons);
            setMoonData(moons);
        };

        fetchMoons();
    }, [])

    return (
        <div>
            {moonData.map((moon: MoonData) => {
                return <div>
                    <div>{moon.name}</div>
                    <div>Id: {moon.id}</div>
                    <div>PlanetID: {moon.planet_id}</div>
                    <div>{Date(moon.discovered_at)}</div>
                    <hr/>

                </div>
            })}
        </div>
    )
}

export default Moons