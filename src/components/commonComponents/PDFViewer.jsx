export const PDFViewer = ({ pdfUrl }) => {
    return (
      <div>
        <h2>Quotation Proposal</h2>
        <iframe
          src={pdfUrl}
          width="100%"
          height="600px"
          title="Quotation Proposal"
        ></iframe>
      </div>
    );
  };
  