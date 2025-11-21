import { useState } from "react";
import FavoriteCard from "./favorite-card";
import type { Favorite } from "./favorite-card";
import { CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";

export function FavoriteLayout() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const [favorites] = useState<Favorite[]>(() => {
        const stored = localStorage.getItem("favorites");
        return stored ? JSON.parse(stored) : [];
    });

    const favoritesFiltered = favorites.filter(
        fav => fav.idUser === user.id
    );

    const isEmpty = favoritesFiltered.length === 0;

    return (
        <div className="p-6 max-w-6xl mx-auto">

            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <Heart className="w-7 h-7 text-red-500" />
                    <CardTitle className="text-3xl font-bold tracking-tight">
                        Meus produtos favoritos
                    </CardTitle>
                </div>
            </div>

            {isEmpty && (
                <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
                    <Heart className="w-16 h-16 text-gray-400 mb-4" />
                    <p className="text-lg">Você ainda não favoritou nenhum produto.</p>
                    <p className="text-sm mt-1">Explore o catálogo e marque seus favoritos!</p>
                </div>
            )}

            {!isEmpty && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
                    {favoritesFiltered.map((fav) => (
                        <FavoriteCard 
                            key={fav.id}
                            favorite={fav}
                        />
                    ))}
                </div>
            )}

        </div>
    );
}
