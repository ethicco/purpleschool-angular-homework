import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, input, linkedSignal, output } from '@angular/core';
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
  readonly type = input<'text' | 'email' | 'password'>('text');
  readonly value = input('');
  placeholder = input('');
  disabled = input(false);
  iconUrl = input<string | null>(null);
  isPassword = input<boolean | null>(false);
  showButton = input(false);

  currentType = linkedSignal(() => this.type());
  currentValue = linkedSignal(() => this.value());

  buttonIcon = EPasswordInputIcons.Closed;
  controlValue = output<string>();

  onChangeValue(value: string) {
    this.currentValue.set(value);
    this.controlValue.emit(value);
  }

  onButtonToggleClick(): void {
    if (this.currentType() === 'password') {
      this.currentType.set('text');
      this.buttonIcon = EPasswordInputIcons.Opened;
    } else {
      this.currentType.set('password');
      this.buttonIcon = EPasswordInputIcons.Closed;
    }
  }
}
