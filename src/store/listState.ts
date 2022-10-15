import { createSlice } from '@reduxjs/toolkit';
import {ICheckbox} from '@/types';
import updateCheckbox from '@/components/helpers/updateCheckboxData'

interface IState {
  genres: ICheckbox;
  status: ICheckbox;
  types: ICheckbox;
  rating: ICheckbox;
  animes: Array<IAnimes>;
}
interface IAnimes {
  id: string;
  title: string;
  score: number | null;
  type: string;
  progress: number;
  episodes: number;
  image: string;
  userStatus: string;
}

const initState: IState = {
  status: {
    included: [],
    discluded: [],
  },
  types: {
    included: [],
    discluded: [],
  },
  rating: {
    included: [],
    discluded: [],
  },
  genres: {
    included: [],
    discluded: [],
  },

  animes: [
    {
      id: '60254fb2f578d98d81f766f3',
      title: 'Mushishi Zoku Shou: Suzu no Shizuku',
      score: null,
      type: 'Movie',
      progress: 0,
      episodes: 1,
      image: 'https://cdn.myanimelist.net/images/anime/9/72689.jpg',
      userStatus: 'planned',
    },
    {
      id: '60255087f578d98d81f76761',
      title: 'Katanagatari',
      score: null,
      type: 'TV series',
      progress: 0,
      episodes: 12,
      image: 'https://cdn.myanimelist.net/images/anime/2/50023.jpg',
      userStatus: 'planned',
    },
    {
      id: '60255073f578d98d81f76756',
      title: 'Hotarubi no Mori e',
      score: null,
      type: 'Movie',
      progress: 0,
      episodes: 1,
      image: 'https://cdn.myanimelist.net/images/anime/8/38229.jpg',
      userStatus: 'planned',
    },
    {
      id: '602553e8f578d98d81f76939',
      title: 'Zoku Sayonara Zetsubou Sensei',
      score: null,
      type: 'TV series',
      progress: 0,
      episodes: 13,
      image: 'https://cdn.myanimelist.net/images/anime/13/75517.jpg',
      userStatus: 'planned',
    },
    {
      id: '6025503af578d98d81f76738',
      title: 'Usagi Drop',
      score: null,
      type: 'TV series',
      progress: 0,
      episodes: 11,
      image: 'https://cdn.myanimelist.net/images/anime/2/29665.jpg',
      userStatus: 'planned',
    },
    {
      id: '6025592df578d98d81f76c31',
      title: 'Kumo no Mukou, Yakusoku no Basho',
      score: null,
      type: 'Movie',
      progress: 0,
      episodes: 1,
      image: 'https://cdn.myanimelist.net/images/anime/1/433.jpg',
      userStatus: 'planned',
    },
    {
      id: '602551f5f578d98d81f76825',
      title: 'Detroit Metal City',
      score: null,
      type: 'OVA',
      progress: 0,
      episodes: 12,
      image: 'https://cdn.myanimelist.net/images/anime/3/9853.jpg',
      userStatus: 'planned',
    },
    {
      id: '6025554df578d98d81f769fd',
      title: 'Mind Game',
      score: null,
      type: 'Movie',
      progress: 0,
      episodes: 1,
      image: 'https://cdn.myanimelist.net/images/anime/1722/96276.jpg',
      userStatus: 'planned',
    },
    {
      id: '6025504df578d98d81f76742',
      title: 'Mononoke',
      score: null,
      type: 'TV series',
      progress: 0,
      episodes: 12,
      image: 'https://cdn.myanimelist.net/images/anime/3/20713.jpg',
      userStatus: 'planned',
    },
    {
      id: '602554edf578d98d81f769c6',
      title: 'Saraiya Goyou',
      score: null,
      type: 'TV series',
      progress: 0,
      episodes: 12,
      image: 'https://cdn.myanimelist.net/images/anime/4/75203.jpg',
      userStatus: 'planned',
    },
    {
      id: '60254f6bf578d98d81f766d0',
      title: 'Monster',
      score: null,
      type: 'TV series',
      progress: 0,
      episodes: 74,
      image: 'https://cdn.myanimelist.net/images/anime/10/18793.jpg',
      userStatus: 'planned',
    },
    {
      id: '60254f64f578d98d81f766cd',
      title: 'Shouwa Genroku Rakugo Shinjuu: Sukeroku Futatabi-hen',
      score: null,
      type: 'TV series',
      progress: 0,
      episodes: 12,
      image: 'https://cdn.myanimelist.net/images/anime/10/82947.jpg',
      userStatus: 'planned',
    },
    {
      id: '60255bb3f578d98d81f76d9a',
      title: 'Yoake Tsugeru Lu no Uta',
      score: null,
      type: 'Movie',
      progress: 0,
      episodes: 1,
      image: 'https://cdn.myanimelist.net/images/anime/5/84260.jpg',
      userStatus: 'planned',
    },
    {
      id: '602555f7f578d98d81f76a5c',
      title: 'Aoi Bungaku Series',
      score: null,
      type: 'TV series',
      progress: 0,
      episodes: 12,
      image: 'https://cdn.myanimelist.net/images/anime/10/17471.jpg',
      userStatus: 'planned',
    },
  ],
};


export const listSlice = createSlice({
  name: 'list',
  initialState: initState,
  reducers: {
    updateGenres: (state, action) => {
      const newData = updateCheckbox(state.genres, action.payload);
      state.genres = newData;
    },
    updateStatus: (state, action) => {
      const newData = updateCheckbox(state.status, action.payload);
      state.status = newData;
    },
    updateRating: (state, action) => {
      const newData = updateCheckbox(state.rating, action.payload);
      state.rating = newData;
    },
    updateTypes: (state, action) => {
      const newData = updateCheckbox(state.types, action.payload);
      state.types = newData;
    },
  },
});

export const { updateGenres, updateStatus, updateRating, updateTypes } =
  listSlice.actions;

export default listSlice.reducer;
