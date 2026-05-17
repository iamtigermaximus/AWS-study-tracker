"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import {
  CheckCircle,
  Circle,
  Clock,
  ExternalLink,
  FolderGit2,
  Image,
  Code,
  ChevronRight,
  FlaskConical,
} from "lucide-react";

interface Lab {
  id: string;
  sectionNumber: number;
  title: string;
  description: string;
  status: string;
  completedAt: string | null;
  screenshotUrl: string | null;
  liveUrl: string | null;
  githubUrl: string | null;
  estimatedTime: string;
  difficulty: string;
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
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (min-width: 768px) {
    font-size: 2.25rem;
  }
`;

const Subtitle = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const StatsBar = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ProgressInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ProgressBarContainer = styled.div`
  width: 200px;
  height: 0.5rem;
  background: #e5e7eb;
  border-radius: 9999px;
  overflow: hidden;
`;

const ProgressBarFill = styled.div<{ $percent: number }>`
  width: ${(props) => props.$percent}%;
  height: 100%;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  transition: width 0.5s ease;
`;

const StatsText = styled.span`
  font-size: 0.875rem;
  color: #4b5563;
  font-weight: 500;
`;

const LabsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const LabCard = styled.div<{ $status: string }>`
  background: white;
  border-radius: 0.75rem;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-left: 4px solid
    ${(props) => {
      switch (props.$status) {
        case "Completed":
          return "#22c55e";
        case "In Progress":
          return "#eab308";
        default:
          return "#9ca3af";
      }
    }};
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateX(4px);
  }
`;

const LabHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const LabTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #1f2937;
`;

const SectionBadge = styled.span`
  font-size: 0.7rem;
  background: #f3f4f6;
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
  color: #4b5563;
  font-weight: normal;
`;

const StatusBadge = styled.span<{ $status: string }>`
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
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

const LabDescription = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.75rem;
  margin-left: 1.75rem;
`;

const LabMeta = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 0.75rem;
  margin-left: 1.75rem;
  flex-wrap: wrap;
`;

const MetaTag = styled.span`
  font-size: 0.7rem;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const DifficultyBadge = styled.span<{ $difficulty: string }>`
  font-size: 0.7rem;
  padding: 0.15rem 0.4rem;
  border-radius: 0.25rem;
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

const Deliverables = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
  margin-left: 1.75rem;
`;

const DeliverableLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.7rem;
  color: #3b82f6;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const EmptyDeliverable = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.7rem;
  color: #9ca3af;
`;

const StartButton = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #3b82f6;
  margin-left: 1.75rem;
  margin-top: 0.25rem;
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6b7280;
`;

export default function LabsPage() {
  const [labs, setLabs] = useState<Lab[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const res = await fetch("/api/labs");
        const data = await res.json();
        setLabs(data);
      } catch (error) {
        console.error("Failed to fetch labs:", error);
        // Fallback to empty array
        setLabs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLabs();
  }, []);

  const completedCount = labs.filter((l) => l.status === "Completed").length;
  const inProgressCount = labs.filter((l) => l.status === "In Progress").length;
  const totalCount = labs.length;
  const percentComplete =
    totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>Loading labs...</LoadingSpinner>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>
          <FlaskConical size={28} />
          Hands-On Labs
        </Title>
        <Subtitle>33 section labs to prove your AWS skills</Subtitle>
      </Header>

      <StatsBar>
        <ProgressInfo>
          <ProgressBarContainer>
            <ProgressBarFill $percent={percentComplete} />
          </ProgressBarContainer>
          <StatsText>
            {completedCount}/{totalCount} completed
          </StatsText>
          {inProgressCount > 0 && (
            <StatsText>📝 {inProgressCount} in progress</StatsText>
          )}
        </ProgressInfo>
      </StatsBar>

      <LabsGrid>
        {labs.map((lab) => (
          <Link
            href={`/labs/${lab.sectionNumber}`}
            key={lab.id}
            style={{ textDecoration: "none" }}
          >
            <LabCard $status={lab.status}>
              <LabHeader>
                <LabTitle>
                  <SectionBadge>Section {lab.sectionNumber}</SectionBadge>
                  {lab.title}
                </LabTitle>
                <StatusBadge $status={lab.status}>
                  {lab.status === "Completed" && <CheckCircle size={12} />}
                  {lab.status === "In Progress" && <Clock size={12} />}
                  {lab.status === "Not Started" && <Circle size={12} />}
                  {lab.status}
                </StatusBadge>
              </LabHeader>

              <LabDescription>{lab.description}</LabDescription>

              <LabMeta>
                <MetaTag>
                  <Clock size={12} /> {lab.estimatedTime}
                </MetaTag>
                <DifficultyBadge $difficulty={lab.difficulty}>
                  {lab.difficulty}
                </DifficultyBadge>
              </LabMeta>

              <Deliverables>
                {lab.screenshotUrl ? (
                  <DeliverableLink
                    href={lab.screenshotUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image size={12} /> Screenshot
                  </DeliverableLink>
                ) : (
                  <EmptyDeliverable>
                    <Image size={12} /> No screenshot yet
                  </EmptyDeliverable>
                )}

                {lab.liveUrl ? (
                  <DeliverableLink
                    href={lab.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={12} /> Live Demo
                  </DeliverableLink>
                ) : (
                  <EmptyDeliverable>
                    <ExternalLink size={12} /> No live URL
                  </EmptyDeliverable>
                )}

                {lab.githubUrl ? (
                  <DeliverableLink
                    href={lab.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Code size={12} /> GitHub
                  </DeliverableLink>
                ) : (
                  <EmptyDeliverable>
                    <Code size={12} /> No GitHub
                  </EmptyDeliverable>
                )}
              </Deliverables>

              <StartButton>
                {lab.status === "Completed"
                  ? "View Lab Details"
                  : "Start Lab →"}
                <ChevronRight size={14} />
              </StartButton>
            </LabCard>
          </Link>
        ))}
      </LabsGrid>
    </Container>
  );
}
