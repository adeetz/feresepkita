import { Recipe } from "../types/types";

interface FeaturedRecipeCardProps {
    recipe: Recipe;
}

export default function FeaturedRecipeCard({ recipe }: FeaturedRecipeCardProps) {
    if (!recipe) {
        return null;
    }

    const imageUrl = recipe.thumbnail 
        ? `http://127.0.0.1:8000/storage/thumbnail/${recipe.thumbnail.replace('public/thumbnail/', '')}`
        : '/assets/images/default-recipe.jpg';
    
    return (
        <div>
            <div className="card">
                <div className="relative w-[200px] h-[280px] rounded-[30px] bg-white overflow-hidden shadow-[0_12px_30px_0_#D6D6D680] transition-all duration-300 hover:shadow-[0_10px_20px_0_#FF4C1C80] hover:bg-[#FF4C1C] hover:text-white">
                    <div className="absolute w-full h-full">
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
                    <div className="gradient-filter absolute w-full h-full bg-[linear-gradient(180deg,rgba(0,0,0,0)40.47%,#000000_81.6%)] z-10" />
                    <div className="relative flex flex-col h-full justify-between p-5 z-20">
                        <div className="flex shrink-0 items-center w-fit rounded-full py-1 px-2 bg-white/20 backdrop-blur">
                            <img
                                src="/assets/images/icons/Star 1.svg"
                                className="w-4 h-4 mr-1"
                                alt="star"
                            />
                            <span className="font-semibold text-xs text-white">
                                {recipe.rating || '4.8'}
                            </span>
                        </div>
                        <div className="flex flex-col gap-[6px]">
                            <h3 className="font-bold text-xl text-white line-clamp-2">
                                {recipe.name || recipe.title || 'Unknown Recipe'}
                            </h3>
                            <p className="font-semibold text-xs text-[#FF4C1C]">
                                {recipe.category?.name || 'Uncategorized'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}