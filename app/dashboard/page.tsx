import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardContent from "../components/dashboard-content";
import { Providers } from "../components/providers";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <Providers>
      <DashboardContent />
    </Providers>
  );
}
