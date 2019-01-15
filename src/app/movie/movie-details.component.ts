import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../Models/movie.model';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movie: Movie;
  private _id;
  constructor(private _route: ActivatedRoute,
    private _movieService: MovieService,
    private _router: Router) { }

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      this._id = +params.get('id');
      this._movieService.getMovie(this._id).subscribe(
        (movie) => this.movie = movie,
        (err: any) => console.log(err)
      );
    });
  }

  getNextMovie() {
    if (this._id < 3) {
      this._id = this._id + 1;
    } else {
      this._id = 1;
    }
    this._router.navigate(['/movies', this._id]);
  }
}

