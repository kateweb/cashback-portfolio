"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import {useNoWheelOnNumber} from "@/utils/useNoWheelOnNumbers";

interface Props {
  children: ReactNode;
}

function Provider({ children }: Props) {
  useNoWheelOnNumber();
  return <SessionProvider>{children}</SessionProvider>;
}

export default Provider;