export enum HomeStackScreens {
  HomeScreen = 'HomeScreen',
  MovieScreen = 'MovieScreen',
}

export type HomeStackParamsList = {
  [HomeStackScreens.HomeScreen]: undefined;
  [HomeStackScreens.MovieScreen]: {
    id: string;
    title: string;
  };
};
