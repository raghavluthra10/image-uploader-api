export interface UserDefaultValueInterface {
  loggedIn?: null | boolean;
  userName?: string;
}

export interface InitialStateInterface {
  userInfo: UserDefaultValueInterface;
  dispatch?: any;
}

export interface ActionInterface {
  type: string;
  payload?: any;
}
