import { redirect } from "next/navigation";
import { getCurrentCustomer, isAdmin } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const customer = await getCurrentCustomer();

  if (!isAdmin(customer)) {
    redirect("/login");
  }

  return <>{children}</>;
}