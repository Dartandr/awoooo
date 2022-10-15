import React, { useEffect } from 'react';
import CustomCheckbox from '@/components/atoms/CustomCheckBox';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { updateTypes } from '@/store/listState';

const Type: React.FC = () => {
  const list = useSelector((state: RootState) => state.list);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log('types changed');
  }, [list.types]);

  const getStatus = (types: string) => {
    if (list.types.included.indexOf(types) !== -1) {
      return 'included';
    }
    if (list.types.discluded.indexOf(types) !== -1) {
      return 'discluded';
    }
    return undefined;
  };

  const types = ['TV', 'Movie', 'ONA', 'OVA', 'Special'];
  const typeCheckbox = types.map((type) => (
    <div
      onClick={() => {
        dispatch(updateTypes(type));
      }}
      key={type}
    >
      <CustomCheckbox
        label={type === 'TV' ? 'TV Series' : type}
        status={getStatus(type)}
      />
    </div>
  ));

  return <div>{typeCheckbox}</div>;
};

export default Type;
