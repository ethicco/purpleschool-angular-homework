import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  standalone: true,
})
export class ButtonComponent {
  readonly title = input('');
  readonly disabled = input(false);
  readonly controlSubmit = output<void>();

  onSubmit(): void {
    this.controlSubmit.emit();
  }
}
