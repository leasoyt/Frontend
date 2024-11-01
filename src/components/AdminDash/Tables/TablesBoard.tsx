/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { ITable } from "@/interfaces/table.interface";
import { useEffect, useState } from "react";
import TableObject from "./TableObject";
import { API_URL } from "@/config/config";
import { HttpMessagesEnum } from "@/enums/httpMessages.enum";
import ViewTablePopUp from "./ViewTablePopUp";

const TablesBoard: React.FC<{ 
    updateBoard: boolean, 
    setParentState: React.Dispatch<React.SetStateAction<boolean>>, 
    id: string }> = ({ updateBoard, setParentState, id }) => {

    const [tables, setTables] = useState<ITable[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [showPopup, setShowPopup] = useState<boolean>(false);
    const togglePopup = () => setShowPopup(!showPopup);

    const [triggererId, setTriggererId] = useState("");
    const [triggererNumber, setTriggererNumber] = useState<number>(0);


    useEffect(() => {
        const fetchTables = async () => {
            setLoading(true);
            setError(null);

            try {
                setParentState(false);
                const response: Response = await fetch(`${API_URL}/table/all/${id}`);

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error);
                }

                const data = await response.json();

                setTables(data || []);
            } catch (error) {

                if (error instanceof Error) {
                    if (error.message === HttpMessagesEnum.NO_TABLES_IN_RESTAURANT) {
                        setError("No hay mesas aun");

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

        fetchTables();
    }, [updateBoard]);


    if (loading) return <div className="text-lg font-medium text-gray-900 mb-4">Cargando...</div>;
    if (error) return <div className="text-lg font-medium text-gray-900 mb-4">{error}</div>;

    return (
        <>
            {tables.map((table) => (
                <TableObject {...table} key={table.id} showPopup={togglePopup} setParentState={setTriggererId} setNumberParentState={setTriggererNumber} />
            ))}
            {showPopup && <ViewTablePopUp showPopup={togglePopup} id={triggererId} table_number={triggererNumber} />}
        </>
    );
};

export default TablesBoard;