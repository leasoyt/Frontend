export interface IMenu{
  id:string,
  name:string 
  restaurantID:string,
  categories?: IMenu_Category[]
}


export interface IMenu_Category{
id:string,
menuId:string,
name:string
}