export interface IAccount {
  Account: {
    balance: number;
  };
}

export interface IUser extends IAccount {
  id?: string;
  username: string;
  password: string;
  accountId: string;
}


export interface IAccountInfo extends IAccount {
  id?: string;
  username?: string;
  accountId: string;
}

