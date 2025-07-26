"use client";
import { useEffect, useState } from "react";
import { Input, Textarea, Button, Skeleton } from "@heroui/react";
import { addToast } from "@heroui/toast";

type HeroItem = { header: string; description: string };

export default function HeroDashboard() {
  const [hero, setHero] = useState<HeroItem>({ header: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // fetch existing content from the db
  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await fetch("/api/hero");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) setHero({ header: data[0].header || "", description: data[0].description || "" });
      } catch (err) {
        console.error("Error fetching hero:", err);
        addToast({ title: "Error", description: "Failed to load hero content", color: "danger" });
      } finally { setLoading(false); }
    };
    fetchHero();
  }, []);

  // update content
  const handleSave = async () => {
    // header and description cant be empty
    if (!hero.header.trim() || !hero.description.trim()) {
      addToast({ title: "Validation Error", description: "Header and description cannot be empty.", color: "warning" }); return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/hero", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(hero) });
      if (!res.ok) throw new Error("Failed to update");
      const updated = await res.json();
      setHero({ header: updated.header, description: updated.description });
      addToast({ title: "Success", description: "Hero content updated successfully", color: "success" });
    } catch (err) {
      console.error(err);
      addToast({ title: "Error", description: "Failed to save changes", color: "danger" });
    } finally { setSaving(false); }
  };

  return (
    <div className="flex flex-col gap-6 px-8 py-4">
      {/* header */}
      <div className="space-y-1 text-center mb-6">
        <h1 className="text-xl font-semibold">Hero Section</h1>
        <p className="text-sm text-default-500">You can modify the header and the description found in the hero section.{" "}</p>
      </div>
      {loading ? (
        <>
          {" "}<Skeleton className="mt-6 h-12 rounded-lg" />{" "}
          <Skeleton className="h-28 rounded-lg" />{" "}
          <Skeleton className="h-10 full-w rounded-lg" />{" "}
        </>
      ) : (
        <>
          <div>
            {/* header */}
            <div className="mb-6">
              <h2 className="text-md font-semibold  text-primary mb-3">1. Header</h2>
              <Input label="Header" value={hero.header} onChange={(e) => setHero({ ...hero, header: e.target.value })} placeholder="Hero section header" />
            </div>
            {/* description */}
            <div className="mb-6">
              <h2 className="text-md font-semibold  text-primary mb-3">2. Description</h2>
              <Textarea label="Description" rows={4} value={hero.description} onChange={(e) => setHero({ ...hero, description: e.target.value })} placeholder="Hero section description" />
            </div>
            {/* save changes button */}
            <Button onPress={handleSave} disabled={saving} className="bg-primary text-white w-full">{saving ? "Saving..." : "Save"}{" "}</Button>
          </div>
        </>
      )}
    </div>
  );
}
