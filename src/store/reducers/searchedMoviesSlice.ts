import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getSearchedMovies} from '@root/api';
import {FETCH_ERROR} from '@root/constants/text';
import {Movie} from '@root/types/Movie';

type InitialState = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  searchedMovies: Movie[];
};

const initialState: InitialState = {
  status: 'idle',
  error: null,
  searchedMovies: [],
};

export const fetchSearchedMovies = createAsyncThunk(
  'searchedMovies/fetchSearchedMovies',
  async (searchValue: string, thunkAPI) => {
    try {
      const response = await getSearchedMovies(searchValue);

      const movies = response?.data?.movies;

      return movies;
    } catch (e) {
      return thunkAPI.rejectWithValue(FETCH_ERROR);
    }
  },
);

export const searchedMoviesSlice = createSlice({
  name: 'searchedMovies',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSearchedMovies.fulfilled.type]: (
      state,
      action: PayloadAction<Movie[]>,
    ) => {
      state.status = 'succeeded';
      state.searchedMovies = action.payload;
    },
    [fetchSearchedMovies.pending.type]: state => {
      state.status = 'loading';
    },
    [fetchSearchedMovies.rejected.type]: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export default searchedMoviesSlice.reducer;
