"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import {
  BookOpen,
  Flame,
  Target,
  CheckCircle,
  Calendar,
  Clock,
  FolderGit2,
  FileText,
} from "lucide-react";

// Proper TypeScript interfaces - no 'any'
interface StudySession {
  id: string;
  date: string;
  minutes: number;
  topic: string;
  domain: string;
  notes: string | null;
}

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  liveUrl: string | null;
  githubUrl: string | null;
  awsServices: string[];
}

interface Topic {
  id: string;
  topicNumber: number;
  title: string;
  domain: string;
  isCompleted: boolean;
  estimatedHours: number;
}

interface NextTopic {
  topicNumber: number;
  title: string;
  domain: string;
  estimatedHours: number;
}

interface DomainStat {
  domain: string;
  completed: number;
  total: number;
}

interface DashboardData {
  totalHours: number;
  streak: number;
  avgScore: number;
  completedTopics: number;
  totalTopics: number;
  recentSessions: StudySession[];
  nextTopic: NextTopic | null;
  projects: Project[];
  domainStats: DomainStat[];
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

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.25rem;

  @media (min-width: 768px) {
    font-size: 2.25rem;
  }
`;

const Subtitle = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-bottom: 1.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const StatCard = styled.div<{ $color: string }>`
  background: ${(props) => {
    switch (props.$color) {
      case "blue":
        return "#eff6ff";
      case "orange":
        return "#fff7ed";
      case "green":
        return "#f0fdf4";
      case "purple":
        return "#f5f3ff";
      case "teal":
        return "#f0fdfa";
      default:
        return "white";
    }
  }};
  border-radius: 0.75rem;
  padding: 1rem;
`;

const StatValue = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 0.5rem;

  @media (min-width: 768px) {
    font-size: 1.875rem;
  }
`;

const StatLabel = styled.p`
  font-size: 0.75rem;
  font-weight: 500;
  opacity: 0.7;
`;

const ProgressCard = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  background: #e5e7eb;
  border-radius: 9999px;
  height: 0.5rem;
  margin: 0.75rem 0;
`;

const ProgressBarFill = styled.div<{ $progress: number }>`
  width: ${(props) => props.$progress}%;
  height: 100%;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 9999px;
  transition: width 0.5s ease;
`;

const NextTopicCard = styled.div`
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 0.75rem;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
  color: white;
`;

const LogFormCard = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  margin-bottom: 0.75rem;

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
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
  background: white;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const Button = styled.button<{ $variant?: "primary" | "outline" }>`
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  width: 100%;

  ${(props) =>
    props.$variant === "primary"
      ? `
    background: #3b82f6;
    color: white;
    &:hover { background: #2563eb; }
  `
      : `
    background: transparent;
    border: 1px solid #d1d5db;
    color: #4b5563;
    &:hover { background: #f3f4f6; }
  `}
`;

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const SectionCard = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SessionItem = styled.div`
  padding: 0.75rem;
  border-bottom: 1px solid #f3f4f6;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const ProjectItem = styled.div`
  padding: 0.75rem;
  border-bottom: 1px solid #f3f4f6;
  margin-bottom: 0.5rem;
`;

const Badge = styled.span<{ $status: string }>`
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
  background: ${(props) =>
    props.$status === "Planning"
      ? "#f3f4f6"
      : props.$status === "In Progress"
        ? "#fef3c7"
        : "#dcfce7"};
  color: ${(props) =>
    props.$status === "Planning"
      ? "#374151"
      : props.$status === "In Progress"
        ? "#92400e"
        : "#166534"};
`;

const QuickLinksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const QuickLinkCard = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6b7280;
`;

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLogForm, setShowLogForm] = useState(false);
  const [formData, setFormData] = useState({
    minutes: 60,
    topic: "",
    domain: "Foundation",
    notes: "",
  });

  const fetchDashboardData = async (): Promise<void> => {
    try {
      const sessionsRes = await fetch("/api/study-session");
      const sessionsData = await sessionsRes.json();

      const curriculumRes = await fetch("/api/curriculum");
      const curriculumData = await curriculumRes.json();

      const examsRes = await fetch("/api/practice-exam");
      const examsData = await examsRes.json();

      const projectsRes = await fetch("/api/projects");
      const projectsData = await projectsRes.json();

      const topics: Topic[] = curriculumData.topics || [];
      const domains = [
        "Foundation",
        "Security",
        "Resilient",
        "Performance",
        "Cost",
      ];
      const domainStats: DomainStat[] = domains.map((domain) => ({
        domain,
        completed: topics.filter(
          (t: Topic) => t.domain === domain && t.isCompleted,
        ).length,
        total: topics.filter((t: Topic) => t.domain === domain).length,
      }));

      setData({
        totalHours: Math.floor(sessionsData.totalMinutes / 60),
        streak: sessionsData.streak || 0,
        avgScore: Math.round(examsData.avgScore || 0),
        completedTopics: curriculumData.completedCount || 0,
        totalTopics: curriculumData.total || 45,
        recentSessions: sessionsData.sessions?.slice(0, 5) || [],
        nextTopic: curriculumData.nextTopic || null,
        projects: projectsData,
        domainStats,
      });
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      await fetch("/api/study-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      await fetchDashboardData();
      setShowLogForm(false);
      setFormData({ minutes: 60, topic: "", domain: "Foundation", notes: "" });
    } catch (error) {
      console.error("Failed to log study session:", error);
      alert("Failed to log session. Please try again.");
    }
  };

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>Loading dashboard...</LoadingSpinner>
      </Container>
    );
  }

  const progressPercentage = data
    ? (data.completedTopics / data.totalTopics) * 100
    : 0;

  return (
    <Container>
      <Title>AWS SAA Learning Suite</Title>
      <Subtitle>Solutions Architect Associate Track</Subtitle>

      <StatsGrid>
        <StatCard $color="blue">
          <BookOpen size={20} />
          <StatValue>{data?.totalHours || 0}h</StatValue>
          <StatLabel>Study Hours</StatLabel>
        </StatCard>
        <StatCard $color="orange">
          <Flame size={20} />
          <StatValue>{data?.streak || 0}d</StatValue>
          <StatLabel>Streak</StatLabel>
        </StatCard>
        <StatCard $color="green">
          <Target size={20} />
          <StatValue>{data?.avgScore || 0}%</StatValue>
          <StatLabel>Practice Avg</StatLabel>
        </StatCard>
        <StatCard $color="purple">
          <CheckCircle size={20} />
          <StatValue>
            {data?.completedTopics || 0}/{data?.totalTopics || 45}
          </StatValue>
          <StatLabel>Topics Done</StatLabel>
        </StatCard>
        <StatCard $color="teal">
          <FolderGit2 size={20} />
          <StatValue>
            {data?.projects.filter((p: Project) => p.status === "Deployed")
              .length || 0}
          </StatValue>
          <StatLabel>Projects</StatLabel>
        </StatCard>
      </StatsGrid>

      <ProgressCard>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Overall Progress</span>
          <span>{Math.round(progressPercentage)}% complete</span>
        </div>
        <ProgressBarContainer>
          <ProgressBarFill $progress={progressPercentage} />
        </ProgressBarContainer>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            fontSize: "0.7rem",
            color: "#6b7280",
            marginTop: "0.5rem",
            flexWrap: "wrap",
          }}
        >
          {data?.domainStats.map((stat: DomainStat) => (
            <span key={stat.domain}>
              {stat.domain === "Foundation" && "📚"}
              {stat.domain === "Security" && "🔒"}
              {stat.domain === "Resilient" && "🛡️"}
              {stat.domain === "Performance" && "⚡"}
              {stat.domain === "Cost" && "💰"}
              {stat.domain}: {stat.completed}/{stat.total}
            </span>
          ))}
        </div>
      </ProgressCard>

      {data?.nextTopic && (
        <NextTopicCard>
          <div
            style={{
              fontSize: "0.75rem",
              opacity: 0.8,
              marginBottom: "0.25rem",
            }}
          >
            📚 YOUR NEXT TOPIC
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  marginBottom: "0.25rem",
                }}
              >
                {data.nextTopic.title}
              </h2>
              <p style={{ fontSize: "0.875rem", opacity: 0.9 }}>
                {data.nextTopic.domain} • Topic {data.nextTopic.topicNumber}/
                {data.totalTopics} • Est. {data.nextTopic.estimatedHours}h
              </p>
            </div>
            <StyledLink href={`/topics/${data.nextTopic.topicNumber}`}>
              <Button
                $variant="primary"
                style={{ width: "auto", background: "white", color: "#3b82f6" }}
              >
                Study This Topic →
              </Button>
            </StyledLink>
          </div>
        </NextTopicCard>
      )}

      <LogFormCard>
        {!showLogForm ? (
          <Button
            $variant="outline"
            onClick={() => setShowLogForm(true)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
            }}
          >
            <Calendar size={18} /> Log Today&apos;s Study Session
          </Button>
        ) : (
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="What did you study? (e.g., IAM Policies)"
              value={formData.topic}
              onChange={(e) =>
                setFormData({ ...formData, topic: e.target.value })
              }
              required
            />
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                marginBottom: "0.75rem",
              }}
            >
              <Select
                value={formData.domain}
                onChange={(e) =>
                  setFormData({ ...formData, domain: e.target.value })
                }
              >
                <option value="Foundation">Foundation (Prerequisite)</option>
                <option value="Security">Security (30% of exam)</option>
                <option value="Resilient">Resilient (26%)</option>
                <option value="Performance">Performance (24%)</option>
                <option value="Cost">Cost (20%)</option>
              </Select>
              <Select
                value={formData.minutes}
                onChange={(e) =>
                  setFormData({ ...formData, minutes: Number(e.target.value) })
                }
                style={{ width: "120px" }}
              >
                <option value={30}>30 min</option>
                <option value={45}>45 min</option>
                <option value={60}>60 min</option>
                <option value={90}>90 min</option>
                <option value={120}>2 hours</option>
              </Select>
            </div>
            <Input
              placeholder="Notes (optional)"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
            />
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <Button $variant="primary" type="submit">
                Log Session
              </Button>
              <Button
                $variant="outline"
                type="button"
                onClick={() => setShowLogForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </LogFormCard>

      <TwoColumnGrid>
        <SectionCard>
          <SectionTitle>
            <Clock size={18} /> Recent Study Sessions
          </SectionTitle>
          {data?.recentSessions.length === 0 ? (
            <p
              style={{ textAlign: "center", padding: "2rem", color: "#6b7280" }}
            >
              No sessions yet. Log your first above!
            </p>
          ) : (
            data?.recentSessions.map((session: StudySession) => (
              <SessionItem key={session.id}>
                <div>
                  <strong>{session.topic}</strong>
                  <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                    {session.domain} •{" "}
                    {new Date(session.date).toLocaleDateString()}
                  </div>
                  {session.notes && (
                    <div
                      style={{
                        fontSize: "0.7rem",
                        color: "#9ca3af",
                        marginTop: "0.25rem",
                      }}
                    >
                      {session.notes}
                    </div>
                  )}
                </div>
                <div>
                  <strong>{session.minutes} min</strong>
                </div>
              </SessionItem>
            ))
          )}
        </SectionCard>

        <SectionCard>
          <SectionTitle>
            <FolderGit2 size={18} /> Your Projects
          </SectionTitle>
          {data?.projects.length === 0 ? (
            <p
              style={{ textAlign: "center", padding: "2rem", color: "#6b7280" }}
            >
              No projects yet. Check back later!
            </p>
          ) : (
            data?.projects.map((project: Project) => (
              <ProjectItem key={project.id}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.25rem",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                  }}
                >
                  <strong>{project.name}</strong>
                  <Badge $status={project.status}>{project.status}</Badge>
                </div>
                <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                  {project.awsServices?.slice(0, 3).join(", ")}
                  {project.awsServices?.length > 3 &&
                    ` +${project.awsServices.length - 3}`}
                </div>
              </ProjectItem>
            ))
          )}
          <StyledLink href="/projects">
            <div
              style={{
                fontSize: "0.875rem",
                color: "#3b82f6",
                display: "block",
                textAlign: "center",
                marginTop: "0.75rem",
              }}
            >
              Manage Projects →
            </div>
          </StyledLink>
        </SectionCard>
      </TwoColumnGrid>

      <QuickLinksGrid>
        <StyledLink href="/topics">
          <QuickLinkCard>
            <BookOpen
              size={24}
              style={{ marginBottom: "0.5rem", color: "#6b7280" }}
            />
            <div>
              <strong>All Topics</strong>
            </div>
            <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
              45 SAA topics
            </div>
          </QuickLinkCard>
        </StyledLink>
        <StyledLink href="/notes">
          <QuickLinkCard>
            <FileText
              size={24}
              style={{ marginBottom: "0.5rem", color: "#6b7280" }}
            />
            <div>
              <strong>Concept Notes</strong>
            </div>
            <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
              Your knowledge base
            </div>
          </QuickLinkCard>
        </StyledLink>
        <StyledLink href="/practice">
          <QuickLinkCard>
            <Target
              size={24}
              style={{ marginBottom: "0.5rem", color: "#6b7280" }}
            />
            <div>
              <strong>Practice Tests</strong>
            </div>
            <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
              AI-generated quizzes
            </div>
          </QuickLinkCard>
        </StyledLink>
        <StyledLink href="/projects">
          <QuickLinkCard>
            <FolderGit2
              size={24}
              style={{ marginBottom: "0.5rem", color: "#6b7280" }}
            />
            <div>
              <strong>Projects</strong>
            </div>
            <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
              AWS portfolio
            </div>
          </QuickLinkCard>
        </StyledLink>
      </QuickLinksGrid>
    </Container>
  );
}
