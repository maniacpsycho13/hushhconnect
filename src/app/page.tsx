import Image from "next/image";
import Link from "next/link";
import { homepage } from "../../public/profilePage";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import HomePage from "@/components/Home/HomePage";



export default async function Page() {
  const user = await auth();

  if (user.userId) {
    redirect('/onboarding/username');
  }

  return (
    <HomePage />
  );
}
