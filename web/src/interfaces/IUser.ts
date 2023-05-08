export interface IUser {
  id: string;
  username: string;
  accountId: string;
}

export interface IAccount extends IUser {
  Account: {
    balance: number;
  };
}
