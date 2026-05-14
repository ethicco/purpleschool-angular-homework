import { Component, input, output } from '@angular/core';
import { IMovie } from '../../../shared/models/movie.model';
import { NgOptimizedImage } from '@angular/common';
import { RatingComponent } from '../rating/rating.component';
import { IconDirective } from '../../../shared/directives/icon.directive';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  imports: [NgOptimizedImage, RatingComponent, IconDirective],
})
export class CardComponent {
  movie = input<IMovie | null>(null);
  isFavorite = input(false);
  clickedFavorite = output<void>();

  onFavoriteToggle() {
    this.clickedFavorite.emit();
  }
}
