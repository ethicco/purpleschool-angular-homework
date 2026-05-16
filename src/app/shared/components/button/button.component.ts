import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  standalone: true,
})
export class ButtonComponent {
  title = input('');
  controlSubmit = output<void>();

  onSubmit() {
    this.controlSubmit.emit();
  }
}
