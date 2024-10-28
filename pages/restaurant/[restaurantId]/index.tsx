//import { API_URL } from '@/config/config';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IRestaurant } from '@/interfaces/restaurant.interface';
import NavbarUsuario from '../../../src/components/NavbarUsuario/NavbarUsuario';
import Footer from '@/components/Footer/Footer';
import { getRestaurantById } from "../../../src/helpers/restaurant-helpers/get-restaurant"//'@/helpers/restaurant.helper'; // Importar tu función helper

import '../../../src/app/globals.css'; // Asegúrate de que este archivo contenga Tailwind CSS
import { AppProps } from 'next/app';
import { IMenu, IMenu_Category } from '@/interfaces/menu.interface';
import { IDish } from '@/interfaces/dishes.interface';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

const RestaurantPage = () => {
  const router = useRouter();
  const { restaurantId } = router.query; // Acceder al parámetro dinámico desde la URL

  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);


  useEffect(() => {
    if (restaurantId && typeof restaurantId === 'string') { // Asegúrate de que sea un string
      getRestaurantById(restaurantId)
        .then((data) => {
          if (data) {
            setRestaurant(data);
          }
        })
        .catch((error) => console.error('Error fetching restaurant:', error));
    }
  }, [restaurantId]);

  if (!restaurant) return <p>Cargando...</p>;

  return (
    <>
    <NavbarUsuario/>
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-900 p-6 text-white">
        <h1 className="text-4xl font-bold">{restaurant.name}</h1>
        <p className="text-sm">{restaurant.address}</p>
        <div className="mt-4 flex items-center space-x-4">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="w-1/3 p-2 rounded text-black"
          />
          <button className="bg-white p-2 rounded text-black">Buscar</button>
        </div>
      </div>
        
      <div className="flex mt-8 mx-4">
        {/* Left Sidebar - Categories */}
        <div className="w-1/4 bg-white p-4 rounded shadow-lg">
  <h2 className="font-bold mb-4 text-black">Categorías</h2>
  <ul className="space-y-2 text-black">
    {restaurant.menu && restaurant.menu.categories ? (
      restaurant.menu.categories.length > 0 ? (
        restaurant.menu.categories.map((category: IMenu_Category) => (
          <li key={category.id} className="text-black">
            {category.name}
          </li>
        ))
      ) : (
        <li className="text-black">No hay categorías disponibles</li>
      )
    ) : (
      <li className="text-black">No hay menú disponible</li>
    )}
  </ul>
</div>

{/* Main Content */}
<div className="w-2/4 mx-4"> 
  <h2 className="text-xl font-bold mb-4 text-black">Productos disponibles</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {restaurant.menu && restaurant.menu.categories ? (
      restaurant.menu.categories.flatMap((category: IMenu_Category) =>
        category.dishes?.map((dish: IDish) => ( // Cambié 'products' por 'dishes'
          <div key={dish.id} className="bg-white p-4 rounded shadow-md flex justify-between">
            <div className='text-black'>
              <h3 className="font-bold text-lg">{dish.name}</h3>
              <p className="text-gray-500 line-through">${dish.price}</p> {/* Asegúrate de que price sea un número */}
            </div>
            {dish.imgUrl && (
              <img
                src={dish.imgUrl} // Asegúrate de que esto apunta a la URL correcta
                alt={dish.name}
                className="w-16 h-16 object-cover"
              />
            )}
          </div>
        ))
      )
    ) : (
      <p className="text-black">No hay productos disponibles.</p>
    )}
  </div>

  

          <h2 className="text-xl font-bold mt-8 mb-4 text-black">Almuerzos hasta $5999</h2>
          <div className="grid grid-cols-1 gap-4">
            {/* Producto */}
            <div className="bg-white p-4 rounded shadow-md flex justify-between">
              <div className='text-black'>
                <h3 className="font-bold text-lg">Ruster + papas 30% OFF</h3>
                <p className="text-gray-500 line-through">$7,200</p>
                <p className="text-red-500 font-bold">$5,000</p>
              </div>
            </div>
            {/* Repite para más productos */}
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};



export default RestaurantPage;
