"use client";
import { useEffect, useState } from "react";
import { Tooltip, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Skeleton, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";
import { addToast } from "@heroui/toast";
import { CheckIcon, Cross1Icon } from "@radix-ui/react-icons";

type RegistrationItem = { _id?: string; name: string; email: string; createdAt: string; status: "pending" | "approved" | "declined"; };

export default function RegistrationDashboard() {
  const [registrations, setRegistrations] = useState<RegistrationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionReg, setActionReg] = useState<{ id: string; name: string } | null>(null);
  const { isOpen: isApproveOpen, onOpen: onApproveOpen, onClose: onApproveClose } = useDisclosure();
  const { isOpen: isDeclineOpen, onOpen: onDeclineOpen, onClose: onDeclineClose } = useDisclosure();

  // fetch registrations from API 
  useEffect(() => { 
    const fetchRegistrations = async () => { 
      try { const res = await fetch("/api/registrations"); 
        const data = await res.json(); 
        setRegistrations(data); 
      } catch (err) { 
        console.error(err); 
        addToast({ title: "Error", description: "Failed to load registrations", color: "danger" }); 
      } finally { 
        setLoading(false); 
      }
    }; fetchRegistrations(); 
  }, []);

  // approve a registration
  const handleApprove = async () => {
    if (!actionReg) return;
    try {
      const res = await fetch("/api/registrations/approve", { method: "POST",  headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: actionReg.id }),});
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to approve");
      setRegistrations((prev) => prev.map((r) => (r._id === actionReg.id ? { ...r, status: "approved" } : r)) );
      addToast({ title: "Approved", description: `${actionReg.name} has been approved`, color: "success" });
      onApproveClose();
    } catch (err: any) {
      console.error(err);
      addToast({ title: "Error", description: err.message, color: "danger" });
    }
  };

  // decline a registration
  const handleDecline = async () => {
    if (!actionReg) return;
    try {
      const res = await fetch("/api/registrations/decline", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: actionReg.id }), });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to decline");
      setRegistrations((prev) => prev.map((r) => (r._id === actionReg.id ? { ...r, status: "declined" } : r)));
      addToast({ title: "Declined", description: `${actionReg.name} has been declined`, color: "danger" });
      onDeclineClose();
    } catch (err: any) {
      console.error(err);
      addToast({ title: "Error", description: err.message, color: "danger" });
    }
  };

  // open confirmation modals
  const openApproveConfirm = (id: string, name: string) => {
    setActionReg({ id, name });
    onApproveOpen();
  };
  const openDeclineConfirm = (id: string, name: string) => {
    setActionReg({ id, name });
    onDeclineOpen();
  };

  return (
    <div className="flex flex-col gap-6 px-8 py-4">
      {/* header */}
      <div className="space-y-1 text-center mb-6">
        <h1 className="text-xl font-semibold">Registration Requests</h1>
        <p className="text-sm text-default-500">Review and manage pending registration requests for new admins.</p>
      </div>

      {/* approve modal */}
      <Modal backdrop="blur" isOpen={isApproveOpen} onClose={onApproveClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Confirm Approval</ModalHeader>
              <ModalBody>
                <p className="text-sm"> Are you sure you want to approve {actionReg?.name}&apos;s registration? This user will become an admin.</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" color="danger" onPress={onClose}>Cancel</Button>
                <Button className="text-white bg-primary" onPress={handleApprove}>Approve</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* decline modal */}
      <Modal backdrop="blur" isOpen={isDeclineOpen} onClose={onDeclineClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Confirm Refusal</ModalHeader>
              <ModalBody>
                <p className="text-sm">  Are you sure you want to decline {actionReg?.name}&apos;s registration? </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" color="danger" onPress={onClose}>Cancel</Button>
                <Button className="text-white bg-primary" onPress={handleDecline}>Decline</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* table */}
      <Table aria-label="Registration requests table">
        {/* table columns */}
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Submitted At</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        {/* table content */}
        <TableBody>
          {/* loading skeleton */}
          {loading ? (
            [...Array(7)].map((_, i) => (
              <TableRow key={`skeleton-${i}`}>
                <TableCell><Skeleton className="h-8 w-32 rounded-md" /></TableCell>
                <TableCell><Skeleton className="h-8 w-64 rounded-md" /></TableCell>
                <TableCell><Skeleton className="h-8 w-40 rounded-md" /></TableCell>
                <TableCell><Skeleton className="h-8 w-24 rounded-md" /></TableCell>
                <TableCell><Skeleton className="h-8 w-32 rounded-md" /></TableCell>
              </TableRow>
            ))
          ) : registrations.length === 0 ? (
            <TableRow className="h-12">
              {/* empty table */}
              <TableCell colSpan={5} className="text-center text-red-500">
                No registration requests found.
              </TableCell>
            </TableRow>
          ) : (
            registrations.map((reg) => (
              <TableRow key={reg._id} className="h-12 transition-colors duration-200 hover:bg-default-100/40">
                {/* name */}
                <TableCell>{reg.name}</TableCell>
                {/* email */}
                <TableCell>{reg.email}</TableCell>
                {/* submission date */}
                <TableCell>{new Date(reg.createdAt).toLocaleString()}</TableCell>
                {/* status */}
                <TableCell>
                  <span className={reg.status === "approved" ? "text-green-600 font-bold capitalize" : reg.status === "pending" ? "text-yellow-600 font-bold capitalize" : "text-red-600 font-bold capitalize"}>
                    {reg.status}
                  </span>
                </TableCell>
                {/* actions */}
                <TableCell>
                  {reg.status === "pending" && (
                    <div className="flex gap-2">
                      {/* approve button */}
                      <Tooltip content="Approve">
                        <Button isIconOnly size="sm" variant="flat" onPress={() => openApproveConfirm(reg._id!, reg.name)}> <CheckIcon />
                        </Button>
                      </Tooltip>
                      {/* decline button */}
                      <Tooltip content="Decline">
                        <Button isIconOnly size="sm" variant="flat" onPress={() => openDeclineConfirm(reg._id!, reg.name)}> <Cross1Icon />
                        </Button>
                      </Tooltip>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}