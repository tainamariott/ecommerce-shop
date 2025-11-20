export type Favorite = {
    id: string;
    name: string;
    idUser: string;
};

interface FavoriteCardProps {
    favorite: Favorite;
}

export default function FavoriteCard({ favorite }: FavoriteCardProps) {
    return (
        <div className="flex items-center gap-3 p-3 border rounded-lg shadow-sm">

            <div className="flex-1">
                <h3 className="font-semibold">{favorite.name}</h3>
            </div>
        </div>
    );
}
