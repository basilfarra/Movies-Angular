import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { MovieService } from ".././app/movie.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./models/material.model";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ListMoviesComponent } from "./movie/list-movies.component";
import { AddMovieComponent } from "./movie/add-movie.component";
import { DisplayMovieComponent } from "./movie/display-movie.component";
import { AddMovieCanDeactivateGuardService } from "./movie/add-movie-can-deactivate-gaurd.service";
import { MovieDetailsComponent } from "./movie/movie-details.component";
import { MovieFilterPipe } from "./movie/movie-filter.pipe";
import { PageNotFoundComponent } from "./page-not-found.component";
import { MovieDetailsGuardService } from "./movie/movie-details-guard.service";
import { HttpClientModule } from '@angular/common/http';
import { MovieListResolverService } from './movie/movie-list-resolver.service';

const appRoutes: Routes = [
  { 
    path: "list",
    component: ListMoviesComponent,
    resolve: { movieList: MovieListResolverService }
  },
  {
    path: "movies/:id",
    component: MovieDetailsComponent,
    canActivate: [MovieDetailsGuardService]
  },
  {
    path: "edit/:id",
    component: AddMovieComponent,
    canDeactivate: [AddMovieCanDeactivateGuardService]
  },
  { path: "", redirectTo: "/list", pathMatch: "full" },
  { path: "notfound", component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ListMoviesComponent,
    AddMovieComponent,
    DisplayMovieComponent,
    MovieDetailsComponent,
    MovieFilterPipe,
    PageNotFoundComponent
     
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [
    MovieService,
    AddMovieCanDeactivateGuardService,
    MovieDetailsGuardService,
    MovieListResolverService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
