export enum BottomTabsScreens {
  HomeStack = 'Home',
  SearchStack = 'Search',
}

export type BottomTabsParamsList = {
  [BottomTabsScreens.HomeStack]: undefined;
  [BottomTabsScreens.SearchStack]: undefined;
};
