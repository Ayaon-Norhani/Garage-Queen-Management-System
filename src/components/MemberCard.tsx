import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardNickname,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  FacebookIcon,
  Instagram,
  InstagramIcon,
  Music2,
  Store,
  Twitter,
  TwitterIcon,
  Youtube,
} from "lucide-react";

type Props = {
  id: string;
  name: string;
  nickname?: string;
  description: string;
  imagePath: string;
};

const MemberCard = ({ id, name, nickname, description, imagePath }: Props) => {
  return (
    <Card className="flex overflow-hidden flex-col">
      <div className="relative w-full h-auto aspect-3/2">
        <Image src={imagePath} fill alt={name} />
      </div>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardNickname>{nickname}</CardNickname>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="line-clamp-4">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-center space-x">
        <Link href={`/products/${id}/purchase`} className="p-1">
          <FacebookIcon
            size={15}
            className="text-slate-500 hover:text-slate-700"
          />
        </Link>
        <Link href={`/products/${id}/purchase`} className="p-1">
          <InstagramIcon
            size={15}
            className="text-slate-500 hover:text-slate-700"
          />
        </Link>
        <Link href={`/products/${id}/purchase`} className="p-1">
          <TwitterIcon
            size={15}
            className="text-slate-500 hover:text-slate-700"
          />
        </Link>
        <Link href={`/products/${id}/purchase`} className="p-1">
          <Youtube size={15} className="text-slate-500 hover:text-slate-700" />
        </Link>
        <Link href={`/products/${id}/purchase`} className="p-1">
          <Store size={15} className="text-slate-500 hover:text-slate-700" />
        </Link>
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
