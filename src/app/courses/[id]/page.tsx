"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import {
  ChevronLeft,
  Award,
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
  Send,
  Loader2,
  Plus,
  Globe,
  Code,
  Brain,
  BookOpen,
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
          &:hover { opacity: 0.9; transform: translateY(-1px); }
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

// AI Assistant Section
const AISection = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 70%
    );
    pointer-events: none;
  }
`;

const AITitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AIDescription = styled.p`
  font-size: 0.875rem;
  opacity: 0.9;
  margin-bottom: 1rem;
`;

const AIInputGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const AITopicInput = styled.input`
  flex: 3;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  background: white;
  color: #1f2937;
  placeholder: "Ask about anything - AWS, coding, math, history, science...";

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
  }
`;

const AIActionButton = styled.button<{ $loading?: boolean }>`
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 0.75rem;
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: ${(props) => (props.$loading ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.$loading ? 0.7 : 1)};
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }
`;

const TopicChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;

const TopicChip = styled.button`
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 2rem;
  padding: 0.3rem 0.75rem;
  font-size: 0.7rem;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }
`;

const AILoadingMessage = styled.div`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 0.75rem;
  border-radius: 0.75rem;
  margin-top: 1rem;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
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
  max-width: 500px;
  width: 100%;
`;

const ModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1f2937;
`;

const ModalMessage = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 1.5rem;
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
`;

const ModalButton = styled.button<{
  $variant?: "danger" | "outline" | "primary";
}>`
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
      case "primary":
        return `
          background: #3b82f6;
          color: white;
          border: none;
          &:hover { background: #2563eb; }
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

// Example topics from different categories
const exampleTopics = [
  { name: "Machine Learning", icon: "🧠", category: "Tech" },
  { name: "React Hooks", icon: "⚛️", category: "Coding" },
  { name: "Quantum Computing", icon: "🔬", category: "Science" },
  { name: "French Revolution", icon: "🇫🇷", category: "History" },
  { name: "Photosynthesis", icon: "🌿", category: "Biology" },
  { name: "Blockchain", icon: "⛓️", category: "Tech" },
  { name: "Stoicism", icon: "🏛️", category: "Philosophy" },
  { name: "Bitcoin", icon: "₿", category: "Finance" },
  { name: "TypeScript", icon: "📘", category: "Coding" },
  { name: "Climate Change", icon: "🌍", category: "Science" },
];

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [cert, setCert] = useState<Certification | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [notesContent, setNotesContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // AI Assistant state
  const [aiTopic, setAiTopic] = useState("");
  const [aiGeneratingExplanation, setAiGeneratingExplanation] = useState(false);
  const [showAddToNotesModal, setShowAddToNotesModal] = useState(false);
  const [generatedExplanation, setGeneratedExplanation] = useState("");
  const [currentTopic, setCurrentTopic] = useState("");

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

  const generateAIExplanation = async (
    topic: string,
    addToNotes: boolean = false,
  ) => {
    if (!topic.trim()) {
      alert("Please enter a topic to explain");
      return;
    }

    setAiGeneratingExplanation(true);

    try {
      const res = await fetch("/api/ai/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conceptTitle: topic,
          context: cert?.title || "General Studies",
          domain: "General",
          examWeight: "Medium",
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      const explanation =
        data.explanation ||
        `# ${topic}\n\nAI generated explanation for ${topic}.\n\nPlease try again later.`;

      setGeneratedExplanation(explanation);
      setCurrentTopic(topic);

      if (addToNotes) {
        setShowAddToNotesModal(true);
      } else {
        setIsEditing(true);
        setNotesContent(notesContent + "\n\n---\n\n" + explanation);
      }
    } catch (error) {
      console.error("Failed to generate AI explanation:", error);
      alert("Failed to generate explanation. Please try again.");
    } finally {
      setAiGeneratingExplanation(false);
    }
  };

  const addToExistingNotes = () => {
    const newNotes = notesContent
      ? `${notesContent}\n\n---\n\n## ${currentTopic}\n\n${generatedExplanation}`
      : `## ${currentTopic}\n\n${generatedExplanation}`;

    setNotesContent(newNotes);
    setShowAddToNotesModal(false);
    setAiTopic("");
    setGeneratedExplanation("");
    setCurrentTopic("");

    saveNotesAfterAdd(newNotes);
  };

  const saveNotesAfterAdd = async (newContent: string) => {
    try {
      const res = await fetch(`/api/courses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...cert,
          notes: newContent,
        }),
      });
      const updated = await res.json();
      setCert(updated);
    } catch (error) {
      console.error("Failed to auto-save notes:", error);
    }
  };

  const handleExampleClick = (topic: string) => {
    setAiTopic(topic);
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

      {/* AI Assistant Section - Universal Topic Explainer */}
      <AISection>
        <AITitle>
          <Sparkles size={18} />
          AI Study Assistant - Explain Anything
        </AITitle>
        <AIDescription>
          Ask me to explain ANY topic - technology, science, history,
          philosophy, coding, or anything else!
        </AIDescription>

        <AIInputGroup>
          <AITopicInput
            type="text"
            placeholder="Ask about anything... e.g., 'Explain quantum computing', 'What is the theory of relativity?', 'How do React hooks work?'"
            value={aiTopic}
            onChange={(e) => setAiTopic(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && aiTopic.trim()) {
                generateAIExplanation(aiTopic, true);
              }
            }}
          />
          <AIActionButton
            onClick={() => generateAIExplanation(aiTopic, true)}
            $loading={aiGeneratingExplanation}
          >
            {aiGeneratingExplanation ? (
              <>
                <Loader2
                  size={16}
                  style={{ animation: "spin 1s linear infinite" }}
                />
                Explaining...
              </>
            ) : (
              <>
                <Send size={16} />
                Explain & Add to Notes
              </>
            )}
          </AIActionButton>
        </AIInputGroup>

        <div
          style={{ marginBottom: "0.5rem", fontSize: "0.7rem", opacity: 0.8 }}
        >
          Try these examples:
        </div>
        <TopicChips>
          {exampleTopics.map((topic) => (
            <TopicChip
              key={topic.name}
              onClick={() => handleExampleClick(topic.name)}
            >
              {topic.icon} {topic.name}
            </TopicChip>
          ))}
        </TopicChips>

        {aiGeneratingExplanation && (
          <AILoadingMessage>
            <Loader2
              size={14}
              style={{ animation: "spin 1s linear infinite" }}
            />
            AI is researching and creating a comprehensive explanation for "
            {aiTopic}"...
          </AILoadingMessage>
        )}
      </AISection>

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
            <FileText size={20} /> Study Notes
          </NotesTitle>
          {!isEditing && (
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Button $variant="outline" onClick={() => setIsEditing(true)}>
                <Edit3 size={14} /> Edit Notes
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
                  Use the AI Assistant above to explain any topic and add it to
                  your notes!
                </p>
              </EmptyNotesMessage>
            )}
          </>
        ) : (
          <div>
            <TextArea
              value={notesContent}
              onChange={(e) => setNotesContent(e.target.value)}
              placeholder="Write your notes here... You can also use the AI Assistant to generate explanations for any topic!"
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

      {/* Add to Notes Confirmation Modal */}
      {showAddToNotesModal && (
        <ModalOverlay onClick={() => setShowAddToNotesModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Add to Your Notes?</ModalTitle>
            <ModalMessage>
              AI has generated an explanation for "{currentTopic}". Would you
              like to add this to your existing notes for {cert.title}?
            </ModalMessage>
            <ModalButtons>
              <ModalButton
                $variant="outline"
                onClick={() => {
                  setShowAddToNotesModal(false);
                  setGeneratedExplanation("");
                  setCurrentTopic("");
                }}
              >
                Cancel
              </ModalButton>
              <ModalButton $variant="primary" onClick={addToExistingNotes}>
                <Plus size={14} /> Add to Notes
              </ModalButton>
            </ModalButtons>
          </ModalContent>
        </ModalOverlay>
      )}

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

      <style jsx global>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </Container>
  );
}
