"use client";
import { AuthErrorHelper } from '@/helpers/errors/auth-error-helper';
import { getCategoryById as getCategoryById } from '@/scripts/manager/category-byid';
import { IMenu, MenuIdProps } from '@/interfaces/menu.interface'
import MenuView from '@/views/ManagerDashViews/Menu/MenuView';
import React, { useEffect, useState } from 'react'

const ProductsByCategory: React.FC<MenuIdProps> = ({ params }) => {
  const { categoryId } = params;
  const [category, setCategory] = useState<IMenu | null>();

  useEffect(() => {

    const fetchThis = async () => {
      try {
        if (!(categoryId === undefined) && !(categoryId === null)) {
          const data = await getCategoryById(categoryId);
          setCategory(data);

        } else {
          setCategory(null);
        }

      } catch (error) {
        setCategory(null);
        AuthErrorHelper(error);
      }

    };

    fetchThis();

  }, [categoryId]);

  return (
    <>
      {
        category !== null && category !== undefined ?
          (<MenuView categories={category} />)
          :
          (
            <h1 className="flex-1 flex items-center justify-center mb-4 text-lg font-light text-gray-500">
              Selecciona o crea una categoria para empezar
            </h1>
          )
      }
    </>
  )
}

export default ProductsByCategory