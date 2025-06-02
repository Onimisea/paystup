import AuthFooter from "@/components/layout/AuthFooter";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="h-screen flex flex-col overflow-hidden">
      <div className="flex-1 overflow-auto">{children}</div>
      <AuthFooter />
    </section>
  );
}
