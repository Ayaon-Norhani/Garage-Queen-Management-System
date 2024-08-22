import { Nav, NavLinks } from "@/src/components/Nav";

export const dynamic = "force-dynamic";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav>
        <NavLinks href="/">Home</NavLinks>
        <NavLinks href="/members">All Members</NavLinks>
        <NavLinks href="/orders">My Orders</NavLinks>
      </Nav>
      <div className="container my-6 flex justify-center">{children}</div>
    </>
  );
}
