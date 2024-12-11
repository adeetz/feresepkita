import { Category } from "../types/types";

interface CategoryCardProps {
    category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
    // Bersihkan path dari awalan 'public/category/' jika ada
    const cleanIcon = category.icon.replace('public/category/', '');
    const baseUrl = "http://127.0.0.1:8000/storage/category";
    
    return (
        <div className="card">
            <div className="flex flex-col w-fit min-w-[90px] rounded-[31px] p-[10px] pb-5 gap-[10px] text-center bg-white shadow-[0_12px_30px_0_#D6D6D680] transition-all duration-300 hover:shadow-[0_10px_20px_0_#FF4C1C80] hover:bg-[#FF4C1C] hover:text-white">
                <div className="relative flex shrink-0 w-[70px] h-[70px] rounded-full bg-white">
                    <img 
                        src={`${baseUrl}/${cleanIcon}`} 
                        className="object-cover w-full h-full rounded-full"
                        alt={category.name || 'Category icon'} 
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) {
                                fallback.classList.remove('hidden');
                            }
                            console.log('Image failed to load:', `${baseUrl}/${cleanIcon}`);
                        }}
                    />
                    <div className="w-full h-full hidden flex items-center justify-center text-lg font-bold text-gray-400 rounded-full">
                        {category.name?.charAt(0) || '?'}
                    </div>
                </div>
                <h3 className="font-semibold text-sm leading-[21px]">
                    {category?.name || 'Unknown Category'}
                </h3>
            </div>
        </div>
    );
}