import { Injectable } from "@angular/core";
import { Movie } from "./Models/movie.model";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class MovieService {
  constructor(private http: HttpClient) {}

  private listMovies: Movie[] = [
    {
      id: 1,
      title: "300 2006",
      year: 2006,
      description:
        "300 is a 2006 American low fantasy epic war film based on the 1998 comic series of the same name by Frank Miller and Lynn Varley. Both are fictionalized retellings of the Battle of Thermopylae within the Persian Wars.",
      rating: "7.7",
      gener: 1,
      language: "En",
      quality: 1,
      photoPath: "assets/images/m300.jpg"
    },
    {
      id: 2,
      title: "Avatar 2009",
      year: 2009,
      description:
        "Avatar is a science fiction film written and directed by James Cameron, starring Sam Worthington, Zoë Saldaña, Stephen Lang, Michelle Rodriguez, and Sigourney Weaver. It was made by Lightstorm Entertainment and released by 20th Century Fox on December 18, 2009.",
      rating: "7.8",
      gener: 8,
      language: "En",
      quality: 2,
      photoPath: "assets/images/mavatar.jpg"
    },
    {
      id: 3,
      title: "Fury 2015",
      year: 2015,
      description:
        "Fury is a 2014 American war film written and directed by David Ayer, and starring Brad Pitt, Shia LaBeouf, Logan Lerman, Michael Peña, Jon Bernthal, and Jason Isaacs. The film portrays US tank crews in Nazi Germany during the final days of World War II.",
      rating: "7.6",
      gener: 24,
      language: "En",
      quality: 3,
      photoPath: "assets/images/mfury.jpg"
    }
  ];

  url = "http://localhost:3000/movies";

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.url).pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error("Client Side Error :", errorResponse.error.message);
    } else {
      console.error(
        `Backend returned code ${errorResponse.status}, ` +
          `body was: ${errorResponse.error}`
      );
    }
    return throwError(
      "There is a problem with the service. We are notified & working on it. Please try again later."
    );
  }

  getMovie(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.url}/${id}`)
        .pipe(catchError(this.handleError));
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http
      .post<Movie>(this.url, movie, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      })
      .pipe(catchError(this.handleError));
  }

  updateMovie(movie: Movie): Observable<void> {
    return this.http
      .put<void>(`${this.url}/${movie.id}`, movie, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      })
      .pipe(catchError(this.handleError));
  }

  deleteMovie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`)
        .pipe(catchError(this.handleError));
  } 
  
}
