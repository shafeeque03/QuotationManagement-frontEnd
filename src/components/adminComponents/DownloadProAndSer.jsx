"use client";
import { downloadSerOrPro } from "@/api/adminApi";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const DownloadPDFButton = ({ fileName }) => {
    const state = useSelector((state) => state);
    const admin = state?.admin?.admin;
    const adminId = admin?._id;
    const[data,setData] = useState([])
    useEffect(()=>{
        downloadSerOrPro(fileName,adminId).then((res)=>{
            setData(res.data.data);
        }).catch((err)=>{
            console.log(err)
        })
    })
  const generatePDF = () => {
    if (!data || data.length === 0) {
      console.error("No data available to generate PDF");
      return;
    }

    const doc = new jsPDF();

    // Add title to the PDF
    doc.setFontSize(16);
    doc.text(`${fileName} Report`, 105, 10, null, null, "center");

    // Prepare data based on type
    let headers = [];
    let rows = [];

    if (fileName === "products") {
      headers = ["No", "Name", "Price", "Quantity"];
      rows = data.map((item, index) => [
        index + 1,
        item.name,
        item.description
      ]);
    } else if (fileName === "services") {
      headers = ["No", "Name", "isAvailable"];
      rows = data.map((item, index) => [
        index + 1,
        item.name,
        item.description
      ]);
    } else {
      console.error("Invalid type specified");
      return;
    }

    // Add table with headers and rows
    doc.autoTable({
      head: [headers],
      body: rows,
      startY: 20,
      theme: "grid",
    });

    // Save the PDF
    doc.save(`${fileName}.pdf`);
  };

  return (
    <button
      onClick={generatePDF}
      className="bg-gradient-to-r from-green-500 to-green-700 text-white px-4 py-2 rounded-lg hover:shadow-md hover:scale-105 transition mb-3"
    >
      Download {fileName}
    </button>
  );
};

export default DownloadPDFButton;
