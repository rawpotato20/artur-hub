"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

import { signInSchema } from "@/lib/validations/SignInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const router = useRouter();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    setIsLoading(true);

    const { email, password } = values;

    try {
      const res = await fetch("api/signInUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log(data);

      sessionStorage.setItem("refreshToken", data.refreshToken);

      if (res.ok) {
        console.log("Sign-in successful", data);
        router.push("/");
      } else {
        setIsLoading(false);
        console.error("Sign-in failed", data.message);
        alert(data.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error during sign-in", error);
      alert("An error occurred during sign-in. Please try again.");
    }
  }
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center">
        <div className="mb-5 flex flex-col items-center justify-center md:w-full">
          <Image
            src="/icons/logo.svg"
            width={200}
            height={200}
            alt="logo"
            className="w-full"
          />
          <p className="mt-[-10px] text-[25px] md:text-[30px] text-secondary">
            Everything Bobin.
          </p>
        </div>

        <div className="bg-primary p-8 rounded-[10px] text-primary flex flex-col">
          <div className="flex">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[30px] md:text-[20px]">
                        El. Paštas:
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="DJPipiska"
                          {...field}
                          className="text-secondary selection:bg-accent selection:text-black"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel className="text-[30px] md:text-[20px]">
                        Slaptažodis:
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="132Artur"
                            {...field}
                            className="text-secondary selection:bg-accent selection:text-black"
                            type={isPasswordVisible ? "text" : "password"}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setIsPasswordVisible((prev) => !prev)
                            }
                            className={`absolute border-none bg-transparent right-4 top-1/2 -translate-y-1/2 ${""}`}
                          >
                            {isPasswordVisible ? <Eye /> : <EyeOff />}
                          </button>
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="bg-gradient w-full text-[20px] py-6 md:text-[15px] md:py-4"
                >
                  Prisijungti
                </Button>

                <Button className="bg-secondary w-full text-[20px] py-6 md:text-[15px] md:py-4">
                  <span>
                    <Image
                      src="/icons/google.svg"
                      width={20}
                      height={20}
                      alt="Google Logo"
                    />
                  </span>
                  Prisijungti su Google
                </Button>
              </form>
            </Form>
          </div>

          {isLoading ? (
            <p className=" flex justify-center flex-wrap text-[20px] mt-5 md:text-[15px]">
              Prašome palaukti,{" "}
              <span className="text-accent font-bold ml-1">Kraunama...</span>
            </p>
          ) : (
            <p className=" flex justify-center flex-wrap text-[20px] mt-5 md:text-[15px]">
              Neturite paskyros?{" "}
              <span>
                <Link href="/sign-up" className="text-accent font-bold ml-1">
                  Registruokitės
                </Link>
              </span>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default SignIn;
