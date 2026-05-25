"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import styled from "styled-components";
import { ArrowLeft, Save } from "lucide-react";

const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 1.5rem 1rem;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  color: #3b82f6;
  font-size: 0.875rem;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: #2563eb;
  }
`;

const FormCard = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  resize: vertical;
  min-height: 300px;
  font-family: monospace;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  background: white;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const SaveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: background 0.2s ease;
  border: none;
  cursor: pointer;

  &:hover {
    background: #2563eb;
  }
`;

const CancelButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #f3f4f6;
  color: #4b5563;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: background 0.2s ease;
  border: none;
  cursor: pointer;

  &:hover {
    background: #e5e7eb;
  }
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6b7280;
`;

export default function EditNotePage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    domain: "Security",
    examWeight: "Medium",
  });

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const id = params.id as string;
        console.log("Fetching note for edit:", id);

        const res = await fetch(`/api/concept-note/${id}`);
        if (!res.ok) throw new Error("Failed to fetch note");

        const data = await res.json();
        console.log("Note data for edit:", data);

        setFormData({
          title: data.title,
          content: data.content,
          domain: data.domain,
          examWeight: data.examWeight,
        });
      } catch (error) {
        console.error("Failed to fetch note:", error);
        alert("Failed to load note");
        router.push("/notes");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchNote();
    }
  }, [params.id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const id = params.id as string;
      const res = await fetch(`/api/concept-note/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update note");

      router.push(`/notes/${id}`);
    } catch (error) {
      console.error("Failed to update note:", error);
      alert("Failed to update note. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>Loading note...</LoadingSpinner>
      </Container>
    );
  }

  return (
    <Container>
      <BackButton onClick={() => router.back()}>
        <ArrowLeft size={18} /> Back
      </BackButton>

      <FormCard>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Title</Label>
            <Input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Content</Label>
            <TextArea
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Domain</Label>
            <Select
              value={formData.domain}
              onChange={(e) =>
                setFormData({ ...formData, domain: e.target.value })
              }
            >
              <option value="Foundation">Foundation (Prerequisite)</option>
              <option value="Security">Security (30% of exam)</option>
              <option value="Resilient">Resilient (26% of exam)</option>
              <option value="Performance">Performance (24% of exam)</option>
              <option value="Cost">Cost (20% of exam)</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Exam Weight</Label>
            <Select
              value={formData.examWeight}
              onChange={(e) =>
                setFormData({ ...formData, examWeight: e.target.value })
              }
            >
              <option value="High">High (Common on exam)</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </Select>
          </FormGroup>

          <ButtonGroup>
            <CancelButton type="button" onClick={() => router.back()}>
              Cancel
            </CancelButton>
            <SaveButton type="submit" disabled={saving}>
              <Save size={18} />
              {saving ? "Saving..." : "Save Changes"}
            </SaveButton>
          </ButtonGroup>
        </form>
      </FormCard>
    </Container>
  );
}
