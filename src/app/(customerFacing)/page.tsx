import FeatureMultiCard from "@/src/components/FeaturedMultiCard";
import ProductCard, { ProductCardSkeleton } from "@/src/components/ProductCard";
import { Button } from "@/src/components/ui/button";
import db from "@/src/db/db";
import { cache } from "@/src/lib/cache";
import { Product } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { isBrowser, isMobile } from "react-device-detect";

const getMostPopularProducts = cache(
  () => {
    return db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { orders: { _count: "desc" } },
      take: 6,
    });
  },
  ["/", "getMostPopularProducts"],
  { revalidate: 60 * 60 * 24 }
);

const getNewestProducts = cache(() => {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });
}, ["/", "getNewestProducts"]);

const HomePage = () => {
  return (
    <main className="space-y-12 max-w-5xl">
      <ProductGridSection title="Newest" productsFetcher={getNewestProducts} />
      {/* <ProductGridSection
        title="Most Popular"
        productsFetcher={getMostPopularProducts}
      /> */}
    </main>
  );
};

type ProductGridSectionTypes = {
  title: string;
  productsFetcher: () => Promise<Product[]>;
};

const ProductGridSection = async ({
  productsFetcher,
  title,
}: ProductGridSectionTypes) => {
  return (
    <div className="space-y-4">
      {/* <div className="">
        <Image
          src="https://res.cloudinary.com/dyyqzhpji/image/upload/v1724217126/GarageQueen/bomjdmeb7vsbkswojsxy.jpg"
          width={1200}
          height={300}
          // fill
          // objectFit="cover"
          // objectPosition="center"
          alt="garage queen picture"
        />
      </div> */}
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
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
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
    return <ProductCard key={product.id} {...product} />;
  });
};

export default HomePage;
