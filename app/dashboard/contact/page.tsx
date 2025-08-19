"use client";
import { useEffect, useState } from "react";
import { CheckIcon, ClockIcon, EyeOpenIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Card, CardHeader, CardBody, Button, Input, Select, SelectItem, Chip, Skeleton } from "@heroui/react";

type Ticket = {_id: string; name: string; email: string; phone: string; subject: string; message: string; read: boolean; createdAt: string;};

export default function ContactDashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // fetch data
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch("/api/contact");
        const data = await res.json();
        setTickets(data.contacts);
        setFilteredTickets(data.contacts);
      } catch (err) {
        console.error("Failed to load tickets", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  // filter tickets
  useEffect(() => {
    let filtered = tickets;
    if (searchTerm) filtered = filtered.filter(t =>
      [t.name, t.email, t.phone, t.createdAt, t.subject, t.message].some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    if (statusFilter === "read") filtered = filtered.filter(t => t.read);
    else if (statusFilter === "unread") filtered = filtered.filter(t => !t.read);
    setFilteredTickets(filtered);
  }, [tickets, searchTerm, statusFilter]);

  // mark as read method
  const markAsRead = async (id: string) => {
    try {
      const res = await fetch("/api/contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, read: true }),
      });
      if (res.ok) setTickets(prev => prev.map(t => (t._id === id ? { ...t, read: true } : t)));
    } catch (err) {
      console.error("Failed to update ticket status", err);
    }
  };

  return (
    <div className="flex flex-col gap-6 px-8 py-4">
      {/* context */}
      <div className="space-y-1 text-center mb-6">
        <h1 className="text-xl font-semibold">Contact Section</h1>
        <p className="text-sm text-default-500">You can see tickets submitted by users and filter them or mark them as read.</p>
      </div>

      {/* search & filtering */}
      <div className="flex flex-col sm:flex-row gap-4">
          {/* search bar*/}
          <Input placeholder="Search tickets..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="flex-1 text-muted-foreground" startContent={<MagnifyingGlassIcon />} />
          {/* filter options */}
          <Select placeholder="Filter by status" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="w-full sm:w-48">
            <SelectItem key="all" value="all">All Tickets</SelectItem>
            <SelectItem key="unread" value="unread">Unread</SelectItem>
            <SelectItem key="read" value="read">Read</SelectItem>
          </Select>
      </div>
      
      {/* loading skeleton */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row gap-4">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </CardHeader>
              <CardBody>
                <Skeleton className="h-20 w-full" />
              </CardBody>
            </Card>
          ))}
        </div>
      ) : filteredTickets.length === 0 ? (
        <p className=" text-red-500">{searchTerm || statusFilter !== "all" ? "No tickets found matching your search criteria." : "No contact tickets found."}</p>
      ) : (
        <div className="flex flex-col gap-5">
          {/* contact form list */}
          {filteredTickets.map(({ _id, name, email, phone, subject, message, read, createdAt }) => (
            <Card key={_id} className="transition-all border-l-3 border-primary shadow-sm p-2" >
              <CardHeader className="flex flex-row justify-between items-start gap-3">
                <div className="space-y-1 text-zinc-400">
                  <h2 className="text-md font-semibold text-primary">{subject}</h2>
                  <p className="text-sm">From: <span className="font-medium">{name}</span>&nbsp;|&nbsp;{email}&nbsp;|&nbsp;{phone}</p>
                  <p className="flex items-center text-xs"><ClockIcon className="w-4 h-4 mr-1" />{new Date(createdAt).toLocaleString(undefined, { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
                </div>
                {read ? (
                  <Chip size="sm" variant="shadow" color="default"> 
                    <div className="flex items-center gap-1"> <CheckIcon className="w-4 h-4" /> Read </div> 
                  </Chip>
                ) : (
                  <Button size="sm" variant="solid" onPress={() => markAsRead(_id)} className="flex items-center gap-x-2 bg-primary text-white">
                    <EyeOpenIcon className="h-4 w-4" /><span>Mark as Read</span>
                  </Button>
                )}
              </CardHeader>
              <CardBody className="pt-1"><p className="text-sm">{`" ${message} "`}</p></CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
