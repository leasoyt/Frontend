import Image from "next/image";
import { API_URL } from "@/config/config";
import { HttpMessagesEnum } from "@/enums/httpMessages.enum";
import { ErrorHelper, verifyError } from "@/helpers/errors/error-helper";
import { ClickEvent, ViewTableProps } from "@/interfaces/Interfaces.types";
import { IOrder, IOrderB, OrderedDish } from "@/interfaces/order.interface";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import TableOrderView from "./TableOrderView";
import { swalNotifyUnknownError } from "@/scripts/swal/swal-notify-unknown-error";
import NewOrderForm from "./NewOrderForm";
import { swalNotifySuccess } from "@/scripts/swal/swal-notify-success";
import { swalNotifyConfirmation } from "@/scripts/swal/swal-notify-confirm";
import { swalNotifyCustomError } from "@/scripts/swal/swal-custom-error";
import { fetchWithAuth } from "@/scripts/token-expire.interceptor";
import { AuthErrorHelper } from "@/helpers/errors/auth-error-helper";

const ViewTablePopUp: React.FC<ViewTableProps & {
    table_number: number,
    rest_id: string,
    updateParent: Dispatch<SetStateAction<boolean | null>>
}>
    = ({ showPopup, id, table_number, rest_id, updateParent }) => {

        const [loading, setLoading] = useState<boolean>(true);
        const [error, setError] = useState<string | null>(null);
        const [orderData, setOrderData] = useState<IOrder | null>(null);
        const [showForm, setShowForm] = useState<boolean>(false);
        const [addForm, setAddForm] = useState([1]);
        const [total, setTotal] = useState<number>(0);
        const [order, setOrder] = useState<OrderedDish[]>([]);
        const [finalOrder, setFinalOrder] = useState<OrderedDish[]>([]);
        const [update, setUpdate] = useState(false);


        const exitPopup = (event: ClickEvent) => {
            if (event.target === event.currentTarget) {
                if (showPopup) {
                    showPopup();
                }
            }
        };

        const togglePopup = (state: boolean) => {
            if (showPopup) {
                showPopup();
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
        }, [id, update]);


        const addItem = () => {
            setAddForm([...addForm, 1]);
        };


        const removeItem = () => {
            const new_form = addForm.slice(0, -1);
            setAddForm(new_form);

            if (new_form.length === 0) {
                setOrder([]);
                setFinalOrder([]);
                setTotal(0);
            }

            const clean_dishes = reducedDishes;
            const new_order = clean_dishes.slice(0, -1);
            setOrder(new_order);
        }

        const handleClick = () => {
            setShowForm(true);
        };

        const reducedDishes = order.reduce<OrderedDish[]>((acc: any[], current: OrderedDish) => {
            const existingDish = acc.find((dish: OrderedDish) => dish.id === current.id);

            if (existingDish) {
                existingDish.quantity = current.quantity;
            } else {
                acc.push({ ...current });
            }

            return acc;
        }, []);


        useEffect(() => {

            if (order && order.length > 0) {
                const clean_dishes = reducedDishes;

                if (clean_dishes) {
                    let count: number = 0;

                    clean_dishes.forEach((dish) => {
                        count = count + Number((parseFloat(dish.price) * dish.quantity).toFixed(2));
                    });

                    setTotal(count);
                    setFinalOrder(clean_dishes);

                }
            }
        }, [order]);


        const handleSubmit = () => {
            const fetchThis = async () => {

                if (finalOrder.length > 0) {
                    try {

                        await fetchWithAuth(`${API_URL}/order`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ table: id, ordered_dishes: finalOrder, }),
                        });

                        swalNotifySuccess("Nueva orden creada!", `Mesa: ${table_number}`);
                        cancelClick();

                    } catch (error) {
                        AuthErrorHelper(error);
                    }

                } else {
                    swalNotifyCustomError("Se deben agregar platos", "");
                }
            };

            fetchThis();
        };

        const handleDeleteTable = () => {

            swalNotifyConfirmation("¿Estas Seguro?", "Eliminar mesa").then(async (result) => {

                if (result.isConfirmed) {

                    try {
                        await fetchWithAuth(`${API_URL}/table/remove/${id}`, {
                            method: "DELETE"
                        });

                        swalNotifySuccess("Mesa eliminada!", `Mesa #${table_number}`);

                        togglePopup(false);
                        updateParent(true);
                    } catch (error) {
                        AuthErrorHelper(error);
                    }
                }
            });

        };

        return (
            <div onClick={exitPopup} className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
                    {/* ANTES DE LA ORDEN */}
                    {loading && (<div className="text-lg font-medium text-gray-900 mb-4">Cargando...</div>)}
                    {
                        !loading &&
                        (
                            <div className="text-3xl font-semibold text-center mt-4 text-black italic grid">Mesa #{table_number}
                                <div className="justify-self-end absolute">
                                    <Image
                                        src="https://svgsilh.com/svg/1691287-000000.svg"
                                        onClick={handleDeleteTable}
                                        alt="Eliminar Mesa"
                                        width={35}
                                        height={35}
                                        className="cursor-pointer ml-3"
                                    />
                                </div>
                            </div>
                        )
                    }
                    {(error && !showForm) ? (<div className="text-lg font-medium text-gray-900 mb-4">{error}</div>) : null}
                    {(!loading && !error && orderData !== null && !showForm) ? (<TableOrderView order={orderData} exitPopup={exitPopup} togglePopup={togglePopup} />) : null}

                    {
                        (error === "No hay una orden aun") && showForm ?
                            (<h2 className='text-black text-xl mt-6'>Nueva orden</h2>)
                            :
                            null
                    }

                    {/* NUEVA ORDEN */}
                    <div className="flex flex-col space-y-4">
                        {
                            showForm ?
                                addForm.map((item, index) => (
                                    <NewOrderForm key={index} rest_id={rest_id} state={order} setState={setOrder} />
                                ))
                                :
                                null
                        }
                    </div>

                    <div className="mt-6 flex items-center ml-1 justify-between">
                        {
                            !showForm ?
                                (<button onClick={exitPopup} className="bg-gray-500 text-white p-2 rounded-md">Volver</button>)
                                :
                                null
                        }

                        {/* {(error === "No hay una orden aun") ? <AddOrderToTable setParentState={setShowForm} parentState={showForm} /> : null} */}
                        {
                            (error === "No hay una orden aun") && showForm ?
                                (
                                    <>
                                        <div>
                                            <button onClick={cancelClick} className="bg-gray-500 text-white p-2 rounded-md mx-4">Cancelar</button>
                                            <button onClick={handleSubmit} className="bg-slate-700 text-white p-2 rounded-md hover:bg-gray-900">Enviar</button>
                                        </div>
                                        <div>
                                            <button onClick={addItem} className="bg-blue-500 text-xl text-white font-bold ml-7 p-2 px-3.5 rounded-md mx-4">+</button>
                                            <button onClick={removeItem} className="bg-red-500 text-xl text-white font-bold p-2 px-4 rounded-md">-</button>
                                        </div>
                                        <div className="text-black inline-block text-xl">Total: ${total}</div>
                                    </>
                                )
                                :
                                (<button onClick={handleClick} className="bg-slate-700 text-white p-2 rounded-md hover:bg-gray-900">Nueva Orden</button>)
                        }
                    </div>
                </div>
            </div>
        );
    };

export default ViewTablePopUp;