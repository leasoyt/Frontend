import { ClickEvent } from "@/interfaces/Interfaces.types";
import { IOrder } from "@/interfaces/order.interface";

const TableOrderView: React.FC<{order: IOrder, exitPopup: (event: ClickEvent) => void}> = ({order, exitPopup}) => {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center p-10">
            <h2 className="text-3xl font-semibold text-center mt-4 text-black italic">
                Mesa #{order.table_id}
            </h2>

            <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center justify-center mt-6 w-full">

                <p className="mt-2 text-gray-600 font-serif text-center">
                    Fecha: {new Date(order.date).toLocaleString()}
                </p>
                <p className="mt-2 text-gray-600 font-serif text-center">
                    Estado: <span className="font-bold">{order.status}</span>
                </p>

                {/* Sección del Precio */}
                <div className="bg-gray-200 p-4 rounded-lg mt-4 w-full text-center">
                    <p className="text-xl font-bold text-gray-800 font-serif">
                        Total: ${parseFloat(order.orderDetail.price).toFixed(2)}
                    </p>
                </div>

                {/* Productos */}
                <div className="mt-6 text-left w-full">
                    <h4 className="text-lg font-semibold text-gray-800">Productos:</h4>
                    <ul className="list-disc list-inside text-gray-600 mt-2">
                        {order.orderDetail.products.map((product) => (
                            <li key={product.id} className="mt-2">
                                <span className="font-bold">{product.name}</span>: {product.description} - ${parseFloat(product.price).toFixed(2)}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-6 flex space-x-4">
                    <button onClick={exitPopup} className="bg-gray-500 text-white p-2 rounded-md">Volver</button>
                    <button className="bg-blue-500 text-white p-2 rounded-md">Cancelar Orden</button>
                    <button className="bg-green-500 text-white p-2 rounded-md">Revisar Orden</button>
                </div>
            </div>
        </div>
    );
};

export default TableOrderView;