"use client";
import { useEffect, useState } from "react";
import { Input, Textarea, Button, Card, CardBody, Skeleton, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";
import { TrashIcon, Pencil1Icon, PlusIcon } from "@radix-ui/react-icons";
import { addToast } from "@heroui/toast";

type FAQItem = { _id?: string; question: string; answer: string };

export default function FAQDashboard() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newFaq, setNewFaq] = useState<FAQItem>({ question: "", answer: "" });
  const [editFaq, setEditFaq] = useState<FAQItem | null>(null);
  const [faqToDelete, setFaqToDelete] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();

  // Fetch FAQs from API
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const res = await fetch("/api/faqs");
        const data = await res.json();
        setFaqs(data);
      } catch (err) {
        console.error(err);
        addToast({ title: "Error", description: "Failed to load FAQs", color: "danger" });
      } finally {
        setLoading(false);
      }
    };
    fetchFAQs();
  }, []);

  // Add FAQ
  const handleAdd = async () => {
    if (!newFaq.question || !newFaq.answer)
      return addToast({ title: "Missing input", description: "Please fill out all the fields.", color: "warning" });

    try {
      const res = await fetch("/api/faqs", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newFaq),
      });
      const saved = await res.json();
      setFaqs((prev) => [...prev, saved]);
      setNewFaq({ question: "", answer: "" });
      onClose();
      addToast({ title: "Added", description: "FAQ added successfully", color: "success" });
    } catch (err) {
      console.error(err);
      addToast({ title: "Error", description: "Failed to add new FAQ", color: "danger" });
    }
  };

  // Update FAQ
  const handleUpdate = async () => {
    if (!editFaq?.question || !editFaq?.answer)
      return addToast({ title: "Missing input", description: "Please fill out all the fields.", color: "warning" });

    try {
      await fetch(`/api/faqs/${editFaq._id}`, {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editFaq),
      });
      setFaqs((prev) => prev.map((f) => f._id === editFaq._id ? editFaq : f));
      onEditClose();
      addToast({ title: "Updated", description: "FAQ updated successfully", color: "success" });
    } catch (err) {
      console.error(err);
      addToast({ title: "Error", description: "Failed to update FAQ", color: "danger" });
    }
  };

  // Delete FAQ
  const handleDelete = async () => {
    if (!faqToDelete) return;
    try {
      await fetch(`/api/faqs/${faqToDelete}`, { method: "DELETE" });
      setFaqs((prev) => prev.filter((f) => f._id !== faqToDelete));
      addToast({ title: "Deleted", description: "FAQ deleted successfully", color: "success" });
      onDeleteClose();
    } catch (err) {
      console.error(err);
      addToast({ title: "Error", description: "Failed to delete FAQ", color: "danger" });
    }
  };

  // Confirm delete modal open
  const openDeleteConfirm = (id: string) => {
    setFaqToDelete(id);
    onDeleteOpen();
  };

  return (
    <div className="flex flex-col gap-6 px-8 py-4">
      {/* Header */}
      <div className="space-y-1 text-center mb-6">
        <h1 className="text-xl font-semibold">FAQ Section</h1>
        <p className="text-sm text-default-500">You can modify, add or delete FAQs shown on the site.</p>
      </div>

      {/* Add FAQ Button */}
      <div className="flex justify-end mb-1">
        <Button startContent={<PlusIcon />} onPress={onOpen}>Add FAQ</Button>
      </div>

      {/* Add Modal */}
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Add New FAQ</ModalHeader>
              <ModalBody>
                <Input placeholder="Question" value={newFaq.question} onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })} />
                <Textarea placeholder="Answer" value={newFaq.answer} onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })} />
              </ModalBody>
              <ModalFooter>
                <Button  variant="light" onPress={onClose} color="danger">Cancel</Button>
                <Button  onPress={handleAdd}>Save</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Edit Modal */}
      {editFaq && (
        <Modal backdrop="blur" isOpen={isEditOpen} onClose={onEditClose}>
          <ModalContent>
            {(onEditClose) => (
              <>
                <ModalHeader>Edit FAQ</ModalHeader>
                <ModalBody>
                  <Input label="Question" placeholder="Question" value={editFaq.question} onChange={(e) => setEditFaq({ ...editFaq, question: e.target.value })} />
                  <Textarea label="Answer" placeholder="Answer" value={editFaq.answer} onChange={(e) => setEditFaq({ ...editFaq, answer: e.target.value })} />
                </ModalBody>
                <ModalFooter>
                  <Button  variant="light" onPress={onEditClose} color="danger">Cancel</Button>
                  <Button  onPress={handleUpdate}>Save</Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}

      {/* Delete Modal */}
      <Modal backdrop="blur" isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalContent>
          {(onDeleteClose) => (
            <>
              <ModalHeader>Confirm Deletion</ModalHeader>
              <ModalBody><p className="text-sm">Are you sure you want to delete this FAQ? This action cannot be undone.</p></ModalBody>
              <ModalFooter>
                <Button  variant="light" color="danger" onPress={onDeleteClose}>Cancel</Button> 
                <Button  className="text-white bg-primary" onPress={handleDelete}>Delete</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* loading skeleton */}
      {loading ? (
        <div className="flex flex-col gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="p-4"><CardBody className="space-y-3">
              <Skeleton className="h-5 w-3/4 rounded-md" />
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-5/6 rounded-md" />
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-8 w-16 rounded-md" />
                <Skeleton className="h-8 w-16 rounded-md" />
              </div>
            </CardBody></Card>
          ))}
        </div>
      ) : faqs.length === 0 ? (
        <p className="text-red-500">No FAQs found.</p>
      ) : (
        faqs.map((faq) => (
          <Card key={faq._id} className="p-4">
            {/* faq card list */}
            <CardBody className="space-y-3">
              <h3 className="text-md font-semibold">Q: {faq.question}</h3>
              <p className="text-sm text-muted-foreground">A: {faq.answer}</p>
              <div className="flex gap-2 pt-2">
                <Button size="sm" onPress={() => { setEditFaq(faq); onEditOpen(); }} startContent={<Pencil1Icon />}>Edit</Button>
                <Button size="sm" className="text-white bg-primary" onPress={() => openDeleteConfirm(faq._id!)} startContent={<TrashIcon />}>Delete</Button>
              </div>
            </CardBody>
          </Card>
        ))
      )}
    </div>
  );
}
