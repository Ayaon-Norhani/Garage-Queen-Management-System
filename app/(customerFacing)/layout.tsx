import { Nav, NavLinks } from "@/components/Nav";

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
        <NavLinks href="/products">Products</NavLinks>
        <NavLinks href="/orders">My Orders</NavLinks>
      </Nav>
      <div className="container my-6">{children}</div>
    </>
  );
}
