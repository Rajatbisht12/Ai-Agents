import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button"; // assuming you're using shadcn/ui

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <SignOutButton>
          <Button variant="outline">Sign Out</Button>
        </SignOutButton>
      </div>
      <p>Welcome to your dashboard!</p>
    </div>
  );
}
