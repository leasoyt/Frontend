import { ClickEvent, OnSubmitProduct, ShowPopUpProp } from "@/interfaces/Interfaces.types";
import React, { useEffect, useState } from "react";
import { IDish, SoftDish } from "@/interfaces/dishes.interface";

const AddProductPopUp: React.FC<
    OnSubmitProduct &
    { originalData?: SoftDish, showPopup: (visible: boolean) => void }
> = ({ showPopup, onSubmit, originalData }) => {

    const initialState: Partial<IDish> = { name: "", description: "", price: "" }
    const [productData, setProductData] = useState<Partial<SoftDish>>(initialState);
    const [errorMessage, setErrorMessage] = useState<Partial<SoftDish>>(initialState);

    const exitPopup = (event: ClickEvent) => {
        if (event.target === event.currentTarget) {
            if (showPopup) {
                showPopup(false);
            }
        }
    };

    useEffect(() => {
        if(originalData?.description !== undefined && originalData?.name !== undefined && originalData?.price !== undefined) {
            setProductData(originalData);
        }
    }, [originalData]);

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        if (errorMessage.name === "" && errorMessage.price === "" && errorMessage.description === "") {
            if (productData.name !== "" && productData.price !== "" && productData.description !== "") {
                onSubmit(productData as SoftDish);
                showPopup(false);
            }
        }
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (productData?.price !== undefined && name === "price") {
            if ((productData?.price.match(/\./g) || []).length > 1) {
                setErrorMessage({ ...errorMessage, price: "El precio debe poseer solo un punto" });
                return;
            }

            if (!/^\d*\.?\d{0,2}$/.test(value)) {
                setErrorMessage({ ...errorMessage, price: "El precio debe ser numerico, Maximo dos decimales" });
                return;
            }
        }

        setProductData({
            ...productData,
            [name]: value,
        });
    };

    return (
        <div onClick={exitPopup} className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full z-50">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Nuevo producto</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Nombre del producto:</label>
                        <input
                            type="text"
                            name="name"
                            value={productData?.name}
                            required
                            onChange={handleChange}
                            className="w-full p-2 text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        {errorMessage?.name && <p className="text-sm text-red-600" style={{ fontSize: "12px" }}>{errorMessage.name}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Descripcion:</label>
                        <input
                            type="text"
                            name="description"
                            value={productData?.description}
                            required
                            onChange={handleChange}
                            className="w-full p-2 text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        {errorMessage?.description && <p className="text-sm text-red-600" style={{ fontSize: "12px" }}>{errorMessage.description}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Precio:</label>
                        <input
                            type="text"
                            name="price"
                            value={productData?.price}
                            required
                            placeholder="123.45"
                            onChange={handleChange}
                            className="w-full p-2 text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        {errorMessage?.price && <p className="text-sm text-red-600" style={{ fontSize: "12px" }}>{errorMessage.price}</p>}
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={exitPopup}
                            className="text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg py-1.5 px-4 font-medium rounded-lg text-sm px-3 py-1.5 me-2 mb-2 ml-3"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-1.5 me-2 mb-2 ml-3 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                        >
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductPopUp;