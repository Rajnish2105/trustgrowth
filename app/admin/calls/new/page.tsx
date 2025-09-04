import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { CreateCallForm } from "@/components/adminPanel/CreateCallForm";

export default async function NewCallPage() {
  const session = await auth();

  if (session?.user.role !== "ADMIN") {
    redirect("/");
  }

  return <CreateCallForm />;
}
