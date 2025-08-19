import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-dvh">
      <div className="animate-pulse">
        <Image src="/lightmodelogo.png" alt="logo" className="block dark:hidden" width={200} height={200} priority />
        <Image src="/darkmodelogo.png" alt="logo" className="hidden dark:block" width={200} height={200} priority />
      </div>
    </div>
  );
}