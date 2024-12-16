"use client";
import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import QuotationsTableContext from "@/components/adminComponents/QuotationsTableContext";
const QuotationsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuotationsTableContext />
    </Suspense>
  );
};

export default QuotationsPage;