import { useAppContext } from '../Context.jsx/AppContext';

const MembersQuantity = () => {
  const {quantity, setQuantity} = useAppContext()

  const increment = () => setQuantity((prev) => prev + 2);
  const decrement = () => setQuantity((prev) => Math.max(prev - 2, 0));

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setQuantity(value === '' ? 0 : parseInt(value));
  };

  return (
    <div className="w-full flex flex-col gap-1">
      <div>
        <h2 className='text-balance font-semibold'>room time</h2>
      </div>
      <form className="max-w-sm mx-auto sm:w-full w-25">
        <div className="relative flex items-center w-full max-w-full sm:max-w-[10rem]">
          <button
            type="button"
            id="decrement-button"
            onClick={decrement}
            className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-md p-2 h-8 sm:p-3 sm:h-10 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
          >
            <svg
              className="w-2 sm:w-4 h-4 text-gray-900 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 2"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h16"
              />
            </svg>
          </button>
          <input
            type="text"
            id="quantity-input"
            value={999}
            onChange={handleChange}
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border-x-0 border-gray-300  h-8 sm:h-10 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-10 sm:w-full py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="999"
            required
            
          />
          <button
            type="button"
            id="increment-button"
            onClick={increment}
            className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-md p-2 h-8 sm:p-3 sm:h-10 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
          >
            <svg
              className="sm:w-4 w-3 h-4 text-gray-900 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default MembersQuantity;
