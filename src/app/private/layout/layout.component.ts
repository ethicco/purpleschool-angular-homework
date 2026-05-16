import { Component, inject, OnInit } from '@angular/core';
import {
  RouterOutlet,
  RouterLinkWithHref,
  RouterLinkActive,
} from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { IMenu, MENU_CONST } from '../const/menu-items.const';
import { NavButtonComponent } from '../../shared/components/nav-button/nav-button.component';
import { LayoutService } from './services/layout.service';

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
  ],
  providers: [LayoutService],
})
export class PrivateLayoutComponent implements OnInit {
  private readonly layoutService: LayoutService = inject(LayoutService);

  menuItems: IMenu[] = MENU_CONST;
  genres = toSignal(this.layoutService.genres$, { initialValue: [] });

  ngOnInit(): void {
    this.layoutService.loadGenres();
  }
}
