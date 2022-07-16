import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {getMovies} from '@root/api';
import groupMoviesByGenre from '@root/utils/movies';
import {FETCH_ERROR} from '@root/constants/text';
import {Movie} from '@root/types/Movie';
import {MoviesGroupItem} from '@root/types/MoviesGroupItem';
import {RootState} from '..';

type InitialState = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  moviesGroup: MoviesGroupItem[];
};

export const moviesAdapter = createEntityAdapter<Movie>();

// By default, `createEntityAdapter` gives you `{ ids: [], entities: {} }`.
// If you want to track 'loading' or other keys, you would initialize them here:
// `getInitialState({ loading: false, activeRequestId: null })`
const initialState = moviesAdapter.getInitialState<InitialState>({
  status: 'idle',
  error: null,
  moviesGroup: [],
});

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (_, thunkAPI) => {
    try {
      const response = await getMovies();

      const movies = response?.data?.movies;

      const moviesGroup = groupMoviesByGenre(movies);

      return {movies, moviesGroup};
    } catch (e) {
      return thunkAPI.rejectWithValue(FETCH_ERROR);
    }
  },
);

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchMovies.fulfilled.type]: (
      state,
      action: PayloadAction<{
        movies: Movie[];
        moviesGroup: MoviesGroupItem[];
      }>,
    ) => {
      const {movies, moviesGroup} = action.payload;
      state.status = 'succeeded';
      state.moviesGroup = moviesGroup;
      moviesAdapter.setAll(state, movies);
    },
    [fetchMovies.pending.type]: state => {
      state.status = 'loading';
    },
    [fetchMovies.rejected.type]: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export default moviesSlice.reducer;

export const {
  selectById: selectMovieById,
  selectIds: selectMovieIds,
  selectEntities: selectMovieEntities,
  selectAll: selectAllMovies,
  selectTotal: selectTotalMovies,
} = moviesAdapter.getSelectors<RootState>(state => state.movies);
