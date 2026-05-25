"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  X,
  AlertTriangle,
  Sparkles,
  Send,
  Loader2,
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

interface AITopic {
  name: string;
  domain: string;
  examWeight: string;
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
  border: none;
  cursor: pointer;

  &:hover {
    background: #2563eb;
  }
`;

const SearchContainer = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const SearchInputWrapper = styled.div`
  position: relative;
  flex: 1;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 0.75rem 0.75rem 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const FilterSelect = styled.select`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  background: white;
  min-width: 150px;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const NotesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const NoteCard = styled.div`
  background: white;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const NoteHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #f3f4f6;
  background: #f9fafb;
`;

const NoteTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1f2937;
`;

const NoteMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
`;

const DomainBadge = styled.span<{ $domain: string }>`
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
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
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
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
  padding: 1rem;
  flex: 1;
`;

const ContentPreview = styled.p`
  font-size: 0.875rem;
  color: #4b5563;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const NoteFooter = styled.div`
  padding: 0.75rem 1rem;
  border-top: 1px solid #f3f4f6;
  background: #f9fafb;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: #6b7280;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  background: transparent;

  &:hover {
    background: #e5e7eb;
    color: #3b82f6;
  }
`;

const DateText = styled.span`
  font-size: 0.7rem;
  color: #9ca3af;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 0.75rem;
  color: #6b7280;
`;

// Note Modal (Create/Edit)
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

const Modal = styled.div`
  background: white;
  border-radius: 0.75rem;
  width: 100%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
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

const ModalBody = styled.div`
  padding: 1rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.25rem;
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  resize: vertical;
  min-height: 200px;
  font-family: monospace;

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

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const ModalFooter = styled.div`
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
`;

const SaveButton = styled.button`
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  cursor: pointer;

  &:hover {
    background: #2563eb;
  }
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

// AI Assistant Section
const AISection = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  color: white;
`;

const AITitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
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
  flex: 2;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: white;
  color: #1f2937;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
  }
`;

const AIDomainSelect = styled.select`
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: white;
  color: #1f2937;
  cursor: pointer;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
  }
`;

const AIWeightSelect = styled.select`
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: white;
  color: #1f2937;
  cursor: pointer;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
  }
`;

const AIGenerateButton = styled.button<{ $loading?: boolean }>`
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 0.5rem;
  color: white;
  font-weight: 500;
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

const AILoadingMessage = styled.div`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 0.75rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6b7280;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 1rem;
  background: #fee2e2;
  border-radius: 0.75rem;
  color: #991b1b;
  margin-bottom: 1rem;
`;

// Common AWS Topics for quick selection
const commonTopics: AITopic[] = [
  { name: "S3 Storage Classes", domain: "Foundation", examWeight: "High" },
  { name: "EC2 Instance Types", domain: "Foundation", examWeight: "High" },
  { name: "IAM Policies and Roles", domain: "Security", examWeight: "High" },
  { name: "VPC Networking", domain: "Foundation", examWeight: "High" },
  { name: "RDS vs DynamoDB", domain: "Performance", examWeight: "Medium" },
  { name: "Lambda Functions", domain: "Performance", examWeight: "Medium" },
  { name: "CloudFront CDN", domain: "Performance", examWeight: "Medium" },
  { name: "Route 53 DNS", domain: "Foundation", examWeight: "Medium" },
  { name: "CloudFormation", domain: "Resilient", examWeight: "Medium" },
  { name: "AWS Shield & WAF", domain: "Security", examWeight: "High" },
];

export default function NotesPage() {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterDomain, setFilterDomain] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    domain: "Security",
    examWeight: "Medium",
  });

  // AI Assistant state
  const [aiTopic, setAiTopic] = useState("");
  const [aiDomain, setAiDomain] = useState("Security");
  const [aiWeight, setAiWeight] = useState("High");
  const [aiGenerating, setAiGenerating] = useState(false);
  const [showAICustomTopic, setShowAICustomTopic] = useState(false);
  const [selectedCommonTopic, setSelectedCommonTopic] = useState<string>("");

  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/concept-note");

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      setNotes(data);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
      setError("Unable to load notes. You can still create new notes!");
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingNote) {
        const res = await fetch(`/api/concept-note/${editingNote.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error("Failed to update note");
      } else {
        const res = await fetch("/api/concept-note", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error("Failed to create note");
      }

      await fetchNotes();
      setIsModalOpen(false);
      setEditingNote(null);
      setFormData({
        title: "",
        content: "",
        domain: "Security",
        examWeight: "Medium",
      });
    } catch (error) {
      console.error("Failed to save note:", error);
      alert("Failed to save note. Please try again.");
    }
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setFormData({
      title: note.title,
      content: note.content,
      domain: note.domain,
      examWeight: note.examWeight,
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (note: Note) => {
    setNoteToDelete(note);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!noteToDelete) return;

    try {
      const res = await fetch(`/api/concept-note/${noteToDelete.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete note");

      await fetchNotes();
      setIsDeleteModalOpen(false);
      setNoteToDelete(null);
    } catch (error) {
      console.error("Failed to delete note:", error);
      alert("Failed to delete note. Please try again.");
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setNoteToDelete(null);
  };

  const handleCardClick = (noteId: string) => {
    router.push(`/notes/${noteId}`);
  };

  const handleAIGenerate = async () => {
    const topicToExplain = selectedCommonTopic || aiTopic;

    if (!topicToExplain.trim()) {
      alert("Please select or enter a topic to explain");
      return;
    }

    setAiGenerating(true);

    // Open the modal first
    setIsModalOpen(true);
    setEditingNote(null);
    setFormData({
      title: `${topicToExplain} - AI Generated Notes`,
      content:
        "🤖 AI is generating comprehensive notes for you...\n\nPlease wait while I create detailed AWS notes on this topic.",
      domain: aiDomain,
      examWeight: aiWeight,
    });

    try {
      const res = await fetch("/api/ai/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conceptTitle: topicToExplain,
          domain: aiDomain,
          examWeight: aiWeight,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();

      setFormData({
        title: `${topicToExplain} - AI Generated Notes`,
        content:
          data.explanation ||
          "AI explanation generated! You can edit this text and save it as a note.",
        domain: aiDomain,
        examWeight: aiWeight,
      });
    } catch (error) {
      console.error("Failed to generate AI explanation:", error);
      setFormData({
        ...formData,
        content: `Failed to generate AI explanation. Please try again or write your own notes.\n\nTopic: ${topicToExplain}\nDomain: ${aiDomain}\nExam Weight: ${aiWeight}`,
      });
    } finally {
      setAiGenerating(false);
      setSelectedCommonTopic("");
      setAiTopic("");
    }
  };

  const handleCommonTopicSelect = (topic: AITopic) => {
    setSelectedCommonTopic(topic.name);
    setAiDomain(topic.domain);
    setAiWeight(topic.examWeight);
    setShowAICustomTopic(false);
  };

  const domains = [...new Set(notes.map((n) => n.domain))];
  const filteredNotes = notes.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase());
    const matchesDomain = !filterDomain || n.domain === filterDomain;
    return matchesSearch && matchesDomain;
  });

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>Loading notes...</LoadingSpinner>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <div>
          <Title>Concept Notes</Title>
          <Subtitle>Your personal AWS knowledge base</Subtitle>
        </div>
        <AddButton
          onClick={() => {
            setEditingNote(null);
            setFormData({
              title: "",
              content: "",
              domain: "Security",
              examWeight: "Medium",
            });
            setIsModalOpen(true);
          }}
        >
          <Plus size={18} /> New Note
        </AddButton>
      </Header>

      {/* AI Assistant Section */}
      <AISection>
        <AITitle>
          <Sparkles size={18} />
          AI Study Assistant
        </AITitle>
        <AIDescription>
          Get AI-generated notes on any topic. Select a common topic below or
          enter your own.
        </AIDescription>

        {/* Common Topics Quick Select */}
        <div style={{ marginBottom: "1rem" }}>
          <Label style={{ color: "white", marginBottom: "0.5rem" }}>
            Popular Topics:
          </Label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {commonTopics.map((topic) => (
              <button
                key={topic.name}
                onClick={() => handleCommonTopicSelect(topic)}
                style={{
                  background: "rgba(255, 255, 255, 0.2)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  borderRadius: "0.5rem",
                  padding: "0.4rem 0.75rem",
                  fontSize: "0.75rem",
                  color: "white",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
                }}
              >
                {topic.name}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Topic Input */}
        <AIInputGroup>
          <AITopicInput
            type="text"
            placeholder="Or enter a custom AWS topic (e.g., 'AWS WAF vs Shield', 'EBS Volume Types')"
            value={aiTopic}
            onChange={(e) => {
              setAiTopic(e.target.value);
              setSelectedCommonTopic("");
            }}
          />
          <AIDomainSelect
            value={aiDomain}
            onChange={(e) => setAiDomain(e.target.value)}
          >
            <option value="Foundation">Foundation</option>
            <option value="Security">Security</option>
            <option value="Resilient">Resilient</option>
            <option value="Performance">Performance</option>
            <option value="Cost">Cost</option>
          </AIDomainSelect>
          <AIWeightSelect
            value={aiWeight}
            onChange={(e) => setAiWeight(e.target.value)}
          >
            <option value="High">High Weight</option>
            <option value="Medium">Medium Weight</option>
            <option value="Low">Low Weight</option>
          </AIWeightSelect>
          <AIGenerateButton onClick={handleAIGenerate} $loading={aiGenerating}>
            {aiGenerating ? (
              <>
                <Loader2
                  size={16}
                  style={{ animation: "spin 1s linear infinite" }}
                />
                Generating...
              </>
            ) : (
              <>
                <Sparkles size={16} />
                Generate Notes
              </>
            )}
          </AIGenerateButton>
        </AIInputGroup>

        {aiGenerating && (
          <AILoadingMessage>
            <Loader2
              size={14}
              style={{ animation: "spin 1s linear infinite" }}
            />
            AI is researching and creating comprehensive notes on this AWS
            topic...
          </AILoadingMessage>
        )}
      </AISection>

      {error && <ErrorMessage>⚠️ {error}</ErrorMessage>}

      {notes.length > 0 && (
        <SearchContainer>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <SearchInputWrapper>
              <Search
                size={18}
                style={{
                  position: "absolute",
                  left: "0.75rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#9ca3af",
                }}
              />
              <SearchInput
                placeholder="Search notes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </SearchInputWrapper>
            {domains.length > 0 && (
              <FilterSelect
                value={filterDomain}
                onChange={(e) => setFilterDomain(e.target.value)}
              >
                <option value="">All Domains</option>
                {domains.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </FilterSelect>
            )}
          </div>
        </SearchContainer>
      )}

      {filteredNotes.length === 0 && notes.length === 0 && (
        <EmptyState>
          <p style={{ marginBottom: "1rem" }}>
            No notes yet. Use the AI Assistant above to generate notes on AWS
            topics!
          </p>
          <AddButton
            onClick={() => {
              setEditingNote(null);
              setFormData({
                title: "",
                content: "",
                domain: "Security",
                examWeight: "Medium",
              });
              setIsModalOpen(true);
            }}
          >
            <Plus size={18} /> Create Your First Note
          </AddButton>
        </EmptyState>
      )}

      {filteredNotes.length === 0 && notes.length > 0 && (
        <EmptyState>
          <p>No notes match your search criteria.</p>
        </EmptyState>
      )}

      {filteredNotes.length > 0 && (
        <NotesGrid>
          {filteredNotes.map((note) => (
            <NoteCard key={note.id} onClick={() => handleCardClick(note.id)}>
              <NoteHeader>
                <NoteTitle>{note.title}</NoteTitle>
                <NoteMeta>
                  <DomainBadge $domain={note.domain}>{note.domain}</DomainBadge>
                  <WeightBadge $weight={note.examWeight}>
                    {note.examWeight}
                  </WeightBadge>
                </NoteMeta>
              </NoteHeader>
              <NoteContent>
                <ContentPreview>{note.content}</ContentPreview>
              </NoteContent>
              <NoteFooter>
                <DateText>
                  Updated: {new Date(note.updatedAt).toLocaleDateString()}
                </DateText>
                <div
                  style={{ display: "flex", gap: "0.25rem" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ActionButton onClick={() => handleEdit(note)}>
                    <Edit3 size={14} /> Edit
                  </ActionButton>
                  <ActionButton onClick={() => handleDeleteClick(note)}>
                    <Trash2 size={14} /> Delete
                  </ActionButton>
                </div>
              </NoteFooter>
            </NoteCard>
          ))}
        </NotesGrid>
      )}

      {/* Create/Edit Note Modal */}
      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>
                {editingNote ? "Edit Note" : "Create New Note"}
                {!editingNote && (
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: "normal",
                      marginLeft: "0.5rem",
                      color: "#6b7280",
                    }}
                  >
                    (You can edit AI-generated notes before saving)
                  </span>
                )}
              </ModalTitle>
              <CloseButton onClick={() => setIsModalOpen(false)}>×</CloseButton>
            </ModalHeader>
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <FormGroup>
                  <Label>Title</Label>
                  <Input
                    placeholder="e.g., S3 Storage Classes"
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
                    placeholder="Write your explanation in your own words... or edit the AI-generated content above!"
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
                    <option value="Foundation">
                      Foundation (Prerequisite)
                    </option>
                    <option value="Security">Security (30% of exam)</option>
                    <option value="Resilient">Resilient (26% of exam)</option>
                    <option value="Performance">
                      Performance (24% of exam)
                    </option>
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
              </ModalBody>
              <ModalFooter>
                <CancelButton
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </CancelButton>
                <SaveButton type="submit">
                  {editingNote ? "Update Note" : "Save Note"}
                </SaveButton>
              </ModalFooter>
            </form>
          </Modal>
        </ModalOverlay>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && noteToDelete && (
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
                Are you sure you want to delete "
                <strong>{noteToDelete.title}</strong>"?
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
