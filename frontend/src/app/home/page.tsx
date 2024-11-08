/**
 * @description: This class contains home page. This is client page it there is temporary counter which works with persistent reduc store.
 */

"use client";
import { increaseCountState } from "@/src/handlers/redux/actions";
import { useAppDispatch, useAppSelector } from "@/src/handlers/redux/hooks";

export default function Home() {

  return (
    <div>
        Hello Page
    </div>
  );
}
