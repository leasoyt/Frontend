"use client";
import React, { useEffect, useState } from 'react'
import { deleteDish } from '@/helpers/dish-helpers/delete.dish';
import { getMenuById } from '@/helpers/menu-helper/get-menuByCategory';
import { IMenu_Category } from '@/interfaces/menu.interface';
import { ErrorHelper } from '@/helpers/errors/error-helper';
import { swalNotifyError } from '@/helpers/swal/swal-notify-error';
import { swalNotifyUnknownError } from '@/helpers/swal/swal-notify-unknown-error';
import { swalNotifyConfirmation } from '@/helpers/swal/swal-notify-confirm';
import AddProductPopUp from '@/components/AdminDash/Menu/AddProductPopUp';
import { IDish, SoftDish } from '@/interfaces/dishes.interface';
import { AuthErrorHelper } from '@/helpers/errors/auth-error-helper';
import { PostOrUpdateProduct } from '@/helpers/manager/post-product';
import { filterRepeatedFields } from '@/helpers/object-repeated-filter';

const MenuView: React.FC<{ categories: IMenu_Category }> = ({ categories }) => {
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState<IMenu_Category | null>(null);
  const [update, setUpdate] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupUpdate, setShowPopupUpdate] = useState(false);
  const togglePopup = (visible: boolean) => setShowPopup(visible);
  const togglePopupUpdate = (visible: boolean) => setShowPopupUpdate(visible);
  const [triggerer, setTriggerer] = useState<SoftDish & { id: string } | undefined>();

  useEffect(() => {
    const fetchCategoryData = async () => {
      setLoading(true);

      try {

        if (categories.id !== undefined) {
          const data = await getMenuById(categories.id);
          setCategoryData(data);

        }

      } catch (error) {
        AuthErrorHelper(error);
        // if (error instanceof ErrorHelper) {
        //   swalNotifyError(error);
        // } else {
        //   swalNotifyUnknownError(error);
        // }

      }

      setLoading(false);
    };

    fetchCategoryData();
  }, [categories.id, update]);

  const handleClick = () => {
    setShowPopup(!showPopup);
  };

  const handleOnSubmit = (dish: Partial<IDish>) => {

    const fetchThis = async () => {
      try {
        const response = await PostOrUpdateProduct({ ...dish, id: categories.id }, "POST");

        setUpdate(true);
      } catch (error) {
        AuthErrorHelper(error);
      }

    };

    fetchThis();
  };

  const handleOnUpdate = (dish: Partial<SoftDish>) => {

    const fetchThis = async () => {
      if (triggerer !== undefined && triggerer !== null) {
        try {
          const response = await PostOrUpdateProduct({ id: triggerer.id, ...filterRepeatedFields(dish, triggerer) }, "PUT");
          console.log(response);
        } catch (error) {
          AuthErrorHelper(error);
        }

      }
    };

    fetchThis();
  };

  const handleUpdateTriggerer = (dish: Partial<IDish>) => {
    const { name, description, price, id, ...rest } = dish;
    if (name !== undefined && description !== undefined && price !== undefined && id !== undefined) {
      setTriggerer({ name, description, price, id });
      setShowPopupUpdate(!showPopupUpdate);
    }
  }

  const handleDelete = async (dishId: string) => {

    swalNotifyConfirmation("Eliminar", "¿Deseas eliminar este producto?").then(async (result) => {

      if (result.isConfirmed) {

        try {
          await deleteDish(dishId);
          setUpdate(true);
        } catch (error) {
          AuthErrorHelper(error);
        }
      }

    });

  };


  return (
    <div className="mr-5 mt-1 w-[80%] bg-white border border-gray-300 rounded-lg shadow-lg z-10">
      <div className='bg-slate-700 flex justify-center'>
        <h1 className='text-white italic font-semibold mt-2 mb-2'>{categories.name}</h1>
      </div>
      <div className="relative overflow-x-auto flex flex-col">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Descripcion
              </th>
              <th scope="col" className="px-6 py-3">
                Stock
              </th>
              <th scope="col" className="px-6 py-3">
                Precio
              </th>
              <th scope="col" className="px-6 py-3">

              </th>
            </tr>
          </thead>
          <tbody>
            {loading ?
              (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    Cargando...
                  </td>
                </tr>
              )
              : categoryData !== null && categoryData.dishes !== undefined && !loading ?
                (
                  categoryData.dishes.map((dish) => (
                    <tr key={dish.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {dish.name}
                      </th>
                      <td className="px-6 py-4">{dish.description}</td>
                      <td className="px-6 py-4">{dish.stock}</td>
                      <td className="px-6 py-4">{dish.price}</td>
                      <td className="px-6 py-3 flex justify-around">
                        <button
                          onClick={() => handleUpdateTriggerer(dish)}
                          className="bg-slate-500 text-white font-light p-1 rounded-md"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(dish.id)}
                          className="bg-slate-500 text-white font-light p-1 rounded-md"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                )
                :
                (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-500">
                      No hay productos para esta categoría
                    </td>
                  </tr>
                )
            }
          </tbody>
        </table>
        <button onClick={handleClick} className="font-semibold text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-1.5 me-2 mb-2 ml-3 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-48">
          Nuevo producto
        </button>

        {/* ADD PRODUCT FORM */}
        {showPopup && !showPopupUpdate ? <AddProductPopUp showPopup={togglePopup} onSubmit={handleOnSubmit} /> : null}

        {/* UPDATE PRODUCT FORM */}
        {
          showPopupUpdate &&
            !showPopup &&
            triggerer !== null &&
            triggerer !== undefined 
            ?
            <AddProductPopUp
              showPopup={togglePopupUpdate}
              onSubmit={handleOnUpdate}
              originalData={triggerer}
            /> : null
        }
      </div>
    </div>
  )
}

export default MenuView;