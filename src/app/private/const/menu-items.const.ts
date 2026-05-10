export interface IMenu {
  id: number;
  title: string;
  iconUrl: string;
  iconUrlActive: string;
  link: string;
}

export const MENU_CONST: IMenu[] = [
  {
    id: 1,
    title: 'Главная',
    iconUrl: '/menu/home.svg',
    iconUrlActive: '/menu/home-active.svg',
    link: '/private/home',
  },
  {
    id: 2,
    title: 'Избранное',
    iconUrl: '/menu/favorites.svg',
    iconUrlActive: '/menu/favorites-active.svg',
    link: '/private/favorites',
  },
];
