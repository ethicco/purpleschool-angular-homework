import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss',
})
export class RatingComponent {
  rating = input(0);
  stars = computed(() =>
    Array.from({ length: 5 }, (_, i) => i < Math.floor(this.rating()))
  );
}
