"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import styled from "styled-components";
import {
  ArrowLeft,
  Edit3,
  Trash2,
  Calendar,
  Tag,
  Weight,
  AlertTriangle,
  X,
} from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string;
  domain: string;
  examWeight: string;
  topicNumber?: number;
  createdAt: string;
  updatedAt: string;
}

const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 1.5rem 1rem;

  @media (min-width: 640px) {
    padding: 1.5rem 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 1.5rem 2rem;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  color: #3b82f6;
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 0.2s ease;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: #2563eb;
  }
`;

const NoteCard = styled.div`
  background: white;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const NoteHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #f3f4f6;
  background: #f9fafb;
`;

const NoteTitle = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: 2.25rem;
  }
`;

const MetaContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
`;

const DomainBadge = styled.span<{ $domain: string }>`
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  background: ${(props) => {
    switch (props.$domain) {
      case "Foundation":
        return "#f3f4f6";
      case "Security":
        return "#fee2e2";
      case "Resilient":
        return "#dbeafe";
      case "Performance":
        return "#dcfce7";
      case "Cost":
        return "#fef3c7";
      default:
        return "#f3f4f6";
    }
  }};
  color: ${(props) => {
    switch (props.$domain) {
      case "Foundation":
        return "#374151";
      case "Security":
        return "#991b1b";
      case "Resilient":
        return "#1e40af";
      case "Performance":
        return "#166534";
      case "Cost":
        return "#92400e";
      default:
        return "#374151";
    }
  }};
`;

const WeightBadge = styled.span<{ $weight: string }>`
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  background: ${(props) => {
    switch (props.$weight) {
      case "High":
        return "#fee2e2";
      case "Medium":
        return "#fef3c7";
      case "Low":
        return "#dcfce7";
      default:
        return "#f3f4f6";
    }
  }};
  color: ${(props) => {
    switch (props.$weight) {
      case "High":
        return "#991b1b";
      case "Medium":
        return "#92400e";
      case "Low":
        return "#166534";
      default:
        return "#374151";
    }
  }};
`;

const NoteContent = styled.div`
  padding: 2rem;
  font-size: 1rem;
  line-height: 1.8;
  color: #374151;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #f3f4f6;
`;

const ActionButton = styled.button<{ $variant?: "danger" }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  background: ${(props) =>
    props.$variant === "danger" ? "#fee2e2" : "#f3f4f6"};
  color: ${(props) => (props.$variant === "danger" ? "#991b1b" : "#4b5563")};
  border: none;
  cursor: pointer;

  &:hover {
    background: ${(props) =>
      props.$variant === "danger" ? "#fecaca" : "#e5e7eb"};
  }
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 3rem;
  color: #6b7280;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 0.75rem;
  color: #dc2626;
`;

// Delete Confirmation Modal
const DeleteModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  padding: 1rem;
`;

const DeleteModal = styled.div`
  background: white;
  border-radius: 0.75rem;
  width: 100%;
  max-width: 400px;
  overflow: hidden;
`;

const DeleteModalHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fef2f2;
`;

const DeleteModalTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  color: #dc2626;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CloseButton = styled.button`
  color: #9ca3af;
  font-size: 1.5rem;
  line-height: 1;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: #4b5563;
  }
`;

const DeleteModalBody = styled.div`
  padding: 1.5rem;
`;

const DeleteModalMessage = styled.p`
  color: #374151;
  margin-bottom: 0.5rem;
`;

const DeleteModalSubMessage = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const DeleteModalFooter = styled.div`
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  background: #f9fafb;
`;

const CancelButton = styled.button`
  padding: 0.5rem 1rem;
  background: #f3f4f6;
  color: #4b5563;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  cursor: pointer;

  &:hover {
    background: #e5e7eb;
  }
`;

const DeleteConfirmButton = styled.button`
  padding: 0.5rem 1rem;
  background: #dc2626;
  color: white;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  cursor: pointer;

  &:hover {
    background: #b91c1c;
  }
`;

export default function NoteDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const id = params.id as string;
        console.log("Fetching note with ID:", id);

        const res = await fetch(`/api/concept-note/${id}`);
        console.log("Response status:", res.status);

        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Note not found");
          }
          throw new Error(`Failed to fetch note: ${res.status}`);
        }

        const data = await res.json();
        console.log("Note data received:", data);
        setNote(data);
      } catch (error) {
        console.error("Failed to fetch note:", error);
        setError(
          error instanceof Error ? error.message : "Failed to load note",
        );
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchNote();
    }
  }, [params.id]);

  const handleEdit = () => {
    router.push(`/notes/${note?.id}/edit`);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!note) return;

    try {
      const res = await fetch(`/api/concept-note/${note.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete note");

      router.push("/notes");
    } catch (error) {
      console.error("Failed to delete note:", error);
      alert("Failed to delete note. Please try again.");
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>Loading note...</LoadingSpinner>
      </Container>
    );
  }

  if (error || !note) {
    return (
      <Container>
        <BackButton onClick={() => router.push("/notes")}>
          <ArrowLeft size={18} /> Back to Notes
        </BackButton>
        <ErrorContainer>
          <p>{error || "Note not found"}</p>
          <button
            onClick={() => router.push("/notes")}
            style={{
              marginTop: "1rem",
              color: "#3b82f6",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Go back to notes list
          </button>
        </ErrorContainer>
      </Container>
    );
  }

  return (
    <Container>
      <BackButton onClick={() => router.push("/notes")}>
        <ArrowLeft size={18} /> Back to Notes
      </BackButton>

      <NoteCard>
        <NoteHeader>
          <NoteTitle>{note.title}</NoteTitle>
          <MetaContainer>
            <MetaItem>
              <Tag size={16} />
              <DomainBadge $domain={note.domain}>{note.domain}</DomainBadge>
            </MetaItem>
            <MetaItem>
              <Weight size={16} />
              <WeightBadge $weight={note.examWeight}>
                {note.examWeight} Weight
              </WeightBadge>
            </MetaItem>
            <MetaItem>
              <Calendar size={16} />
              <span>Updated: {new Date(note.updatedAt).toLocaleString()}</span>
            </MetaItem>
            {note.topicNumber && (
              <MetaItem>
                <span>Topic #{note.topicNumber}</span>
              </MetaItem>
            )}
          </MetaContainer>
        </NoteHeader>

        <NoteContent>
          {note.content.split("\n").map((paragraph, index) => (
            <p key={index} style={{ marginBottom: "1rem" }}>
              {paragraph}
            </p>
          ))}
        </NoteContent>

        <div style={{ padding: "0 2rem 2rem 2rem" }}>
          <ActionButtons>
            <ActionButton onClick={handleEdit}>
              <Edit3 size={16} /> Edit Note
            </ActionButton>
            <ActionButton $variant="danger" onClick={handleDeleteClick}>
              <Trash2 size={16} /> Delete Note
            </ActionButton>
          </ActionButtons>
        </div>
      </NoteCard>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <DeleteModalOverlay onClick={handleCancelDelete}>
          <DeleteModal onClick={(e) => e.stopPropagation()}>
            <DeleteModalHeader>
              <DeleteModalTitle>
                <AlertTriangle size={20} />
                Delete Note
              </DeleteModalTitle>
              <CloseButton onClick={handleCancelDelete}>×</CloseButton>
            </DeleteModalHeader>
            <DeleteModalBody>
              <DeleteModalMessage>
                Are you sure you want to delete "<strong>{note.title}</strong>"?
              </DeleteModalMessage>
              <DeleteModalSubMessage>
                This action cannot be undone. The note will be permanently
                deleted.
              </DeleteModalSubMessage>
            </DeleteModalBody>
            <DeleteModalFooter>
              <CancelButton onClick={handleCancelDelete}>Cancel</CancelButton>
              <DeleteConfirmButton onClick={handleConfirmDelete}>
                Delete Forever
              </DeleteConfirmButton>
            </DeleteModalFooter>
          </DeleteModal>
        </DeleteModalOverlay>
      )}
    </Container>
  );
}
