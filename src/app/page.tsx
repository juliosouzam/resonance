import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <OrganizationSwitcher />
      <UserButton />
    </div>
  );
}
