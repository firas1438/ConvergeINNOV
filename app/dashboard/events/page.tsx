"use client";
import { useEffect, useState } from "react";
import { Button, Card, CardBody, Input, Textarea, Image, Skeleton, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@heroui/react";
import { Pencil1Icon, TrashIcon, PlusIcon, CalendarIcon, GlobeIcon } from "@radix-ui/react-icons";
import { addToast } from "@heroui/toast";

type EventItem = { _id?: string; title: string; date: string; location: string; image: string; description: string; };

export default function EventsDashboard() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newEvent, setNewEvent] = useState<EventItem>({ title: "", date: "", location: "", image: "", description: "" });
  const [editEvent, setEditEvent] = useState<EventItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

  // fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        setEvents(data.events); 
      } catch {
        addToast({ title: "Error", description: "Failed to load events", color: "danger" });
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // add event
  const handleAdd = async () => {
    const { title, date, location, image, description } = newEvent;
    if (!title || !date || !location || !image || !description)
      return addToast({ title: "Missing inputs", description: "Please fill out all fields", color: "warning" });

    try {
      const res = await fetch("/api/events", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...newEvent, date: new Date(newEvent.date) }),});

      const saved = await res.json();
      setEvents((prev) => [...prev, saved]);
      setNewEvent({ title: "", date: "", location: "", image: "", description: "" });
      onClose(); addToast({ title: "Added", description: "Event added successfully", color: "success" });
    } catch {
      addToast({ title: "Error", description: "Failed to add event", color: "danger" });
    }
  };

  // delete event
  const handleUpdate = async () => {
    if (!editEvent || !editEvent._id) return;
    const { title, date, location, image, description } = editEvent;
    if (!title || !date || !location || !image || !description)
      return addToast({ title: "Missing inputs", description: "Please fill out all fields", color: "warning" });

    try {
      await fetch(`/api/events/${editEvent._id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...editEvent, date: new Date(editEvent.date) }),});
      setEvents((prev) => prev.map((e) => (e._id === editEvent._id ? editEvent : e)));
      onEditClose(); addToast({ title: "Updated", description: "Event updated successfully", color: "success" });
    } catch {
      addToast({ title: "Error", description: "Failed to update event", color: "danger" });
    }
  };

  // delete event
  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await fetch(`/api/events/${deleteId}`, { method: "DELETE" });
      setEvents((prev) => prev.filter((e) => e._id !== deleteId));
      onDeleteClose();
      addToast({ title: "Deleted", description: "Event deleted successfully", color: "success" });
    } catch {
      addToast({ title: "Error", description: "Failed to delete event", color: "danger" });
    }
  };

  return (
    <div className="flex flex-col gap-6 px-8 py-4">
      {/* header */}
      <div className="space-y-1 text-center mb-6">
        <h1 className="text-xl font-semibold">Events Section</h1>
        <p className="text-sm text-default-500">You can manage the list of upcoming and past events.</p>
      </div>

      <div className="flex justify-end"><Button startContent={<PlusIcon />} onPress={onOpen}>Add Event</Button></div>

      {/* Add Modal */}
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader>Add Event</ModalHeader>
              <ModalBody>
                <Input placeholder="Title" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                <Input type="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
                <Input placeholder="Location" value={newEvent.location} onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })} />
                <Input placeholder="Image URL" value={newEvent.image} onChange={(e) => setNewEvent({ ...newEvent, image: e.target.value })} />
                <Textarea placeholder="Description" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} />
              </ModalBody>
              <ModalFooter>
                <Button  variant="light" color="danger" onPress={onClose}>Cancel</Button>
                <Button  onPress={handleAdd}>Save</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Edit Modal */}
      {editEvent && (
        <Modal backdrop="blur" isOpen={isEditOpen} onClose={onEditClose}>
          <ModalContent>
            {() => (
              <>
                <ModalHeader>Edit Event</ModalHeader>
                <ModalBody>
                  <Input label="Title" value={editEvent.title} onChange={(e) => setEditEvent({ ...editEvent, title: e.target.value })} />
                  <Input label="Date" type="date" value={editEvent.date} onChange={(e) => setEditEvent({ ...editEvent, date: e.target.value })} />
                  <Input label="Location" value={editEvent.location} onChange={(e) => setEditEvent({ ...editEvent, location: e.target.value })} />
                  <Input label="ImageURL" value={editEvent.image} onChange={(e) => setEditEvent({ ...editEvent, image: e.target.value })} />
                  <Textarea label="Description" value={editEvent.description} onChange={(e) => setEditEvent({ ...editEvent, description: e.target.value })} />
                </ModalBody>
                <ModalFooter>
                  <Button variant="light" color="danger" onPress={onEditClose}>Cancel</Button>
                  <Button onPress={handleUpdate}>Save</Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      <Modal backdrop="blur" isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader>Delete Event</ModalHeader>
              <ModalBody><p>Are you sure you want to delete this event?</p></ModalBody>
              <ModalFooter>
                <Button variant="light" color="danger" onPress={onDeleteClose}>Cancel</Button>
                <Button className="bg-primary text-white" onPress={handleDelete}>Delete</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* skeleton */}
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="p-6">
              <Skeleton className="h-48 mb-4" /> <Skeleton className="h-4 w-1/2 mb-2" /> <Skeleton className="h-3 w-5/6 mb-1" /> <Skeleton className="h-3 w-4/6 mb-3" />
              <div className="flex gap-2 mb-2"> <Skeleton className="h-3 w-1/3" /> <Skeleton className="h-3 w-1/4" /> </div>
              <div className="flex gap-2 pt-2"> <Skeleton className="h-8 w-1/2 rounded-md" /> <Skeleton className="h-8 w-1/2 rounded-md" /> </div>
            </Card>
          ))}
        </div>
      ) : (

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
          {/* event cards */}
          {events.map((event) => (
              <Card key={event._id} className="relative overflow-hidden group flex flex-col h-full before:absolute before:inset-0">
                <Image src={event.image} alt={event.title} className="w-full h-48 object-cover rounded-t-lg flex-shrink-0" removeWrapper />
                <CardBody className="p-4 space-y-1 flex flex-col flex-grow min-h-[180px]">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-sm">{event.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground pb-2 flex-grow">{event.description}</p>
                  <div className="flex items-center gap-2 mt-auto">
                    <CalendarIcon className="w-5 h-5 text-muted-foreground" /> <p className="text-xs text-muted-foreground flex items-center gap-1"> {new Date(event.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <GlobeIcon className="w-5 h-5 text-muted-foreground" /> <p className="text-xs text-muted-foreground">{event.location}</p>
                  </div>
                  <div className="flex gap-2 pt-4 pb-2">
                    <Button size="sm" className="flex-1" startContent={<Pencil1Icon />} onPress={() => { setEditEvent(event); onEditOpen(); }}>Edit</Button>
                    <Button size="sm" className="flex-1 bg-primary text-white" startContent={<TrashIcon />} onPress={() => { setDeleteId(event._id!); onDeleteOpen(); }}>Delete</Button>
                  </div>
                </CardBody>
              </Card>
          ))}
        </div>
      )}
    </div>
  );
}
