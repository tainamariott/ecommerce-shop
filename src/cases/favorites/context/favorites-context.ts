import { createContext } from "react";
import type { FavoriteDTO } from "../dtos/favorite.dto";


export interface FavoritesContextProps {
  favorites: FavoriteDTO[];
  toggleFavorite: (item: FavoriteDTO) => void;
  isFavorite: (id: string) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextProps | undefined>(undefined);
