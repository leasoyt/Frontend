import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IReservation } from "@/interfaces/reservation.interface";
import { getDividedDate } from "@/utils/getDividedDate";
import { API_URL } from "@/config/config";
import { AuthErrorHelper } from "@/helpers/errors/auth-error-helper";
import { fetchWithAuth } from "@/scripts/token-expire.interceptor";

const ReserveColumn: React.FC<IReservation & {toDelete: (id: string) => void}> = ({
  id,
  date,
  status,
  user,
  table,
  seats,
  toDelete
}) => {
  const [date_only, time_only] = getDividedDate(new Date(date));
  const [name, setName] = useState("");

  useEffect(() => {

    const fetchThis = async () => {
      try {
        const response = await fetchWithAuth(`${API_URL}/user/${user}`, { method: "GET" });

        setName(response.name);
      } catch (error) {
        AuthErrorHelper(error);
      }
    };

    fetchThis();
  }, [user]);

  const handleDelete = () => {
    toDelete(id);
  };

  return [
    <td
      key="user"
      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap  "
    >
      {name}
    </td>,
    <td key="date" className="px-6 py-4 ">
      {date_only.toString()}
    </td>,
    <td key="time" className="px-6 py-4">
      {time_only.toString()}
    </td>,
    <td key="status" className="px-6 py-4">
      {status}
    </td>,
    // <td key="table" className="px-6 py-4">
    //   {table === undefined ? (
    //     <button className="bg-slate-500 text-white font-light p-1 rounded-md">
    //       Asignar
    //     </button>
    //   ) : (
    //     table
    //   )}
    // </td>,
    <td key="seats" className="px-6 py-4 ">
      {seats}
    </td>,
    <td key="cancel" className="px-6 py-4">
      <button onClick={handleDelete} className="bg-slate-500 text-white font-light p-1 rounded-md">
        Cancelar reserva
      </button>
    </td>,
  ];
};

export default ReserveColumn;
