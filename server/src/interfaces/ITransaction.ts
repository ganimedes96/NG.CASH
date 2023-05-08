export interface ITransaction {
  id: string;
  debitedAccountId: string;
  creditedAccountId: string;
  value: number;
  createdAt: Date;
}

export interface IAllTransaction extends ITransaction {
  debitedAccount: {
    id: string;
    userAccount: {
      id: string;
      username: string;
    };
  };
  creditedAccount: {
    id: string;
    userAccount: {
      id: string;
      username: string;
    };
  };
}
