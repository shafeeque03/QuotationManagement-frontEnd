import { cleanExpiredTokens } from "@/util/checkTokens";
import { useEffect } from "react";
export const useTokenValidation = () => {
  useEffect(() => {
    cleanExpiredTokens();
  }, []);
};
