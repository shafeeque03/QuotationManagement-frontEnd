import { checkAndClearExpiredTokens } from "@/util/checkTokens";
import { useEffect } from "react";
export const useTokenValidation = () => {
  useEffect(() => {
    checkAndClearExpiredTokens();
  }, []);
};
