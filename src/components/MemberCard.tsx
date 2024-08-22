import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { formatCurrency } from "@/src/lib/formatter";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter } from "lucide-react";

type Props = {
  id: string;
  name: string;
  priceInCents: number;
  description: string;
  imagePath: string;
};

const MemberCard = ({
  id,
  name,
  priceInCents,
  description,
  imagePath,
}: Props) => {
  return (
    <Card className="flex overflow-hidden flex-col">
      <div className="relative w-full h-auto aspect-3/2">
        <Image src={imagePath} fill alt={name} />
      </div>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{formatCurrency(priceInCents / 100)}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="line-clamp-4">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-end space-x-1">
        <Button asChild className="rounded-full bg-slate-500 w-6 h-6" size="xs">
          <Link href={`/products/${id}/purchase`}>
            {" "}
            <Facebook size={15} />
          </Link>
        </Button>
        <Button asChild className="rounded-full bg-slate-500 w-6 h-6" size="xs">
          <Link href={`/products/${id}/purchase`}>
            {" "}
            <Instagram size={15} />
          </Link>
        </Button>
        <Button asChild className="rounded-full bg-slate-500 w-6 h-6" size="xs">
          <Link href={`/products/${id}/purchase`}>
            {" "}
            <Twitter size={15} />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export const MemberCardSkeleton = () => {
  return (
    <Card className="overflow-hidden flex flex-col animate-pulse">
      <div className="w-full aspect-video bg-gray-300" />
      <CardHeader>
        <CardTitle>
          <div className="w-3/4 h-6 rounded-full bg-gray-300" />
        </CardTitle>
        <CardDescription>
          <div className="w-1/2 h-4 rounded-full bg-gray-300" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-3/4 h-4 rounded-full bg-gray-300" />
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled size="lg"></Button>
      </CardFooter>
    </Card>
  );
};

export default MemberCard;
