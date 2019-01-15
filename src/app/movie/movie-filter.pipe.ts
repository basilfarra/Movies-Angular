import { PipeTransform, Pipe } from '@angular/core';
import { Movie } from '../models/movie.model'; 

@Pipe({
    name: 'movieFilter',
    pure: false
})
export class MovieFilterPipe implements PipeTransform {
    transform(movies: Movie[], searchTerm: string): Movie[] {
        if (!movies || !searchTerm) {
            return movies;
        }

        return movies.filter(movie =>
            movie.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
}