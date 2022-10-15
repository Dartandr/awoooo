import { ICheckbox } from "@/types";

const updateCheckbox = (data: ICheckbox, value: string): ICheckbox => {
  if (
    data.discluded.indexOf(value) === -1 &&
    data.included.indexOf(value) === -1
  ) {
    const newData = {
      included: [...data.included, value],
      discluded: [...data.discluded],
    };
    return newData;
  } else if (data.included.indexOf(value) !== -1) {
    const included = data.included.filter((element) => element !== value);
    const newData = {
      included,
      discluded: [...data.discluded, value],
    };
    return newData;
  } else if (data.discluded.indexOf(value) !== -1) {
    const discluded = data.discluded.filter((element) => element != value);
    const newData = { included: [...data.included], discluded };
    return newData;
  }
  return data;
};

export default updateCheckbox;