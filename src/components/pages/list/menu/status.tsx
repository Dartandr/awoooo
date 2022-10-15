import React, { useEffect } from 'react';
import CustomCheckbox from '@/components/atoms/CustomCheckBox';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { updateStatus } from '@/store/listState';

const Status: React.FC = () => {
  const statusState = useSelector((state: RootState) => state.list.status);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log(statusState);
  }, [statusState]);

  const getStatus = (value:string) =>{
    const current = statusState.find((element) => element.name === value)
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

  const status = ['Completed', 'PTW', 'Watching', 'OnHold', 'Dropped'];
  const statusCheckbox = status.map((status) => (
    <div
      onClick={() => {
        dispatch(updateStatus(status));
      }}
      key={status}
    >
      <CustomCheckbox label={status} status={getStatus(status)}/>
    </div>
  ));

  return <div>{statusCheckbox}</div>;
};

export default Status;
