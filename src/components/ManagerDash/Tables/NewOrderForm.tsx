"use client";
import { API_URL } from '@/config/config';
import { AuthErrorHelper } from '@/helpers/errors/auth-error-helper';
import { ICategory } from '@/interfaces/category.interface';
import { IDish } from '@/interfaces/dishes.interface';
import { IMenu_Category } from '@/interfaces/menu.interface';
import { OrderedDish } from '@/interfaces/order.interface';
import { fetchWithAuth } from '@/scripts/token-expire.interceptor';
import React, { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';

const NewOrderForm: React.FC<{
  rest_id: string,
  setState: Dispatch<SetStateAction<OrderedDish[]>>,
  state: OrderedDish[] | undefined
}> = ({ rest_id, setState, state }) => {

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isDishOpen, setIsDishOpen] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [categoryTrigger, setCategoryTrigger] = useState<IMenu_Category | null>(null);
  const [productTrigger, setProductTrigger] = useState<IDish | null>(null);
  const [products, setProducts] = useState<IDish[]>([]);
  const divRef = useRef<HTMLDivElement>(null);
  const otherDivRef = useRef<HTMLDivElement>(null);
  const [isHandlingProductClick, setIsHandlingProductClick] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);

  // PARA ABRIR
  const toggleMenu = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const toggleDish = () => {
    setIsDishOpen(!isDishOpen);
  };

  // CLICK AFUERA PARA CERRAR
  const handleOutCategory = (event: MouseEvent) => {
    if (divRef.current && !divRef.current.contains(event.target as Node)) {
      setIsCategoryOpen(false);
    }
  };

  const handleOutProduct = (event: MouseEvent) => {
    if (otherDivRef.current && !otherDivRef.current.contains(event.target as Node) && !isHandlingProductClick) {
      setIsDishOpen(false);
    }
    setIsHandlingProductClick(false);
  };

  // ESTADO
  const handleCategoryTriggerer = (category: ICategory) => {
    setCategoryTrigger(category);
    setIsCategoryOpen(false);
  };

  const handleProductTriggerer = (dish: IDish) => {
    setIsHandlingProductClick(true);
    setProductTrigger(dish);
    setIsDishOpen(false);

    const initialTotal = Number((parseFloat(dish.price) * quantity).toFixed(2));
    setTotal(initialTotal);
  };

  // LISTENER PARA CLICK AFUERA
  useEffect(() => {
    document.addEventListener('mousedown', handleOutProduct);
    document.addEventListener('mousedown', handleOutCategory);
    return () => {
      document.removeEventListener('mousedown', handleOutProduct);
      document.removeEventListener('mousedown', handleOutCategory);
    };
  }, []);

  // FETCH
  useEffect(() => {

    const fetchThis = async () => {
      setLoadingCategories(true);
      setProductTrigger(null);

      try {
        const response = await fetchWithAuth(`${API_URL}/menu/list/${rest_id}?sub=true`, {
          method: "GET"
        });

        setCategories(response.categories);
      } catch (error) {
        console.log(error);
        AuthErrorHelper(error);

      }

      setLoadingCategories(false);
    };

    fetchThis();
  }, [rest_id]);


  useEffect(() => {

    const fetchThis = async () => {

      try {
        if (categoryTrigger?.id !== undefined && categoryTrigger?.id !== null) {
          setLoadingProducts(true);
          const response = await fetchWithAuth(`${API_URL}/menu-category/${categoryTrigger.id}`, {
            method: "GET"
          });

          setProducts(response.dishes);

        }
      } catch (error) {
        console.log(error);
        AuthErrorHelper(error);
      }

      setLoadingProducts(false);

    };

    fetchThis();

  }, [categoryTrigger?.id]);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Math.min(100, Math.max(1, Number(event.target.value))); // Restricción entre 1 y 100
    setQuantity(newQuantity);

    if (productTrigger) {
      const newTotal = Number((parseFloat(productTrigger.price) * newQuantity).toFixed(2));
      setTotal(newTotal);

      if (state) {
        setState([...state, { id: productTrigger.id, quantity: newQuantity, price: productTrigger.price }]);
      }
    }
  };

  // useEffect(() => {

  // }, [quantity, productTrigger]);

  return (
    <div className="relative flex items-center ml-4">

      {/* CATEGORÍAS */}
      <div ref={divRef} className="relative inline-block">
        {
          loadingCategories ?
            (<div className='text-black'>Cargando...</div>)
            :
            (<button onClick={toggleMenu} className="bg-slate-500 text-white px-4 py-2 rounded">
              {categoryTrigger ? categoryTrigger.name : "Categorias"}
            </button>)
        }

        {
          isCategoryOpen && categories.length !== 0 && (
            <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg max-h-48 overflow-y-auto z-10">
              <ul className="py-2">
                {
                  !loadingCategories ?
                    categories.map((category) => (
                      <li onClick={() => handleCategoryTriggerer(category)} key={category.id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black">
                        {category.name}
                      </li>
                    ))
                    :
                    (<div>Cargando...</div>)
                }
              </ul>
            </div>
          )
        }
      </div>

      {/* PRODUCTOS */}
      <div ref={otherDivRef} className="relative inline-block ml-4">
        {
          products.length === 0 ? (categoryTrigger ? <div className='text-black'>No hay productos</div> : null) :
            loadingProducts ?
              (<div className='text-black'>Cargando...</div>)
              :
              (<button onClick={toggleDish} className="bg-slate-500 text-white px-4 py-2 rounded">
                {productTrigger !== null ? `${productTrigger.name} | $${productTrigger.price}` : "Productos"}
              </button>)
        }

        {
          isDishOpen && categoryTrigger && (
            <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg max-h-48 overflow-y-auto z-10">
              <ul className="py-2">
                {
                  !loadingProducts ?
                    products.map((product) => (
                      product.stock ?
                        <li onClick={() => handleProductTriggerer(product)} key={product.id} className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-black">
                          {product.name + " | $" + product.price}
                        </li>
                        :
                        <li style={{ pointerEvents: "none" }} key={product.id} className="px-4 py-2 cursor-not-allowed hover:bg-gray-100 text-gray-400">
                          {product.name + " | $" + product.price}
                        </li>
                    ))
                    :
                    (<div>Cargando...</div>)
                }
              </ul>
            </div>
          )
        }
      </div>

      {/* DESCRIPCION */}
      {productTrigger !== null ?
        (
          <>
            <div className='text-black inline-block'>
              <input
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 ml-5"
                type="number"
                min={1}
                max={100}
                value={quantity}
              />
            </div>
            <div className='text-black inline-block ml-auto'>
              {`Valor: $${total}`}
            </div>
          </>
        )
        :
        null
      }
    </div>
  );
};

export default NewOrderForm;