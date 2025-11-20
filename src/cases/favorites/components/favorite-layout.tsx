import { useState } from "react";
import FavoriteCard from "./favorite-card";
import type { Favorite } from "./favorite-card";
import { CardTitle } from "@/components/ui/card";

export function FavoriteLayout() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const [favorites] = useState<Favorite[]>(() => {
        const stored = localStorage.getItem("favorites");
        return stored ? JSON.parse(stored) : [];
    });

    const favoritesFiltered = favorites.filter(
        fav => fav.idUser === user.id
    );

    if (favoritesFiltered.length === 0) {
        return (
            <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                    <CardTitle className="text-2xl font-bold text-black">
                        Meus produtos favoritos
                    </CardTitle>
                </div>
                <p className="text-center text-gray-500 mt-10">
                    Nenhum favorito ainda
                </p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
                <CardTitle className="text-2xl font-bold text-black">
                    Meus produtos favoritos
                </CardTitle>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoritesFiltered.map((fav) => (
                    <FavoriteCard
                        key={fav.id}
                        favorite={fav}
                    />
                ))}
            </div>
        </div>
    );
}
