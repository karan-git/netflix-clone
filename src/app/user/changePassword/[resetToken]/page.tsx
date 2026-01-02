import ResetPassword from "@/components/Signup/ResetPassword";

export default async function ChangePasswordPage({
  params,
}: {
  params: Promise<{ resetToken: string }>;
}) {
  const { resetToken } = await params;
  return <ResetPassword resetToken={resetToken} />;
}
