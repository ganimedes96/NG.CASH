import { useContext, useEffect, useState } from "react";
import { ArrowCircleDown, ArrowCircleUp } from "phosphor-react";
import { AuthContext } from "../contexts/AuthContext";
import { dateFormatter, priceFormatter } from "../lib/Formatter";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { parseCookies } from "nookies";

import { ITransactionInfo } from "../interfaces/ITransaction";
import { api } from "../lib/axios";

export const TableTRansactions = () => {
  const [transactions, setTransactions] = useState<ITransactionInfo[]>([]);
  const [typeTransaction, setTypeTransaction] = useState("");
  const [date, setDate] = useState("");
  const { account } = useContext(AuthContext);
  console.log(date);

  const getTransactions = async () => {
    const { "ngcash-token": token } = parseCookies();
    const response = await api.get("transactions/filter", {
      headers: {
        Authorization: token as string,
      },
      params: {
        filter: typeTransaction ? typeTransaction : "",
        date: date ? date : "",
      },
    });
    setTransactions(response.data);
  };
  useEffect(() => {
    getTransactions();
  }, [typeTransaction, date, transactions]);
  return (
    <main className="max-w-[1100px] mx-auto px-6 my-28">
      <div className=" flex-1 overflow-auto mt-8 ">
        <h1 className="text-3xl text-gray-200 text-center mb-8 font-semibold">
          Histórico de transações
        </h1>
        <div className="flex items-center justify-center gap-5">
          <RadioGroup.Root
            onValueChange={setTypeTransaction}
            className="flex items-center justify-center py-4 gap-5"
          >
            <RadioGroup.Item
              value="cash-out"
              className="bg-gray-600 flex items-center justify-center gap-2 rounded   p-4 text-gray-200 font-semibold"
            >
              <ArrowCircleDown color="#E25858" size={24} />
              Saida
            </RadioGroup.Item>
            <RadioGroup.Item
              value="cash-in"
              className="bg-gray-600 rounded flex items-center justify-center gap-2   p-4 text-gray-200 font-semibold"
            >
              <ArrowCircleUp size={24} color="green" />
              Entrada
            </RadioGroup.Item>
          </RadioGroup.Root>
          <input
            className="bg-gray-600 text-gray-200 p-4 rounded"
            type="date"
            onChange={({ target }) => setDate(target.value)}
          />
        </div>

        <table className="w-full min-w-[600px]">
          <thead className="">
            <tr>
              <th className="bg-gray-700 p-4 text-left text-gray-200 text-xl ease-linear rounded-t">
                Remetente
              </th>
              <th className="bg-gray-700 p-4 text-left text-gray-200 text-xl ease-linear ">
                Valor
              </th>
              <th className="bg-gray-700 p-4 text-left text-gray-200 text-xl ease-linear ">
                Destinatario
              </th>
              <th className="bg-gray-700 p-4 text-left text-gray-200 text-xl ease-linear rounded-t">
                Data
              </th>
            </tr>
          </thead>
          <tbody className="flex-col items-center justify-center gap-2 text-gray-200">
            {transactions?.map((transaction) => (
              <tr key={transaction.id}>
                <td className="bg-gray-800 p-4 text-xl border-t-4 border-gray-900">
                  {transaction.debitAccount?.User[0].username ===
                  account?.username
                    ? "Você"
                    : transaction.debitAccount?.User[0].username}
                </td>
                <td
                  className={`bg-gray-800 p-4 text-xl border-t-4 border-gray-900 ${
                    transaction.creditAccount?.User[0].username ===
                    account?.username
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {priceFormatter.format(transaction.value)}
                </td>
                <td className="bg-gray-800 p-4 text-xl border-t-4 border-gray-900">
                  {transaction.creditAccount?.User[0].username ===
                  account?.username
                    ? "Você"
                    : transaction.creditAccount?.User[0].username}
                </td>
                <td className="bg-gray-800 p-4 text-xl border-t-4 border-gray-900">
                  {dateFormatter.format(new Date(transaction?.createdAt))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};
