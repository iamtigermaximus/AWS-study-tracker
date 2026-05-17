"use client";

import styled from "styled-components";
import { Target } from "lucide-react";

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
  margin-bottom: 2rem;
`;

const ComingSoonCard = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 3rem;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const IconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: #eff6ff;
  border-radius: 50%;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  font-size: 1.125rem;
  color: #4b5563;
  margin-bottom: 0.5rem;
`;

const SubMessage = styled.p`
  font-size: 0.875rem;
  color: #9ca3af;
`;

export default function PracticePage() {
  return (
    <Container>
      <Title>Practice Tests</Title>
      <Subtitle>AI-generated SAA-style questions</Subtitle>

      <ComingSoonCard>
        <IconWrapper>
          <Target size={32} color="#3b82f6" />
        </IconWrapper>
        <Message>Coming soon: AI-generated practice tests!</Message>
        <SubMessage>
          Generate unlimited SAA-style questions based on your completed topics.
        </SubMessage>
      </ComingSoonCard>
    </Container>
  );
}
