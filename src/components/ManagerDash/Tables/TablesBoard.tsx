/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { ITable } from "@/interfaces/table.interface";
import { useEffect, useState } from "react";
import TableObject from "./TableObject";
import { API_URL } from "@/config/config";
import { HttpMessagesEnum } from "@/enums/httpMessages.enum";
import ViewTablePopUp from "./ViewTablePopUp";
import { AuthErrorHelper } from "@/helpers/errors/auth-error-helper";
import { ErrorHelper } from "@/helpers/errors/error-helper";
import { fetchWithAuth } from "@/scripts/token-expire.interceptor";

const TablesBoard: React.FC<{
    updateBoard: boolean,
    setParentState: React.Dispatch<React.SetStateAction<boolean>>,
    id: string
}> = ({ updateBoard, setParentState, id }) => {

    const [tables, setTables] = useState<ITable[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [showPopup, setShowPopup] = useState<boolean>(false);
    const togglePopup = () => setShowPopup(!showPopup);

    const [triggererId, setTriggererId] = useState("");
    const [triggererNumber, setTriggererNumber] = useState<number>(0);
    const [update, setUpdate] = useState<boolean | null>(false);


    useEffect(() => {
        const fetchTables = async () => {
            setLoading(true);
            setError(null);

            try {
                setParentState(false);
                const response = await fetchWithAuth(`${API_URL}/table/all/${id}`, {});

                setTables(response);

            } catch (error) {

                if(error instanceof ErrorHelper && error.message === HttpMessagesEnum.NO_TABLES_IN_RESTAURANT) {

                } else {
                    AuthErrorHelper(error);
                }

            }

            setLoading(false);
            setUpdate(null);
        };

        fetchTables();
    }, [updateBoard, update]);


    if (loading) return <div className="text-lg font-medium text-gray-900 mb-4">Cargando...</div>;
    if (error) return <div className="text-lg font-medium text-gray-900 mb-4">{error}</div>;

    return (
        <>
            {tables.map((table) => (
                <TableObject {...table} key={table.id} showPopup={togglePopup} setParentState={setTriggererId} setNumberParentState={setTriggererNumber} />
            ))}
            {showPopup && <ViewTablePopUp showPopup={togglePopup} id={triggererId} table_number={triggererNumber} rest_id={id} updateParent={setUpdate} />}
        </>
    );
};

export default TablesBoard;