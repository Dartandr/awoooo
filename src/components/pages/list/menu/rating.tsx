import React, { useEffect } from 'react';
import CustomCheckbox from '@/components/atoms/CustomCheckBox';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { updateRating } from '@/store/listState';

const Rating: React.FC = () => {
  const ratingState = useSelector((state: RootState) => state.list.rating);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log(ratingState);
  }, [ratingState]);

  const getStatus = (value:string) =>{
    const current = ratingState.find((element) => element.name === value)
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

  const ratings = ['G', 'PG', 'PG-13', 'R', 'R+', 'Rx'];
  const ratingsCheckbox = ratings.map((rating, index) => (
    <div
      onClick={() => {
        dispatch(updateRating(index.toString()));
      }}
      key={rating}
    >
      <CustomCheckbox label={rating} status={getStatus(index.toString())}/>
    </div>
  ));

  return <div>{ratingsCheckbox}</div>;
};

export default Rating;
