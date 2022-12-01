import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { CardSummary } from "./CardSummary";
import * as Dialog from "@radix-ui/react-dialog";
import { NewTransactionModal } from "./NewTransactionModal";

export const Summary = () => {
  const { account, transactions } = useContext(AuthContext);

  const income = transactions?.filter(
    (amount) => amount?.creditedAccountId === account?.accountId
  );
  const outcome = transactions?.filter(
    (amount) => amount?.debitedAccountId === account?.accountId
  );
  const CashIn = income?.reduce((acc, value) => {
    return acc + value.value;
  }, 0);
  const CashOut = outcome?.reduce((acc, value) => {
    return acc + value.value;
  }, 0);

  return (
    <section className=" w-full max-w-[1120px] mx-auto px-6 mt-28">
      <div className="flex items-center justify-end px-4 mb-8">
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="bg-purple-500 px-4 py-3 rounded text-gray-200 font-semibold">
              Nova transacao
            </button>
          </Dialog.Trigger>
          <NewTransactionModal/>
        </Dialog.Root>
      </div>
      <div className="flex items-center justify-between px-4">
        <CardSummary
          transition="Entradas"
          amount={CashIn}
          color="bg-gray-500"
          icon={<ArrowCircleUp size={30} color="green" />}
        />
        <CardSummary
          transition="Saidas"
          amount={CashOut}
          color="bg-gray-500"
          icon={<ArrowCircleDown size={30} color="red" />}
        />
        <CardSummary
          transition="Saldo"
          amount={account?.Account.balance}
          color="bg-purple-500"
          icon={<CurrencyDollar size={30} color="white" />}
        />
      </div>
    </section>
  );
};
