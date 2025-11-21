import { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
    value?: number;
    onChange?: (rating: number) => void;
}

export function StarRating({ value = 0, onChange }: StarRatingProps) {
    const [hover, setHover] = useState(0);

    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    size={28}
                    className={`
                        cursor-pointer transition
                        ${star <= (hover || value)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }
                    `}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => onChange && onChange(star)}
                />
            ))}
        </div>
    );
}