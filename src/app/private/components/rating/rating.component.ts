import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss',
})
export class RatingComponent implements OnInit {
  @Input() rating = 0;

  stars: boolean[] = [];

  ngOnInit(): void {
    const filled = Math.floor(this.rating);
    this.stars = Array.from({ length: 5 }, (_, i) => i < filled);
  }
}
