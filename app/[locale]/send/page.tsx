import { Metadata } from "next";
import SendClient from "@/components/send/SendClient";

export const metadata: Metadata = {
  title: "Send Money - Paystup",
  description: "Send money to friends and family worldwide with Paystup",
};

export default function SendPage() {
  return <SendClient />;
}
