import { Button } from "@heroui/react";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";


export default function ReturnButton() {
    return (
    <div className="flex gap-18 items-center">
      <Button as={Link} href="/" variant="light" startContent={<ChevronLeftIcon/>} className="text-primary font-bold">
        Home
      </Button>
    </div>
    );
}