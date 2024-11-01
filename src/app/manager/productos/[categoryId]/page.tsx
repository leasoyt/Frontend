import { getMenuById } from '@/helpers/menu-helper/get-menuByCategory';
import { MenuIdProps } from '@/interfaces/menu.interface'
import MenuView from '@/views/MenuView/MenuView';

import React from 'react'

const ProductsByCategory: React.FC<MenuIdProps> = async ({params}) => {
  const {categoryId} = params;
  const categoty = await getMenuById(categoryId) 
  console.log(categoty);
  
  return (
    <MenuView {...categoty}/>
  )
}

export default ProductsByCategory