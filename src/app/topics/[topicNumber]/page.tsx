"use client";

import { useParams } from "next/navigation";
import styled from "styled-components";
import { BookOpen, Clock, ChevronLeft } from "lucide-react";
import Link from "next/link";

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

const Badge = styled.span`
  display: inline-block;
  background: #eff6ff;
  color: #1e40af;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const MetaInfo = styled.div`
  display: flex;
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

const Message = styled.p`
  font-size: 1rem;
  color: #4b5563;
  margin-bottom: 1rem;
`;

const SubMessage = styled.p`
  font-size: 0.875rem;
  color: #9ca3af;
`;

export default function TopicDetailPage() {
  const params = useParams();
  const topicNumber = params.topicNumber;

  return (
    <Container>
      <BackLink href="/topics">
        <ChevronLeft size={16} /> Back to Topics
      </BackLink>

      <Card>
        <Badge>Topic {topicNumber}/45</Badge>
        <Title>Topic Details</Title>

        <MetaInfo>
          <MetaItem>
            <BookOpen size={14} />
            Security Domain
          </MetaItem>
          <MetaItem>
            <Clock size={14} />
            Est. 2 hours
          </MetaItem>
        </MetaInfo>

        <Message>
          Detailed study content for this topic will appear here.
        </Message>
        <SubMessage>
          Coming soon: Video resources, AWS documentation links, and practice
          questions.
        </SubMessage>
      </Card>
    </Container>
  );
}
