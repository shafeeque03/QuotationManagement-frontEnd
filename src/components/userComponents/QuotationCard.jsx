import React from "react";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  FileText, 
  Calendar, 
  IndianRupee,
} from "lucide-react";

const QuotationCard = ({ value }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case "accepted":
        return {
          icon: CheckCircle,
          style: "bg-emerald-500/10 text-emerald-600 border border-emerald-500/30",
          text: "Accepted"
        };
      case "rejected":
        return {
          icon: XCircle,
          style: "bg-red-500/10 text-red-600 border border-red-500/30",
          text: "Rejected"
        };
      default:
        return {
          icon: Clock,
          style: "bg-amber-500/10 text-amber-600 border border-amber-500/30",
          text: "Pending"
        };
    }
  };

  const statusConfig = getStatusConfig(value.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="group perspective-1000 transform transition-all duration-300 hover:scale-[1.02]">
      <div 
        className="relative cursor-pointer"
        onClick={() => window.location.href = `/quotation-details?qid=${value._id}`}
      >
        <div 
          className="absolute -inset-0.5 shadow-xl 
          rounded-2xl opacity-30 group-hover:opacity-40 blur-lg transition-all duration-300"
        ></div>
        
        <div 
          className="relative bg-white/80 backdrop-blur-xl border border-gray-100 
          rounded-2xl p-6  overflow-hidden transition-all duration-300 
          group-hover:space-y-4"
        >
          {/* Quotation Header */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-3">
              <FileText className="w-6 h-6 text-indigo-600"/>
              <h3 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 
              text-transparent bg-clip-text">
                Quotation #{value.quotationId}
              </h3>
            </div>
            
            <div 
              className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-2 
              ${statusConfig.style}`}
            >
              <StatusIcon className="w-4 h-4" />
              <span>{statusConfig.text}</span>
            </div>
          </div>

          {/* Quotation Details */}
          <div className="space-y-3">
            {/* Expiry Date */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="w-5 h-5 text-indigo-500"/>
                <span className="text-sm">Expiry Date</span>
              </div>
              <span className="font-medium text-gray-800">
                {new Date(value.expireDate).toLocaleDateString("en-GB")}
              </span>
            </div>

            {/* Total Amount */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-gray-600">
                <IndianRupee className="w-5 h-5 text-green-500"/>
                <span className="text-sm">Total Amount</span>
              </div>
              <span className="font-bold text-emerald-600">
                {value.subTotal?.toLocaleString()||'NA'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationCard;