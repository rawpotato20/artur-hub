"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const contentId = searchParams.get("contentid");

  return (
    <div className="h-[calc(100vh-70px)] flex flex-col justify-center items-center w-auto">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold mt-3" id="heading">
          Jūsų turinys buvo įkeltas!
        </h1>
        <p className="mt-1 text-lg">Dabar Jūs galite:</p>
        <div className="w-full">
          <Link href={`/${username}/content/${contentId}`}>
            <Button className="w-full mt-2 bg-gradient">
              Peržiūrėti įkeltą turinį
            </Button>
          </Link>
          <Link href={"/"}>
            <Button className="w-full mt-2">Grįžti į pagrindinį puslapį</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
