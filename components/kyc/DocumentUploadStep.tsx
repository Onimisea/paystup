"use client";

import { useRef } from "react";
import { useKYCStore } from "@/lib/stores/kyc-store";
import { Button } from "@/components/ui/button";
import { Upload, X, Check, Loader2 } from "lucide-react";
import Image from "next/image";

export default function DocumentUploadStep() {
  const {
    verification,
    uploadDocument,
    removeDocument,
    setCurrentStep,
    validateVerification,
    setDocumentType,
  } = useKYCStore();

  const frontInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (side: "front" | "back", file: File) => {
    if (file && file.type.startsWith("image/")) {
      uploadDocument(side, file);
    }
  };

  const handleContinue = () => {
    if (validateVerification()) {
      setCurrentStep("address");
    }
  };

  const getDocumentLabel = () => {
    switch (verification.selectedDocumentType) {
      case "passport":
        return "Passport";
      case "drivers-license":
        return "Driver's License";
      case "national-id":
        return "National ID";
      default:
        return "Document";
    }
  };

  const renderUploadArea = (side: "front" | "back") => {
    const upload = verification[side === "front" ? "frontSide" : "backSide"];
    const isUploading = upload.status === "uploading";
    const isSuccess = upload.status === "success";
    const isError = upload.status === "error";

    if (isSuccess && upload.preview) {
      return (
        <div className="relative">
          <div className="w-full h-48 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center relative overflow-hidden">
            <Image
              src={upload.preview}
              alt={`${side} side of document`}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="mt-4 text-center">
            <div className="flex items-center justify-center gap-2 text-[#0BAB7C] mb-2">
              <Check className="w-4 h-4" />
              <span className="text-sm font-medium">Upload complete</span>
            </div>
            <p className="text-xs text-[#4B5563] mb-2">{upload.fileName}</p>
            <button
              onClick={() => removeDocument(side)}
              className="text-sm text-[#0BAB7C] hover:underline"
            >
              Upload a new file
            </button>
          </div>
        </div>
      );
    }

    if (isError) {
      return (
        <div>
          <div className="w-full h-48 bg-gray-50 border-2 border-dashed border-red-200 rounded-lg flex flex-col items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-6 h-6 text-red-500" />
              </div>
              <p className="text-red-600 font-medium mb-1">Upload failed</p>
              <p className="text-sm text-[#4B5563] mb-4">
                We need to see the details on both sides clearly
              </p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <Button
              onClick={() => {
                if (side === "front") {
                  frontInputRef.current?.click();
                } else {
                  backInputRef.current?.click();
                }
              }}
              className="bg-[#0BAB7C] hover:bg-[#0BAB7C]/90 focus:bg-[#0BAB7C]/90 text-white rounded-full px-6 cursor-pointer transition-colors"
            >
              Choose a new file
            </Button>
          </div>
        </div>
      );
    }

    if (isUploading) {
      return (
        <div>
          <div className="w-full h-48 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center">
            <div className="text-center">
              <Loader2 className="w-8 h-8 text-[#0BAB7C] animate-spin mx-auto mb-4" />
              <p className="text-[#111827] font-medium">Uploading your image</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="w-full h-48 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="font-medium text-[#111827] mb-1">
              {side === "front"
                ? "Front side of your document"
                : "Back side of your document"}
            </h3>
            <p className="text-sm text-[#4B5563] mb-4">
              Upload the {side === "front" ? "front" : "back"} side of your
              document
            </p>
          </div>
        </div>
        <div className="mt-4 text-center">
          <Button
            onClick={() => {
              if (side === "front") {
                frontInputRef.current?.click();
              } else {
                backInputRef.current?.click();
              }
            }}
            className="bg-[#0BAB7C] hover:bg-[#0BAB7C]/90 focus:bg-[#0BAB7C]/90 text-white rounded-full px-6 cursor-pointer transition-colors"
          >
            Choose a file
          </Button>
        </div>
      </div>
    );
  };

  const canContinue =
    verification.frontSide.status === "success" &&
    verification.backSide.status === "success";

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-[#111827] mb-2">
          {getDocumentLabel()}
        </h1>
        <p className="text-[#4B5563]">Upload a photo of your document</p>
      </div>

      <div className="md:bg-white rounded-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Front Side */}
          <div>
            {renderUploadArea("front")}
            <input
              ref={frontInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect("front", file);
              }}
            />
          </div>

          {/* Back Side */}
          <div>
            {renderUploadArea("back")}
            <input
              ref={backInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect("back", file);
              }}
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <Button
            onClick={handleContinue}
            disabled={!canContinue}
            className={`w-full max-w-md rounded-full py-3 font-medium transition-colors ${
              canContinue
                ? "bg-[#0BAB7C] hover:bg-[#0BAB7C]/90 focus:bg-[#0BAB7C]/90 text-white cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Continue
          </Button>

          <button
            onClick={() => setDocumentType(null)}
            className="text-sm text-[#0BAB7C] hover:underline focus:underline cursor-pointer transition-colors"
          >
            Choose a different ID document
          </button>
        </div>
      </div>
    </div>
  );
}
