// pages/admin/components/AdminSidebar.tsx
import Image from "next/image";
import Link from "next/link";

interface AdminSidebarProps {
    setSection: (section: 'restaurants' | 'users') => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ setSection }) => {
    return (
        <aside className="w-64 bg-gray-500 text-white p-4">
        <div className="flex flex-col items-center mb-6">
          <Link href="/" className="flex flex-col items-center">
            <Image
              src="/Rest0logo.png"
              alt="Logo"
              width={40}  // Puedes ajustar el tamaño si deseas que sea más visible
              height={40}
            />
            <p className="font-extrabold text-[24px] text-black mt-2">Rest0</p>
          </Link>
        </div>
        <h2 className="text-xl font-bold mb-6 text-center">Panel de Control</h2>
        <nav className="flex flex-col gap-4">
          <button
            onClick={() => setSection('restaurants')}
            className="hover:bg-gray-400 p-2 rounded"
          >
            Restaurantes
          </button>
          <button
            onClick={() => setSection('users')}
            className="hover:bg-gray-400 p-2 rounded"
          >
            Usuarios
          </button>
        </nav>
      </aside>
      
    );
};

export default AdminSidebar;
