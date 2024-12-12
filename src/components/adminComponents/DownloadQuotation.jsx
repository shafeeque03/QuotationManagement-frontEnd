import jsPDF from "jspdf";
import "jspdf-autotable";

const DownloadQuotation = ({ quotation }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add a title
    doc.setFontSize(18);
    doc.text("Quotation Details", 105, 10, null, null, "center");

    // Quotation Information
    doc.setFontSize(12);
    doc.text(`Quotation ID: ${quotation.quotationId}`, 10, 30);
    doc.text(`Total Amount: ${quotation.totalAmount}`, 10, 40);
    doc.text(
      `Expire Date: ${new Date(quotation.expireDate).toLocaleDateString()}`,
      10, 
      50
    );
    
    doc.text(`Status: ${quotation.status.toUpperCase()}`, 10, 60);

    // Add reason if rejected
    if (quotation.status === "rejected") {
      doc.text(`Cancel Reason: ${quotation.cancelReason}`, 10, 70);
    }

    // Add Client Info
    doc.setFontSize(14);
    doc.text("Client Information", 10, 90);
    doc.setFontSize(12);
    doc.text(`Name: ${quotation.client.name}`, 10, 100);
    doc.text(`Email: ${quotation.client.email}`, 10, 110);

    // Add Products Table
    if (quotation.products.length > 0) {
      doc.setFontSize(14);
      doc.text("Products", 10, 130);
      doc.autoTable({
        startY: 140,
        head: [["Product", "Quantity", "Price", "Total"]],
        body: quotation.products.map((item) => [
          item.product.name,
          item.quantity,
          `${item.price.toLocaleString()}`,
          `${(item.price * item.quantity).toLocaleString()}`,
        ]),
      });
    }

    // Add Services Table
    if (quotation.services.length > 0) {
      const servicesStartY = doc.autoTable.previous.finalY + 20;
      doc.setFontSize(14);
      doc.text("Services", 10, servicesStartY);
      doc.autoTable({
        startY: servicesStartY + 10,
        head: [["Service", "Price"]],
        body: quotation.services.map((item) => [
          item.service.name,
          `${item.price.toLocaleString()}`,
        ]),
      });
    }

    // Save the PDF
    doc.save(`Quotation-${quotation.quotationId}.pdf`);
  };

  return (
    <button
      onClick={generatePDF}
      className="px-6 py-1 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-full hover:shadow-lg hover:scale-105 transition"
    >
      Download PDF
    </button>
  );
};

export default DownloadQuotation;
