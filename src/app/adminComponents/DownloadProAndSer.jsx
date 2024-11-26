    "use client";

    import jsPDF from "jspdf";
    import "jspdf-autotable";

    const DownloadPDFButton = ({ data, fileName }) => {
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
            item.price.toLocaleString(),
            item.quantity,
        ]);
        } else if (fileName === "services") {
        headers = ["No", "Name", "isAvailable"];
        rows = data.map((item, index) => [
            index + 1,
            item.name,
            item.isAvailable ? "Yes" : "No",
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
