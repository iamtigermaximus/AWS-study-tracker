"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import {
  ChevronLeft,
  CheckCircle,
  Circle,
  ExternalLink,
  Image,
  Code,
  Save,
  Clock,
  AlertCircle,
  Sparkles,
} from "lucide-react";

interface Lab {
  id: string;
  sectionNumber: number;
  title: string;
  description: string;
  instructions: string;
  requirements: string;
  estimatedTime: string;
  difficulty: string;
  status: string;
  completedAt: string | null;
  screenshotUrl: string | null;
  liveUrl: string | null;
  githubUrl: string | null;
  notes: string | null;
}

interface LocalLab {
  status?: string;
  screenshotUrl?: string | null;
  liveUrl?: string | null;
  githubUrl?: string | null;
  notes?: string | null;
  completedAt?: string | null;
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

  @media (min-width: 768px) {
    font-size: 1.75rem;
  }
`;

const StatusBadge = styled.span<{ $status: string }>`
  font-size: 0.75rem;
  padding: 0.3rem 0.75rem;
  border-radius: 0.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${(props) => {
    switch (props.$status) {
      case "Completed":
        return "#dcfce7";
      case "In Progress":
        return "#fef3c7";
      default:
        return "#f3f4f6";
    }
  }};
  color: ${(props) => {
    switch (props.$status) {
      case "Completed":
        return "#166534";
      case "In Progress":
        return "#92400e";
      default:
        return "#374151";
    }
  }};
`;

const MetaGrid = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
`;

const DifficultyBadge = styled.span<{ $difficulty: string }>`
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.7rem;
  background: ${(props) => {
    switch (props.$difficulty) {
      case "Beginner":
        return "#dcfce7";
      case "Intermediate":
        return "#fef3c7";
      case "Advanced":
        return "#fee2e2";
      default:
        return "#f3f4f6";
    }
  }};
  color: ${(props) => {
    switch (props.$difficulty) {
      case "Beginner":
        return "#166534";
      case "Intermediate":
        return "#92400e";
      case "Advanced":
        return "#991b1b";
      default:
        return "#374151";
    }
  }};
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

const InstructionsContent = styled.div`
  background: #f8fafc;
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.6;
  color: #1f2937;
  overflow-x: auto;

  pre {
    background: #1e293b;
    color: #e2e8f0;
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin: 1rem 0;
  }

  code {
    font-family: monospace;
    font-size: 0.8rem;
  }

  h1,
  h2,
  h3 {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }

  ul,
  ol {
    margin-left: 1.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    margin-bottom: 0.5rem;
  }
`;

const DeliverablesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const DeliverableCard = styled.div`
  background: #f9fafb;
  border-radius: 0.5rem;
  padding: 1rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  margin-top: 0.5rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const FormTextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  resize: vertical;
  min-height: 100px;
  margin-top: 0.5rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

const Button = styled.button<{ $variant?: "primary" | "success" | "outline" }>`
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
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
      case "success":
        return `
          background: #22c55e;
          color: white;
          border: none;
          &:hover { background: #16a34a; }
        `;
      default:
        return `
          background: transparent;
          border: 1px solid #d1d5db;
          color: #4b5563;
          &:hover { background: #f3f4f6; }
        `;
    }
  }}
`;

const SuccessMessage = styled.div`
  background: #dcfce7;
  color: #166534;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6b7280;
`;

export default function LabDetailPage() {
  const params = useParams();
  const sectionNumber = parseInt(params.sectionNumber as string);
  const [lab, setLab] = useState<Lab | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [localLab, setLocalLab] = useState<LocalLab>({});

  useEffect(() => {
    const fetchLab = async (): Promise<void> => {
      try {
        const res = await fetch(`/api/labs/${sectionNumber}`);
        const data = await res.json();
        setLab(data);
        setLocalLab(data);
      } catch (error) {
        console.error("Failed to fetch lab:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLab();
  }, [sectionNumber]);

  const handleSave = async (): Promise<void> => {
    if (!lab) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/labs/${sectionNumber}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(localLab),
      });
      const updatedLab = await res.json();
      setLab(updatedLab);
      setLocalLab(updatedLab);
    } catch (error) {
      console.error("Failed to save lab:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleComplete = async (): Promise<void> => {
    if (!lab) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/labs/${sectionNumber}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...localLab,
          status: "Completed",
          completedAt: new Date().toISOString(),
        }),
      });
      const updatedLab = await res.json();
      setLab(updatedLab);
      setLocalLab(updatedLab);
    } catch (error) {
      console.error("Failed to complete lab:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>Loading lab...</LoadingSpinner>
      </Container>
    );
  }

  if (!lab) {
    return (
      <Container>
        <Card>
          <Title>Lab Not Found</Title>
          <BackLink href="/labs">← Back to Labs</BackLink>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <BackLink href="/labs">
        <ChevronLeft size={16} /> Back to Labs
      </BackLink>

      <Card>
        <Header>
          <Title>
            Section {lab.sectionNumber}: {lab.title}
          </Title>
          <StatusBadge $status={lab.status}>
            {lab.status === "Completed" && <CheckCircle size={14} />}
            {lab.status === "In Progress" && <Clock size={14} />}
            {lab.status === "Not Started" && <Circle size={14} />}
            {lab.status}
          </StatusBadge>
        </Header>

        <MetaGrid>
          <MetaItem>
            <Clock size={14} /> {lab.estimatedTime}
          </MetaItem>
          <DifficultyBadge $difficulty={lab.difficulty}>
            {lab.difficulty}
          </DifficultyBadge>
        </MetaGrid>

        <Section>
          <SectionTitle>📋 Requirements</SectionTitle>
          <InstructionsContent>
            <ReactMarkdown>{lab.requirements}</ReactMarkdown>
          </InstructionsContent>
        </Section>

        <Section>
          <SectionTitle>🔧 Step-by-Step Instructions</SectionTitle>
          <InstructionsContent>
            <ReactMarkdown>{lab.instructions}</ReactMarkdown>
          </InstructionsContent>
        </Section>

        <Section>
          <SectionTitle>📸 Submit Your Results</SectionTitle>
          <DeliverablesGrid>
            <DeliverableCard>
              <h4 style={{ marginBottom: "0.5rem" }}>🖼️ Screenshot</h4>
              <FormInput
                type="text"
                placeholder="Paste screenshot URL (from Imgur, Cloudinary, etc.)"
                value={localLab.screenshotUrl || ""}
                onChange={(e) =>
                  setLocalLab({ ...localLab, screenshotUrl: e.target.value })
                }
              />
              <p
                style={{
                  fontSize: "0.7rem",
                  color: "#6b7280",
                  marginTop: "0.5rem",
                }}
              >
                Take screenshot of your working lab result
              </p>
            </DeliverableCard>

            <DeliverableCard>
              <h4 style={{ marginBottom: "0.5rem" }}>🌐 Live URL</h4>
              <FormInput
                type="text"
                placeholder="Your deployed application URL"
                value={localLab.liveUrl || ""}
                onChange={(e) =>
                  setLocalLab({ ...localLab, liveUrl: e.target.value })
                }
              />
              <p
                style={{
                  fontSize: "0.7rem",
                  color: "#6b7280",
                  marginTop: "0.5rem",
                }}
              >
                If your lab produces a working website or API endpoint
              </p>
            </DeliverableCard>

            <DeliverableCard>
              <h4 style={{ marginBottom: "0.5rem" }}>💻 GitHub Repository</h4>
              <FormInput
                type="text"
                placeholder="Link to your code (CloudFormation, Terraform, scripts)"
                value={localLab.githubUrl || ""}
                onChange={(e) =>
                  setLocalLab({ ...localLab, githubUrl: e.target.value })
                }
              />
              <p
                style={{
                  fontSize: "0.7rem",
                  color: "#6b7280",
                  marginTop: "0.5rem",
                }}
              >
                Upload your infrastructure as code to GitHub
              </p>
            </DeliverableCard>

            <DeliverableCard>
              <h4 style={{ marginBottom: "0.5rem" }}>
                📝 Notes / Observations
              </h4>
              <FormTextArea
                placeholder="What did you learn? Any issues encountered? Key takeaways?"
                value={localLab.notes || ""}
                onChange={(e) =>
                  setLocalLab({ ...localLab, notes: e.target.value })
                }
                rows={4}
              />
            </DeliverableCard>
          </DeliverablesGrid>
        </Section>

        <ButtonGroup>
          <Button $variant="primary" onClick={handleSave} disabled={saving}>
            <Save size={16} />
            {saving ? "Saving..." : "Save Progress"}
          </Button>

          {lab.status !== "Completed" && (
            <Button
              $variant="success"
              onClick={handleComplete}
              disabled={saving}
            >
              <CheckCircle size={16} />
              Mark as Complete
            </Button>
          )}
        </ButtonGroup>

        {lab.status === "Completed" && lab.completedAt && (
          <SuccessMessage>
            <CheckCircle size={16} />✅ Lab completed on{" "}
            {new Date(lab.completedAt).toLocaleDateString()}
          </SuccessMessage>
        )}
      </Card>
    </Container>
  );
}
