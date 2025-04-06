import { SidePanel } from "@/components/SidePanel";

export default function Home() {
  return (
    <>
      <div className="flex">
        <SidePanel />

        <main className="flex-1">
          <h1 className="text-3xl flex justify-center items-center h-[100px]">
            Welcome to the Home Page!
          </h1>
        </main>
      </div>
    </>
  );
}
