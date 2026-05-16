import { inject, Injectable } from '@angular/core';
import { StoreService } from '../../../../shared/services/store.service';
import { delay, map, Observable, of, tap } from 'rxjs';
import { IMovie } from '../../../../shared/models/movie.model';
import { FAVORITES } from '../../../../shared/const/fake-favorites.const';

@Injectable()
export class FavoritesService {
  private readonly storeService: StoreService = inject(StoreService);

  movies$: Observable<IMovie[]> = this.storeService.getValueAsync('favorites');

  loadMovies(): void {
    of(0)
      .pipe(
        delay(1000),
        tap(() => this.storeService.setValue('favorites', FAVORITES)),
        map(() => void 0)
      )
      .subscribe();
  }

  onFavoriteChange(id: string) {
    this.storeService.updateData({
      favorites: this.storeService
        .getValue('favorites')
        .filter(favorite => favorite.id !== id),
    });
  }
}
