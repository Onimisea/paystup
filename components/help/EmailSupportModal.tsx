"use client";

import { useState } from "react";
import { X, Upload, Paperclip, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EmailSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const supportCategories = [
  { value: "transfer_issue", label: "Transfer Issue" },
  { value: "account_problem", label: "Account Problem" },
  { value: "payment_failed", label: "Payment Failed" },
  { value: "verification", label: "Verification Help" },
  { value: "fees_rates", label: "Fees & Exchange Rates" },
  { value: "security", label: "Security Concern" },
  { value: "technical", label: "Technical Issue" },
  { value: "other", label: "Other" },
];

// Zod schema for email support form
const emailSupportSchema = z.object({
  subject: z
    .string()
    .min(1, "Subject is required")
    .max(200, "Subject must be less than 200 characters"),
  category: z.string(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),
  priority: z.enum(["low", "normal", "high", "urgent"]),
});

type EmailSupportFormData = z.infer<typeof emailSupportSchema>;

export default function EmailSupportModal({
  isOpen,
  onClose,
}: EmailSupportModalProps) {
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<EmailSupportFormData>({
    resolver: zodResolver(emailSupportSchema),
    defaultValues: {
      subject: "",
      category: "",
      message: "",
      priority: "normal",
    },
  });

  if (!isOpen) return null;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter((file) => {
      // Limit file size to 10MB
      if (file.size > 10 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is 10MB.`);
        return false;
      }
      return true;
    });

    setAttachments((prev) => [...prev, ...validFiles].slice(0, 5)); // Max 5 files
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: EmailSupportFormData) => {
    setIsSubmitting(true);

    console.log("📧 Email Support Form Submitted:", {
      formData: data,
      attachments: attachments.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
      })),
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    });

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert(
        "Your support request has been submitted successfully! We'll get back to you within 24 hours."
      );

      console.log("✅ Email Support Success:", {
        timestamp: new Date().toISOString(),
        supportTicketId: `TICKET-${Date.now()}`,
        category: data.category,
        priority: data.priority,
      });

      // Reset form
      form.reset();
      setAttachments([]);
      onClose();
    }, 2000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-start pt-8 pb-8 overflow-y-auto">
      <div className="w-full max-w-2xl bg-white rounded-lg mx-4">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-[#111827]">
                Contact Support
              </h2>
              <p className="text-[#4B5563] text-sm mt-1">
                Send us a detailed message and we&apos;ll get back to you as
                soon as possible
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-[#4B5563]" />
            </button>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Subject */}
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-[#111827]">
                      Subject *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Brief description of your issue"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category and Priority */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-[#111827]">
                        Category
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {supportCategories.map((category) => (
                            <SelectItem
                              key={category.value}
                              value={category.value}
                            >
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-[#111827]">
                        Priority
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Message */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-[#111827]">
                      Message *
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please describe your issue in detail. Include any relevant transaction IDs, error messages, or steps you've already tried."
                        className="w-full min-h-[120px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* File Upload */}
              <div>
                <Label className="text-sm font-medium text-[#111827] mb-2 block">
                  Attachments (Optional)
                </Label>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                  <input
                    type="file"
                    multiple
                    accept="image/*,.pdf,.doc,.docx,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-[#4B5563] text-center">
                      Click to upload files or drag and drop
                    </span>
                    <span className="text-xs text-gray-400 mt-1">
                      PNG, JPG, PDF, DOC up to 10MB (Max 5 files)
                    </span>
                  </label>
                </div>

                {/* Attachment List */}
                {attachments.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {attachments.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
                      >
                        <div className="flex items-center gap-3">
                          <Paperclip className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-[#111827]">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeAttachment(index)}
                          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          <X className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 border-gray-300 text-[#4B5563] hover:bg-gray-50"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-[#0BAB7C] hover:bg-[#059669] text-white flex items-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
