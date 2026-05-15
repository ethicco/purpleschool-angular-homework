export interface IGenre {
  /** Уникальный id жанра */
  id: number;
  /** Отображаемое имя */
  name: string;
  /** slug для URL/фильтров */
  slug?: string;
}
