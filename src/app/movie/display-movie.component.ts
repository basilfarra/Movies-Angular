import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../Models/movie.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-display-movie',
  templateUrl: './display-movie.component.html',
  styleUrls: ['./display-movie.component.css']
})
export class DisplayMovieComponent implements OnInit {
  @Input() movie: Movie;
  @Input() searchTerm: string;
  @Output() notifyDelete: EventEmitter<number> = new EventEmitter<number>();
  panelExpanded = true;

  confirmDelete = false;
  private selectedMovieId:number;
  constructor(
     private _route: ActivatedRoute,
     private _router: Router,
     private _movieService: MovieService
  ) { }

  ngOnInit() {
    this.selectedMovieId = +this._route.snapshot.paramMap.get('id');
  }

  viewMovie() {
    this._router.navigate(['/movies', this.movie.id], {
      queryParams: { 'searchTerm': this.searchTerm }
    });
  }

  editMovie() {
    this._router.navigate(['/edit', this.movie.id]);
  }

  deleteMovie() {
    this._movieService.deleteMovie(this.movie.id).subscribe(
      () => console.log(`Movie with ID = ${this.movie.id} Deleted`),
      (err) => console.log(err)
    );
    this.notifyDelete.emit(this.movie.id);
  }

}
