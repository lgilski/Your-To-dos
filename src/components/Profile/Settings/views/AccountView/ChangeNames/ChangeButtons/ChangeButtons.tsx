function ChangeButtons() {
  return (
    <div className='ml-6 flex items-end gap-2'>
      <button
        type='reset'
        className='bg-inherit border-0 dark:text-grey-200 text-base leading-none p-1 underline hover:text-lime-green-600 cursor-pointer duration-300 dark:hover:text-lime-green-600'
      >
        Reset
      </button>
      <button
        type='submit'
        className='border-0 text-base leading-none p-1 bg-lime-green-200 rounded-md text-lime-green-800 duration-300 cursor-pointer hover:bg-lime-green-300'
      >
        Save
      </button>
    </div>
  );
}

export default ChangeButtons;
