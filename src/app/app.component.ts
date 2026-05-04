import { Component, signal } from '@angular/core';
import { LayoutComponent } from './public/layout/layout.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [LayoutComponent],
})
export class App {
  protected readonly title = signal('purple-app');
}
