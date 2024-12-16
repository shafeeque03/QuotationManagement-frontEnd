"use client";
import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FotpContext from "@/components/adminComponents/FotpContext";
const QuotationsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FotpContext />
    </Suspense>
  );
};

export default QuotationsPage;