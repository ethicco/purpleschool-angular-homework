import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export enum EPasswordInputIcons {
  Opened = 'icons/eye-opened.svg',
  Closed = 'icons/eye-closed.svg',
}

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  standalone: true,
  imports: [FormsModule, CommonModule, NgOptimizedImage],
})
export class InputComponent {
  @Input() type: 'text' | 'email' | 'password' = 'text';
  @Input() value = '';
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() iconUrl: string | null = null;
  @Input() isPassword: boolean | null = false;
  @Input() showButton = false;
  buttonIcon = EPasswordInputIcons.Closed;
  @Output() controlValue: EventEmitter<string> = new EventEmitter<string>();

  onChangeValue(value: string) {
    this.value = value;
    this.controlValue.emit(value);
  }

  onButtonToggleClick(): void {
    if (this.type === 'password') {
      this.type = 'text';
      this.buttonIcon = EPasswordInputIcons.Opened;
    } else {
      this.type = 'password';
      this.buttonIcon = EPasswordInputIcons.Closed;
    }
  }
}
