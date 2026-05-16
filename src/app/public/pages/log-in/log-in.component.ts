import { Component, inject } from '@angular/core';
import { InputComponent } from '../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
  standalone: true,
  imports: [InputComponent, ButtonComponent],
})
export class LogInComponent {
  private router = inject(Router);

  onSubmit() {
    this.router.navigateByUrl('/private');
  }
}
