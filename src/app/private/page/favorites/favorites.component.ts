import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject, of, switchMap } from 'rxjs';
import { delay } from 'rxjs/operators';
import { IMovie } from '../../../shared/models/movie.model';
import { FAVORITES } from '../../../shared/const/fake-favorites.const';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
  standalone: true,
  imports: [CardComponent, AsyncPipe],
})
export class FavoritesComponent {
  private favoritesState = new BehaviorSubject<IMovie[]>(FAVORITES);
  favorites$ = of(null).pipe(
    delay(500),
    switchMap(() => this.favoritesState),
  );

  onFavoriteChange(id: string) {
    this.favoritesState.next(this.favoritesState.value.filter(f => f.id !== id));
  }
}
