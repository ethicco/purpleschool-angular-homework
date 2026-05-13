import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IMovie } from '../../../shared/models/movie.model';
import { NgOptimizedImage } from '@angular/common';
import { RatingComponent } from '../rating/rating.component';
import { IconDirective } from "../../../shared/directives/icon.directive";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  imports: [NgOptimizedImage, RatingComponent, IconDirective],
})
export class CardComponent {
  @Input() movie: IMovie | null = null;
  @Input() isFavorite = false;

  @Output() clickedFavorite: EventEmitter<void> = new EventEmitter<void>();

  onFavoriteToggle() {
    this.isFavorite = !this.isFavorite;
    this.clickedFavorite.emit();
  }
}
