import { Component, inject, OnInit, Signal } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { FavoritesService } from './services/favorites.service';
import { IMovie } from '../../../shared/models/movie.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
  standalone: true,
  imports: [CardComponent],
  providers: [FavoritesService],
})
export class FavoritesComponent implements OnInit {
  private readonly favoritesService: FavoritesService =
    inject(FavoritesService);

  favoritesList: Signal<IMovie[] | undefined> = toSignal(
    this.favoritesService.movies$,
    { initialValue: [] }
  );

  ngOnInit(): void {
    this.favoritesService.loadMovies();
  }

  onFavoriteChange(id: string) {
    this.favoritesService.onFavoriteChange(id);
  }
}
