import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, Dispatch } from '@/store';

const MyElement: React.FC = () => {
  const dispatchMy = useDispatch<Dispatch>();
  const count = useSelector((state: RootState) => state.count);
  const onClickCount = (): void => {
    dispatchMy.count.increment(2)
  }
  return (
    <>
      <div onClick={()=>{onClickCount()}}>{count.someData}</div>
    </>
  );
};

export default MyElement;
