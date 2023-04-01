import React from "react";
import MetaHeader from "../comps/global/Header";
import { WaitList } from "../views/waitlist/waitlist.view";

export default function HomePage() {
  return (
    <>
      <MetaHeader title={"Get early access | Doow"} />
      <WaitList />
    </>
  );
}
