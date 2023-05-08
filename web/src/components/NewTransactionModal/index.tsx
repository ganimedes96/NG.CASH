import * as Dialog from "@radix-ui/react-dialog";
import { X } from "phosphor-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const newTransitionSchema = z.object({
  recipient: z.string(),
  value: z.number(),
});

type NewTransactionFormInputs = z.infer<typeof newTransitionSchema>;

export const NewTransactionModal = () => {
    const { newTransaction, error } = useContext(AuthContext);
  const { register, handleSubmit, formState: {isSubmitting}, reset } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransitionSchema),
  });

const handleSendNewTransaction = async (data: NewTransactionFormInputs) => {
    newTransaction(data);
    reset()
     
}  

  return (
    <Dialog.Portal>
      <Dialog.Overlay className=" fixed w-screen h-screen inset-0 bg-gray-900/[.6]" />
      <Dialog.Content className="min-w-[32rem] rounded py-10 px-12 bg-gray-700 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Dialog.Close className="absolute bg-transparent border-spacing-0 top-5 right-5 text-gray-300 line-through ">
          <X size={24} />
        </Dialog.Close>
        <Dialog.Title className="text-gray-200 font-semibold text-2xl">
          Nova transacao
        </Dialog.Title>
        <form className="mt-8 flex flex-col gap-4 " onSubmit={handleSubmit(handleSendNewTransaction)}>
          <input
            className="rounded border-0 bg-gray-900 text-gray-200 p-4 placeholder:text-gray-300 "
            type="text"
            {...register('recipient')}
            placeholder="Username"
            required
          />
          <input
            className="rounded border-0 bg-gray-900 text-gray-200 p-4 placeholder:text-gray-300 "
            type="number"
            {...register('value', {valueAsNumber: true})}
            placeholder="Valor"
            required
          />
          {error && <span className='text-red-500'>{error}</span>}
          <button
            className="rounded border-spacing-0 bg-purple-500 px-5 mt-6 h-[58px] text-gray-200 cursor-pointer hover:bg-purple-300 font-semibold text-xl disabled:opacity-60 "
            type="submit"
            disabled={isSubmitting}
          >
            Enviar
          </button>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
