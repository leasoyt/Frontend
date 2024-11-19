'use client';

import AdminSidebar from '@/components/AdminSidebar/AdminSidebar';
import RestaurantList from '@/components/RestaurantList/RestaurantList';
import UserList from '@/components/UserList/UserList';
import Unauthorized from '../unauthorized';
import { useLocalStorage } from '@/helpers/auth-helpers/useLocalStorage';
import { swalNotifyError } from '@/helpers/swal/swal-notify-error';
import { HttpMessagesEnum } from '@/enums/httpMessages.enum';
import { ErrorHelper } from '@/helpers/errors/error-helper';
import { IUser } from '@/interfaces/user.interface';
import { UserRole } from '@/enums/role.enum';
import { useEffect, useState } from 'react';
import { Pages } from '@/enums/pages.enum';

const AdminDashboard = () => {
  const [iuser, setUser] = useLocalStorage("userSession", "");
  const user: Partial<IUser> = iuser.user;
  const [isAllowed, setIsAllowed] = useState(true);
  const [section, setSection] = useState<'restaurants' | 'users'>('restaurants');

  useEffect(() => {
    if (user === null || user === undefined || !(user.role === UserRole.ADMIN)) {
      setIsAllowed(false);
      // swalNotifyError(new ErrorHelper(HttpMessagesEnum.INSUFFICIENT_PERMISSIONS, "")).then((result) => {
      //   if (result.isConfirmed) {
      //     window.location.href = Pages.SEARCH;
      //   }
      // });
      if(!isAllowed) {
        window.location.href = Pages.SEARCH;
      }
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
          null
      }
    </>
  );
};

export default AdminDashboard;
