import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';
import { MovieService } from '../movie.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class MovieDetailsGuardService implements CanActivate {
    constructor(private _movieService: MovieService,
        private _router: Router) { }
        
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean> {
    return this._movieService.getMovie(+route.paramMap.get('id'))
        .pipe(
            map(movie => {
                const movieExists = !!movie;

                if (movieExists) {
                    return true;
                } else {
                    this._router.navigate(['notfound']);
                    return false;
                }
            })
        );
    }
}