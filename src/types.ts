export type MoonDataList = MoonData[]

export type MoonData = {
    id: number;
    planet_id: number;
    name: string;
    discovered_at: string;
    image: string;
}
export type MoonFormData = {
    name: string;
    discovered_at: string;
    image: string;
    planet_name: string;
}

export type PlanetDataList = MoonData[]

export type PlanetData = {
    id: number;
    name: string;
    discovered_at: string;
    image: string;
}

export type PlanetFormData = {
    name: string;
    discovered_at: string;
    image: string;
}
