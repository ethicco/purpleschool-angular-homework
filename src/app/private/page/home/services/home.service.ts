import { inject, Injectable } from '@angular/core';
import { StoreService } from '../../../../shared/services/store.service';
import { delay, map, Observable, of, tap } from 'rxjs';
import { IMovie } from '../../../../shared/models/movie.model';
import { MOVIES } from '../../../../shared/const/movies.const';

@Injectable()
export class HomeService {
  private readonly storeService: StoreService = inject(StoreService);

  movies$: Observable<IMovie[]> = this.storeService.getValueAsync('movies');

  loadMovies(): void {
    of(0).pipe(
      delay(1000),
      tap(() => this.storeService.setValue('movies', MOVIES)),
      map(() => void 0)
    ).subscribe();
  }

  onFavoriteChange(id: string) {
    this.storeService.updateData({
      movies: this.storeService.getValue('movies').map(movie => {
        if (movie.id === id) {
          return { ...movie, isFavorite: !movie.isFavorite };
        }

        return movie;
      }),
    });
  }
}
