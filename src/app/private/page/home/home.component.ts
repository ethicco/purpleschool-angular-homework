import { Component, inject, input, OnInit, Signal } from '@angular/core';
import { IMovie } from '../../../shared/models/movie.model';
import { CardComponent } from '../../components/card/card.component';
import { HomeService } from './services/home.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [CardComponent],
  providers: [HomeService],
})
export class HomeComponent implements OnInit {
  private readonly homeService = inject(HomeService);

  search = input('test');

  moviesList: Signal<IMovie[] | undefined> = toSignal(
    this.homeService.movies$,
    {
      initialValue: [],
    }
  );

  ngOnInit(): void {
    this.homeService.loadMovies();
  }

  onFavoriteChange(id: string) {
    this.homeService.onFavoriteChange(id);
  }
}
