import { Component, Input } from '@angular/core';
import { IMovie } from '../../../shared/models/movie.model';
import { MOVIES } from '../../../shared/const/movies.const';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [CardComponent],
})
export class HomeComponent {
  movies: IMovie[] = MOVIES;

  @Input() search = 'test';

  onFavoriteChange(id: string) {
    this.movies = this.movies.map(movie => {
      if (movie.id === id) {
        return {
          ...movie,
          isFavorite: !movie.isFavorite,
        };
      } else {
        return movie;
      }
    });
  }
}
