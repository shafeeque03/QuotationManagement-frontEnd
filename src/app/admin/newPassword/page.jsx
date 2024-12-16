"use client";
import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import NewPasswordContext from "@/components/adminComponents/NewPassContext";

const QuotationsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewPasswordContext />
    </Suspense>
  );
};

export default QuotationsPage;