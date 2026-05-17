"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { Search, CheckCircle, Circle } from "lucide-react";

interface Topic {
  id: string;
  topicNumber: number;
  title: string;
  domain: string;
  subdomain: string | null;
  keyServices: string[];
  estimatedHours: number;
  examWeight: string;
  isCompleted: boolean;
  studyMinutes: number;
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

const StatsBadge = styled.div`
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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

const TopicsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const TopicCard = styled.div<{ $completed?: boolean }>`
  background: white;
  border-radius: 0.75rem;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-left: ${(props) => (props.$completed ? "4px solid #22c55e" : "none")};
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const TopicRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const CheckboxButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 0.125rem;
`;

const TopicContent = styled.div`
  flex: 1;
`;

const TopicMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const TopicNumber = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
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

const TopicTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const ServiceTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`;

const ServiceTag = styled.span`
  font-size: 0.7rem;
  background: #f3f4f6;
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
  color: #4b5563;
`;

const StudyLink = styled.a`
  font-size: 0.875rem;
  color: #3b82f6;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const TimeStudied = styled.div`
  text-align: right;
  font-size: 0.875rem;
  color: #6b7280;
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6b7280;
`;

export default function TopicsPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterDomain, setFilterDomain] = useState("");
  const [updating, setUpdating] = useState<number | null>(null);

  // Define fetchTopics inside useEffect to avoid the warning
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await fetch("/api/curriculum");
        const data = await res.json();
        setTopics(data.topics);
      } catch (error) {
        console.error("Failed to fetch topics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []); // Empty dependency array - runs once on mount

  const toggleComplete = async (
    topicNumber: number,
    currentStatus: boolean,
  ) => {
    setUpdating(topicNumber);
    try {
      await fetch("/api/curriculum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topicNumber, completed: !currentStatus }),
      });

      // Refresh topics after update
      const res = await fetch("/api/curriculum");
      const data = await res.json();
      setTopics(data.topics);
    } catch (error) {
      console.error("Failed to update topic:", error);
    } finally {
      setUpdating(null);
    }
  };

  const domains = [...new Set(topics.map((t) => t.domain))];
  const filteredTopics = topics.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchesDomain = !filterDomain || t.domain === filterDomain;
    return matchesSearch && matchesDomain;
  });

  const completedCount = topics.filter((t) => t.isCompleted).length;

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>Loading topics...</LoadingSpinner>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <div>
          <Title>Curriculum</Title>
          <Subtitle>45 topics covering SAA-C03 exam</Subtitle>
        </div>
        <StatsBadge>
          <strong>{completedCount}</strong>/{topics.length} completed
        </StatsBadge>
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
              placeholder="Search topics..."
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

      <TopicsList>
        {filteredTopics.map((topic) => (
          <TopicCard key={topic.id} $completed={topic.isCompleted}>
            <TopicRow>
              <CheckboxButton
                onClick={() =>
                  toggleComplete(topic.topicNumber, topic.isCompleted)
                }
                disabled={updating === topic.topicNumber}
              >
                {topic.isCompleted ? (
                  <CheckCircle size={22} color="#22c55e" />
                ) : (
                  <Circle size={22} color="#9ca3af" />
                )}
              </CheckboxButton>

              <TopicContent>
                <TopicMeta>
                  <TopicNumber>#{topic.topicNumber}</TopicNumber>
                  <DomainBadge $domain={topic.domain}>
                    {topic.domain}
                  </DomainBadge>
                  {topic.examWeight !== "Prerequisite" && (
                    <WeightBadge $weight={topic.examWeight}>
                      {topic.examWeight} weight
                    </WeightBadge>
                  )}
                  <span style={{ fontSize: "0.7rem", color: "#6b7280" }}>
                    {topic.estimatedHours}h
                  </span>
                </TopicMeta>

                <TopicTitle>{topic.title}</TopicTitle>

                {topic.keyServices.length > 0 && (
                  <ServiceTags>
                    {topic.keyServices.map((service) => (
                      <ServiceTag key={service}>{service}</ServiceTag>
                    ))}
                  </ServiceTags>
                )}

                <StudyLink href={`/topics/${topic.topicNumber}`}>
                  Study Resources →
                </StudyLink>
              </TopicContent>

              {topic.studyMinutes > 0 && (
                <TimeStudied>
                  {Math.floor(topic.studyMinutes / 60)}h{" "}
                  {topic.studyMinutes % 60}m studied
                </TimeStudied>
              )}
            </TopicRow>
          </TopicCard>
        ))}
      </TopicsList>
    </Container>
  );
}
