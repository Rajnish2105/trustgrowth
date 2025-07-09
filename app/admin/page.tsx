import { auth } from "@/auth";
import AdminPanel from "@/components/adminPanel/admin-home";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();
  if (session?.user.role != "ADMIN") {
    redirect("/");
  }

  return (
    <AdminPanel
      username={session.user.username as string}
      useremail={session.user.email as string}
    />
  );
}
