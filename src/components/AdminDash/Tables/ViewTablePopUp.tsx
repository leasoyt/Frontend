import { API_URL } from "@/config/config";
import { HttpMessagesEnum } from "@/enums/httpMessages.enum";
import { ErrorHelper, verifyError } from "@/helpers/error-helper";
import { ClickEvent, ViewTableProps } from "@/interfaces/Interfaces.types";
import { IOrder } from "@/interfaces/order.interface";
import React, { useEffect, useState } from "react";
import TableOrderView from "./TableOrderView";
import AddOrderToTable from "./AddOrderToTable";
import { swalNotifyUnknownError } from "@/helpers/swal-notify-unknown-error";

const ViewTablePopUp: React.FC<ViewTableProps & { table_number: number }> = ({ showPopup, id, table_number }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [orderData, setOrderData] = useState<IOrder | null>(null);
    const [showForm, setShowForm] = useState<boolean>(false);

    const exitPopup = (event: ClickEvent) => {
        if (event.target === event.currentTarget) {
            if (showPopup) {
                showPopup();
            }
        }
    };

    const cancelClick = () => {
        if (setShowForm) {
            setShowForm(false);
        }
    }

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

            } catch (error) {

                if (error instanceof ErrorHelper) {
                    if (error.message === HttpMessagesEnum.NO_ORDERS_IN_TABLE) {
                        setError("No hay una orden aun");
                    } else {
                        swalNotifyUnknownError(error);
                    }
                } else {
                    console.log("Error desconocido " + error);
                    // setError("Error desconocido");
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
                {/* ANTES DE LA ORDEN */}
                {loading && (<div className="text-lg font-medium text-gray-900 mb-4">Cargando...</div>)}
                {!loading && (<div className="text-3xl font-semibold text-center mt-4 text-black italic">Mesa #{table_number}</div>)}
                {(error && !showForm) ? (<div className="text-lg font-medium text-gray-900 mb-4">{error}</div>) : null}
                {(!loading && !error && orderData !== null && !showForm) ? (<TableOrderView order={orderData} exitPopup={exitPopup} />) : null}

                {/* NUEVA ORDEN */}

                {showForm ? (<div className="text-lg font-medium text-gray-900 mb-4">Order Form here</div>) : null}

                <div className="mt-6 flex space-x-4">
                    {!showForm ? (<button onClick={exitPopup} className="bg-gray-500 text-white p-2 rounded-md">Volver</button>)
                        :
                        (<button onClick={cancelClick} className="bg-gray-500 text-white p-2 rounded-md">Cancelar</button>)
                    }

                    {(error === "No hay una orden aun") ? <AddOrderToTable setParentState={setShowForm} parentState={showForm} /> : null}
                </div>
            </div>
        </div>
    );
};

export default ViewTablePopUp;