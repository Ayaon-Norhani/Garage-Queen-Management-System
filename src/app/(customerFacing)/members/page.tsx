import MemberCard, { MemberCardSkeleton } from "@/src/components/MemberCard";
import db from "@/src/db/db";
import { cache } from "@/src/lib/cache";
import React, { Suspense } from "react";

type Props = {};

const getProducts = cache(() => {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { name: "asc" },
  });
}, ["/products", "getProducts"]);

const ProductsPage = (props: Props) => {
  return (
    <div className="">
      <h2 className="text-3xl font-bold mb-5">Members</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl">
        <Suspense
          fallback={
            <>
              <MemberCardSkeleton />
              <MemberCardSkeleton />
              <MemberCardSkeleton />
              <MemberCardSkeleton />
              <MemberCardSkeleton />
              <MemberCardSkeleton />
            </>
          }
        >
          <ProductsSuspense />
        </Suspense>
      </div>
    </div>
  );
};

async function ProductsSuspense() {
  const products = await getProducts();

  return products.map((product) => (
    <MemberCard key={product.id} {...product} />
  ));
}

export default ProductsPage;
