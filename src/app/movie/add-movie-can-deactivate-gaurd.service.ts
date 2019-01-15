import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { AddMovieComponent } from './add-movie.component';

@Injectable()
export class AddMovieCanDeactivateGuardService
    implements CanDeactivate<AddMovieComponent> {

    constructor() { }

    canDeactivate(component: AddMovieComponent): boolean {
        if (component.addMovieForm.dirty) {
            return confirm('Are you sure you want to discard your changes?');
        }

        return true;
    }
}