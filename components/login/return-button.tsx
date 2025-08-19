import { Button } from "@heroui/react";
import { ExitIcon } from "@radix-ui/react-icons";
import Link from "next/link";


export default function ReturnButton() {
    return (
    <div className="flex gap-18 items-center">
      <Button as={Link} href="/" variant="light" startContent={<ExitIcon/>} className="text-primary font-bold">
        Return
      </Button>
    </div>
    );
}