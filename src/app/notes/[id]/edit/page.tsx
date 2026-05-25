"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import styled from "styled-components";
import { ArrowLeft, Save, Sparkles, Loader2 } from "lucide-react";

const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 1.5rem 1rem;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  color: #3b82f6;
  font-size: 0.875rem;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: #2563eb;
  }
`;

const FormCard = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  resize: vertical;
  min-height: 300px;
  font-family: monospace;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  background: white;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

const SaveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: background 0.2s ease;
  border: none;
  cursor: pointer;

  &:hover {
    background: #2563eb;
  }
`;

const CancelButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #f3f4f6;
  color: #4b5563;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: background 0.2s ease;
  border: none;
  cursor: pointer;

  &:hover {
    background: #e5e7eb;
  }
`;

const AIButton = styled.button<{ $loading?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s ease;
  border: none;
  cursor: ${(props) => (props.$loading ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.$loading ? 0.7 : 1)};

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const AISection = styled.div`
  background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
  border-radius: 0.75rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border: 1px solid #e5e7eb;
`;

const AITitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 600;
  color: #4c1d95;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AIDescription = styled.p`
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 0.75rem;
`;

const AIInputGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  align-items: flex-end;
`;

const AITopicInput = styled.input`
  flex: 2;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: white;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const AIEnhanceButton = styled.button<{ $loading?: boolean }>`
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  cursor: ${(props) => (props.$loading ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.$loading ? 0.7 : 1)};

  &:hover {
    transform: translateY(-1px);
  }
`;

const AILoadingMessage = styled.div`
  background: #f0fdf4;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  margin-top: 0.75rem;
  font-size: 0.75rem;
  color: #166534;
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

// Common AWS Topics for quick enhancement
const commonTopics = [
  "S3 Storage Classes",
  "EC2 Instance Types",
  "IAM Policies and Roles",
  "VPC Networking",
  "RDS vs DynamoDB",
  "Lambda Functions",
  "CloudFront CDN",
  "Route 53 DNS",
  "CloudFormation",
  "AWS Shield & WAF",
  "EBS Volume Types",
  "Auto Scaling Groups",
  "Load Balancers (ALB/NLB)",
  "ElastiCache",
  "API Gateway",
];

export default function EditNotePage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    domain: "Security",
    examWeight: "Medium",
  });

  // AI Enhancement state
  const [aiTopic, setAiTopic] = useState("");
  const [aiEnhancing, setAiEnhancing] = useState(false);
  const [showAISection, setShowAISection] = useState(true);
  const [originalContent, setOriginalContent] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const id = params.id as string;
        console.log("Fetching note for edit:", id);

        const res = await fetch(`/api/concept-note/${id}`);
        if (!res.ok) throw new Error("Failed to fetch note");

        const data = await res.json();
        console.log("Note data for edit:", data);

        setFormData({
          title: data.title,
          content: data.content,
          domain: data.domain,
          examWeight: data.examWeight,
        });
        setOriginalContent(data.content);
      } catch (error) {
        console.error("Failed to fetch note:", error);
        setError("Failed to load note");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchNote();
    }
  }, [params.id]);

  const handleEnhanceWithAI = async () => {
    const topicToEnhance =
      aiTopic.trim() ||
      formData.title
        .replace(" - My Notes", "")
        .replace(" - AI Generated Notes", "");

    if (!topicToEnhance) {
      setError("Please enter a topic to enhance or use the current note title");
      return;
    }

    setAiEnhancing(true);
    setError(null);

    try {
      // Save current content before enhancement
      setOriginalContent(formData.content);

      // Set loading state in content area
      setFormData({
        ...formData,
        content:
          "🤖 AI is enhancing your notes...\n\nThis may take a few moments while I research and improve the content.\n\nOriginal content will be preserved below once generation is complete.\n\n---\n\n" +
          formData.content,
      });

      const res = await fetch("/api/ai/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conceptTitle: topicToEnhance,
          domain: formData.domain,
          examWeight: formData.examWeight,
          enhanceMode: true, // Signal to AI that this is an enhancement
          existingContent: originalContent,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();

      // Update content with enhanced version
      setFormData({
        ...formData,
        content:
          data.explanation ||
          `Enhanced notes for "${topicToEnhance}"\n\n${formData.content}`,
        title: formData.title.includes("AI Enhanced")
          ? formData.title
          : `${formData.title} (AI Enhanced)`,
      });

      setAiTopic("");
    } catch (error) {
      console.error("Failed to enhance with AI:", error);
      setError("Failed to enhance notes. Please try again.");
      // Restore original content on error
      setFormData({
        ...formData,
        content: originalContent,
      });
    } finally {
      setAiEnhancing(false);
    }
  };

  const handleQuickTopicSelect = (topic: string) => {
    setAiTopic(topic);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const id = params.id as string;
      const res = await fetch(`/api/concept-note/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update note");

      router.push(`/notes/${id}`);
    } catch (error) {
      console.error("Failed to update note:", error);
      setError("Failed to update note. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>Loading note...</LoadingSpinner>
      </Container>
    );
  }

  return (
    <Container>
      <BackButton onClick={() => router.back()}>
        <ArrowLeft size={18} /> Back to Note
      </BackButton>

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

      <FormCard>
        {/* AI Enhancement Section */}
        {showAISection && (
          <AISection>
            <AITitle>
              <Sparkles size={14} />
              AI Note Enhancer
            </AITitle>
            <AIDescription>
              Enhance your notes with AI! Add more details, examples, and exam
              tips to this topic.
            </AIDescription>

            {/* Quick Topic Select */}
            <div style={{ marginBottom: "0.75rem" }}>
              <div
                style={{
                  fontSize: "0.7rem",
                  color: "#6b7280",
                  marginBottom: "0.5rem",
                }}
              >
                Quick topics:
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {commonTopics.slice(0, 6).map((topic) => (
                  <button
                    key={topic}
                    onClick={() => handleQuickTopicSelect(topic)}
                    style={{
                      background: "#f3f4f6",
                      border: "1px solid #e5e7eb",
                      borderRadius: "0.375rem",
                      padding: "0.25rem 0.5rem",
                      fontSize: "0.7rem",
                      color: "#4b5563",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#e5e7eb";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#f3f4f6";
                    }}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            <AIInputGroup>
              <AITopicInput
                type="text"
                placeholder="Enter a specific AWS topic to enhance (e.g., 'S3 Versioning', 'RDS Read Replicas')"
                value={aiTopic}
                onChange={(e) => setAiTopic(e.target.value)}
              />
              <AIEnhanceButton
                onClick={handleEnhanceWithAI}
                $loading={aiEnhancing}
              >
                {aiEnhancing ? (
                  <>
                    <Loader2
                      size={14}
                      style={{ animation: "spin 1s linear infinite" }}
                    />
                    Enhancing...
                  </>
                ) : (
                  <>
                    <Sparkles size={14} />
                    Enhance with AI
                  </>
                )}
              </AIEnhanceButton>
            </AIInputGroup>

            {aiEnhancing && (
              <AILoadingMessage>
                <Loader2
                  size={12}
                  style={{ animation: "spin 1s linear infinite" }}
                />
                AI is researching and enhancing your notes with additional
                details...
              </AILoadingMessage>
            )}
          </AISection>
        )}

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Title</Label>
            <Input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              placeholder="e.g., S3 Storage Classes - Comprehensive Guide"
            />
          </FormGroup>

          <FormGroup>
            <Label>Content</Label>
            <TextArea
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              required
              placeholder="Write your notes here... You can also use the AI Enhancer above to add more details!"
            />
          </FormGroup>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <FormGroup>
              <Label>Domain</Label>
              <Select
                value={formData.domain}
                onChange={(e) =>
                  setFormData({ ...formData, domain: e.target.value })
                }
              >
                <option value="Foundation">Foundation (Prerequisite)</option>
                <option value="Security">Security (30% of exam)</option>
                <option value="Resilient">Resilient (26% of exam)</option>
                <option value="Performance">Performance (24% of exam)</option>
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
          </div>

          <ButtonGroup>
            <CancelButton type="button" onClick={() => router.back()}>
              Cancel
            </CancelButton>
            <AIButton
              type="button"
              onClick={handleEnhanceWithAI}
              $loading={aiEnhancing}
              disabled={aiEnhancing}
            >
              <Sparkles size={16} />
              {aiEnhancing ? "Enhancing..." : "Enhance with AI"}
            </AIButton>
            <SaveButton type="submit" disabled={saving}>
              <Save size={18} />
              {saving ? "Saving..." : "Save Changes"}
            </SaveButton>
          </ButtonGroup>
        </form>
      </FormCard>

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
