export enum SearchStackScreens {
  SearchScreen = 'SearchScreen',
  MovieScreen = 'MovieScreen',
}

export type SearchStackParamsList = {
  [SearchStackScreens.SearchScreen]: undefined;
  [SearchStackScreens.MovieScreen]: {
    id: string;
    title: string;
  };
};
