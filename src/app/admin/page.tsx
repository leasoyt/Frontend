'use client';
import AdminSidebar from '@/components/AdminDash/SideBar/AdminSidebar';
import RestaurantList from '@/components/AdminDash/Dash/RestaurantList';
import UserList from '@/components/AdminDash/Dash/UserList';
import { useLocalStorage } from '@/scripts/auth/useLocalStorage';
import { IUser } from '@/interfaces/user.interface';
import { UserRole } from '@/enums/role.enum';
import { useEffect, useState } from 'react';
import Unauthorized from '@/components/General/Unauthorized/Unauthorized';
import DropDownButton from '@/components/NavbarUsuario/DropDownButton';

const AdminDashboard = () => {
  const [iuser, setUser] = useLocalStorage("userSession", "");
  const user: Partial<IUser> = iuser.user;
  const [isAllowed, setIsAllowed] = useState(true);
  const [section, setSection] = useState<'restaurants' | 'users'>('restaurants');

  useEffect(() => {
    if (user === null || user === undefined || user.role !== UserRole.ADMIN) {
      setIsAllowed(false);
    }
  }, [user]);

  if (!isAllowed) return (<Unauthorized />);

  //TODO CAMBIAR LAS SECCIONES DE ABAJO POR PAGINAS
  return (
    <>
      {
        isAllowed ?
          (
            <div className="flex flex-col md:flex-row h-screen bg-white">
              <AdminSidebar setSection={setSection} />
              <div className="flex-1 px-6 pb-6 overflow-y-auto">
                <nav className="bg-white p-4">
                  <div className="container mx-auto flex justify-end items-center mt-6 max-w-5xl">
                    <div className="mr-32">
                      {/* Profile Dropdown */}
                      <DropDownButton showLoginIfNoUser={true} />
                    </div>
                  </div>

                  <hr className="w-4/5 mx-auto mt-4 border-2" />
                </nav>
                {section === 'restaurants' && <RestaurantList />}
                {section === 'users' && <UserList />}
              </div>
            </div>
          )
          :
          <Unauthorized />
      }
    </>
  );
};

export default AdminDashboard;
