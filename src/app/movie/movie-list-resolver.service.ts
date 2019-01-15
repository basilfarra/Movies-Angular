import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Movie } from '../Models/movie.model';
import { MovieService } from '../movie.service';

@Injectable()
export class MovieListResolverService implements Resolve<Movie[]> {
    constructor(private _movieService: MovieService) {
    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
     Observable<Movie[]> {
        return this._movieService.getMovies();
    }
}