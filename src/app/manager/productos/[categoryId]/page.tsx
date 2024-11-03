"use client";
import { AuthErrorHelper } from '@/helpers/errors/auth-error-helper';
import { getMenuById } from '@/helpers/menu-helper/get-menuByCategory';
import { IMenu, MenuIdProps } from '@/interfaces/menu.interface'
import MenuView from '@/views/MenuView/MenuView';
import React, { useEffect, useState } from 'react'

const ProductsByCategory: React.FC<MenuIdProps> = ({ params }) => {
  const { categoryId } = params;
  // let category: IMenu | null;
  const [category, setCategory] = useState<IMenu | null>();

  useEffect(() => {

    const fetchThis = async () => {
      try {
        if (!(categoryId === undefined) && !(categoryId === null)) {
          const data = await getMenuById(categoryId);
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

  }, []);

  return (
    <>
      {
        category !== null && category !== undefined ?
          (<MenuView categories={category} />)
          :
          (<h1 className="flex-1 flex items-center justify-center mb-4 text-lg font-light text-gray-500">Selecciona una categoria para empezar</h1>)
      }
    </>
  )
}

export default ProductsByCategory