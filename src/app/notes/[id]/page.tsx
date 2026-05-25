"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import {
  ArrowLeft,
  Edit3,
  Trash2,
  Calendar,
  Tag,
  Weight,
  AlertTriangle,
  X,
  Clock,
  BookOpen,
  Sparkles,
  Share2,
  Copy,
  Check,
  Eye,
  FileText,
  TrendingUp,
  Award,
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
  max-width: 1200px;
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
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  color: #3b82f6;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.2s ease;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background: rgba(59, 130, 246, 0.1);

  &:hover {
    color: #2563eb;
    gap: 0.75rem;
    background: rgba(59, 130, 246, 0.2);
  }
`;

const NoteCard = styled.div`
  background: white;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

const NoteHeader = styled.div<{ $domain: string }>`
  padding: 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  background: ${(props) => {
    switch (props.$domain) {
      case "Foundation":
        return "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)";
      case "Security":
        return "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)";
      case "Resilient":
        return "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)";
      case "Performance":
        return "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)";
      case "Cost":
        return "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)";
      default:
        return "linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)";
    }
  }};
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.3) 0%,
      transparent 70%
    );
    pointer-events: none;
  }
`;

const NoteTitle = styled.h1<{ $domain: string }>`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.3;
  background: ${(props) => {
    switch (props.$domain) {
      case "Foundation":
        return "linear-gradient(135deg, #374151, #4b5563)";
      case "Security":
        return "linear-gradient(135deg, #991b1b, #dc2626)";
      case "Resilient":
        return "linear-gradient(135deg, #1e40af, #3b82f6)";
      case "Performance":
        return "linear-gradient(135deg, #166534, #22c55e)";
      case "Cost":
        return "linear-gradient(135deg, #92400e, #f59e0b)";
      default:
        return "linear-gradient(135deg, #1f2937, #6b7280)";
    }
  }};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const MetaContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  margin-top: 1rem;
`;

const MetaItem = styled.div<{ $bg?: string }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.813rem;
  color: #4b5563;
  background: ${(props) => props.$bg || "rgba(255, 255, 255, 0.8)"};
  padding: 0.375rem 0.875rem;
  border-radius: 2rem;
  backdrop-filter: blur(4px);
  font-weight: 500;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const DomainBadge = styled.span<{ $domain: string }>`
  font-size: 0.75rem;
  padding: 0.375rem 1rem;
  border-radius: 2rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  background: ${(props) => {
    switch (props.$domain) {
      case "Foundation":
        return "#6b7280";
      case "Security":
        return "#dc2626";
      case "Resilient":
        return "#2563eb";
      case "Performance":
        return "#16a34a";
      case "Cost":
        return "#d97706";
      default:
        return "#6b7280";
    }
  }};
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
`;

const WeightBadge = styled.span<{ $weight: string }>`
  font-size: 0.75rem;
  padding: 0.375rem 1rem;
  border-radius: 2rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  background: ${(props) => {
    switch (props.$weight) {
      case "High":
        return "#dc2626";
      case "Medium":
        return "#d97706";
      case "Low":
        return "#16a34a";
      default:
        return "#6b7280";
    }
  }};
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
`;

// Dark Theme Notes Viewer - Same as certification page!
const NotesViewer = styled.div`
  background: linear-gradient(135deg, #0f172a, #1e293b);
  border-radius: 1rem;
  padding: 2rem;
  color: #e2e8f0;
  font-size: 0.95rem;
  line-height: 1.7;
  max-height: 600px;
  overflow-y: auto;
  margin: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #334155;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #1e293b;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #475569;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #64748b;
  }

  h1 {
    font-size: 1.75rem;
    font-weight: 700;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    color: #facc15;
    border-bottom: 1px solid #334155;
    padding-bottom: 0.5rem;
  }
  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: #38bdf8;
  }
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    color: #a78bfa;
  }
  h4 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-top: 0.75rem;
    margin-bottom: 0.5rem;
    color: #facc15;
  }
  p {
    margin-bottom: 1rem;
  }
  ul,
  ol {
    margin-left: 1.5rem;
    margin-bottom: 1rem;
  }
  li {
    margin-bottom: 0.25rem;
  }
  code {
    background: #1e293b;
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    font-family: monospace;
    font-size: 0.85rem;
    color: #facc15;
    border: 1px solid #334155;
  }
  pre {
    background: #0f172a;
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin: 1rem 0;
    border: 1px solid #334155;
  }
  pre code {
    background: none;
    padding: 0;
    color: #e2e8f0;
    border: none;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
  }
  th {
    background: #334155;
    padding: 0.5rem;
    text-align: left;
    font-weight: 600;
    color: #facc15;
  }
  td {
    border: 1px solid #334155;
    padding: 0.5rem;
  }
  blockquote {
    border-left: 3px solid #facc15;
    padding-left: 1rem;
    margin: 1rem 0;
    color: #94a3b8;
    font-style: italic;
  }
  hr {
    border: none;
    border-top: 1px solid #334155;
    margin: 1.5rem 0;
  }
  strong {
    color: #facc15;
    font-weight: 600;
  }
  a {
    color: #38bdf8;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const StatsRow = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 2rem;
  background: #f9fafb;
  border-bottom: 1px solid #f3f4f6;
  flex-wrap: wrap;
`;

const Stat = styled.div<{ $color?: string }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: ${(props) => props.$color || "#6b7280"};
  background: white;
  padding: 0.25rem 0.75rem;
  border-radius: 2rem;
  border: 1px solid #e5e7eb;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  padding: 1.5rem 2rem 2rem;
  border-top: 1px solid #f3f4f6;
  background: #fafafa;
  flex-wrap: wrap;
`;

const ActionButton = styled.button<{
  $variant?: "danger" | "primary" | "secondary";
}>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;

  ${(props) => {
    if (props.$variant === "danger") {
      return `
        background: #fee2e2;
        color: #dc2626;
        &:hover {
          background: #fecaca;
          transform: translateY(-2px);
        }
      `;
    }
    if (props.$variant === "primary") {
      return `
        background: linear-gradient(135deg, #3b82f6, #2563eb);
        color: white;
        box-shadow: 0 2px 4px rgba(59, 130, 246, 0.2);
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px -3px rgba(59, 130, 246, 0.4);
        }
      `;
    }
    if (props.$variant === "secondary") {
      return `
        background: #f3f4f6;
        color: #4b5563;
        &:hover {
          background: #e5e7eb;
          transform: translateY(-2px);
        }
      `;
    }
    return `
      background: #f3f4f6;
      color: #4b5563;
      &:hover {
        background: #e5e7eb;
        transform: translateY(-2px);
      }
    `;
  }}
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 3rem;
  color: #6b7280;
  font-size: 1rem;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 1rem;
  color: #dc2626;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

// Delete Confirmation Modal
const DeleteModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  padding: 1rem;
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const DeleteModal = styled.div`
  background: white;
  border-radius: 1rem;
  width: 100%;
  max-width: 400px;
  overflow: hidden;
  animation: slideUp 0.3s ease;

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const DeleteModalHeader = styled.div`
  padding: 1.25rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #fef2f2, #fee2e2);
`;

const DeleteModalTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 700;
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
  transition: color 0.2s ease;

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
  font-weight: 500;
`;

const DeleteModalSubMessage = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const DeleteModalFooter = styled.div`
  padding: 1rem 1.25rem;
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
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

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
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #b91c1c;
    transform: translateY(-1px);
  }
`;

// Toast notification
const Toast = styled.div<{ $show: boolean }>`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: #22c55e;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: ${(props) => (props.$show ? "translateX(0)" : "translateX(200%)")};
  transition: transform 0.3s ease;
  z-index: 1002;
`;

export default function NoteDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const id = params.id as string;
        const res = await fetch(`/api/concept-note/${id}`);
        if (!res.ok) throw new Error("Note not found");
        const data = await res.json();
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

    if (params.id) fetchNote();
  }, [params.id]);

  const handleEdit = () => router.push(`/notes/${note?.id}/edit`);
  const handleDeleteClick = () => setIsDeleteModalOpen(true);

  const handleConfirmDelete = async () => {
    if (!note) return;
    try {
      await fetch(`/api/concept-note/${note.id}`, { method: "DELETE" });
      router.push("/notes");
    } catch (error) {
      console.error("Failed to delete note:", error);
      alert("Failed to delete note. Please try again.");
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const handleCopyContent = async () => {
    if (!note) return;
    await navigator.clipboard.writeText(note.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (!note) return;
    try {
      await navigator.share({
        title: note.title,
        text: `Check out my AWS study note: ${note.title}`,
        url: window.location.href,
      });
    } catch {
      await navigator.clipboard.writeText(window.location.href);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const getDomainIcon = (domain: string) => {
    switch (domain) {
      case "Security":
        return "🔒";
      case "Performance":
        return "⚡";
      case "Resilient":
        return "🔄";
      case "Cost":
        return "💰";
      default:
        return "📚";
    }
  };

  const getExamWeightIcon = (weight: string) => {
    switch (weight) {
      case "High":
        return "🔥";
      case "Medium":
        return "📊";
      default:
        return "📘";
    }
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>
          <div
            style={{
              display: "inline-block",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          >
            📖 Loading your note...
          </div>
        </LoadingSpinner>
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
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>😢</div>
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
            ← Go back to notes list
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
        <NoteHeader $domain={note.domain}>
          <NoteTitle $domain={note.domain}>
            {getDomainIcon(note.domain)} {note.title}
          </NoteTitle>
          <MetaContainer>
            <MetaItem>
              <Tag size={14} />
              <DomainBadge $domain={note.domain}>{note.domain}</DomainBadge>
            </MetaItem>
            <MetaItem>
              <Weight size={14} />
              <WeightBadge $weight={note.examWeight}>
                {getExamWeightIcon(note.examWeight)} {note.examWeight} Priority
              </WeightBadge>
            </MetaItem>
            <MetaItem>
              <Calendar size={14} />
              <span>
                Updated {new Date(note.updatedAt).toLocaleDateString()}
              </span>
            </MetaItem>
            <MetaItem>
              <Clock size={14} />
              <span>
                {new Date(note.updatedAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </MetaItem>
            {note.topicNumber && (
              <MetaItem>
                <BookOpen size={14} />
                <span>Topic #{note.topicNumber}</span>
              </MetaItem>
            )}
          </MetaContainer>
        </NoteHeader>

        <StatsRow>
          <Stat>
            <FileText size={12} />
            {note.content.split(/\s+/).length} words
          </Stat>
          <Stat>
            <Eye size={12} />
            {getReadingTime(note.content)} min read
          </Stat>
          <Stat
            $color={
              note.examWeight === "High"
                ? "#dc2626"
                : note.examWeight === "Medium"
                  ? "#d97706"
                  : "#16a34a"
            }
          >
            <TrendingUp size={12} />
            {note.examWeight} priority for exam
          </Stat>
          <Stat>
            <Award size={12} />
            AWS Certified
          </Stat>
        </StatsRow>

        {/* Dark Theme Notes Viewer - Same as certification page! */}
        <NotesViewer>
          <ReactMarkdown>{note.content}</ReactMarkdown>
        </NotesViewer>

        <ActionButtons>
          <ActionButton onClick={handleCopyContent}>
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copied!" : "Copy Content"}
          </ActionButton>
          <ActionButton onClick={handleShare}>
            <Share2 size={16} /> Share
          </ActionButton>
          <ActionButton $variant="primary" onClick={handleEdit}>
            <Edit3 size={16} /> Edit Note
          </ActionButton>
          <ActionButton $variant="danger" onClick={handleDeleteClick}>
            <Trash2 size={16} /> Delete Note
          </ActionButton>
        </ActionButtons>
      </NoteCard>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <DeleteModalOverlay onClick={() => setIsDeleteModalOpen(false)}>
          <DeleteModal onClick={(e) => e.stopPropagation()}>
            <DeleteModalHeader>
              <DeleteModalTitle>
                <AlertTriangle size={20} />
                Delete Note
              </DeleteModalTitle>
              <CloseButton onClick={() => setIsDeleteModalOpen(false)}>
                ×
              </CloseButton>
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
              <CancelButton onClick={() => setIsDeleteModalOpen(false)}>
                Cancel
              </CancelButton>
              <DeleteConfirmButton onClick={handleConfirmDelete}>
                Delete Forever
              </DeleteConfirmButton>
            </DeleteModalFooter>
          </DeleteModal>
        </DeleteModalOverlay>
      )}

      {/* Toast Notifications */}
      <Toast $show={showToast}>
        <Check size={16} />
        Link copied to clipboard!
      </Toast>
      <Toast $show={copied}>
        <Check size={16} />
        Content copied!
      </Toast>
    </Container>
  );
}
