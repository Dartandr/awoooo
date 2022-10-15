import React, { useEffect } from 'react';
import CustomCheckbox from '@/components/atoms/CustomCheckBox';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { updateTypes } from '@/store/listState';

const Type: React.FC = () => {
  const typeState = useSelector((state: RootState) => state.list.types);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log(typeState);
  }, [typeState]);

  const getStatus = (value:string) =>{
    const current = typeState.find((element) => element.name === value)
    if(!current){
      return;
    }
    if(current.status){
      return 'included'
    }
    if(!current.status){
      return 'discluded'
    }
  }

  const types = ['TV', 'Movie', 'ONA', 'OVA', 'Special'];
  const typeCheckbox = types.map((type) => (
    <div
      onClick={() => {
        dispatch(updateTypes(type));
      }}
      key={type}
    >
      <CustomCheckbox label={type === 'TV' ? 'TV Series' : type} status={getStatus(type)}/>
    </div>
  ));

  return <div>{typeCheckbox}</div>;
};

export default Type;
