"use client";
import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { getAllClients } from "@/api/adminApi";

const DownloadClientsPDF = () => {
  const[clients,setClints] = useState([]);
  useEffect(()=>{
    getAllClients().then((res)=>{
      setClints(res?.data?.clients)
    }).catch((err)=>{
      console.log(err)
    })
  })
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text("Clients List", 14, 20);

    // Prepare data for the table
    const headers = [["No", "User Name", "Phone", "Email"]];
    const rows = clients.map((client, index) => [
      index + 1,
      client.name,
      client.phone || "N/A",
      client.email || "N/A",
    ]);

    // Add table
    doc.autoTable({
      startY: 30,
      head: headers,
      body: rows,
    });

    // Save the PDF
    doc.save("clients_list.pdf");
  };

  return (
    <button
      onClick={handleDownloadPDF}
      className=" gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-green-400 text-white hover:opacity-90 transition-all duration-200 shadow-lg shadow-indigo-200"
    >
      Download Clients PDF
    </button>
  );
};

export default DownloadClientsPDF;
