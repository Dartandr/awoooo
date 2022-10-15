import { ICheckbox } from "@/types";

const updateCheckbox = (array: Array<ICheckbox>, value: string, filter: 'genres' | 'status' | 'types' | 'rating'): Array<ICheckbox> => {
  const newData = [...array]
  if(!newData.some((element) => element.name === value)){
    newData.push({name: value, status: true, filter})
    return newData
  }else{
    const current = newData.find((element)=> element.name === value);
    const filteredData = newData.filter((element)=> element.name !== value);
    const updatedElement = current.status === true ? {name: current.name, status: false, filter: current.filter} : undefined
    if(updatedElement) filteredData.push(updatedElement)
    return filteredData
  }
}


export default updateCheckbox;