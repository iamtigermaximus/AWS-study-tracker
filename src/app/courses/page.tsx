"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import {
  Plus,
  Award,
  CheckCircle,
  ExternalLink,
  Trash2,
  Edit3,
  AlertCircle,
} from "lucide-react";

interface Certification {
  id: string;
  title: string;
  provider: string | null;
  type: string | null;
  certificateUrl: string | null;
  credentialId: string | null;
  completedAt: string | null;
  notes: string | null;
  tags: string[];
}

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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: #1f2937;

  @media (min-width: 768px) {
    font-size: 2.25rem;
  }
`;

const Subtitle = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background: #2563eb;
  }
`;

const StatsBar = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const StatsText = styled.span`
  font-size: 0.875rem;
  color: #4b5563;
  font-weight: 500;
`;

const CertGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const CertCard = styled(Link)`
  background: white;
  border-radius: 0.75rem;
  padding: 1.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #22c55e;
  transition: all 0.2s ease;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  color: inherit;
  min-height: 280px;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const CertHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const CertTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #1f2937;
`;

const ProviderBadge = styled.span`
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
  background: #eff6ff;
  color: #1e40af;
  display: inline-block;
  margin-bottom: 0.75rem;
`;

const TypeBadgeSpan = styled.span<{ $type: string }>`
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
  background: ${(props) => {
    switch (props.$type) {
      case "certification":
        return "#dcfce7";
      case "short-course":
        return "#fef3c7";
      default:
        return "#f3f4f6";
    }
  }};
  color: ${(props) => {
    switch (props.$type) {
      case "certification":
        return "#166534";
      case "short-course":
        return "#92400e";
      default:
        return "#374151";
    }
  }};
  margin-left: 0.5rem;
`;

const CompletedDate = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
`;

const CertificateLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: #3b82f6;
  text-decoration: none;
  margin-top: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const CredentialId = styled.div`
  font-size: 0.7rem;
  color: #9ca3af;
  margin-top: 0.25rem;
`;

const NotesPreview = styled.div`
  margin-top: 0.75rem;
  padding: 0.5rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  color: #4b5563;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-top: 0.5rem;
`;

const TagSpan = styled.span`
  font-size: 0.65rem;
  padding: 0.15rem 0.4rem;
  background: #f3f4f6;
  border-radius: 0.25rem;
  color: #6b7280;
`;

const CardActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
  justify-content: flex-end;
  padding-top: 0.75rem;
`;

const IconButton = styled.button`
  padding: 0.25rem;
  border-radius: 0.25rem;
  color: #6b7280;
  transition: all 0.2s ease;
  cursor: pointer;
  background: none;
  border: none;

  &:hover {
    background: #f3f4f6;
    color: #3b82f6;
  }
`;

// Delete Modal Components
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

const DeleteModalContent = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

const DeleteModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const DeleteModalMessage = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 1.5rem;
`;

const DeleteModalButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: center;
`;

const DeleteModalButton = styled.button<{ $variant?: "danger" | "outline" }>`
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

// Add/Edit Modal Components
const Modal = styled.div`
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
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
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

const FormInput = styled.input`
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
  min-height: 80px;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const Button = styled.button<{ $variant?: "primary" | "secondary" }>`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  ${(props) =>
    props.$variant === "primary"
      ? `
    background: #3b82f6;
    color: white;
    border: none;
    &:hover { background: #2563eb; }
  `
      : `
    background: #f3f4f6;
    color: #4b5563;
    border: none;
    &:hover { background: #e5e7eb; }
  `}
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6b7280;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #9ca3af;
  background: white;
  border-radius: 0.75rem;
`;

const truncateNotes = (notes: string | null, maxLength: number = 100) => {
  if (!notes) return null;
  if (notes.length <= maxLength) return notes;
  return notes.substring(0, maxLength) + "...";
};

export default function CoursesPage() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [deleteTargetTitle, setDeleteTargetTitle] = useState<string>("");
  const [editingCert, setEditingCert] = useState<Certification | null>(null);
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
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const res = await fetch("/api/courses");
      const data = await res.json();
      setCertifications(data);
    } catch (error) {
      console.error("Failed to fetch certifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingCert
        ? `/api/courses/${editingCert.id}`
        : "/api/courses";
      const method = editingCert ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
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
        setShowModal(false);
        setEditingCert(null);
        setFormData({
          title: "",
          provider: "",
          type: "certification",
          certificateUrl: "",
          credentialId: "",
          completedDate: "",
          notes: "",
          tags: "",
        });
        fetchCertifications();
      }
    } catch (error) {
      console.error("Failed to save certification:", error);
    }
  };

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    try {
      await fetch(`/api/courses/${deleteTargetId}`, { method: "DELETE" });
      setShowDeleteModal(false);
      setDeleteTargetId(null);
      setDeleteTargetTitle("");
      fetchCertifications();
    } catch (error) {
      console.error("Failed to delete certification:", error);
      alert("Failed to delete certification. Please try again.");
    }
  };

  const handleEdit = (cert: Certification, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setEditingCert(cert);
    setFormData({
      title: cert.title,
      provider: cert.provider || "",
      type: cert.type || "certification",
      certificateUrl: cert.certificateUrl || "",
      credentialId: cert.credentialId || "",
      completedDate: cert.completedAt
        ? new Date(cert.completedAt).toISOString().split("T")[0]
        : "",
      notes: cert.notes || "",
      tags: cert.tags.join(", "),
    });
    setShowModal(true);
  };

  const openDeleteModal = (id: string, title: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDeleteTargetId(id);
    setDeleteTargetTitle(title);
    setShowDeleteModal(true);
  };

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>Loading certifications...</LoadingSpinner>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <div>
          <Title>Certifications Earned</Title>
          <Subtitle>Track your professional certifications</Subtitle>
        </div>
        <AddButton
          onClick={() => {
            setEditingCert(null);
            setFormData({
              title: "",
              provider: "",
              type: "certification",
              certificateUrl: "",
              credentialId: "",
              completedDate: "",
              notes: "",
              tags: "",
            });
            setShowModal(true);
          }}
        >
          <Plus size={18} /> Add Certification
        </AddButton>
      </Header>

      <StatsBar>
        <StatsText>🏆 {certifications.length} certifications earned</StatsText>
      </StatsBar>

      <CertGrid>
        {certifications.map((cert) => (
          <CertCard key={cert.id} href={`/courses/${cert.id}`}>
            <CertHeader>
              <CertTitle>
                <Award size={18} color="#22c55e" />
                {cert.title}
              </CertTitle>
            </CertHeader>
            <div>
              <ProviderBadge>{cert.provider || "Self-paced"}</ProviderBadge>
              {cert.type && (
                <TypeBadgeSpan $type={cert.type}>{cert.type}</TypeBadgeSpan>
              )}
            </div>

            {cert.completedAt && (
              <CompletedDate>
                <CheckCircle size={12} color="#22c55e" />
                Completed: {new Date(cert.completedAt).toLocaleDateString()}
              </CompletedDate>
            )}

            {cert.certificateUrl && (
              <CertificateLink
                href={cert.certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={12} /> View Certificate
              </CertificateLink>
            )}

            {cert.credentialId && (
              <CredentialId>ID: {cert.credentialId}</CredentialId>
            )}

            {cert.notes && (
              <NotesPreview>{truncateNotes(cert.notes, 100)}</NotesPreview>
            )}

            {cert.tags.length > 0 && (
              <TagsContainer>
                {cert.tags.map((tag, idx) => (
                  <TagSpan key={idx}>#{tag}</TagSpan>
                ))}
              </TagsContainer>
            )}

            <CardActions>
              <IconButton onClick={(e) => handleEdit(cert, e)}>
                <Edit3 size={14} />
              </IconButton>
              <IconButton
                onClick={(e) => openDeleteModal(cert.id, cert.title, e)}
              >
                <Trash2 size={14} />
              </IconButton>
            </CardActions>
          </CertCard>
        ))}
      </CertGrid>

      {certifications.length === 0 && (
        <EmptyState>
          <Award size={48} style={{ marginBottom: "1rem", opacity: 0.5 }} />
          <p>No certifications added yet.</p>
          <AddButton
            onClick={() => setShowModal(true)}
            style={{ marginTop: "1rem" }}
          >
            <Plus size={18} /> Add Your First Certification
          </AddButton>
        </EmptyState>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <Modal onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>
              {editingCert ? "Edit Certification" : "Add Certification"}
            </ModalTitle>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Certification Title *</Label>
                <FormInput
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
                <FormInput
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
                <FormInput
                  type="date"
                  value={formData.completedDate}
                  onChange={(e) =>
                    setFormData({ ...formData, completedDate: e.target.value })
                  }
                />
              </FormGroup>

              <FormGroup>
                <Label>Certificate URL</Label>
                <FormInput
                  value={formData.certificateUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, certificateUrl: e.target.value })
                  }
                  placeholder="Link to your certificate (PDF or verification page)"
                />
              </FormGroup>

              <FormGroup>
                <Label>Credential ID</Label>
                <FormInput
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
                  rows={3}
                />
              </FormGroup>

              <FormGroup>
                <Label>Tags (comma-separated)</Label>
                <FormInput
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  placeholder="cloud, aws, security, devops"
                />
              </FormGroup>

              <ModalButtons>
                <Button type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button $variant="primary" type="submit">
                  {editingCert ? "Update" : "Add"} Certification
                </Button>
              </ModalButtons>
            </form>
          </ModalContent>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <ModalOverlay onClick={() => setShowDeleteModal(false)}>
          <DeleteModalContent onClick={(e) => e.stopPropagation()}>
            <AlertCircle
              size={48}
              color="#dc2626"
              style={{ margin: "0 auto 1rem" }}
            />
            <DeleteModalTitle>Delete Certification?</DeleteModalTitle>
            <DeleteModalMessage>
              Are you sure you want to delete "{deleteTargetTitle}"? This action
              cannot be undone.
            </DeleteModalMessage>
            <DeleteModalButtons>
              <DeleteModalButton
                $variant="outline"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </DeleteModalButton>
              <DeleteModalButton $variant="danger" onClick={handleDelete}>
                Delete
              </DeleteModalButton>
            </DeleteModalButtons>
          </DeleteModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}
