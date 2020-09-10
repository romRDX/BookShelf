 /**
  * Receives:
  * @param {*} data - Array of objects of type IBook
  * @param {*} category - String with the Category to filter
  * @param {*} name - Optional name to filter
  * If there is no name to filer, only filters by category.
  */

import { IBook } from "store/ducks/books/types";


export default function filterBy(data: IBook[], category: string, name: string) {
  let filteredData = data;

  if(category && data){
    filteredData = data.filter((item) => item.category === category);
  }

  if(name && data){
    filteredData = filteredData.filter((item) => item.title.includes(name));
  }

  return filteredData;
};
