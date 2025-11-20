import { useState } from "react";

import { FavoritesService } from "./service/favorites-service";
import { FavoritesContext } from "./context/favorites-context";
import type { FavoriteDTO } from "./dtos/favorite.dto";

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteDTO[]>(FavoritesService.getAll());

  function toggleFavorite(item: FavoriteDTO) {
    const updated = FavoritesService.toggle(item);
    setFavorites(updated);
  }

  function isFavorite(id: string) {
    return favorites.some(fav => fav.id === id);
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}