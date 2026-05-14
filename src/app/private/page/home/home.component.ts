import { Component, input } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject, of, switchMap } from 'rxjs';
import { delay } from 'rxjs/operators';
import { IMovie } from '../../../shared/models/movie.model';
import { MOVIES } from '../../../shared/const/movies.const';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [CardComponent, AsyncPipe],
})
export class HomeComponent {
  search = input('test');

  private moviesState = new BehaviorSubject<IMovie[]>(MOVIES);
  movies$ = of(null).pipe(
    delay(500),
    switchMap(() => this.moviesState),
  );

  onFavoriteChange(id: string) {
    const updated = this.moviesState.value.map(movie =>
      movie.id === id ? { ...movie, isFavorite: !movie.isFavorite } : movie,
    );
    this.moviesState.next(updated);
  }
}
