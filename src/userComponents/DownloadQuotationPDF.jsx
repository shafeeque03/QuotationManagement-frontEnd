import jsPDF from "jspdf";
import "jspdf-autotable";

const DownloadQuotationPDF = ({ quotation }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Page Dimensions and Margins
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 10;

    // Colors
    const primaryColor = [37, 99, 235];
    const grayColor = [107, 114, 128];
    const lightGrayColor = [243, 244, 246];

    // Header Section
    doc.setFillColor(...primaryColor); // Fill color for header background
    doc.rect(0, 0, pageWidth, 50, "F"); // Draw filled rectangle for header

    // Header Text
    doc.setFont("helvetica", "bold");
doc.setFontSize(16);
doc.setTextColor(255, 255, 255);
doc.text(quotation.adminIs.name, margin, 20);

doc.setFontSize(10); // Set smaller font size for the email
doc.text(quotation.adminIs.email, margin, 25);

doc.text(String(quotation.adminIs.phone), margin, 30);
doc.text(quotation.adminIs.address.address1, margin, 35);
doc.text(quotation.adminIs.address.address2, margin, 40);
doc.text(String(quotation.adminIs.address.pincode), margin, 45);


    // Quotation Details (right-aligned)
    doc.setFontSize(10);
    doc.text(`Quotation ID: ${quotation.quotationId}`, pageWidth - margin, 15, { align: "right" });
    doc.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - margin, 20, { align: "right" });

    // Divider Line
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    
    // Billing Information
    doc.setFontSize(10);
    doc.setTextColor(...grayColor);
    doc.text("Bill To:", margin, 55);
    doc.setTextColor(0);
    doc.text(quotation.client.name, margin, 60);
    doc.text(quotation.client.email, margin, 65);

    // Products Table
    const products = quotation.products.map((item) => ({
      Product: item.product.name,
      Quantity: item.quantity,
      "Unit Price": `₹${item.price.toLocaleString()}`,
      Total: `₹${(item.price * item.quantity).toLocaleString()}`,
    }));

    doc.autoTable({
      startY: 75,
      head: [["Product", "Quantity", "Unit Price", "Total"]],
      body: products.map((item) => Object.values(item)),
      theme: "striped",
      headStyles: { fillColor: primaryColor, textColor: 255, fontSize: 9 },
      bodyStyles: { fontSize: 8 },
      alternateRowStyles: { fillColor: lightGrayColor },
    });

    // Services Table (if applicable)
    if (quotation.services.length > 0) {
      const services = quotation.services.map((item) => ({
        Service: item.service.name,
        Price: `₹${item.price.toLocaleString()}`,
      }));

      doc.autoTable({
        startY: doc.lastAutoTable.finalY + 10,
        head: [["Service", "Price"]],
        body: services.map((item) => Object.values(item)),
        theme: "striped",
        headStyles: { fillColor: primaryColor, textColor: 255, fontSize: 9 },
        bodyStyles: { fontSize: 8 },
        alternateRowStyles: { fillColor: lightGrayColor },
      });
    }

    // Total Amount Section (Bottom of the Page)
    const footerY = pageHeight - 30;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(...primaryColor);
    doc.text(`Total Amount: ₹${quotation.totalAmount.toLocaleString()}`, margin, footerY);
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(0.5);
    doc.line(margin, footerY + 5, pageWidth - margin, footerY + 5);

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(...grayColor);
    doc.text("Notes:", margin, footerY + 15);
    doc.text("This is a computer-generated quotation. Subject to changes.", margin, footerY + 20);

    doc.text(`© ${quotation.adminIs.name}`, margin, pageHeight - 5);
    doc.text(`Generated: ${new Date().toLocaleString()}`, pageWidth - margin, pageHeight - 5, { align: "right" });

    // Save the PDF
    doc.save(`Quotation-${quotation.quotationId}.pdf`);
  };

  return (
    <button
      onClick={generatePDF}
      className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full hover:shadow-lg hover:scale-105 transition flex items-center justify-center"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
      Download PDF
    </button>
  );
};

export default DownloadQuotationPDF;
