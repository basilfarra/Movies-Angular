import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Gener } from '../models/gener.model';
import { Quality } from '../models/quality.model';
import { Movie } from '../models/movie.model'; 
import { MovieService } from '../movie.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
  @ViewChild('movieForm') public addMovieForm: NgForm;
  panelTitle: string;
  movie: Movie; 
  previewPhoto = false; 

  constructor(private _movieService: MovieService,
    private _router: Router,
    private _route: ActivatedRoute) {}

  qualities: Quality[] = [
    { id: 1, name: '1080p' },
    { id: 2, name: '720p' },
    { id: 3, name: '3D' }
  ];

  geners: Gener[] = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Adventure' },
    { id: 3, name: 'Animation' },
    { id: 4, name: 'Biography' },
    { id: 5, name: 'Comedy' },
    { id: 6, name: 'Crime' },
    { id: 7, name: 'Documentary' },
    { id: 8, name: 'Drama' },
    { id: 9, name: 'Family' },
    { id: 10, name: 'Fantasy' },
    { id: 11, name: 'Film-Noir' },
    { id: 12, name: 'Game-Show' },
    { id: 13, name: 'History' },
    { id: 14, name: 'Horror' },
    { id: 15, name: 'Music' },
    { id: 16, name: 'Musical' },
    { id: 17, name: 'Mystery' },
    { id: 18, name: 'News' },
    { id: 19, name: 'Reality-TV' },
    { id: 20, name: 'Romance' },
    { id: 21, name: 'Sci-Fi' },
    { id: 22, name: 'Sport' },
    { id: 23, name: 'Talk-Show' },
    { id: 24, name: 'Thriller' },
    { id: 25, name: 'War' },
    { id: 26, name: 'Western' }
  ];

  saveMovie(movForm: NgForm): void {
    if (this.movie.id == null) {
      console.log(this.movie);
      this._movieService.addMovie(this.movie).subscribe(
        (data: Movie) => {
          console.log(data);
          movForm.reset();
          this._router.navigate(['list']);
        },
        (error: any) => { console.log(error); }
      );
    } else {
      this._movieService.updateMovie(this.movie).subscribe(
        () => {
          movForm.reset();
          this._router.navigate(['list']);
        },
        (error: any) => { console.log(error); }
      );
    }
  }

  ngOnInit() {
    this._route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id');
      this.getMovie(id);
    });
  }
  private getMovie(id: number) {
    if (id === 0) {
      this.movie = {
        id: null,
        title: null,
        year: null,
        description: null,
        rating: null,
        gener: null,
        language: null,
        quality: null,
        photoPath: null
      };
      this.addMovieForm.reset();
      this.panelTitle = 'Add Movie';
    } else {
      this.panelTitle = 'Edit Movie';
      this._movieService.getMovie(id).subscribe(
        (movie) => { this.movie = movie; },
        (err: any) => console.log(err)
      );
    }
  }
}
