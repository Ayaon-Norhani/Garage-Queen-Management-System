// @ts-nocheck

import FeatureMultiCard from "@/src/components/FeaturedMultiCard";
import MemberCard, { MemberCardSkeleton } from "@/src/components/MemberCard";
import { Button } from "@/src/components/ui/button";
import db from "@/src/db/db";
import { cache } from "@/src/lib/cache";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { isBrowser, isMobile } from "react-device-detect";

const getMostPopularMembers = cache(
  () => {
    return db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { orders: { _count: "desc" } },
      take: 6,
    });
  },
  ["/", "getMostPopularMembers"],
  { revalidate: 60 * 60 * 24 }
);

const getNewestMembers = cache(() => {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });
}, ["/", "getNewestMembers"]);

const HomePage = () => {
  return (
    <main className="space-y-12 max-w-5xl">
      <MemberGridSection title="Newest" productsFetcher={getNewestMembers} />
    </main>
  );
};

type MemberGridSectionTypes = {
  title: string;
  productsFetcher: () => Promise<Product[]>;
};

const MemberGridSection = async ({
  productsFetcher,
  title,
}: MemberGridSectionTypes) => {
  return (
    <div className="space-y-4">
      <div className="hidden md:block">
        <FeatureMultiCard />
      </div>
      <div className="flex gap-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Button variant="outline" asChild>
          <Link href="/products" className="space-x-2">
            <span>View All</span>
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense
          fallback={
            <>
              <MemberCardSkeleton />
              <MemberCardSkeleton />
              <MemberCardSkeleton />
            </>
          }
        >
          <ProductSuspense productsFetcher={productsFetcher} />
        </Suspense>
      </div>
    </div>
  );
};

const ProductSuspense = async ({
  productsFetcher,
}: {
  productsFetcher: () => Promise<Product[]>;
}) => {
  return (await productsFetcher()).map((product) => {
    return <MemberCard key={product.id} {...product} />;
  });
};

export default HomePage;
