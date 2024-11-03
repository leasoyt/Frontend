import { SetStateBoolean } from "@/interfaces/Interfaces.types";

const AddOrderToTable: React.FC<SetStateBoolean & { parentState: boolean }> = ({ setParentState, parentState }) => {

    const handleClkick = () => {
        if (setParentState) {
            setParentState(true);
        }
    }

    return (
        <>
            {parentState ? (<button onClick={handleClkick} className="bg-green-500 text-white p-2 rounded-md">Enviar</button>)
                :
                (<button onClick={handleClkick} className="bg-green-500 text-white p-2 rounded-md">Nueva Orden</button>)
            }

        </>
    );
};
export default AddOrderToTable