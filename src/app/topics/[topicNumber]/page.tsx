"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styled from "styled-components";
import {
  BookOpen,
  Clock,
  ChevronLeft,
  CheckCircle,
  Circle,
  FileText,
  Sparkles,
  Save,
  Edit3,
  Trash2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

interface Topic {
  id: string;
  topicNumber: number;
  title: string;
  domain: string;
  subdomain: string;
  keyServices: string[];
  estimatedHours: number;
  examWeight: string;
  isCompleted: boolean;
  studyMinutes: number;
  description: string;
  duration: string;
  sectionNumber: number;
  sectionName: string;
}

interface TopicNote {
  id: string;
  title: string;
  content: string;
  domain: string;
  examWeight: string;
  topicNumber: number;
  courseId: string;
  createdAt: string;
  updatedAt: string;
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

  &:hover {
    text-decoration: underline;
  }
`;

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
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

const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
`;

const Badge = styled.span<{ $color?: string }>`
  display: inline-block;
  background: ${(props) => (props.$color === "blue" ? "#eff6ff" : "#f3f4f6")};
  color: ${(props) => (props.$color === "blue" ? "#1e40af" : "#374151")};
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
`;

const DomainBadge = styled.span<{ $domain: string }>`
  display: inline-block;
  font-size: 0.7rem;
  padding: 0.25rem 0.5rem;
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
  display: inline-block;
  font-size: 0.7rem;
  padding: 0.25rem 0.5rem;
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

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;

  @media (min-width: 768px) {
    font-size: 1.75rem;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: #6b7280;
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const ServicesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const ServiceTag = styled.span`
  font-size: 0.7rem;
  background: #eff6ff;
  color: #1e40af;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
`;

const CompleteButton = styled.button<{ $completed: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  width: 100%;
  justify-content: center;
  background: ${(props) => (props.$completed ? "#22c55e" : "#3b82f6")};
  color: white;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.$completed ? "#16a34a" : "#2563eb")};
  }
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6b7280;
`;

const NoteCard = styled.div`
  background: linear-gradient(135deg, #fefce8 0%, #fef3c7 100%);
  border-radius: 0.75rem;
  padding: 1rem;
  margin-bottom: 1rem;
  border-left: 4px solid #eab308;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateX(2px);
  }
`;

const NoteHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const NoteTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 600;
  color: #92400e;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NoteDate = styled.span`
  font-size: 0.65rem;
  color: #b45309;
`;

const NoteContent = styled.p`
  font-size: 0.875rem;
  color: #78350f;
  line-height: 1.6;
  margin-bottom: 0.75rem;
  white-space: pre-wrap;
  background: rgba(255, 255, 255, 0.5);
  padding: 0.5rem;
  border-radius: 0.5rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  resize: vertical;
  min-height: 150px;
  margin-bottom: 0.75rem;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const SmallButton = styled.button<{
  $variant?: "primary" | "outline" | "danger" | "warning";
}>`
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;

  ${(props) => {
    switch (props.$variant) {
      case "primary":
        return `
          background: #3b82f6;
          color: white;
          &:hover { background: #2563eb; }
        `;
      case "danger":
        return `
          background: #fee2e2;
          color: #dc2626;
          &:hover { background: #fecaca; }
        `;
      case "warning":
        return `
          background: #fef3c7;
          color: #d97706;
          &:hover { background: #fde68a; }
        `;
      default:
        return `
          background: #f3f4f6;
          color: #4b5563;
          &:hover { background: #e5e7eb; }
        `;
    }
  }}
`;

const AIButton = styled.button<{ $loading?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  transition: all 0.2s ease;
  opacity: ${(props) => (props.$loading ? 0.7 : 1)};
  cursor: pointer;
  border: none;

  &:hover {
    transform: translateY(-1px);
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
`;

const Modal = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  max-width: 400px;
  width: 90%;
  text-align: center;
`;

const ModalTitle = styled.h3`
  font-size: 1.125rem;
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
  border: none;

  ${(props) => {
    if (props.$variant === "danger") {
      return `
        background: #dc2626;
        color: white;
        &:hover { background: #b91c1c; }
      `;
    }
    return `
      background: #f3f4f6;
      color: #4b5563;
      &:hover { background: #e5e7eb; }
    `;
  }}
`;

const EmptyNotesMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #9ca3af;
  background: #f9fafb;
  border-radius: 0.5rem;
  font-size: 0.875rem;
`;

const ErrorMessage = styled.div`
  background: #fee2e2;
  color: #dc2626;
  padding: 0.75rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default function TopicDetailPage() {
  const params = useParams();
  const topicNumber = parseInt(params.topicNumber as string);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [notes, setNotes] = useState<TopicNote[]>([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [editingNote, setEditingNote] = useState<TopicNote | null>(null);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchTopic = async () => {
    try {
      const res = await fetch("/api/curriculum");
      const data = await res.json();
      const foundTopic = data.topics.find(
        (t: Topic) => t.topicNumber === topicNumber,
      );
      setTopic(foundTopic || null);
    } catch (error) {
      console.error("Failed to fetch topic:", error);
      setError("Failed to load topic");
    } finally {
      setLoading(false);
    }
  };

  // Fetch TopicNotes (not ConceptNotes)
  const fetchNotes = async () => {
    try {
      setNotesLoading(true);
      const res = await fetch(`/api/topic-notes?topicNumber=${topicNumber}`);
      if (!res.ok) throw new Error("Failed to fetch notes");
      const data = await res.json();
      setNotes(data);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
      setError("Failed to load notes");
    } finally {
      setNotesLoading(false);
    }
  };

  const toggleComplete = async () => {
    if (!topic) return;
    setUpdating(true);
    try {
      await fetch("/api/curriculum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topicNumber: topic.topicNumber,
          completed: !topic.isCompleted,
        }),
      });
      await fetchTopic();
    } catch (error) {
      console.error("Failed to update topic:", error);
      setError("Failed to update topic status");
    } finally {
      setUpdating(false);
    }
  };

  const saveNote = async () => {
    if (!topic || !noteContent.trim()) return;

    setError(null);
    try {
      const url = editingNote
        ? `/api/topic-notes/${editingNote.id}`
        : "/api/topic-notes";
      const method = editingNote ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: `${topic.title} - My Notes`,
          content: noteContent,
          domain: topic.domain,
          examWeight: topic.examWeight,
          topicNumber: topic.topicNumber,
          courseId: "maarek-saa", // or whatever your course identifier is
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      setNoteContent("");
      setShowNoteForm(false);
      setEditingNote(null);
      await fetchNotes();
    } catch (error) {
      console.error("Failed to save note:", error);
      setError("Failed to save note. Please try again.");
    }
  };

  const deleteNote = async (noteId: string) => {
    setError(null);
    try {
      const res = await fetch(`/api/topic-notes/${noteId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      setDeleteConfirm(null);
      await fetchNotes();
    } catch (error) {
      console.error("Failed to delete note:", error);
      setError("Failed to delete note. Please try again.");
    }
  };

  const generateAIExplanation = async () => {
    if (!topic) return;

    setAiGenerating(true);
    setShowNoteForm(true);
    setNoteContent("🤖 AI is generating an explanation for you...");
    setError(null);

    try {
      const res = await fetch("/api/ai/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conceptTitle: topic.title,
          topicNumber: topic.topicNumber,
          domain: topic.domain,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      setNoteContent(
        data.explanation ||
          "AI explanation generated! You can edit this text and save it as a note.",
      );
    } catch (error) {
      console.error("Failed to generate AI explanation:", error);
      setNoteContent(
        "Failed to generate AI explanation. Please try again or write your own notes.",
      );
    } finally {
      setAiGenerating(false);
    }
  };

  const formatDuration = (duration: string) => {
    if (!duration) return "Not specified";
    const parts = duration.split(":");
    if (parts.length === 3) {
      const hours = parseInt(parts[0]);
      const minutes = parseInt(parts[1]);
      if (hours > 0) {
        return `${hours}h ${minutes}min`;
      }
      return `${minutes}min`;
    }
    return duration;
  };

  useEffect(() => {
    fetchTopic();
    fetchNotes();
  }, [topicNumber]);

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>Loading topic...</LoadingSpinner>
      </Container>
    );
  }

  if (!topic) {
    return (
      <Container>
        <Card>
          <Title>Topic Not Found</Title>
          <Description>The topic you're looking for doesn't exist.</Description>
          <BackLink href="/topics">← Back to Topics</BackLink>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <BackLink href="/topics">
        <ChevronLeft size={16} /> Back to Topics
      </BackLink>

      {error && (
        <ErrorMessage>
          <span>⚠️ {error}</span>
          <button
            onClick={() => setError(null)}
            style={{
              background: "none",
              border: "none",
              color: "#dc2626",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </ErrorMessage>
      )}

      <TwoColumnGrid>
        {/* Left Column - Topic Details */}
        <Card>
          <Header>
            <BadgeContainer>
              <Badge $color="blue">Lesson {topic.topicNumber}/387</Badge>
              <DomainBadge $domain={topic.domain}>{topic.domain}</DomainBadge>
              {topic.examWeight !== "Prerequisite" && (
                <WeightBadge $weight={topic.examWeight}>
                  {topic.examWeight} Exam Weight
                </WeightBadge>
              )}
            </BadgeContainer>
          </Header>

          <Title>{topic.title}</Title>

          <MetaInfo>
            <MetaItem>
              <BookOpen size={14} />
              {topic.sectionName || topic.subdomain || topic.domain}
            </MetaItem>
            <MetaItem>
              <Clock size={14} />
              {topic.duration
                ? formatDuration(topic.duration)
                : `Est. ${topic.estimatedHours} hours`}
            </MetaItem>
          </MetaInfo>

          {topic.description && (
            <Section>
              <SectionTitle>📖 What to Expect</SectionTitle>
              <Description>{topic.description}</Description>
            </Section>
          )}

          {topic.keyServices && topic.keyServices.length > 0 && (
            <Section>
              <SectionTitle>🛠️ AWS Services Covered</SectionTitle>
              <ServicesList>
                {topic.keyServices.map((service) => (
                  <ServiceTag key={service}>{service}</ServiceTag>
                ))}
              </ServicesList>
            </Section>
          )}

          <CompleteButton
            $completed={topic.isCompleted}
            onClick={toggleComplete}
            disabled={updating}
          >
            {topic.isCompleted ? (
              <>
                <CheckCircle size={18} /> Completed
              </>
            ) : (
              <>
                <Circle size={18} /> Mark as Completed
              </>
            )}
          </CompleteButton>
        </Card>

        {/* Right Column - Topic Notes */}
        <Card>
          <SectionTitle>
            <FileText size={18} /> My Notes for This Topic
          </SectionTitle>

          {notesLoading ? (
            <LoadingSpinner>Loading notes...</LoadingSpinner>
          ) : (
            <>
              {notes.length === 0 && !showNoteForm ? (
                <EmptyNotesMessage>
                  <FileText
                    size={32}
                    style={{ marginBottom: "0.5rem", opacity: 0.5 }}
                  />
                  <p>
                    No notes yet. Click "Write Note" or "AI Explain This Topic"
                    to get started!
                  </p>
                </EmptyNotesMessage>
              ) : (
                notes.map((note) => (
                  <NoteCard key={note.id}>
                    <NoteHeader>
                      <NoteTitle>
                        <FileText size={12} /> {note.title}
                      </NoteTitle>
                      <NoteDate>
                        {new Date(note.updatedAt).toLocaleDateString()} at{" "}
                        {new Date(note.updatedAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </NoteDate>
                    </NoteHeader>
                    <NoteContent>{note.content}</NoteContent>
                    <ButtonGroup>
                      <SmallButton
                        $variant="warning"
                        onClick={() => {
                          setEditingNote(note);
                          setNoteContent(note.content);
                          setShowNoteForm(true);
                        }}
                      >
                        <Edit3 size={12} /> Edit
                      </SmallButton>
                      <SmallButton
                        $variant="danger"
                        onClick={() => setDeleteConfirm(note.id)}
                      >
                        <Trash2 size={12} /> Delete
                      </SmallButton>
                    </ButtonGroup>
                  </NoteCard>
                ))
              )}

              {showNoteForm ? (
                <div>
                  {aiGenerating && (
                    <AILoadingMessage>
                      <Sparkles size={14} />
                      AI is generating an explanation for you...
                    </AILoadingMessage>
                  )}
                  <TextArea
                    placeholder="Write your notes about this lesson... or click 'AI Explain' to get AI-generated notes!"
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    rows={8}
                  />
                  <ButtonGroup>
                    <SmallButton $variant="primary" onClick={saveNote}>
                      <Save size={14} /> Save Note
                    </SmallButton>
                    <SmallButton
                      $variant="outline"
                      onClick={() => {
                        setShowNoteForm(false);
                        setNoteContent("");
                        setEditingNote(null);
                      }}
                    >
                      Cancel
                    </SmallButton>
                  </ButtonGroup>
                </div>
              ) : (
                <ButtonGroup>
                  <SmallButton
                    $variant="primary"
                    onClick={() => {
                      setEditingNote(null);
                      setNoteContent("");
                      setShowNoteForm(true);
                    }}
                  >
                    <Edit3 size={14} /> Write Note
                  </SmallButton>
                  <AIButton
                    $loading={aiGenerating}
                    onClick={generateAIExplanation}
                    disabled={aiGenerating}
                  >
                    <Sparkles size={14} />
                    {aiGenerating ? "AI Thinking..." : "AI Explain This Topic"}
                  </AIButton>
                </ButtonGroup>
              )}
            </>
          )}
        </Card>
      </TwoColumnGrid>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <ModalOverlay onClick={() => setDeleteConfirm(null)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <AlertCircle
              size={32}
              color="#dc2626"
              style={{ margin: "0 auto 0.5rem" }}
            />
            <ModalTitle>Delete Note?</ModalTitle>
            <ModalMessage>
              Are you sure you want to delete this note? This action cannot be
              undone.
            </ModalMessage>
            <ModalButtons>
              <ModalButton
                $variant="outline"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </ModalButton>
              <ModalButton
                $variant="danger"
                onClick={() => deleteNote(deleteConfirm)}
              >
                Delete
              </ModalButton>
            </ModalButtons>
          </Modal>
        </ModalOverlay>
      )}
    </Container>
  );
}
