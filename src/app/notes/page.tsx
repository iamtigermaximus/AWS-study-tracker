"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { Plus, Search, Sparkles, Edit3, Trash2 } from "lucide-react";

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
  max-width: 600px;
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
  min-height: 150px;

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

  &:hover {
    background: #e5e7eb;
  }
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6b7280;
`;

// Mock data for now (will connect to API later)
const mockNotes: Note[] = [
  {
    id: "1",
    title: "S3 Storage Classes",
    content:
      "S3 Standard: frequently accessed data\nS3 Intelligent-Tiering: unknown access patterns\nS3 Standard-IA: infrequent access\nS3 One Zone-IA: infrequent access, non-critical\nS3 Glacier: long-term archive\nS3 Glacier Deep Archive: long-term archive, cheapest",
    domain: "Foundation",
    examWeight: "High",
    topicNumber: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "IAM Policy Evaluation",
    content:
      "1. All applicable policies evaluated\n2. If ANY explicit DENY exists → DENY\n3. If no explicit DENY and at least one ALLOW → ALLOW\n4. Otherwise → DENY (implicit)",
    domain: "Security",
    examWeight: "High",
    topicNumber: 8,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterDomain, setFilterDomain] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    domain: "Security",
    examWeight: "Medium",
  });

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        // TODO: Replace with actual API call
        // const res = await fetch("/api/concept-note");
        // const data = await res.json();
        // setNotes(data);

        // Using mock data for now
        setTimeout(() => {
          setNotes(mockNotes);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Replace with actual API call
    const newNote: Note = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (editingNote) {
      setNotes(
        notes.map((n) =>
          n.id === editingNote.id ? { ...newNote, id: n.id } : n,
        ),
      );
    } else {
      setNotes([newNote, ...notes]);
    }

    setIsModalOpen(false);
    setEditingNote(null);
    setFormData({
      title: "",
      content: "",
      domain: "Security",
      examWeight: "Medium",
    });
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

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this note?")) {
      setNotes(notes.filter((n) => n.id !== id));
    }
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
        </div>
      </SearchContainer>

      {filteredNotes.length === 0 ? (
        <EmptyState>
          <p>
            No notes yet. Click "New Note" to create your first concept note!
          </p>
        </EmptyState>
      ) : (
        <NotesGrid>
          {filteredNotes.map((note) => (
            <NoteCard key={note.id}>
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
                <div style={{ display: "flex", gap: "0.25rem" }}>
                  <ActionButton onClick={() => handleEdit(note)}>
                    <Edit3 size={14} /> Edit
                  </ActionButton>
                  <ActionButton onClick={() => handleDelete(note.id)}>
                    <Trash2 size={14} /> Delete
                  </ActionButton>
                </div>
              </NoteFooter>
            </NoteCard>
          ))}
        </NotesGrid>
      )}

      {/* Modal for creating/editing notes */}
      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>
                {editingNote ? "Edit Note" : "New Concept Note"}
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
                    placeholder="Write your explanation in your own words..."
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
                <SaveButton type="submit">Save Note</SaveButton>
              </ModalFooter>
            </form>
          </Modal>
        </ModalOverlay>
      )}
    </Container>
  );
}
