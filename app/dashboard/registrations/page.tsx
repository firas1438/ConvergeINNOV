"use client";
import { useEffect, useState } from "react";
import { Tooltip, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Skeleton } from "@heroui/react";
import { addToast } from "@heroui/toast";
import { CheckIcon, Cross1Icon } from "@radix-ui/react-icons";

type RegistrationItem = { _id?: string; name: string; email: string; createdAt: string;  status: "pending" | "approved" | "declined"; };

export default function RegistrationDashboard() {
  const [registrations, setRegistrations] = useState<RegistrationItem[]>([]);
  const [loading, setLoading] = useState(true);

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
  const handleApprove = async (id: string, name: string) => {
    try {
      const res = await fetch("/api/registrations/approve", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }),});
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to approve");
      setRegistrations((prev) => prev.map((r) => r._id === id ? { ...r, status: "approved" } : r));
      addToast({ title: "Approved", description: `${name} has been approved`, color: "success" });
    } catch (err: any) {
      console.error(err);
      addToast({ title: "Error", description: err.message, color: "danger" });
    }
  };

  // decline a registration
  const handleDecline = async (id: string, name: string) => {
    try {
      const res = await fetch("/api/registrations/decline", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }),});
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to decline");
      setRegistrations((prev) => prev.map((r) => r._id === id ? { ...r, status: "declined" } : r));
      addToast({ title: "Declined", description: `${name} has been declined`, color: "danger" });
    } catch (err: any) {
      console.error(err);
      addToast({ title: "Error", description: err.message, color: "danger" });
    }
  };

  return (
    <div className="flex flex-col gap-6 px-8 py-4">
      {/* header */}
      <div className="space-y-1 text-center mb-6">
        <h1 className="text-xl font-semibold">Registration Requests</h1>
        <p className="text-sm text-default-500">Review and manage pending registration requests for new admins.</p>
      </div>

      {/* table */}
      <Table aria-label="Registration requests table">
        {/* table titles */}
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
            [...Array(5)].map((_, i) => (
              <TableRow key={`skeleton-${i}`}>
                <TableCell><Skeleton className="h-7 w-32 rounded-md" /></TableCell>
                <TableCell><Skeleton className="h-7 w-64 rounded-md" /></TableCell>
                <TableCell><Skeleton className="h-7 w-40 rounded-md" /></TableCell>
                <TableCell><Skeleton className="h-7 w-24 rounded-md" /></TableCell>
                <TableCell><Skeleton className="h-7 w-32 rounded-md" /></TableCell>
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
              <TableRow key={reg._id} className="h-12">
                {/* name */}
                <TableCell>{reg.name}</TableCell>
                {/* email */}
                <TableCell>{reg.email}</TableCell>
                {/* submission date */}
                <TableCell>{new Date(reg.createdAt).toLocaleString()}</TableCell>
                {/* status */}
                <TableCell>
                  <span className={reg.status === "approved" ? "text-green-600 font-bold capitalize" : reg.status === "pending" ? "text-yellow-600 font-bold capitalize" :"text-red-600 font-bold capitalize"}>
                    {reg.status}
                  </span>
                </TableCell>
                {/* actions */}
                <TableCell>
                  {reg.status === "pending" && (
                    <div className="flex gap-2">
                      {/* approve button */}
                      <Tooltip content="Approve">
                        <Button isIconOnly size="sm" variant="flat" onPress={() => handleApprove(reg._id!, reg.name)}> <CheckIcon /> </Button>
                      </Tooltip>
                      {/* decline button */}
                      <Tooltip content="Decline">
                        <Button isIconOnly size="sm" variant="flat" onPress={() => handleDecline(reg._id!, reg.name)}> <Cross1Icon /></Button>
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
