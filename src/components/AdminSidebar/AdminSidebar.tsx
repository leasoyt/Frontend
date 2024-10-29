// pages/admin/components/AdminSidebar.tsx
interface AdminSidebarProps {
    setSection: (section: 'restaurants' | 'users') => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ setSection }) => {
    return (
        <aside className="w-64 bg-gray-800 text-white p-4 md:w-1/4">
            <h2 className="text-xl font-bold mb-6 text-center">Panel de Control</h2>
            <nav className="flex flex-col gap-4">
                <button
                    onClick={() => setSection('restaurants')}
                    className="hover:bg-gray-700 p-2 rounded"
                >
                    Restaurantes
                </button>
                <button
                    onClick={() => setSection('users')}
                    className="hover:bg-gray-700 p-2 rounded"
                >
                    Usuarios
                </button>
            </nav>
        </aside>
    );
};

export default AdminSidebar;
