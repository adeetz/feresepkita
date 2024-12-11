import { Recipe } from "../types/types";

interface RecipeCardResultProps {
    recipe: Recipe;
}

export default function RecipeCardResult({ recipe }: RecipeCardResultProps) {
    if (!recipe) {
        return null;
    }

    // Handle thumbnail dengan logika yang sama seperti FeaturedRecipeCard
    const imageUrl = recipe.thumbnail 
        ? `http://127.0.0.1:8000/storage/thumbnail/${recipe.thumbnail.replace('public/thumbnail/', '')}`
        : '/assets/images/default-recipe.jpg';
    
    return (
        <div className="card">
            <div className="flex rounded-[20px] p-[14px] gap-[14px] bg-white shadow-[0_12px_30px_0_#D6D6D640]">
                <div className="flex shrink-0 w-[100px] h-20 rounded-[20px] overflow-hidden bg-[#D9D9D9]">
                    <img
                        src={imageUrl}
                        className="w-full h-full object-cover"
                        alt={recipe.name || 'Recipe Thumbnail'}
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) {
                                fallback.classList.remove('hidden');
                            }
                        }}
                    />
                    <div className="w-full h-full hidden flex items-center justify-center bg-gray-200">
                        <span className="text-4xl font-bold text-gray-400">
                            {(recipe.name || '?').charAt(0)}
                        </span>
                    </div>
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg leading-[24px]">
                            {recipe.name || 'Unknown Recipe'}
                        </h3>
                    </div>
                    <div className="flex shrink-0 items-center w-fit rounded-full py-1 px-2 bg-[#FF4C1C] shadow">
                        <img
                            src="/assets/images/icons/Star 1.svg"
                            className="w-4 h-4"
                            alt="star"
                        />
                        <span className="font-semibold text-xs leading-[18px] text-white">
                            4.8
                        </span>
                    </div>
                    <p className="text-sm leading-[21px] text-[#848486]">
                        by {recipe.author?.name || 'Unknown Author'}
                    </p>
                </div>
            </div>
        </div>
    );
}