import type { FavoriteDTO } from "../dtos/favorite.dto";
const STORAGE_KEY = "favorites";

export const FavoritesService = {
  getAll(): FavoriteDTO[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  save(list: FavoriteDTO[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  },

  toggle(item: FavoriteDTO): FavoriteDTO[] {
    const current = this.getAll();
    const exists = current.some((fav) => fav.id === item.id);

    const updated = exists
      ? current.filter((fav) => fav.id !== item.id)
      : [...current, item];

    this.save(updated);
    return updated;
  },
};
