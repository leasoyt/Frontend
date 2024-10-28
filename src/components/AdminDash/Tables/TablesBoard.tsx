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
    setParentState: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ updateBoard, setParentState }) => {

    const [tables, setTables] = useState<ITable[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [showPopup, setShowPopup] = useState<boolean>(false);
    const togglePopup = () => setShowPopup(!showPopup);

    const [uuid, setUuid] = useState("");


    useEffect(() => {
        const fetchTables = async () => {
            setLoading(true);
            setError(null);

            try {
                setParentState(false);
                const response: Response = await fetch(`${API_URL}/table/all/aefa8479-7091-4f72-8fef-e0f59e8457f5`);

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


    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            {tables.map((table) => (
                <TableObject {...table} key={table.id} showPopup={togglePopup} setParentState={setUuid} />
            ))}
            {showPopup && <ViewTablePopUp showPopup={togglePopup} id={uuid} />}
        </>
    );
};

export default TablesBoard;