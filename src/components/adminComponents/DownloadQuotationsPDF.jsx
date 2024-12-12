"use client";
import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Download } from "lucide-react";
import { downloadQuotations } from "@/api/adminApi";

const DownloadQuotationsPDF = ({ searchTerm, startDate, endDate, sortBy, sortOrder, adminId }) => {
  const handleDownloadPDF = async () => {
    try {
      const res = await downloadQuotations({
        searchTerm,
        startDate,
        endDate,
        sortBy,
        sortOrder,
        adminId,
      });

      // Use the returned data directly
      const quotations = res.quotations||[];

      const doc = new jsPDF();

      // Add title
      doc.setFontSize(18);
      doc.text("Quotation List", 14, 20);

      // Prepare data for the table
      const headers = [["No", "Quotation ID", "Exp", "Status"]];
      const rows = quotations.map((qtn, index) => [
        index + 1,
        qtn.quotationId,
        new Date(qtn.expireDate).toLocaleDateString() || "N/A",
        qtn.status || "N/A",
      ]);

      // Add table
      doc.autoTable({
        startY: 30,
        head: headers,
        body: rows,
      });

      // Save the PDF
      doc.save("Quotation_List.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <button
      onClick={handleDownloadPDF}
      className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:opacity-90 shadow-md text-sm text-center"
    >
      <div className="flex justify-center">
        <Download className="w-5 h-5 me-1" /> Download Quotation
      </div>
    </button>
  );
};

export default DownloadQuotationsPDF;
