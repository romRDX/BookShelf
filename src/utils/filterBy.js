export default function filterBy(data, category, name){
  let filteredData = data;

  if(category){
    filteredData = data.filter((data) => data.category === category);
  }

  if(name){
    filteredData = filteredData.filter((data) => data.title.includes(name));
  }

  return filteredData;
};
