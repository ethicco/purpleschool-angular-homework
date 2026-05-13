import { Component } from '@angular/core';
import {
  RouterOutlet,
  RouterLinkWithHref,
  RouterLinkActive,
} from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { IMenu, MENU_CONST } from '../const/menu-items.const';
import { NavButtonComponent } from '../../shared/components/nav-button/nav-button.component';
import { IGenre } from '../../shared/models/genere.model';
import { GENRES } from '../../shared/const/generes.const';

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
})
export class PrivateLayoutComponent {
  menuItems: IMenu[] = MENU_CONST;
  genres: IGenre[] = GENRES;
}
