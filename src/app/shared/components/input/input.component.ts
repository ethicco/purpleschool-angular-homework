import { NgOptimizedImage } from '@angular/common';
import {
  Component,
  forwardRef,
  input,
  linkedSignal,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export enum EPasswordInputIcons {
  Opened = 'icons/eye-opened.svg',
  Closed = 'icons/eye-closed.svg',
}

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  standalone: true,
  imports: [NgOptimizedImage],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  readonly type = input<'text' | 'email' | 'password'>('text');
  readonly placeholder = input('');
  readonly prefixIconUrl = input<string | null>(null);
  readonly suffixIconUrl = input<string | null>(null);
  readonly showButton = input(false);

  readonly currentType = linkedSignal(() => this.type());
  readonly currentValue = signal('');
  readonly isDisabled = signal(false);

  buttonIcon = EPasswordInputIcons.Closed;

  private onChange: (value: string) => void = () => { return; };
  private onTouched: () => void = () => { return; };

  writeValue(value: string): void {
    this.currentValue.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.currentValue.set(value);
    this.onChange(value);
  }

  onBlur(): void {
    this.onTouched();
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
