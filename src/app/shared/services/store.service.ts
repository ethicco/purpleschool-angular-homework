import { Injectable } from '@angular/core';
import { IGenre } from '../models/genre.model';
import { IMovie } from '../models/movie.model';
import { BehaviorSubject, map, Observable } from 'rxjs';

export interface IAppStore {
  genres: IGenre[];
  movies: IMovie[];
  favorites: IMovie[];

  filters: {
    name: string;
    genre: number | null;
    from: number | null;
    to: number | null;
    sort: 'genre' | 'name' | 'rating';
  };
}

export const STORE_DEFAULT_VALUE: IAppStore = {
  genres: [],
  movies: [],
  favorites: [],
  filters: {
    name: '',
    genre: null,
    from: null,
    to: null,
    sort: 'name',
  },
};

@Injectable({ providedIn: 'root' })
export class StoreService {
  private readonly stateSubject = new BehaviorSubject<IAppStore>({
    ...STORE_DEFAULT_VALUE,
  });

  public getValue<K extends keyof IAppStore>(key: K): IAppStore[K] {
    return this.stateSubject.getValue()[key];
  }

  public getValueAsync<K extends keyof IAppStore>(
    key: K
  ): Observable<IAppStore[K]> {
    return this.stateSubject.asObservable().pipe(map(state => state[key]));
  }

  public setValue<K extends keyof IAppStore>(
    key: K,
    value: IAppStore[K]
  ): void {
    this.stateSubject.next({ ...this.stateSubject.getValue(), [key]: value });
  }

  updateData(data: Partial<IAppStore>): void {
    this.stateSubject.next({ ...this.stateSubject.getValue(), ...data });
  }
}
