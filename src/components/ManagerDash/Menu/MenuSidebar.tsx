"use client";
import { API_URL } from '@/config/config';
import { useLocalStorage } from '@/scripts/auth/useLocalStorage';
import { ErrorHelper, verifyError } from '@/helpers/errors/error-helper';
import { swalNotifyError } from '@/scripts/swal/swal-notify-error';
import { swalNotifyUnknownError } from '@/scripts/swal/swal-notify-unknown-error';
import React, { useEffect, useState } from 'react'
import NewCategoryPopUp from './NewCategoryPopUp';
import { ICategory } from '@/interfaces/category.interface';
import CategoriesMaping from './CategoriesMaping';
import { AuthErrorHelper } from '@/helpers/errors/auth-error-helper';
import { swalNotifySuccess } from '@/scripts/swal/swal-notify-success';
import { fetchWithAuth } from '@/scripts/token-expire.interceptor';

const MenuSidebar = () => {
  const [restId, setRestId] = useLocalStorage("restaurant", "");
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const togglePopup = () => setShowPopup(!showPopup);


  // {
  //   "id": "75089405-91fb-46cc-a451-1a594d23e5ab",
  //   "name": "Bebidas BJ",
  //   "dishes": [
  //     {
  //       "id": "e6bcd7a2-7f44-4204-abad-e0d066858190",
  //       "name": "Sprite",
  //       "description": "Sprite 450ml",
  //       "stock": true,
  //       "price": "2500",
  //       "imgUrl": "default-image-url.jpg"
  //     },
  //     {
  //       "id": "64b44d80-3de1-4ccc-a911-590e5c72f9c3",
  //       "name": "Cocacola",
  //       "description": "Cocacola de 450 ml",
  //       "stock": true,
  //       "price": "3500",
  //       "imgUrl": "default-image-url.jpg"
  //     }
  //   ]
  // }

  useEffect(() => {
    const fetchCategories = async () => {
      if (restId !== "") {
        try {
          const response = await fetch(`${API_URL}/menu/list/${restId}?sub=true`);
          const data = await response.json();
          if (!response.ok) {
            throw new ErrorHelper(verifyError(data.message), data.status);
          }
  
          console.log(data);
          setLoading(false);
          if (data.categories.length > 0) {
            setCategories(data.categories);
          }
        } catch (error: any) {
          AuthErrorHelper(error);
        }
      }
    };
  
    fetchCategories();
    setUpdate(false);
  }, [update, restId]);

  
  const handleOnSubmit = async (formData: string) => {

    try {
      const response = await fetchWithAuth(`${API_URL}/menu-category`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          restaurant_id: restId,
          name: formData,
        })
      });

      if (!!response) {
        setUpdate(true);
      }

      swalNotifySuccess("Categoria creada", `${response.name}`);

    } catch (error) {

      if (error instanceof ErrorHelper) {
        swalNotifyError(error);
      } else {
        swalNotifyUnknownError(error);
      }

    }
  };

  return (
    <>
      <div className="ml-6 mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-1">
        <div className='bg-slate-700 flex justify-center'>
          <h1 className='text-white italic font-semibold mt-2 mb-2'>Categorias</h1>
        </div>

        {/* CATEGORIES */}
        <ul className="py-2">
          {
            loading ?
              (<p className="text-black text-center">Cargando...</p>)
              :
              <CategoriesMaping categories={categories} />
          }

          <li>
            <a onClick={togglePopup} className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer font-bold text-center text-xl">
              Nueva Categoria
            </a>
          </li>
        </ul>
      </div>
      {showPopup && <NewCategoryPopUp showPopup={togglePopup} onSubmit={handleOnSubmit} />}

    </>
  )
}

export default MenuSidebar