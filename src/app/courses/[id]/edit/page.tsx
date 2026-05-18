"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import styled from "styled-components";
import { ChevronLeft, Award, Save, X, Trash2, AlertCircle } from "lucide-react";

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 1.5rem 1rem;

  @media (min-width: 640px) {
    padding: 1.5rem 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 1.5rem 2rem;
  }
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #3b82f6;
  margin-bottom: 1.5rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (min-width: 768px) {
    font-size: 1.75rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
  color: #374151;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: white;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  justify-content: flex-end;
  flex-wrap: wrap;
`;

const Button = styled.button<{ $variant?: "primary" | "outline" | "danger" }>`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  ${(props) => {
    switch (props.$variant) {
      case "primary":
        return `
          background: #3b82f6;
          color: white;
          border: none;
          &:hover { background: #2563eb; }
        `;
      case "danger":
        return `
          background: #ef4444;
          color: white;
          border: none;
          &:hover { background: #dc2626; }
        `;
      default:
        return `
          background: #f3f4f6;
          color: #4b5563;
          border: none;
          &:hover { background: #e5e7eb; }
        `;
    }
  }}
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6b7280;
`;

// Modal Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

const ModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const ModalMessage = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 1.5rem;
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: center;
`;

const ModalButton = styled.button<{ $variant?: "danger" | "outline" }>`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  ${(props) => {
    switch (props.$variant) {
      case "danger":
        return `
          background: #dc2626;
          color: white;
          border: none;
          &:hover { background: #b91c1c; }
        `;
      default:
        return `
          background: #f3f4f6;
          color: #4b5563;
          border: none;
          &:hover { background: #e5e7eb; }
        `;
    }
  }}
`;

export default function EditCoursePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    provider: "",
    type: "certification",
    certificateUrl: "",
    credentialId: "",
    completedDate: "",
    notes: "",
    tags: "",
  });

  useEffect(() => {
    fetchCert();
  }, [id]);

  const fetchCert = async () => {
    try {
      const res = await fetch(`/api/courses/${id}`);
      const data = await res.json();
      setFormData({
        title: data.title,
        provider: data.provider || "",
        type: data.type || "certification",
        certificateUrl: data.certificateUrl || "",
        credentialId: data.credentialId || "",
        completedDate: data.completedAt
          ? new Date(data.completedAt).toISOString().split("T")[0]
          : "",
        notes: data.notes || "",
        tags: data.tags?.join(", ") || "",
      });
    } catch (error) {
      console.error("Failed to fetch certification:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/courses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          provider: formData.provider,
          type: formData.type,
          certificateUrl: formData.certificateUrl,
          credentialId: formData.credentialId,
          notes: formData.notes,
          tags: formData.tags
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t),
          completedAt: formData.completedDate || null,
        }),
      });

      if (res.ok) {
        router.push(`/courses/${id}`);
      } else {
        const error = await res.json();
        alert(error.error || "Failed to update certification");
      }
    } catch (error) {
      console.error("Failed to update certification:", error);
      alert("Failed to update certification. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setShowDeleteModal(false);
    try {
      const res = await fetch(`/api/courses/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/courses");
      } else {
        const error = await res.json();
        alert(error.error || "Failed to delete certification");
      }
    } catch (error) {
      console.error("Failed to delete certification:", error);
      alert("Failed to delete certification. Please try again.");
    }
  };

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>Loading certification...</LoadingSpinner>
      </Container>
    );
  }

  return (
    <Container>
      <BackLink href={`/courses/${id}`}>
        <ChevronLeft size={16} /> Back to Certification
      </BackLink>

      <Card>
        <Title>
          <Award size={24} color="#22c55e" />
          Edit Certification
        </Title>

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Certification Title *</Label>
            <Input
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="e.g., AWS Solutions Architect (SAA-C03)"
            />
          </FormGroup>

          <FormGroup>
            <Label>Provider</Label>
            <Input
              value={formData.provider}
              onChange={(e) =>
                setFormData({ ...formData, provider: e.target.value })
              }
              placeholder="AWS, Microsoft, Google, etc."
            />
          </FormGroup>

          <FormGroup>
            <Label>Type</Label>
            <Select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            >
              <option value="certification">Certification</option>
              <option value="short-course">Short Course</option>
              <option value="workshop">Workshop</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Completed Date</Label>
            <Input
              type="date"
              value={formData.completedDate}
              onChange={(e) =>
                setFormData({ ...formData, completedDate: e.target.value })
              }
            />
          </FormGroup>

          <FormGroup>
            <Label>Certificate URL</Label>
            <Input
              value={formData.certificateUrl}
              onChange={(e) =>
                setFormData({ ...formData, certificateUrl: e.target.value })
              }
              placeholder="Link to your certificate (Google Drive, Dropbox, etc.)"
            />
          </FormGroup>

          <FormGroup>
            <Label>Credential ID</Label>
            <Input
              value={formData.credentialId}
              onChange={(e) =>
                setFormData({ ...formData, credentialId: e.target.value })
              }
              placeholder="e.g., AWS-SAA-12345"
            />
          </FormGroup>

          <FormGroup>
            <Label>Notes (optional)</Label>
            <TextArea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              placeholder="Key topics, exam tips, what you learned..."
              rows={4}
            />
          </FormGroup>

          <FormGroup>
            <Label>Tags (comma-separated)</Label>
            <Input
              value={formData.tags}
              onChange={(e) =>
                setFormData({ ...formData, tags: e.target.value })
              }
              placeholder="cloud, aws, security, devops"
            />
          </FormGroup>

          <ButtonGroup>
            <Button type="button" onClick={() => router.push(`/courses/${id}`)}>
              <X size={14} /> Cancel
            </Button>
            <Button
              $variant="danger"
              type="button"
              onClick={() => setShowDeleteModal(true)}
            >
              <Trash2 size={14} /> Delete
            </Button>
            <Button $variant="primary" type="submit" disabled={saving}>
              <Save size={14} /> {saving ? "Saving..." : "Save Changes"}
            </Button>
          </ButtonGroup>
        </form>
      </Card>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <ModalOverlay onClick={() => setShowDeleteModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <AlertCircle
              size={48}
              color="#dc2626"
              style={{ margin: "0 auto 1rem" }}
            />
            <ModalTitle>Delete Certification?</ModalTitle>
            <ModalMessage>
              Are you sure you want to delete "{formData.title}"? This action
              cannot be undone.
            </ModalMessage>
            <ModalButtons>
              <ModalButton
                $variant="outline"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </ModalButton>
              <ModalButton $variant="danger" onClick={handleDelete}>
                Delete
              </ModalButton>
            </ModalButtons>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}
