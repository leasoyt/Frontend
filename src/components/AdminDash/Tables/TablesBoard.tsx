"use client";
import { ITable } from "@/interfaces/table.interface";
import { useEffect, useState } from "react";
import TableObject from "./TableObject";
import { API_URL } from "@/config/config";
import { HttpMessagesEnum } from "@/enums/httpMessages.enum";
import Link from "next/link";

const TablesBoard: React.FC = () => {
    const [tables, setTables] = useState<ITable[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReservations = async () => {
            setLoading(true);
            setError(null);

            try {
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

        fetchReservations();
    }, []);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            {tables.map((table) => (
                <Link href={`/table/${table.id}`} key={table.id}>
                    <TableObject {...table} />
                </Link>
            ))}
        </>
    );
};

export default TablesBoard;