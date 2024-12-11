import { useState, useEffect } from 'react';
import axios from 'axios';
import { Category } from "../types/types";
import CategoryCard from '../components/CategoryCard';
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from 'react-router-dom';


export default function CategoryWrapper() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/categories', {
                    headers: {
                        'X-API-KEY': 'dasdawerqwer21312321eadasdasda',
                    }
                });
                setCategories(response.data.data || []);
            } catch (err) {
                console.error('Error fetching categories:', err);
                setError('Failed to load categories');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) return <p className="text-center py-4">Loading categories...</p>;
    if (error) return <p className="text-center py-4 text-red-500">{error}</p>;
    if (!categories || categories.length === 0) return <p className="text-center py-4">No categories found</p>;

    return (
        <section id="Categories" className="mt-[30px]">
            <div className="flex items-center justify-between px-5">
                <h2 className="font-bold">By Categories</h2>
            </div>
            <div className="w-full mt-3">
                <Swiper
                    spaceBetween={16}
                    slidesPerView="auto"
                    slidesOffsetBefore={20}
                    slidesOffsetAfter={20}
                >
                    {categories.map((category) => (
                        <SwiperSlide key={category.id} className="!w-fit pb-[30px]">
                            <Link to={`/category/${category.slug}`}>
                                <CategoryCard category={category} />
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}