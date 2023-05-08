export interface ITransaction {
  id: string;
  debitedAccountId: string;
  creditedAccountId: string;
  value: number;
  createdAt: Date;
}

export interface ITransactionInfo extends ITransaction {
  debitAccount?: {
    id: string;
    User: [
      {
        id: string;
        username: string;
      }
    ];
  };
  creditAccount?: {
    id: string;
    User: [
      {
        id: string;
        username: string;
      }
    ];
  };
}
