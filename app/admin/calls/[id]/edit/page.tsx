import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { EditCallForm } from "@/components/adminPanel/EditCallForm";

interface EditCallPageProps {
  params: {
    id: string;
  };
}

export default async function EditCallPage({ params }: EditCallPageProps) {
  const session = await auth();
  const { id } = await params;

  if (session?.user.role !== "ADMIN") {
    redirect("/");
  }

  return <EditCallForm callId={id} />;
}
