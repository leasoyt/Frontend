//import { API_URL } from '@/config/config';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IRestaurant } from '@/interfaces/restaurant.interface';
import NavbarUsuario from '../../../src/components/NavbarUsuario/NavbarUsuario';
import Footer from '@/components/General/Footer/Footer';
import { getRestaurantById } from "../../../src/helpers/restaurant-helpers/get-restaurant"//'@/helpers/restaurant.helper'; // Importar tu función helper
import '../../../src/app/globals.css'; // Asegúrate de que este archivo contenga Tailwind CSS
import { IMenu_Category } from '@/interfaces/menu.interface';
import { IDish } from '@/interfaces/dishes.interface';
import { createReservation } from '@/helpers/reservation/reservation';
import Swal from 'sweetalert2';
import { useLocalStorage } from '@/helpers/auth-helpers/useLocalStorage';
import { IUser } from '@/interfaces/user.interface';
import isDateAfterTomorrow from '@/utils/afterTomorrow';
import { swalNotifyCustomError } from '@/helpers/swal/swal-custom-error';
import { UserProvider } from '@auth0/nextjs-auth0/client';


const RestaurantPage = () => {
  const router = useRouter();
  const { restaurantId } = router.query; // Acceder al parámetro dinámico desde la URL
  const [iuser, setIUser] = useLocalStorage("userSession", "");
  const user: Partial<IUser> = iuser.user;

  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const [reservationDate, setReservationDate] = useState<string>('');

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

  const handleCreateReservation = async () => {
    const userSession = localStorage.getItem("userSession");
    const token = userSession ? JSON.parse(userSession).token : null;
    // const userId = localStorage.getItem('userId')

    // Validaciones para asegurarte de que el token y la fecha están presentes
    if (!token || !reservationDate) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debe estar loggeado y la fecha debe ser seleccionada.",
      });
      return; // Sal de la función si hay errores
    }

    if(!isDateAfterTomorrow(reservationDate)) {

      swalNotifyCustomError("Fecha invalida!", "No puede ser pasada o demasiado cercana");
      return;
    }

    const reservationData = {
      user_id: user.id, // Asegúrate de enviar el ID correcto
      restaurant_id: Array.isArray(restaurantId) ? restaurantId[0] : restaurantId, // Asegúrate de que sea un string
      date: reservationDate,
      seats: 3, // Asegúrate de obtener esto de un input o estado si es dinámico
    };

    // console.log('Datos de reserva a enviar:', reservationData); // Para depuración

    try {
      const response = await createReservation(reservationData);
      // console.log('Reserva creada:', response);
    } catch (error) {
      console.error('Error al crear reserva:', error);
    }
  };

  if (!restaurant) return <p>Cargando...</p>;

  return (
    <>
    <UserProvider>

      <NavbarUsuario />
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-700 to-gray-900 p-6 text-white">
          <h1 className="text-4xl font-extrabold">{restaurant.name}</h1>
          <p className="text-sm font-extrabold">{restaurant.address}</p>
          <div className="mt-4 flex items-center space-x-4">
            <input
              type="date"
              className="w-1/3 p-2 rounded text-black"
              onChange={(e) => setReservationDate(e.target.value)} // Actualiza el estado de la fecha de reserva
            />
            <button
              className="bg-blue-500 p-2 rounded text-white"
              onClick={handleCreateReservation} // Llama a la función para crear la reserva
            >
              Crear Reserva
            </button>
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
            <div className="grid grid-cols-1 gap-4">
              {restaurant.menu && restaurant.menu.categories ? (
                restaurant.menu.categories.flatMap((category: IMenu_Category) =>
                  category.dishes?.map((dish: IDish) => ( // Cambié 'products' por 'dishes'
                    <div key={dish.id} className="bg-white p-4 rounded shadow-md flex justify-between">
                      <div className='text-black'>
                        <h3 className="font-bold text-lg">{dish.name}</h3>
                        <p className="text-gray-500 ">${dish.price}</p> {/* Asegúrate de que price sea un número */}
                      </div>
                    </div>
                  ))
                )
              ) : (
                <p className="text-black">No hay productos disponibles.</p>
              )}
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </UserProvider>
    </>
  );
};

export default RestaurantPage;
