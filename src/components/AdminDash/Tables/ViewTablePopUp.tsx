import { API_URL } from "@/config/config";
import { HttpMessagesEnum } from "@/enums/httpMessages.enum";
import { ErrorHelper, verifyError } from "@/helpers/errorHelper";
import { ClickEvent, ViewTableProps } from "@/interfaces/Interfaces.types";
import { IOrder } from "@/interfaces/order.interface";
import React, { useEffect, useState } from "react";
import TableOrderView from "./TableOrderView";

const ViewTablePopUp: React.FC<ViewTableProps> = ({ showPopup, id }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [orderData, setOrderData] = useState<IOrder | null>(null);

    const exitPopup = (event: ClickEvent) => {
        if (event.target === event.currentTarget) {
            if (showPopup) {
                showPopup();
            }
        }
    };

    // const handleSubmit = (event: { preventDefault: () => void; }) => {
    //     event.preventDefault();
    //     showPopup();
    // }

    useEffect(() => {
        const fetchOrder = async () => {
            setLoading(true);
            setError(null);

            try {
                const response: Response = await fetch(`${API_URL}/order/${id}`, { method: "GET" });

                if (!response.ok) {
                    const error = await response.json();
                    throw new ErrorHelper(verifyError(error.message), error.statusCode);
                }

                const data = await response.json();
                console.log(data);

                setOrderData(data);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error) {

                if (error instanceof ErrorHelper) {
                    if (error.message === HttpMessagesEnum.NO_ORDERS_IN_TABLE) {
                        setError("No hay una orden aun");
                    } else {
                        setError(error.message);
                    }
                } else {
                    setError("Error desconocido");
                }

            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    return (
        <div onClick={exitPopup} className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full">

                {loading && (<div className="text-lg font-medium text-gray-900 mb-4">Cargando...</div>)}
                {(error) ? (<div className="text-lg font-medium text-gray-900 mb-4">{error}</div>) : null}
                {(!loading && !error && orderData !== null) ? (<TableOrderView order={orderData} exitPopup={exitPopup} />) : null}
                {/* 
                <h3 className="text-lg font-medium text-gray-900 mb-4">Agregar mesa</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Numero de mesa:</label>
                        <input
                            type="number"
                            name="table_id"
                            // value={data}
                            required
                            min="1"
                            max="1000"
                            // onChange={(e) => setData(e.target.value)}
                            className="w-full p-2 text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={handleClick}
                            className="text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg py-1.5 px-4 font-medium rounded-lg text-sm px-3 py-1.5 me-2 mb-2 ml-3"
                        >
                            Cerrar
                        </button>
                        <button
                            type="submit"
                            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-1.5 me-2 mb-2 ml-3 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                        >
                            Enviar
                        </button>
                    </div>
                </form> */}
            </div>
        </div>
    );
};

export default ViewTablePopUp;