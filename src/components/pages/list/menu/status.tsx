import React,  {useEffect} from 'react';
import CustomCheckbox from '@/components/atoms/CustomCheckBox';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import {updateStatus} from '@/store/listState'
 
const Status: React.FC = () => {
  const list = useSelector((state: RootState) => state.list);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log('status changed');
  }, [list.status]);

  const getStatus = (status: string) => {
    if(list.status.included.indexOf(status) !== -1){
      return 'included'
    }
    if(list.status.discluded.indexOf(status) !== -1){
      return 'discluded'
    }
    return undefined
  }

  const status = [
    'Completed',
    'PTW',
    'Watching',
    'OnHold',
    'Dropped'
  ];
  const statusCheckbox = status.map((status) => (
    <div onClick={()=>{dispatch(updateStatus(status))}} key={status}>
      <CustomCheckbox label={status} status={getStatus(status)}/>
    </div>
  ));

  return <div>{statusCheckbox}</div>;
};

export default Status;
