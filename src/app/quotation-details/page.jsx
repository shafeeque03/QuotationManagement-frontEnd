"use client";
import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import QuotationDetailsContent from "@/components/userComponents/QuotationDetailsContent";
const QuotationDetailsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuotationDetailsContent />
    </Suspense>
  );
};

export default QuotationDetailsPage;