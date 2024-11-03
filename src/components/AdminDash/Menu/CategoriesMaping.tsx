import { ICategory } from '@/interfaces/category.interface';
import { SetStateString } from '@/interfaces/Interfaces.types';
import Link from 'next/link';
import React, { useState } from 'react';

const CategoriesMaping: React.FC<{ categories: ICategory[] } & SetStateString> = ({ categories, setParentState }) => {

    const handleClick = (id: string) => {
        setParentState(id);
    };

    return (
        <>
            {categories.map((category) => (
                <Link key={category.id} href={`/manager/productos/${category.id}`}>
                    <li
                        onClick={() => handleClick(category.id)}
                        className='block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer'
                    >
                        {category.name}
                    </li>
                </Link>
            ))}
        </>

    );
};

export default CategoriesMaping;