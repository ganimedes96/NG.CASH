
interface CardSummaryProps {
  color: string
  amount?: number;
  transition: string;
  icon?: any;
}

export const CardSummary = ({ amount, color, icon, transition}: CardSummaryProps) => {
  return (
    <div className={`${color} rounded p-8  text-gray-200 w-80` }>
      <header className='flex items-center justify-between text-gray-200'>
            <span className='text-xl font-medium'>{transition}</span>
            {icon}
      </header>
            <strong className="block mt-4 text-3xl">R${amount},00</strong>
    </div>
  );
};
