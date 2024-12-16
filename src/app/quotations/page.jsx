"use client";
import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import QuotationsContext from "@/components/userComponents/QuotationsContext";
const QuotationsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuotationsContext />
    </Suspense>
  );
};

export default QuotationsPage;