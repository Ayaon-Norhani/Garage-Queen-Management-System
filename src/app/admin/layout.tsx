import { Nav, NavLinks } from "@/src/components/Nav";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav>
        <NavLinks href="/admin">Dashboard</NavLinks>
        <NavLinks href="/admin/products">Members</NavLinks>
        <NavLinks href="/admin/users">Customers</NavLinks>
        <NavLinks href="/admin/orders">Sales</NavLinks>
      </Nav>
      <div className="container my-6">{children}</div>
    </>
  );
}
