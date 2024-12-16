"use client";
import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import OtpVerificationContext from "@/components/adminComponents/OtpVerificationContext";
const QuotationsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtpVerificationContext />
    </Suspense>
  );
};

export default QuotationsPage;