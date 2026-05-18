"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import {
  ChevronLeft,
  Award,
  CheckCircle,
  ExternalLink,
  Calendar,
  FileText,
  Edit3,
  Trash2,
  Tag,
  Sparkles,
  Save,
  X,
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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (min-width: 768px) {
    font-size: 1.75rem;
  }
`;

const ProviderBadge = styled.span`
  font-size: 0.875rem;
  padding: 0.25rem 0.75rem;
  background: #eff6ff;
  color: #1e40af;
  border-radius: 0.5rem;
`;

const TypeBadge = styled.span<{ $type: string }>`
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
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
`;

const DetailSection = styled.div`
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
`;

const SectionTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SectionContent = styled.div`
  font-size: 1rem;
  color: #1f2937;
  line-height: 1.5;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const TagItem = styled.span`
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  background: #f3f4f6;
  border-radius: 0.25rem;
  color: #4b5563;
`;

const LinkButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #3b82f6;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
`;

const Button = styled.button<{
  $variant?: "primary" | "danger" | "outline" | "ai";
}>`
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
      case "ai":
        return `
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          &:hover { opacity: 0.9; }
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  resize: vertical;
  min-height: 300px;
  font-family: monospace;
  line-height: 1.5;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const AILoadingMessage = styled.div`
  background: #f0fdf4;
  padding: 0.75rem;
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
  font-size: 0.8rem;
  color: #166534;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NotesViewer = styled.div`
  background: linear-gradient(135deg, #0f172a, #1e293b);
  border-radius: 1rem;
  padding: 1.5rem;
  color: #e2e8f0;
  font-size: 0.9rem;
  line-height: 1.6;
  max-height: 500px;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

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
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 1rem;
    margin-bottom: 0.75rem;
    color: #facc15;
    border-bottom: 1px solid #334155;
    padding-bottom: 0.5rem;
  }
  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    color: #38bdf8;
  }
  h3 {
    font-size: 1rem;
    font-weight: 600;
    margin-top: 0.75rem;
    margin-bottom: 0.5rem;
    color: #a78bfa;
  }
  ul,
  ol {
    margin-left: 1.5rem;
    margin-bottom: 0.75rem;
  }
  li {
    margin-bottom: 0.25rem;
  }
  code {
    background: #1e293b;
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    font-family: monospace;
    font-size: 0.8rem;
    color: #facc15;
  }
  pre {
    background: #0f172a;
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin: 0.75rem 0;
    border: 1px solid #334155;
  }
  pre code {
    background: none;
    padding: 0;
    color: #e2e8f0;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 0.75rem 0;
  }
  th {
    background: #334155;
    padding: 0.5rem;
    text-align: left;
    font-weight: 600;
  }
  td {
    border: 1px solid #334155;
    padding: 0.5rem;
  }
  blockquote {
    border-left: 3px solid #facc15;
    padding-left: 1rem;
    margin: 0.75rem 0;
    color: #94a3b8;
  }
  hr {
    border: none;
    border-top: 1px solid #334155;
    margin: 1rem 0;
  }
  strong {
    color: #facc15;
    font-weight: 600;
  }
`;

const NotesSection = styled.div`
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 2px solid #e5e7eb;
`;

const NotesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const NotesTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const EmptyNotesMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6b7280;
  background: #f9fafb;
  border-radius: 0.75rem;
  font-style: italic;
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

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6b7280;
`;

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [cert, setCert] = useState<Certification | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [notesContent, setNotesContent] = useState("");
  const [aiGenerating, setAiGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchCert();
  }, [id]);

  const fetchCert = async () => {
    try {
      const res = await fetch(`/api/courses/${id}`);
      const data = await res.json();
      setCert(data);
      setNotesContent(data.notes || "");
    } catch (error) {
      console.error("Failed to fetch certification:", error);
    } finally {
      setLoading(false);
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

  const saveNotes = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/courses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...cert,
          notes: notesContent,
        }),
      });
      const updated = await res.json();
      setCert(updated);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save notes:", error);
    } finally {
      setSaving(false);
    }
  };

  const generateAICheatsheet = async () => {
    if (!cert) return;
    setAiGenerating(true);
    setNotesContent("🤖 AI is generating your cheatsheet...");

    try {
      const res = await fetch("/api/ai/cheatsheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: cert.title,
          provider: cert.provider,
          type: cert.type,
        }),
      });
      const data = await res.json();
      setNotesContent(data.cheatsheet || "AI generated cheatsheet");
    } catch (error) {
      console.error("Failed to generate AI cheatsheet:", error);
      setNotesContent("Failed to generate cheatsheet. Please try again.");
    } finally {
      setAiGenerating(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>Loading certification details...</LoadingSpinner>
      </Container>
    );
  }

  if (!cert) {
    return (
      <Container>
        <Card>
          <Title>Certification Not Found</Title>
          <BackLink href="/courses">← Back to Certifications</BackLink>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <BackLink href="/courses">
        <ChevronLeft size={16} /> Back to Certifications
      </BackLink>

      <Card>
        <Header>
          <Title>
            <Award size={28} color="#22c55e" />
            {cert.title}
          </Title>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <ProviderBadge>{cert.provider || "Self-paced"}</ProviderBadge>
            {cert.type && <TypeBadge $type={cert.type}>{cert.type}</TypeBadge>}
          </div>
        </Header>

        {cert.completedAt && (
          <DetailSection>
            <SectionTitle>
              <Calendar size={14} /> Completion Date
            </SectionTitle>
            <SectionContent>
              {new Date(cert.completedAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </SectionContent>
          </DetailSection>
        )}

        {cert.certificateUrl && (
          <DetailSection>
            <SectionTitle>
              <ExternalLink size={14} /> Certificate
            </SectionTitle>
            <SectionContent>
              <LinkButton
                href={cert.certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                View Certificate <ExternalLink size={14} />
              </LinkButton>
            </SectionContent>
          </DetailSection>
        )}

        {cert.credentialId && (
          <DetailSection>
            <SectionTitle>
              <Tag size={14} /> Credential ID
            </SectionTitle>
            <SectionContent>
              <code
                style={{
                  background: "#f3f4f6",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "0.25rem",
                }}
              >
                {cert.credentialId}
              </code>
            </SectionContent>
          </DetailSection>
        )}

        {cert.tags && cert.tags.length > 0 && (
          <DetailSection>
            <SectionTitle>
              <Tag size={14} /> Tags
            </SectionTitle>
            <TagsContainer>
              {cert.tags.map((tag, idx) => (
                <TagItem key={idx}>#{tag}</TagItem>
              ))}
            </TagsContainer>
          </DetailSection>
        )}

        <ButtonGroup>
          <Button
            $variant="primary"
            onClick={() => router.push(`/courses/${id}/edit`)}
          >
            <Edit3 size={16} /> Edit Certification
          </Button>
          <Button $variant="danger" onClick={() => setShowDeleteModal(true)}>
            <Trash2 size={16} /> Delete Certification
          </Button>
        </ButtonGroup>
      </Card>

      <NotesSection>
        <NotesHeader>
          <NotesTitle>
            <FileText size={20} /> Study Notes / Cheatsheet
          </NotesTitle>
          {!isEditing && (
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Button $variant="outline" onClick={() => setIsEditing(true)}>
                <Edit3 size={14} /> Edit Notes
              </Button>
              <Button $variant="ai" onClick={generateAICheatsheet}>
                <Sparkles size={14} /> AI Generate
              </Button>
            </div>
          )}
        </NotesHeader>

        {!isEditing ? (
          <>
            {cert.notes ? (
              <NotesViewer>
                <ReactMarkdown>{cert.notes}</ReactMarkdown>
              </NotesViewer>
            ) : (
              <EmptyNotesMessage>
                <FileText
                  size={32}
                  style={{ marginBottom: "0.5rem", opacity: 0.5 }}
                />
                <p>No notes yet.</p>
                <p style={{ fontSize: "0.75rem", marginTop: "0.25rem" }}>
                  Click &quot;Edit Notes&quot; to write your own cheatsheet, or
                  &quot;AI Generate&quot; to create one.
                </p>
              </EmptyNotesMessage>
            )}
          </>
        ) : (
          <div>
            {aiGenerating && (
              <AILoadingMessage>
                <Sparkles size={14} />
                AI is generating a comprehensive cheatsheet...
              </AILoadingMessage>
            )}
            <TextArea
              value={notesContent}
              onChange={(e) => setNotesContent(e.target.value)}
              placeholder="Write your notes, key concepts, cheatsheet here..."
              rows={15}
            />
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                marginTop: "0.75rem",
                justifyContent: "flex-end",
              }}
            >
              <Button
                $variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setNotesContent(cert.notes || "");
                }}
              >
                <X size={14} /> Cancel
              </Button>
              <Button $variant="primary" onClick={saveNotes} disabled={saving}>
                <Save size={14} /> {saving ? "Saving..." : "Save Notes"}
              </Button>
            </div>
          </div>
        )}
      </NotesSection>

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
              Are you sure you want to delete "{cert.title}"? This action cannot
              be undone.
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
