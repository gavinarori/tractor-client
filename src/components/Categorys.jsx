import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Categories = () => {
    const { categorys } = useSelector((state) => state.home);

    const responsive = {
        superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 6 },
        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
        tablet: { breakpoint: { max: 1024, min: 768 }, items: 4 },
        mobile: { breakpoint: { max: 768, min: 0 }, items: 2 },
    };

    return (
        <div className="container  mx-auto gap-4 px-4 py-6">
            <Carousel
                autoPlay
                infinite
                arrows
                responsive={responsive}
                itemClass="px-2" 
                transitionDuration={500}
            >
                {categorys.map((category, index) => (
                    <Link
                        key={index}
                        to={`/products?category=${category.name}`}
                        className="relative block group rounded-lg overflow-hidden shadow-md"
                    >
                        <div className="relative h-44 w-full bg-gray-100">
                            <img
                                src={category.image}
                                alt={category.name}
                                className="h-full w-full object-cover transition-transform group-hover:scale-105"
                            />
                        </div>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-sm font-semibold px-4 py-1 rounded-md">
                            {category.name}
                        </div>
                    </Link>
                ))}
            </Carousel>
        </div>
    );
};

export default Categories;