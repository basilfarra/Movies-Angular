import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie.model';
import { Gener } from '../models/gener.model';
import { Quality } from '../models/quality.model';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, state, transition, style, animate, group } from '@angular/animations';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css'],
  animations: [ 
    trigger('fade' ,[
      transition('void=>*',[
        style({
            opacity:0,
            transform:'translateX(500px)'
        }),
        group([
        animate(1000,style({
          opacity:1,
        })),
        animate(1500,style({
          transform:'translateX(0)'
        }))
      ])
      ])
    ]),
    trigger('show' ,[
      transition('void=>*',[
        style({
            opacity:0,
            transform:'translateY(500px)'
        }),
        group([
        animate(1000,style({
          opacity:1,
        })),
        animate(1500,style({
          transform:'translateY(0)'
        }))
      ])
      ])
    ])
  ]
})
export class ListMoviesComponent implements OnInit {
  movies: Movie[] = [];
  filteredMovies: Movie[];
  private _searchTerm: string; 

  get searchTerm(): string {
    return this._searchTerm;
  }

  // This setter is called everytime the value in the search text box changes
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredMovies = this.filterMovies(value);
  }

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
  
  constructor(private _router: Router, private _route: ActivatedRoute) 
    {
      this.movies = this._route.snapshot.data['movieList'];
  
      if (this._route.snapshot.queryParamMap.has('searchTerm')) {
        this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');
      } else {
        this.filteredMovies = this.movies;
      }
    }


  ngOnInit() {
    
  }

  filterMovies(searchString: string) {
    return this.movies.filter(movie =>
      movie.title.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  onDeleteNotification(id: number) {
    const i = this.filteredMovies.findIndex(e => e.id === id);
    if (i !== -1) {
      this.filteredMovies.splice(i, 1);
    }
  }

}
