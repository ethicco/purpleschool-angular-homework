import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  RouterOutlet,
  RouterLinkWithHref,
  RouterLinkActive,
} from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';
import { IMenu, MENU_CONST } from '../const/menu-items.const';
import { NavButtonComponent } from '../../shared/components/nav-button/nav-button.component';
import { LayoutService } from './services/layout.service';
import { StoreService } from '../../shared/services/store.service';

@Component({
  selector: 'app-private-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  standalone: true,
  imports: [
    NavButtonComponent,
    RouterOutlet,
    NgOptimizedImage,
    RouterLinkWithHref,
    RouterLinkActive,
    ReactiveFormsModule,
  ],
  providers: [LayoutService],
})
export class PrivateLayoutComponent implements OnInit {
  private readonly layoutService = inject(LayoutService);
  private readonly storeService = inject(StoreService);
  private readonly destroyRef = inject(DestroyRef);

  readonly menuItems: IMenu[] = MENU_CONST;
  readonly genres = toSignal(this.layoutService.genres$, { initialValue: [] });

  readonly filterForm = new FormGroup({
    name: new FormControl('', { nonNullable: true }),
    genre: new FormControl<number | null>(null),
    from: new FormControl<number | null>(null),
    to: new FormControl<number | null>(null),
    sort: new FormControl<'genre' | 'name' | 'rating'>('name', {
      nonNullable: true,
    }),
  });

  constructor() {
    const filters = this.storeService.getValue('filters');
    this.filterForm.patchValue(filters, { emitEvent: false });

    this.filterForm.valueChanges
      .pipe(debounceTime(500), takeUntilDestroyed(this.destroyRef))
      .subscribe(value => {
        this.storeService.setValue('filters', {
          name: value.name ?? '',
          genre: value.genre ?? null,
          from: value.from ?? null,
          to: value.to ?? null,
          sort: value.sort ?? 'name',
        });
      });
  }

  ngOnInit(): void {
    this.layoutService.loadGenres();
  }
}
