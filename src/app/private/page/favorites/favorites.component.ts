import { Component } from '@angular/core';
import { IMovie } from '../../../shared/models/movie.model';
import { FAVORITES } from '../../../shared/const/fake-favorites.const';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
  standalone: true,
  imports: [CardComponent],
})
export class FavoritesComponent {
  favorites: IMovie[] = FAVORITES;

  onFavoriteChange(id: string) {
    this.favorites = this.favorites.filter(favorite => favorite.id !== id);
  }
}
