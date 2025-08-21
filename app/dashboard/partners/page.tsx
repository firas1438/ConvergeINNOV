"use client";
import { useEffect, useState } from "react";
import { Input, Textarea, Button, Card, CardBody, Skeleton, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";
import { TrashIcon, Pencil1Icon, PlusIcon } from "@radix-ui/react-icons";
import { addToast } from "@heroui/toast";


export default function PartnerDashboard() {


  return (
    <div className="flex flex-col gap-6 px-8 py-4">
      {/* Header */}
      <div className="space-y-1 text-center mb-6">
        <h1 className="text-xl font-semibold">Partners Section</h1>
        <p className="text-sm text-default-500">You can add new partners, modify them or even delete old ones.</p>
      </div>

      {/* Add FAQ Button */}
      <div className="flex justify-end mb-1">
        <Button startContent={<PlusIcon />}>Add Partner</Button>
      </div>
      
    </div>
  );
}
