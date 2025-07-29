"use client";
import React, { useEffect, useState } from "react";
import { Input, Textarea, Button, Skeleton } from "@heroui/react";
import { addToast } from "@heroui/toast";

type Mission = { title: string; mission: string };
type Metric = { metric: string; description: string };
type AboutData = { _id?: string; intro: string; missions: Mission[]; metrics: Metric[] };

export default function AboutDashboard() {
  const [data, setData] = useState<AboutData>({
    intro: "",
    missions: [{ title: "", mission: "" }, { title: "", mission: "" }, { title: "", mission: "" }],
    metrics: [{ metric: "", description: "" }, { metric: "", description: "" }, { metric: "", description: "" }, { metric: "", description: "" }],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // fetch data
  useEffect(() => {
    async function fetchAbout() {

      try {
        const res = await fetch("/api/about");
        if (!res.ok) throw new Error("Failed to fetch About data");
        const about = await res.json();
        setData(currentData => ({
          _id: about._id,
          intro: about.intro || "",
          missions: about.missions.length === 3 ? about.missions : currentData.missions,
          metrics: about.metrics.length === 4 ? about.metrics : currentData.metrics,
        }));

      } catch (error) {
        console.error(error);
        addToast({ title: "Error", description: "Failed to load About data", color: "danger" });
      } finally { setLoading(false); }
    }
    
    fetchAbout();
  }, []);

  // helper functions
  function updateMission(index: number, field: keyof Mission, value: string) {
    const newMissions = [...data.missions];
    newMissions[index] = { ...newMissions[index], [field]: value };
    setData({ ...data, missions: newMissions });
  }
  function updateMetric(index: number, field: keyof Metric, value: string) {
    const newMetrics = [...data.metrics];
    newMetrics[index] = { ...newMetrics[index], [field]: value };
    setData({ ...data, metrics: newMetrics });
  }

  // update data
  async function handleSave() {
    if (!data.intro.trim() || data.missions.some((m) => !m.title.trim() || !m.mission.trim()) || data.metrics.some((m) => !m.metric.trim() || !m.description.trim())) {
      addToast({ title: "Validation Error", description: "Please fill in all fields.", color: "warning" });
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/about", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error("Failed to update About data");
      const updated = await res.json();
      setData(updated);
      addToast({ title: "Success", description: "About content updated successfully", color: "success" });
    } catch (error) {
      console.error(error);
      addToast({ title: "Error", description: "Failed to save changes", color: "danger" });
    } finally { setSaving(false); }
  }

  return (
    <div className="flex flex-col gap-6 px-8 py-4">
      {/* context */}
      <div className="space-y-1 text-center mb-6">
        <h1 className="text-xl font-semibold">About Section</h1>
        <p className="text-sm text-default-500">You can modify the introduction of the startup, missions and metrics/stats in the about section.</p>
      </div>

      {/* editing section */}
      <div>
        {loading ? (
          <>
            <Skeleton className="h-12 rounded mb-4" />
            <Skeleton className="h-28 rounded mb-4" />
            {[...Array(3)].map((_, i) => (<Skeleton key={i} className="h-20 rounded mb-4" />))}
            {[...Array(4)].map((_, i) => (<Skeleton key={i} className="h-16 rounded mb-4" />))}
          </>
        ) : (
          <>
            {/* Introduction */}
            <h2 className="text-md font-semibold mb-3 text-primary">1. Introduction</h2>
            <Textarea label="Introduction" rows={4} value={data.intro} onChange={(e) => setData({ ...data, intro: e.target.value })} placeholder="Startup introduction" className="mb-6" />

            {/* missions */}
            <h2 className="text-md font-semibold mb-3 text-primary">2. Missions</h2>
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              {data.missions.map((mission, i) => (
                <div key={i} className="flex flex-col gap-2 flex-1">
                  <Input label={`Mission (${i + 1}) Title`} value={mission.title} onChange={(e) => updateMission(i, "title", e.target.value)} placeholder="Title" />
                  <Textarea label={`Mission (${i + 1}) Description`} rows={4} value={mission.mission} onChange={(e) => updateMission(i, "mission", e.target.value)} placeholder="Mission description" />
                </div>
              ))}
            </div>

            {/* metrics */}
            <h2 className="text-md font-semibold mb-3 text-primary">3. Metrics</h2>
            <div className="flex flex-col md:flex-row gap-6 mb-10">
              {data.metrics.map((metric, i) => (
                <div key={i} className="flex flex-col gap-2 flex-1">
                  <Input label={`Metric (${i + 1}) Value`} value={metric.metric} onChange={(e) => updateMetric(i, "metric", e.target.value)} placeholder="Metric (e.g. 120K+)" />
                  <Input label={`Metric (${i + 1}) Description`} value={metric.description} onChange={(e) => updateMetric(i, "description", e.target.value)} placeholder="Description" />
                </div>
              ))}
            </div>

            {/* save button */}
            <div className="flex justify-center mb-4">
              <Button onPress={handleSave} disabled={saving} className="bg-primary text-white w-full">{saving ? "Saving..." : "Save"}</Button>
            </div>

          </>
        )}
      </div>
    </div>
  );
}
