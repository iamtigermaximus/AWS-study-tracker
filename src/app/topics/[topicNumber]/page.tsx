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
  Video,
  FileText,
  ExternalLink,
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

  &:hover {
    background: ${(props) => (props.$completed ? "#16a34a" : "#2563eb")};
  }
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6b7280;
`;

export default function TopicDetailPage() {
  const params = useParams();
  const topicNumber = parseInt(params.topicNumber as string);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchTopic();
  }, [topicNumber]);

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
    } finally {
      setLoading(false);
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
    } finally {
      setUpdating(false);
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

        <Section>
          <SectionTitle>🎯 Learning Resources</SectionTitle>
          <Description>
            This is lesson {topic.topicNumber} of the Stephane Maarek SAA-C03
            course.
            {topic.duration &&
              ` The video is approximately ${formatDuration(topic.duration)} long.`}
          </Description>
        </Section>

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
    </Container>
  );
}
