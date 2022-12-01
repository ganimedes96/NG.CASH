import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { dateFormatter, priceFormatter } from "../lib/Formatter";

export const TableTRansactions = () => {
  const { account, transactions } = useContext(AuthContext);

  

  return (
    <main className="max-w-[1100px] mx-auto px-6 my-28">
      <div className=" flex-1 overflow-auto mt-8 ">
        <h1 className="text-3xl text-gray-200 text-center mb-8 font-semibold">Histórico de transações</h1>
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
