import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function RegistrationsLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  // get the session server-side
  const session = await getServerSession(authOptions);

  // check if user is authenticated and has the "Super" role
  if (!session || session.user.role !== "Super") {
    // redirect to unauthorized page
    redirect("/unauthorized"); 
  }

  return <main>{children}</main>;
}