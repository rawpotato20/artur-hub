"use client";

import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

import { signUpSchema } from "@/lib/validations/SignUpSchema";
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
import { SetStateAction, useState } from "react";
import { uploadToCloudinary } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/actions/user.actions";

const SignUp = () => {
  let uploadedUrl: SetStateAction<string>;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisibleR, setIsPasswordVisibleR] = useState(false);

  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(
    "/other/default-profile-icon.png"
  );

  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setSelectedFile(file);
    }
  }

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    setIsLoading(true);

    if (previewUrl != "/other/default-profile-icon.png" && selectedFile) {
      uploadedUrl = await uploadToCloudinary(selectedFile);
      setPreviewUrl(uploadedUrl);
    }

    const res = await fetch("/api/signUpUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
        username: values.username,
        image: uploadedUrl || previewUrl,
        provider: "Credentials",
      }),
    });

    const data = await res.json();

    if (data.success) {
      router.push("/sign-in");
    } else {
      setIsLoading(false);
      alert("Registration failed, user already exists.");
    }
  }

  return (
    <>
      <div className="min-h-screen max-md:my-5 md:flex md:justify-center md:items-center">
        <div className="mb-5 flex flex-col items-center justify-center md:hidden">
          <Image
            src="/icons/logo.svg"
            width={200}
            height={50}
            alt="logo"
            className="w-[70%]"
          />
          <p className="mt-[-10px] text-[25px] text-secondary">
            Everything Bobin.
          </p>
        </div>

        <div className="bg-primary p-8 rounded-[10px] text-primary flex flex-col">
          <div className="flex">
            <div className="flex flex-col mr-7 max-md:hidden">
              <div className="mb-10">
                <Image
                  src="/icons/logo.svg"
                  width={300}
                  height={50}
                  alt="logo"
                  className="w-full"
                />
                <p className="mt-[-10px] text-[20px] text-secondary">
                  Everything Bobin.
                </p>
              </div>

              <div className="flex flex-col items-center">
                <p className="text-[20px] max-w-[280px] text-center mb-5 font-semibold">
                  Pasirinkite profilio nuotrauką (nebūtina):
                </p>

                <div className="relative w-[261px] h-[261px] rounded-[20px] mb-5 overflow-hidden">
                  <Image
                    src={previewUrl}
                    fill
                    alt="profile photo"
                    className="object-cover"
                  />
                </div>

                <Input type="file" onChange={handleFileChange} />
              </div>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[30px] md:text-[20px]">
                        Vardas:
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[30px] md:text-[20px]">
                        El. Paštas:
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="arturbobin23@gmail.com"
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

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[30px] md:text-[20px]">
                        Pakartokite Slaptažodį:
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="132Artur"
                            {...field}
                            className="text-secondary selection:bg-accent selection:text-black"
                            type={isPasswordVisibleR ? "text" : "password"}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setIsPasswordVisibleR((prev) => !prev)
                            }
                            className="absolute border-none bg-transparent right-4 top-1/2 -translate-y-1/2"
                          >
                            {isPasswordVisibleR ? <Eye /> : <EyeOff />}
                          </button>
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col items-center md:hidden">
                  <p className="text-[20px] max-w-[280px] text-center mb-5 font-semibold">
                    Pasirinkite profilio nuotrauką (nebūtina):
                  </p>

                  <div className="relative w-[261px] h-[261px] rounded-[20px] mb-5 overflow-hidden">
                    <Image
                      src={previewUrl}
                      fill
                      alt="profile photo"
                      className="object-cover"
                    />
                  </div>

                  <Input type="file" onChange={handleFileChange} />
                </div>

                <Button
                  type="submit"
                  className="bg-gradient w-full text-[20px] py-6 md:text-[15px] md:py-4"
                >
                  Registruotis
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
                  Registruotis su Google
                </Button>
              </form>
            </Form>
          </div>

          {isLoading ? (
            <div>
              <p className=" flex justify-center flex-wrap text-[20px] mt-5 md:text-[15px]">
                Prašome palaukti,{" "}
                <span className="text-accent font-bold ml-1">Kraunama...</span>
              </p>
            </div>
          ) : (
            <div>
              <p className=" flex justify-center flex-wrap text-[20px] mt-5 md:text-[15px]">
                Turite paskyrą?{" "}
                <span>
                  <Link href="/sign-in" className="text-accent font-bold ml-1">
                    Prisijunkite
                  </Link>
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SignUp;
