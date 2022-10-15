import React,  {useEffect} from 'react';
import CustomCheckbox from '@/components/atoms/CustomCheckBox';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import {updateRating} from '@/store/listState'
 
const Rating: React.FC = () => {
  const list = useSelector((state: RootState) => state.list);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log('rating changed');
  }, [list.rating]);

  const getStatus = (rating: string) => {
    if(list.rating.included.indexOf(rating) !== -1){
      return 'included'
    }
    if(list.rating.discluded.indexOf(rating) !== -1){
      return 'discluded'
    }
    return undefined
  }

  const ratings = [
    'G',
    'PG',
    'PG-13',
    'R',
    'R+',
    'Rx'
  ];
  const ratingsCheckbox = ratings.map((rating, index) => (
    <div onClick={()=>{dispatch(updateRating(index.toString()))}} key={rating}>
      <CustomCheckbox label={rating} status={getStatus(index.toString())}/>
    </div>
  ));

  return <div>{ratingsCheckbox}</div>;
};

export default Rating;
