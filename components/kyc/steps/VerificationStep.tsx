"use client";

import { useKYCStore, DocumentType } from "@/lib/stores/kyc-store";
import { FileText, ChevronRight } from "lucide-react";
import DocumentUploadStep from "../DocumentUploadStep";

const documentTypes: {
  type: DocumentType;
  label: string;
  description: string;
}[] = [
  {
    type: "passport",
    label: "Passport",
    description: "Upload a photo of your passport photo page",
  },
  {
    type: "drivers-license",
    label: "Driver's License",
    description: "Upload a photo of your drivers license",
  },
  {
    type: "national-id",
    label: "National ID",
    description: "Upload a photo of your national document",
  },
];

export default function VerificationStep() {
  const { verification, setDocumentType } = useKYCStore();

  if (verification.selectedDocumentType) {
    return <DocumentUploadStep />;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-[#111827] mb-2">
          Upload a proof of your identity
        </h1>
        <p className="text-[#4B5563]">
          Upload a valid National ID to verify your identity. This helps keep
          your account secure.
        </p>
      </div>

      <div className="bg-white rounded-lg p-8 shadow-sm">
        <div className="space-y-4">
          {documentTypes.map((doc) => (
            <button
              key={doc.type}
              onClick={() => setDocumentType(doc.type)}
              className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#0BAB7C] hover:bg-gray-50 focus:border-[#0BAB7C] focus:bg-gray-50 transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-[#0BAB7C]/10">
                  <FileText className="w-5 h-5 text-gray-600 group-hover:text-[#0BAB7C]" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-[#111827]">{doc.label}</h3>
                  <p className="text-sm text-[#4B5563]">{doc.description}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#0BAB7C]" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
