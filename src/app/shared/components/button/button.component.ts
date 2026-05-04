import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  standalone: true,
})
export class ButtonComponent {
  @Input() title = '';
  @Output() controlSubmit: EventEmitter<void> = new EventEmitter<void>();

  onSubmit() {
    this.controlSubmit.emit();
  }
}
