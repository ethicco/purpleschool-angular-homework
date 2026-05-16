import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { InputComponent } from '../../../shared/components/input/input.component';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
  standalone: true,
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule],
})
export class LogInComponent {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  readonly isSubmitDisabled = signal(true);

  get emailControl() {
    return this.loginForm.controls.email;
  }

  get passwordControl() {
    return this.loginForm.controls.password;
  }

  constructor() {
    this.loginForm.statusChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(status => this.isSubmitDisabled.set(status !== 'VALID'));
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.router.navigateByUrl('/private');
    }
  }
}
