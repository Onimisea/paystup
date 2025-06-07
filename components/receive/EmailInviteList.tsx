"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Plus, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

interface EmailInviteListProps {
  emails: string[];
  onEmailsChange: (emails: string[]) => void;
  maxEmails?: number;
}

export default function EmailInviteList({ 
  emails, 
  onEmailsChange, 
  maxEmails = 10 
}: EmailInviteListProps) {
  const [newEmail, setNewEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  
  const t = useTranslations("Receive");

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAddEmail = () => {
    const trimmedEmail = newEmail.trim().toLowerCase();
    
    // Clear previous error
    setEmailError("");

    // Validate email format
    if (!validateEmail(trimmedEmail)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    // Check for duplicates
    if (emails.includes(trimmedEmail)) {
      setEmailError("This email is already added");
      return;
    }

    // Check max limit
    if (emails.length >= maxEmails) {
      setEmailError(`Maximum ${maxEmails} emails allowed`);
      return;
    }

    // Add email to list
    onEmailsChange([...emails, trimmedEmail]);
    setNewEmail("");
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    onEmailsChange(emails.filter(email => email !== emailToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddEmail();
    }
  };

  const handleInputChange = (value: string) => {
    setNewEmail(value);
    if (emailError) {
      setEmailError("");
    }
  };

  return (
    <div className="space-y-4">
      {/* Email Input */}
      <div className="space-y-2">
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              type="email"
              value={newEmail}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t("sharing.email.placeholder")}
              className={`${emailError ? "border-red-500" : ""}`}
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>
          <Button
            onClick={handleAddEmail}
            disabled={!newEmail.trim() || emails.length >= maxEmails}
            className="bg-[#0BAB7C] hover:bg-[#0BAB7C]/90 text-white px-4"
          >
            <Plus className="w-4 h-4 mr-1" />
            {t("sharing.email.add")}
          </Button>
        </div>
        
        {/* Email count indicator */}
        <p className="text-xs text-[#4B5563]">
          {emails.length}/{maxEmails} emails added
        </p>
      </div>

      {/* Email List */}
      {emails.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-[#111827]">
            Email Invitations ({emails.length})
          </h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {emails.map((email, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-[#F9FAFB] rounded-lg px-3 py-2 border"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Mail className="w-4 h-4 text-[#4B5563] flex-shrink-0" />
                  <span className="text-sm text-[#111827] truncate">
                    {email}
                  </span>
                </div>
                <Button
                  onClick={() => handleRemoveEmail(email)}
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600 flex-shrink-0"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {emails.length === 0 && (
        <div className="text-center py-6 border-2 border-dashed border-gray-200 rounded-lg">
          <Mail className="w-8 h-8 mx-auto text-gray-400 mb-2" />
          <p className="text-sm text-[#4B5563]">
            No email invitations added yet
          </p>
          <p className="text-xs text-[#808080] mt-1">
            Add email addresses to send payment request invitations
          </p>
        </div>
      )}

      {/* Help Text */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-xs text-blue-800">
          💡 <strong>Tip:</strong> Email invitations will include a direct payment link and QR code for easy payment.
        </p>
      </div>
    </div>
  );
}
