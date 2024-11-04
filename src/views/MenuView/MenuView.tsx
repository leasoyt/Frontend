"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { deleteDish } from '@/helpers/dish-helpers/delete.dish';
import { getMenuById } from '@/helpers/menu-helper/get-menuByCategory';
import { IMenu_Category } from '@/interfaces/menu.interface';
import { swalNotifyConfirmation } from '@/helpers/swal/swal-notify-confirm';
import AddProductPopUp from '@/components/AdminDash/Products/AddProductPopUp';
import { IDish, SoftDish } from '@/interfaces/dishes.interface';
import { AuthErrorHelper } from '@/helpers/errors/auth-error-helper';
import { PostProduct } from '@/helpers/manager/post-product';
import { filterRepeatedFields } from '@/helpers/object-repeated-filter';
import UpdateStock from '@/components/AdminDash/Menu/UpdateStock';
import { swalNotifySuccess } from '@/helpers/swal/swal-notify-success';
import { UpdateProduct } from '@/helpers/manager/update-product';
import { IUpdateStock } from '@/interfaces/Interfaces.types';
import { fetchWithAuth } from '@/helpers/token-expire.interceptor';
import { API_URL } from '@/config/config';

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
      }
      setLoading(false);
    };
    fetchCategoryData();
  }, [categories.id, update]);

  const handleClick = () => setShowPopup(!showPopup);

  const handleOnSubmit = (dish: SoftDish) => {
    const fetchThis = async () => {
      if (categories.id !== undefined) {
        try {
          const response = await PostProduct(dish, categories.id);
          setUpdate(!update);
          swalNotifySuccess("¡Nuevo producto!", `${response.name}`);
        } catch (error) {
          AuthErrorHelper(error);
        }
      }
    };
    fetchThis();
  };

  const handleOnUpdate = (dish: Partial<SoftDish>) => {
    const fetchThis = async () => {
      if (triggerer !== undefined && triggerer !== null) {
        try {
          await UpdateProduct({ id: triggerer.id, ...filterRepeatedFields(dish, triggerer) });
          setUpdate(!update);
          swalNotifySuccess("Actualizado Correctamente", "");
        } catch (error) {
          AuthErrorHelper(error);
        }
      }
    };
    fetchThis();
  };

  const handleUpdateStock = (data: IUpdateStock) => {
    const fetchThis = async () => {
      try {
        await UpdateProduct({ id: data.id, stock: data.stock });
        swalNotifySuccess("Disponibilidad Actualizada!", "");
        setUpdate(!update);
      } catch (error) {
        AuthErrorHelper(error);
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
  };

  const handleDelete = async (dishId: string) => {
    swalNotifyConfirmation("¿Estas Seguro?", "Esta accion no se podrá deshacer").then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDish(dishId);
          setUpdate(!update);
        } catch (error) {
          AuthErrorHelper(error);
        }
      }
    });
  };

  const handleDeleteCategory = () => {
    swalNotifyConfirmation("¿Estas Seguro?", "Al eliminar esto, tambien se irán sus productos").then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetchWithAuth(`${API_URL}/menu-category/${categories.id}`, {
            method: "DELETE",
            headers: {
              "Content-type": "application/json",
            }
          });
          window.location.href = "/manager/productos";
        } catch (error) {
          AuthErrorHelper(error);
        }
      }
    });
  };

  return (
    <div className="mr-5 mt-1 w-[80%] bg-white border border-gray-300 rounded-lg shadow-lg z-10">
      <div className="bg-slate-700 flex justify-center items-center rounded-t-lg p-3">
        <h1 className="text-white italic font-semibold text-lg">{categories.name}</h1>
        <Image
          src="https://svgsilh.com/svg/1691287-ffffff.svg"
          onClick={handleDeleteCategory}
          alt="Eliminar categoría"
          width={35}
          height={35}
          className="cursor-pointer ml-3"
        />
      </div>
      <div className="relative overflow-x-auto flex flex-col p-4">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Nombre</th>
              <th className="px-6 py-3">Descripción</th>
              <th className="px-6 py-3">Stock</th>
              <th className="px-6 py-3">Precio</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">Cargando...</td>
              </tr>
            ) : categoryData && categoryData.dishes?.length ? (
              categoryData.dishes.map((dish) => (
                <tr key={dish.id} className="bg-white border-b hover:bg-gray-100">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900">{dish.name}</th>
                  <td className="px-6 py-4">{dish.description}</td>
                  <td className="px-6 py-4">
                    <UpdateStock triggerer={dish} onSubmit={handleUpdateStock} />
                  </td>
                  <td className="px-6 py-4">{dish.price}</td>
                  <td className="px-6 py-3 flex space-x-3">
                    <button
                      onClick={() => handleUpdateTriggerer(dish)}
                      className="bg-slate-500 text-white font-light p-1 rounded-md hover:bg-slate-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(dish.id)}
                      className="bg-red-500 text-white font-light p-1 rounded-md hover:bg-red-600"
                    >
                      <Image
                        src="https://svgsilh.com/svg/146131-ffffff.svg"
                        alt="Eliminar"
                        width={15}
                        height={15}
                      />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No hay productos para esta categoría
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <button
          onClick={handleClick}
          className="mt-4 w-48 font-semibold text-white bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-4 py-2"
        >
          Nuevo producto
        </button>

        {showPopup && !showPopupUpdate && (
          <AddProductPopUp showPopup={togglePopup} onSubmit={handleOnSubmit} />
        )}

        {showPopupUpdate && !showPopup && triggerer && (
          <AddProductPopUp
            showPopup={togglePopupUpdate}
            onSubmit={handleOnUpdate}
            originalData={triggerer}
          />
        )}
      </div>
    </div>
  );
};

export default MenuView;
