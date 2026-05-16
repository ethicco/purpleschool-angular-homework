import { inject, Injectable } from '@angular/core';
import { StoreService } from '../../../shared/services/store.service';
import { Observable } from 'rxjs';
import { IGenre } from '../../../shared/models/genre.model';
import { GENRES } from '../../../shared/const/genres.const';

@Injectable()
export class LayoutService {
  private readonly storeService: StoreService = inject(StoreService);

  genres$: Observable<IGenre[]> = this.storeService.getValueAsync('genres');

  loadGenres(): void {
    this.storeService.setValue('genres', GENRES);
  }
}
