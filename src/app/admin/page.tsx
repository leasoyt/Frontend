'use client';
import AdminSidebar from '@/components/AdminDash/SideBar/AdminSidebar';
import RestaurantList from '@/components/AdminDash/Dash/RestaurantList';
import UserList from '@/components/AdminDash/Dash/UserList';
import { useLocalStorage } from '@/scripts/auth/useLocalStorage';
import { IUser } from '@/interfaces/user.interface';
import { UserRole } from '@/enums/role.enum';
import { useEffect, useState } from 'react';
import Unauthorized from '@/components/General/Unauthorized/Unauthorized';

const AdminDashboard = () => {
  const [iuser, setUser] = useLocalStorage("userSession", "");
  const user: Partial<IUser> = iuser.user;
  const [isAllowed, setIsAllowed] = useState(true);
  const [section, setSection] = useState<'restaurants' | 'users'>('restaurants');

  useEffect(() => {
    if (user === null || user === undefined || !(user.role === UserRole.ADMIN)) {
      setIsAllowed(false);
    }
  }, [user, isAllowed]);

  if (isAllowed) return (<Unauthorized />);

  return (
    <>
      {
        isAllowed ?
          (
            <div className="flex flex-col md:flex-row h-screen bg-white">
              <AdminSidebar setSection={setSection} />
              <div className="flex-1 p-6 overflow-y-auto">
                {section === 'restaurants' && <RestaurantList />}
                {section === 'users' && <UserList />}
              </div>
            </div>
          ) :
          <Unauthorized />
      }
    </>
  );
};

export default AdminDashboard;
