"use client";
import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Input, Textarea, Skeleton, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@heroui/react";
import { Pencil1Icon, TrashIcon, PlusIcon, StarFilledIcon } from "@radix-ui/react-icons";
import { addToast } from "@heroui/toast";

type TestimonialItem = { _id?: string; rating: number; name: string; role: string; testimonial: string };

export default function TestimonialsDashboard() {
  const [items, setItems] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState<TestimonialItem>({ rating: 5, name: "", role: "", testimonial: "" });
  const [editItem, setEditItem] = useState<TestimonialItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();


  // fetch data
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("/api/testimonials");
        setItems(await res.json());
      } catch {
        addToast({ title: "Error", description: "Failed to load testimonials", color: "danger" });
      } finally { setLoading(false); }
    };
    fetchItems();
  }, []);

  // add new testimonial
  const handleAdd = async () => {
    const { rating, name, role, testimonial } = newItem;
    if (!rating || !name || !role || !testimonial) return addToast({ title: "Missing inputs", description:"Please fill out all the fields.", color: "warning" });
    try {
      const res = await fetch("/api/testimonials", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newItem),});
      const saved = await res.json();
      setItems((prev) => [...prev, saved]);
      setNewItem({ rating: 5, name: "", role: "", testimonial: "" });
      onClose(); addToast({ title: "Added", description: "Testimonial added successfully", color: "success" });
    } catch {
      addToast({ title: "Error", description: "Failed to add testimonial", color: "danger" });
    }
  };

  // update testimonial
  const handleUpdate = async () => {
    if (!editItem || !editItem._id) return;
    const { rating, name, role, testimonial } = editItem;
    if (!rating || !name || !role || !testimonial) return addToast({ title: "Missing inputs", description: "Please fill out all the fields.", color: "warning" });
    try {
      await fetch(`/api/testimonials/${editItem._id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editItem) });
      setItems((prev) => prev.map((item) => item._id === editItem._id ? editItem : item));
      onEditClose();
      addToast({ title: "Updated", description: "Testimonial updated successfully", color: "success" });
    } catch {
      addToast({ title: "Error", description: "Failed to update testimonial", color: "danger" });
    }
  };

  // delete testimonial
  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await fetch(`/api/testimonials/${deleteId}`, { method: "DELETE" });
      setItems((prev) => prev.filter((item) => item._id !== deleteId));
      onDeleteClose();
      addToast({ title: "Deleted", description: "Testimonial deleted successfully", color: "success" });
    } catch {
      addToast({ title: "Error", description: "Failed to delete", color: "danger" });
    }
  };

  return (
    <div className="flex flex-col gap-6 px-8 py-4">

      {/* header */}
      <div className="space-y-1 text-center mb-6">
        <h1 className="text-xl font-semibold">Testimonials Section</h1>
        <p className="text-sm text-default-500">You can modify testimonials shown on the website.</p>
      </div>
      

      {/* Add Testimonial button */}
      <div className="flex justify-end mb-1"><Button startContent={<PlusIcon />} onPress={onOpen}>Add Testimonial</Button></div>

      {/* Add Modal */}
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>{(onClose) => (
          <>
            <ModalHeader>Add New Testimonial</ModalHeader>
            <ModalBody>
              <Input placeholder="Name" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
              <Input placeholder="Role" value={newItem.role} onChange={(e) => setNewItem({ ...newItem, role: e.target.value })} />
              <Input placeholder="Rating" type="number" min={1} max={5} value={newItem.rating.toString()} onChange={(e) => setNewItem({ ...newItem, rating: parseInt(e.target.value) || 0 })} />
              <Textarea placeholder="Testimonial" value={newItem.testimonial} onChange={(e) => setNewItem({ ...newItem, testimonial: e.target.value })} />
            </ModalBody>
            <ModalFooter>
              <Button  variant="light" color="danger" onPress={onClose}>Cancel</Button>
              <Button  onPress={handleAdd}>Save</Button>
            </ModalFooter>
          </>
        )}</ModalContent>
      </Modal>

      {/* Edit Modal */}
      {editItem && (
        <Modal backdrop="blur" isOpen={isEditOpen} onClose={onEditClose}>
          <ModalContent>{(onEditClose) => (
            <>
              <ModalHeader>Edit Testimonial</ModalHeader>
              <ModalBody>
                <Input label="Name" placeholder="Name" value={editItem.name} onChange={(e) => setEditItem({ ...editItem, name: e.target.value })} />
                <Input label="Role" placeholder="Role" value={editItem.role} onChange={(e) => setEditItem({ ...editItem, role: e.target.value })} />
                <Input label="Rating" placeholder="Rating" type="number" min={1} max={5} value={editItem.rating.toString()} onChange={(e) => setEditItem({ ...editItem, rating: parseInt(e.target.value) || 0 })} />
                <Textarea label="Testimonial" placeholder="Testimonial" value={editItem.testimonial} onChange={(e) => setEditItem({ ...editItem, testimonial: e.target.value })} />
              </ModalBody>
              <ModalFooter>
                <Button  variant="light" color="danger" onPress={onEditClose}>Cancel</Button>
                <Button  onPress={handleUpdate}>Save</Button>
              </ModalFooter>
            </>
          )}</ModalContent>
        </Modal>
      )}

      {/* Delete Modal */}
      <Modal backdrop="blur" isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalContent>{(onDeleteClose) => (
          <>
            <ModalHeader>Confirm Deletion</ModalHeader>
            <ModalBody><p className="text-sm">Are you sure you want to delete this testimonial?</p></ModalBody>
            <ModalFooter><Button  variant="light" color="danger" onPress={onDeleteClose}>Cancel</Button><Button  className="text-white bg-primary" onPress={handleDelete}>Delete</Button></ModalFooter>
          </>
        )}</ModalContent>
      </Modal>

      {loading ? (
        <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* skeleton */}
          {[...Array(6)].map((_, i) => <Card key={i} className="p-6"><Skeleton className="h-28 mb-4" /><Skeleton className="h-4 w-1/2 mb-1" /><Skeleton className="h-3 w-1/3" /></Card>)}
        </div>
      ) : items.length === 0 ? (
        <p className="text-red-500">No testimonials found.</p>
      ) : (
        <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* testimonial cards */}
          {items.map((item) => (
            <Card key={item._id} className="p-6 flex flex-col h-full">
              <CardHeader className="mb-4 p-0">
                <div className="flex gap-1">{[...Array(item.rating)].map((_, i) => <StarFilledIcon key={i} className="text-yellow-500" />)}</div>
              </CardHeader>
              <CardBody className="flex flex-col flex-grow p-0">
                <p className="text-muted-foreground text-sm mb-4">“{item.testimonial}”</p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center text-sm font-medium border border-primary/20">
                    {item.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div><h4 className="font-semibold text-sm">{item.name}</h4><p className="text-xs text-muted-foreground">{item.role}</p></div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button size="sm" className="flex-1" startContent={<Pencil1Icon />} onPress={() => { setEditItem(item); onEditOpen(); }}>Edit</Button>
                  <Button size="sm" className="flex-1 bg-primary text-white" startContent={<TrashIcon />} onPress={() => { setDeleteId(item._id!); onDeleteOpen(); }}>Delete</Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
