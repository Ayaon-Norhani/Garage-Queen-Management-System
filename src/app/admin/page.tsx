import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import db from "@/src/db/db";
import { formatCurrency, formatNumber } from "@/src/lib/formatter";
import { getSupportedArchTriples } from "next/dist/build/swc";
import React from "react";

async function getSalesData() {
  const data = await db.order.aggregate({
    _sum: { pricePaidInCents: true },
    _count: true,
  });

  return {
    amount: data._sum.pricePaidInCents || 0 / 100,
    numberOfSales: data._count,
  };
}

async function getUserData() {
  const [userCount, orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: { pricePaidInCents: true },
    }),
  ]);

  return {
    userCount,
    averageValuePerUser:
      userCount === 0
        ? 0
        : (orderData._sum.pricePaidInCents || 0) / userCount / 100,
  };
}

async function getProductData() {
  const [activeCount, inactiveCount] = await Promise.all([
    db.product.count({ where: { isAvailableForPurchase: true } }),
    db.product.count({ where: { isAvailableForPurchase: false } }),
  ]);

  return { activeCount, inactiveCount };
}

const AdminDashboard = async () => {
  const [salesData, userData, productData] = await Promise.all([
    getSalesData(),
    getUserData(),
    getProductData(),
  ]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCard
        title="Sales"
        subtitle={`${formatNumber(salesData.numberOfSales)} Orders`}
        body={formatCurrency(salesData.amount)}
      />

      <DashboardCard
        title="Customers"
        subtitle={`${formatNumber(userData.averageValuePerUser)} Average Value ordered`}
        body={formatNumber(userData.userCount)}
      />

      <DashboardCard
        title="Active Products"
        subtitle={`${formatNumber(
          productData.inactiveCount
        )} Inactive Products`}
        body={formatNumber(productData.activeCount)}
      />
    </div>
  );
};

type DashboardCardProps = {
  title: string;
  subtitle: string;
  body: string;
};

const DashboardCard = ({ title, subtitle, body }: DashboardCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardDescription></CardDescription>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  );
};

export default AdminDashboard;
