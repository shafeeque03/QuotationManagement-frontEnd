"use client";
import { getAllUsers } from "@/api/adminApi";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
const DownloadUsersPDFButton = ({fileName = "Users",adminId}) => {
  const [users,setUsers] = useState([])
  useEffect(()=>{
    getAllUsers(adminId).then((res)=>{
      setUsers(res?.data?.users)
    }).catch((err)=>{
      toast.error(err.message);
      console.log(err)
    })
  },[])

  const generatePDF = () => {
    if (!users || users.length === 0) {
      console.error("No users available to generate PDF");
      return;
    }

    const doc = new jsPDF();

    // Add title
    doc.setFontSize(16);
    doc.text(`${fileName}`, 105, 10, null, null, "center");

    // Define headers and rows
    const headers = ["No", "User Name", "Login ID", "Email"];
    const rows = users.map((user, index) => [
      index + 1,
      user.name,
      user.loginId,
      user.email,
    ]);

    // Add the table
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
      className=" gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-green-400 text-white hover:opacity-90 transition-all duration-200 shadow-lg shadow-indigo-200"
    >
      Download All Users
    </button>
  );
};

export default DownloadUsersPDFButton;
