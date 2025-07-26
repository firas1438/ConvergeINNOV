"use client";
import { useEffect, useState } from "react";
import {Input, Textarea, Button, Card, CardBody, Image, Skeleton, Modal, CardHeader,ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure,} from "@heroui/react";
import { TrashIcon, Pencil1Icon, PlusIcon } from "@radix-ui/react-icons";
import { addToast } from "@heroui/toast";

type ServiceItem = { _id?: string; category: string; title: string; imageUrl: string; description: string; };

export default function ServicesDashboard() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newService, setNewService] = useState<ServiceItem>({ category: "", title: "", imageUrl: "", description: "" });
  const [editService, setEditService] = useState<ServiceItem | null>(null);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

  // GET method (fetch data)
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services");
        const data = await res.json();
        setServices(data);
      } catch (err) {
        console.error(err);
        addToast({ title: "Error", description: "Failed to load services", color: "danger" });
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // POST method (create new service)
  const handleAdd = async () => {
    const { category, title, imageUrl, description } = newService;
    if (!category || !title || !imageUrl || !description)
      return addToast({ title: "Missing input", description: "Please fill out all fields.", color: "warning" });
    try {
      const res = await fetch("/api/services", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newService) });
      const saved = await res.json();
      setServices((prev) => [...prev, saved]);
      setNewService({ category: "", title: "", imageUrl: "", description: "" });
      onClose(); addToast({ title: "Added", description: "Service added successfully", color: "success" });
    } catch {
      addToast({ title: "Error", description: "Failed to add service", color: "danger" });
    }
  };

  // PATCH method (update existing service)
  const handleUpdate = async () => {
    if (!editService || !editService._id) return;
    const { _id, category, title, imageUrl, description } = editService;
    if (!category || !title || !imageUrl || !description)
      return addToast({ title: "Missing input", description: "Please fill out all fields.", color: "warning" });
    try {
      await fetch(`/api/services/${_id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editService) });
      setServices((prev) => prev.map((s) => s._id === _id ? editService : s));
      onEditClose(); addToast({ title: "Updated", description: "Service updated successfully", color: "success" });
    } catch {
      addToast({ title: "Error", description: "Failed to update service", color: "danger" });
    }
  };

  // DELETE method (delete a service)
  const handleDelete = async () => {
    if (!serviceToDelete) return;
    try {
      await fetch(`/api/services/${serviceToDelete}`, { method: "DELETE" });
      setServices((prev) => prev.filter((s) => s._id !== serviceToDelete));
      onDeleteClose(); addToast({ title: "Deleted", description: "Service deleted successfully", color: "success" });
    } catch {
      addToast({ title: "Error", description: "Failed to delete service", color: "danger" });
    }
  };

  const openDeleteConfirm = (id: string) => { setServiceToDelete(id); onDeleteOpen(); };

  return (
    <div className="flex flex-col gap-6 px-8 py-4">
      {/* header */}
      <div className="space-y-1 text-center mb-6">
        <h1 className="text-xl font-semibold">Services Section</h1>
        <p className="text-sm text-default-500">You can add, update or delete services shown on the website.</p>
      </div>

      <div className="flex justify-end mb-1"><Button startContent={<PlusIcon />} onPress={onOpen}>Add Service</Button></div>

      {/* Add Modal */}
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>{(onClose) => (
          <>
            <ModalHeader>Add New Service</ModalHeader>
            <ModalBody>
              {["category", "title", "imageUrl"].map((field) => (
                <Input key={field} placeholder={field[0].toUpperCase() + field.slice(1)} value={newService[field as keyof ServiceItem]} onChange={(e) => setNewService({ ...newService, [field]: e.target.value })} />
              ))}
              <Textarea placeholder="Description" value={newService.description} onChange={(e) => setNewService({ ...newService, description: e.target.value })} />
            </ModalBody>
            <ModalFooter>
              <Button  variant="light" color="danger" onPress={onClose}>Cancel</Button>
              <Button  onPress={handleAdd}>Save</Button>
            </ModalFooter>
          </>
        )}</ModalContent>
      </Modal>

      {/* Edit Modal */}
      {editService && (
        <Modal backdrop="blur" isOpen={isEditOpen} onClose={onEditClose}>
          <ModalContent>{(onEditClose) => (
            <>
              <ModalHeader>Edit Service</ModalHeader>
              <ModalBody>
                {["category", "title", "imageUrl"].map((field) => (
                  <Input key={field} label={field[0].toUpperCase() + field.slice(1)} placeholder={field[0].toUpperCase() + field.slice(1)} value={editService[field as keyof ServiceItem]} onChange={(e) => setEditService({ ...editService, [field]: e.target.value })} />
                ))}
                <Textarea label="Description" placeholder="Description" value={editService.description} onChange={(e) => setEditService({ ...editService, description: e.target.value })} />
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
            <ModalBody><p className="text-sm">Are you sure you want to delete this service? This action cannot be undone.</p></ModalBody>
            <ModalFooter>
              <Button  variant="light" color="danger" onPress={onDeleteClose}>Cancel</Button>
              <Button  className="text-white bg-primary" onPress={handleDelete}>Delete</Button>
            </ModalFooter>
          </>
        )}</ModalContent>
      </Modal>

      {/* cards */}
      {loading ? (
        <div className="grid gap-6 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 place-content-center"> {/* skeleton */}
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="py-4 w-full max-w-[360px]">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <Skeleton className="h-3 w-24 rounded-md mb-2" />
                <Skeleton className="h-6 w-3/4 rounded-md" />
              </CardHeader>
              <CardBody className="overflow-visible">
                <Skeleton className="h-40 w-full rounded-xl" />
                <div className="mt-5 space-y-2 px-1">
                  <Skeleton className="h-4 w-full rounded-md" />
                  <Skeleton className="h-4 w-5/6 rounded-md" />
                </div>
                <div className="flex gap-2 mt-4 px-1">
                  <Skeleton className="h-8 w-1/2 rounded-md" />
                  <Skeleton className="h-8 w-1/2 rounded-md" />
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      ) : services.length === 0 ? (
        <p className="text-red-500">No services found.</p>
      ) : (
        <div className="grid gap-6 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 place-content-center">
          {/* existing services */}
          {services.map((service) => (
            <div key={service._id} className="group relative">
              <Card className="py-4 w-full max-w-[360px]">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <p className="text-tiny text-primary uppercase font-bold">{service.category}</p>
                  <h4 className="font-bold text-large bg-gradient-to-b from-foreground to-muted-foreground text-transparent bg-clip-text">{service.title}</h4>
                </CardHeader>
                <CardBody className="overflow-visible">
                  <Image  alt={service.title} className="object-cover rounded-xl max-h-40 w-full" src={service.imageUrl} width={340}/>
                  <p className="text-default-500 px-1 mt-5 text-[0.95rem] leading-snug"> {service.description} </p>
                  <div className="flex gap-2 mt-4 w-full"> 
                    <Button size="sm" className="flex-1 " onPress={() => { setEditService(service); onEditOpen();}} startContent={<Pencil1Icon/>}> Edit </Button>
                    <Button size="sm" className="flex-1 bg-primary text-white" onPress={() => openDeleteConfirm(service._id!)} startContent={<TrashIcon />} > Delete</Button>
                  </div>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
