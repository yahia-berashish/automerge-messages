import { useContext } from "react";
import { RepoContext } from "../contexts";

export const useDoc = () => {
  return useContext(RepoContext);
};
