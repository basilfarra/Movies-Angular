export interface IMovie{
    id: number;
    title: string;
    year: number;
    description?: string;
    rating?: string;
    gener: number;
    language: string;
    quality: number;
    photoPath?: string;
}