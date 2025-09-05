"use client";
import { useEffect, useState } from "react";
import { Input, Textarea, Button, Card, CardBody, Image, Skeleton, Modal, CardHeader, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, CardFooter, Tooltip } from "@heroui/react";
import { TrashIcon, Pencil1Icon, PlusIcon } from "@radix-ui/react-icons";
import { addToast } from "@heroui/toast";
import { uploadFile } from "@/lib/upload";


type PartnerItem = { _id?: string; name: string; description: string; imagepath: string };

export default function PartnerDashboard() {
  const [partners, setPartners] = useState<PartnerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPartner, setNewPartner] = useState<PartnerItem>({ name: "", description: "", imagepath: "" });
  const [newFile, setNewFile] = useState<File | null>(null);
  const [editPartner, setEditPartner] = useState<PartnerItem | null>(null);
  const [editFile, setEditFile] = useState<File | null>(null);
  const [partnerToDelete, setPartnerToDelete] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

  // API call to fetch partners
  useEffect(() => { (async () => {
      try {
        const res = await fetch("/api/partners");
        setPartners(await res.json());
      } catch {
        addToast({ title: "Error", description: "Failed to load partners", color: "danger" });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // API call to add partner
  const handleAdd = async () => {
    const { name, description } = newPartner;
    if (!name || !description || !newFile)
      return addToast({ title: "Missing input", description: "Fill all fields.", color: "warning" });

    const imagepath = await uploadFile(newFile);
    if (!imagepath) return;

    try {
      const res = await fetch("/api/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newPartner, imagepath }),
      });
      const saved = await res.json();
      setPartners((prev) => [...prev, saved]);
      setNewPartner({ name: "", description: "", imagepath: "" });
      setNewFile(null);
      onClose();
      addToast({ title: "Added", description: "Partner added successfully", color: "success" });
    } catch {
      addToast({ title: "Error", description: "Failed to add partner", color: "danger" });
    }
  };

  // API call to update partner
  const handleUpdate = async () => {
    if (!editPartner || !editPartner._id) return;

    let imagepath = editPartner.imagepath;
    if (editFile) {
      const uploaded = await uploadFile(editFile);
      if (!uploaded) return;
      imagepath = uploaded;
    }

    if (!editPartner.name || !editPartner.description || !imagepath)
      return addToast({ title: "Missing input", description: "Fill all fields.", color: "warning" });

    try {
      const res = await fetch(`/api/partners/${editPartner._id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...editPartner, imagepath }),});
      const updated = await res.json();
      setPartners((p) => p.map((x) => (x._id === editPartner._id ? updated : x)));
      setEditFile(null); onEditClose();
      addToast({ title: "Updated", description: "Partner updated successfully", color: "success" });
    } catch {
      addToast({ title: "Error", description: "Failed to update partner", color: "danger" });
    }
  };

  // API call to delete partner
  const handleDelete = async () => {
    if (!partnerToDelete) return;
    try {
      await fetch(`/api/partners/${partnerToDelete}`, { method: "DELETE" });
      setPartners((p) => p.filter((x) => x._id !== partnerToDelete));
      onDeleteClose();
      addToast({ title: "Deleted", description: "Partner deleted successfully", color: "success" });
    } catch {
      addToast({ title: "Error", description: "Failed to delete partner", color: "danger" });
    }
  };

  const openDeleteConfirm = (id: string) => { setPartnerToDelete(id); onDeleteOpen(); };

  return (
    <div className="flex flex-col gap-6 px-8 py-4">
      {/* Header */}
      <div className="space-y-1 text-center mb-6">
        <h1 className="text-xl font-semibold">Partners Section</h1>
        <p className="text-sm text-default-500">Add, edit or delete partners.</p>
      </div>

      {/* Add Button */}
      <div className="flex justify-end mb-1">
        <Button startContent={<PlusIcon />} onPress={onOpen}>Add Partner</Button>
      </div>

      {/* Add Modal */}
      <Modal backdrop="blur" isOpen={isOpen} onClose={() => { onClose(); setNewFile(null); }}>
        <ModalContent>{() => (
          <>
            <ModalHeader>Add New Partner</ModalHeader>
            <ModalBody className="space-y-1">
              <Input placeholder="Name" value={newPartner.name} onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}/>
              <Textarea placeholder="Description" value={newPartner.description} onChange={(e) => setNewPartner({ ...newPartner, description: e.target.value })}/>
              <Input type="file" accept="image/*" onChange={(e) => { const file = e.target.files?.[0]; if (file) setNewFile(file); }} />
              {newFile && (
                <div className="flex justify-center my-2">
                  <Image src={URL.createObjectURL(newFile)} alt="Preview" width={75} height={75} className="rounded-md"/>
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button variant="light" color="danger" onPress={() => { onClose(); setNewFile(null); }}>Cancel</Button>
              <Button onPress={handleAdd}>Save</Button>
            </ModalFooter>
          </>
        )}</ModalContent>
      </Modal>

      {/* Edit Modal */}
      {editPartner && (
        <Modal backdrop="blur" isOpen={isEditOpen} onClose={() => { onEditClose(); setEditFile(null); }}>
          <ModalContent>{() => (
            <>
              <ModalHeader>Edit Partner</ModalHeader>
              <ModalBody className="space-y-1">
                <Input placeholder="Name" value={editPartner.name} onChange={(e) => setEditPartner({ ...editPartner, name: e.target.value })}/>
                <Textarea placeholder="Description" value={editPartner.description} onChange={(e) => setEditPartner({ ...editPartner, description: e.target.value })}/>                
                <Input type="file" accept="image/*" onChange={(e) => { const file = e.target.files?.[0]; if (file) setEditFile(file); }} />
                {(editFile || editPartner.imagepath) && (
                  <div className="flex justify-center my-2">
                    <Image src={editFile ? URL.createObjectURL(editFile) : editPartner.imagepath} alt="Preview" width={75} height={75} className="rounded-md"/>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button variant="light" color="danger" onPress={() => { onEditClose(); setEditFile(null); }}>Cancel</Button>
                <Button onPress={handleUpdate}>Save</Button>
              </ModalFooter>
            </>
          )}</ModalContent>
        </Modal>
      )}

      {/* Delete Modal */}
      <Modal backdrop="blur" isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalContent>{() => (
          <>
            <ModalHeader>Confirm Deletion</ModalHeader>
            <ModalBody><p className="text-sm">Are you sure you want to delete this partner? This cannot be undone.</p></ModalBody>
            <ModalFooter>
              <Button variant="light" color="danger" onPress={onDeleteClose}>Cancel</Button>
              <Button className="text-white bg-primary" onPress={handleDelete}>Delete</Button>
            </ModalFooter>
          </>
        )}</ModalContent>
      </Modal>

      {/* skeleton cards */}
      {loading ? (
        <div className="grid gap-6 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="py-4 w-full max-w-[300px]">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start"><Skeleton className="h-3 w-24 mb-2"/><Skeleton className="h-6 w-3/4"/></CardHeader>
              <CardBody><Skeleton className="h-32 w-full rounded-xl"/></CardBody>
            </Card>
          ))}
        </div>
      ) : partners.length === 0 ? (
        <p className="text-red-500">No partners found.</p>
      ) : (
        <div className="grid gap-6 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* partners */}
          {partners.map((p) => (
            <Card key={p._id} className="py-4 w-full max-w-[300px]">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start"><h4 className="font-bold text-large">{p.name}</h4></CardHeader>
                <CardBody className="flex justify-center items-center mt-2">
                  <div className="flex justify-center w-full">
                    <Tooltip content={p.description} className="max-w-sm">
                      <Image src={p.imagepath} alt={p.name} width={100} height={75} className="rounded-xl object-contain"/>
                    </Tooltip>
                  </div>
                </CardBody>
              <CardFooter className="flex gap-2">
                <Button size="sm" className="flex-1" onPress={() => { setEditPartner(p); onEditOpen(); }} startContent={<Pencil1Icon/>}>Edit</Button>
                <Button size="sm" className="flex-1 bg-primary text-white" onPress={() => openDeleteConfirm(p._id!)} startContent={<TrashIcon/>}>Delete</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
