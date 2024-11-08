/**
 * @description: This class contains home page. This is client page it there is temporary counter which works with persistent reduc store.
 */

"use client";
import { increaseCountState } from "@/src/handlers/redux/actions";
import { useAppDispatch, useAppSelector } from "@/src/handlers/redux/hooks";

export default function Home() {
  // creating selector subscription for counter & author logedin
  const count = useAppSelector((state: any) => state.count);
  const dispatch = useAppDispatch();

  /**
   *
   * @description: Temporary function for event dispatch to redux store.
   * @todo: Remove this function before actual implementation
   */
  const increaseCount = () => {
    dispatch(increaseCountState(count + 1));
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[var(--font-open-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        This is main div says Hello World!
      </main>

      {/* Display the current count | Remove this counter which webpage is implemented. */}
      <div>Count is: {count}</div>

      {/* Button to increase the count | Remove this counter which webpage is implemented. */}
      <button
        onClick={increaseCount}
        type="button"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Increase Count
      </button>

      {/* Temporary footer for this */}
      {/* <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        This is footer of app
      </footer> */}
    </div>
  );
}
