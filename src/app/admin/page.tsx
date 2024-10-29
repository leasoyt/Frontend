'use client';

// pages/admin/index.tsx
import AdminSidebar from '@/components/AdminSidebar/AdminSidebar';
import { useState } from 'react';
import RestaurantList from '@/components/RestaurantList/RestaurantList';
import UserList from '@/components/UserList/UserList';

const AdminDashboard = () => {
  const [section, setSection] = useState<'restaurants' | 'users'>('restaurants');

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <AdminSidebar setSection={setSection} />
      <div className="flex-1 p-6 overflow-y-auto">
        {section === 'restaurants' && <RestaurantList />}
        {section === 'users' && <UserList />}
      </div>
    </div>
  );
};

export default AdminDashboard;
