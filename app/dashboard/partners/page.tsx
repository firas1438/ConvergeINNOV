"use client";
import { useEffect, useState } from "react";
import { Input, Textarea, Button, Card, CardBody, Image, Skeleton, Modal, CardHeader, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, CardFooter, Tooltip } from "@heroui/react";
import { TrashIcon, Pencil1Icon, PlusIcon } from "@radix-ui/react-icons";
import { addToast } from "@heroui/toast";

type PartnerItem = { _id?: string; name: string; description: string; imagepath: string };

export default function PartnerDashboard() {
  const [partners, setPartners] = useState<PartnerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPartner, setNewPartner] = useState<PartnerItem>({ name: "", description: "", imagepath: "" });
  const [editPartner, setEditPartner] = useState<PartnerItem | null>(null);
  const [partnerToDelete, setPartnerToDelete] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

  // fetch partners from /api/partners
  useEffect(() => { (async () => {
    try { const res = await fetch("/api/partners"); setPartners(await res.json()); }
    catch { addToast({ title: "Error", description: "Failed to load partners", color: "danger" }); }
    finally { setLoading(false); }
  })(); }, []);

  // API call to /api/partners to add a new partner
  const handleAdd = async () => {
      const { name, description, imagepath } = newPartner;
      if (!name || !description || !imagepath)
        return addToast({ title: "Missing input", description: "Please fill out all fields.", color: "warning",});
      try {
        const res = await fetch("/api/partners", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newPartner),});
        const saved = await res.json();
        setPartners((prev) => [...prev, saved]);
        setNewPartner({ name: "", description: "", imagepath: "" });
        onClose(); addToast({ title: "Added", description: "Partner added successfully", color: "success", });
      } catch {
        addToast({ title: "Error", description: "Failed to add partner", color: "danger", }); 
      }
    };

  // API call to /api/partners/[id] to update a partner
  const handleUpdate = async () => {
    if (!editPartner || !editPartner._id) return;
    const { _id, name, description, imagepath } = editPartner;
    if (!name || !description || !imagepath) return addToast({ title: "Missing input", description: "Please fill out all fields.", color: "warning" });
    try {
      await fetch(`/api/partners/${_id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editPartner) });
      setPartners((p) => p.map((x) => (x._id === _id ? editPartner : x)));
      onEditClose(); addToast({ title: "Updated", description: "Partner updated successfully", color: "success" });
    } catch { 
      addToast({ title: "Error", description: "Failed to update partner", color: "danger" }); 
    }
  };

  // API call to /api/partners/[id] to delete a partner
  const handleDelete = async () => {
    if (!partnerToDelete) return;
    try {
      await fetch(`/api/partners/${partnerToDelete}`, { method: "DELETE" });
      setPartners((p) => p.filter((x) => x._id !== partnerToDelete));
      onDeleteClose(); addToast({ title: "Deleted", description: "Partner deleted successfully", color: "success" });
    } catch { 
      addToast({ title: "Error", description: "Failed to delete partner", color: "danger" }); 
    }
  };

  const openDeleteConfirm = (id: string) => { setPartnerToDelete(id); onDeleteOpen(); };

  return (
    <div className="flex flex-col gap-6 px-8 py-4">
      <div className="space-y-1 text-center mb-6">
        <h1 className="text-xl font-semibold">Partners Section</h1>
        <p className="text-sm text-default-500">You can add new partners, modify them or delete old ones.</p>
      </div>
      <div className="flex justify-end mb-1"><Button startContent={<PlusIcon />} onPress={onOpen}>Add Partner</Button></div>

      {/* Add Modal */}
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>{() => (<>
          <ModalHeader>Add New Partner</ModalHeader>
          <ModalBody>
            <Input placeholder="Name" value={newPartner.name} onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}/>
            <Input placeholder="Logo URL" value={newPartner.imagepath} onChange={(e) => setNewPartner({ ...newPartner, imagepath: e.target.value })}/>
            <Textarea placeholder="Description" value={newPartner.description} onChange={(e) => setNewPartner({ ...newPartner, description: e.target.value })}/>
          </ModalBody>
          <ModalFooter><Button variant="light" color="danger" onPress={onClose}>Cancel</Button><Button onPress={handleAdd}>Save</Button></ModalFooter>
        </>)}</ModalContent>
      </Modal>

      {/* Edit Modal */}
      {editPartner && (
        <Modal backdrop="blur" isOpen={isEditOpen} onClose={onEditClose}>
          <ModalContent>{() => (<>
            <ModalHeader>Edit Partner</ModalHeader>
            <ModalBody>
              <Input label="Name" value={editPartner.name} onChange={(e) => setEditPartner({ ...editPartner, name: e.target.value })}/>
              <Input label="Logo URL" value={editPartner.imagepath} onChange={(e) => setEditPartner({ ...editPartner, imagepath: e.target.value })}/>
              <Textarea label="Description" value={editPartner.description} onChange={(e) => setEditPartner({ ...editPartner, description: e.target.value })}/>
            </ModalBody>
            <ModalFooter><Button variant="light" color="danger" onPress={onEditClose}>Cancel</Button><Button onPress={handleUpdate}>Save</Button></ModalFooter>
          </>)}</ModalContent>
        </Modal>
      )}

      {/* Delete Modal */}
      <Modal backdrop="blur" isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalContent>{() => (<>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalBody><p className="text-sm">Are you sure you want to delete this partner? This action cannot be undone.</p></ModalBody>
          <ModalFooter><Button variant="light" color="danger" onPress={onDeleteClose}>Cancel</Button><Button className="text-white bg-primary" onPress={handleDelete}>Delete</Button></ModalFooter>
        </>)}</ModalContent>
      </Modal>

      {/* loading skeleton */}
      {loading ? (
        <div className="grid gap-6 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-content-center">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="py-4 w-full max-w-[300px]">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <Skeleton className="h-3 w-24 rounded-md mb-2" />
                <Skeleton className="h-6 w-3/4 rounded-md" />
              </CardHeader>
              <CardBody className="overflow-visible">
                <Skeleton className="h-32 w-full rounded-xl" />
                <div className="mt-5 space-y-2 px-1"><Skeleton className="h-4 w-full rounded-md" /><Skeleton className="h-4 w-5/6 rounded-md" /></div>
              </CardBody>
            </Card>
          ))}
        </div>
      ) : partners.length === 0 ? (
        <p className="text-red-500">No partners found.</p>
      ) : (
        <div className="grid gap-6 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-content-center">
          {/* cards */}
          {partners.map((p) => (
            <Card key={p._id} className="py-4 w-full max-w-[300px]">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start"><h4 className="font-bold text-large">{p.name}</h4></CardHeader>
              <CardBody className="overflow-visible my-2">
                <div className="flex justify-center">
                  <Tooltip content={p.description} placement="top" className="max-w-sm"> 
                    <Image alt={p.name} className="object-contain rounded-xl max-h-32 w-full" src={p.imagepath} width={100} height={75}/>
                  </Tooltip>
                </div>
              </CardBody>
              <CardFooter>
                <div className="flex gap-2 w-full">
                  <Button size="sm" className="flex-1" onPress={() => { setEditPartner(p); onEditOpen(); }} startContent={<Pencil1Icon/>}>Edit</Button>
                  <Button size="sm" className="flex-1 bg-primary text-white" onPress={() => openDeleteConfirm(p._id!)} startContent={<TrashIcon/>}>Delete</Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
