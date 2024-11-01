"use client";
import { useState } from "react";
import AddTablePopUp from "./AddTablePopUp";
import { API_URL } from "@/config/config";
import { HttpMessagesEnum } from "@/enums/httpMessages.enum";
import { SetStateProps } from "@/interfaces/Interfaces.types";

const AddTableButton: React.FC<SetStateProps & { id: string }> = ({ setParentState, id }) => {
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const togglePopup = () => setShowPopup(!showPopup);

    const handleOnSubmit = async (formData: string) => {
        const table_number = parseInt(formData);

        try {
            console.log("AAAAAAAAAA")
            console.log(id);
            const response: Response = await fetch(`${API_URL}/table/create/${id}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    table_number,
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error);
            }

            setParentState(true);

        } catch (error) {
            if (error instanceof Error && error.message === HttpMessagesEnum.TABLE_CREATION_FAIL) {
                console.log("No table created here");
            }
        }
    };

    return (
        <>
            <button onClick={togglePopup} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-1.5 me-2 mb-2 ml-3 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Agregar Mesa</button>
            {showPopup && <AddTablePopUp showPopup={togglePopup} onSubmit={handleOnSubmit} />}
        </>
    );

}

export default AddTableButton;