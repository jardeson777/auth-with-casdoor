import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const LayoutLogin = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const session = await getServerSession(nextAuthOptions);

  if (session?.user.accessToken) {
    redirect("/home");
  }

  return (
    <>
      {children}
    </>
  );
}

export default LayoutLogin;