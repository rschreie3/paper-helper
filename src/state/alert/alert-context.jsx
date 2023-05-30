import { createContext } from "react";

export const AlertContext = createContext({
  successOpen: false,
  warningOpen: false,
});
