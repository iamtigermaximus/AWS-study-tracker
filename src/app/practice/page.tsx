"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Target,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  RefreshCw,
  BookOpen,
  Sparkles,
  Loader2,
} from "lucide-react";

interface Question {
  id: number;
  scenario: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  domain: string;
  difficulty: string;
}

interface DomainScore {
  domain: string;
  correct: number;
  total: number;
}

interface Course {
  id: string;
  title: string;
  provider: string | null;
  type: string | null;
  tags: string[];
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

const SettingsCard = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const SettingsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  align-items: flex-end;
`;

const SettingGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Label = styled.label`
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: white;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Input = styled.input`
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

const GenerateButton = styled.button`
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  height: 38px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(59, 130, 246, 0.2);
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
    transform: none;
  }
`;

const QuestionCard = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const QuestionNumber = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
`;

const DomainBadge = styled.span<{ $domain: string }>`
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
  background: ${(props) => {
    switch (props.$domain) {
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

const DifficultyBadge = styled.span<{ $difficulty: string }>`
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
  background: ${(props) => {
    switch (props.$difficulty) {
      case "Easy":
        return "#dcfce7";
      case "Medium":
        return "#fef3c7";
      case "Hard":
        return "#fee2e2";
      default:
        return "#f3f4f6";
    }
  }};
  color: ${(props) => {
    switch (props.$difficulty) {
      case "Easy":
        return "#166534";
      case "Medium":
        return "#92400e";
      case "Hard":
        return "#991b1b";
      default:
        return "#374151";
    }
  }};
`;

const Scenario = styled.p`
  font-size: 0.875rem;
  color: #4b5563;
  margin-bottom: 1rem;
  line-height: 1.5;
  font-style: italic;
`;

const QuestionText = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const OptionLabel = styled.label<{
  $selected?: boolean;
  $correct?: boolean;
  $wrong?: boolean;
  $showResult?: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid;
  cursor: ${(props) => (props.$showResult ? "default" : "pointer")};
  transition: all 0.2s ease;

  border-color: ${(props) => {
    if (props.$showResult && props.$correct) return "#22c55e";
    if (props.$showResult && props.$wrong) return "#ef4444";
    if (props.$selected) return "#3b82f6";
    return "#e5e7eb";
  }};

  background: ${(props) => {
    if (props.$showResult && props.$correct) return "#f0fdf4";
    if (props.$showResult && props.$wrong) return "#fef2f2";
    if (props.$selected) return "#eff6ff";
    return "white";
  }};

  &:hover {
    background: ${(props) => (props.$showResult ? undefined : "#f9fafb")};
  }
`;

const RadioInput = styled.input`
  width: 1rem;
  height: 1rem;
  cursor: pointer;
`;

const OptionText = styled.span`
  font-size: 0.875rem;
  color: #4b5563;
  flex: 1;
`;

const Explanation = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: #f0fdf4;
  border-radius: 0.5rem;
  border-left: 3px solid #22c55e;
`;

const ExplanationTitle = styled.p`
  font-size: 0.75rem;
  font-weight: 600;
  color: #166534;
  margin-bottom: 0.25rem;
`;

const ExplanationText = styled.p`
  font-size: 0.875rem;
  color: #4b5563;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #f3f4f6;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #e5e7eb;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #22c55e;
  color: white;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 1rem;
  width: 100%;

  &:hover {
    background: #16a34a;
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`;

const ResultsCard = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Score = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
`;

const ScoreMessage = styled.p<{ $passed: boolean }>`
  font-size: 1rem;
  font-weight: 500;
  color: ${(props) => (props.$passed ? "#22c55e" : "#ef4444")};
`;

const DomainStatsContainer = styled.div`
  margin-top: 1rem;
  text-align: left;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
`;

const DomainStatRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
`;

const DomainName = styled.span`
  font-weight: 500;
`;

const DomainScore = styled.span<{ $percentage: number }>`
  color: ${(props) =>
    props.$percentage >= 70
      ? "#22c55e"
      : props.$percentage >= 50
        ? "#eab308"
        : "#ef4444"};
  font-weight: 600;
`;

const RetakeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin: 1rem auto 0;
  border: none;

  &:hover {
    background: #2563eb;
  }
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6b7280;
`;

const ModeSelector = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.5rem;
`;

const ModeButton = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  background: ${(props) => (props.$active ? "#3b82f6" : "#f3f4f6")};
  color: ${(props) => (props.$active ? "white" : "#4b5563")};
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;

  &:hover {
    background: ${(props) => (props.$active ? "#2563eb" : "#e5e7eb")};
  }
`;

export default function PracticePage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [domainScores, setDomainScores] = useState<DomainScore[]>([]);

  // Test mode
  const [testMode, setTestMode] = useState<"aws" | "course">("aws");

  // Course selection
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [loadingCourses, setLoadingCourses] = useState(true);

  const [settings, setSettings] = useState({
    questionCount: 10,
    domain: "All",
    difficulty: "Medium",
    specificTopic: "",
  });

  // Fetch courses on mount
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/courses");
      const data = await res.json();
      setAvailableCourses(data);
      if (data.length > 0) {
        setSelectedCourseId(data[0].id);
      }
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setLoadingCourses(false);
    }
  };

  const generateTest = async () => {
    setLoading(true);
    setSubmitted(false);
    setAnswers({});
    setCurrentIndex(0);

    try {
      let res;

      if (testMode === "aws") {
        // Use AWS SAA route
        res = await fetch("/api/ai/practice-test", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            questionCount: settings.questionCount,
            domain: settings.domain,
            difficulty: settings.difficulty,
          }),
        });
      } else {
        // Use course test route
        if (!selectedCourseId) {
          alert("Please select a course");
          setLoading(false);
          return;
        }

        res = await fetch("/api/ai/course-test", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            courseId: selectedCourseId,
            questionCount: settings.questionCount,
            difficulty: settings.difficulty,
            specificTopic: settings.specificTopic,
          }),
        });
      }

      const data = await res.json();
      setQuestions(data.questions || []);
    } catch (error) {
      console.error("Failed to generate test:", error);
      alert("Failed to generate test. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const submitTest = async () => {
    let correct = 0;
    const domainCorrect: Record<string, { correct: number; total: number }> =
      {};

    questions.forEach((q) => {
      const isCorrect = answers[q.id] === q.correctAnswer;
      if (isCorrect) correct++;

      if (!domainCorrect[q.domain]) {
        domainCorrect[q.domain] = { correct: 0, total: 0 };
      }
      domainCorrect[q.domain].total++;
      if (isCorrect) domainCorrect[q.domain].correct++;
    });

    const totalScore = Math.round((correct / questions.length) * 100);
    setScore(totalScore);

    const domainStats = Object.entries(domainCorrect).map(([domain, data]) => ({
      domain,
      correct: data.correct,
      total: data.total,
    }));
    setDomainScores(domainStats);
    setSubmitted(true);

    // Save to database
    try {
      await fetch("/api/practice-exam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          score: totalScore,
          source: testMode === "aws" ? "AWS SAA-C03" : "Course Test",
          questionCount: questions.length,
          notes:
            testMode === "course" ? `Course ID: ${selectedCourseId}` : null,
        }),
      });
    } catch (error) {
      console.error("Failed to save exam result:", error);
    }
  };

  const handleAnswer = (questionId: number, answer: string) => {
    if (!submitted) {
      setAnswers({ ...answers, [questionId]: answer });
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const goToNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const resetTest = () => {
    setQuestions([]);
    setAnswers({});
    setSubmitted(false);
    setCurrentIndex(0);
    setScore(0);
    setDomainScores([]);
  };

  const currentQuestion = questions[currentIndex];
  const userAnswer = currentQuestion ? answers[currentQuestion.id] : null;

  return (
    <Container>
      <Title>Practice Tests</Title>
      <Subtitle>Test your knowledge with AI-generated questions</Subtitle>

      {questions.length === 0 && !loading ? (
        <SettingsCard>
          <ModeSelector>
            <ModeButton
              $active={testMode === "aws"}
              onClick={() => setTestMode("aws")}
            >
              🎯 AWS SAA-C03 Exam
            </ModeButton>
            <ModeButton
              $active={testMode === "course"}
              onClick={() => setTestMode("course")}
            >
              📚 My Courses
            </ModeButton>
          </ModeSelector>

          <SettingsRow>
            {testMode === "course" && (
              <SettingGroup>
                <Label>Select Course</Label>
                {loadingCourses ? (
                  <LoadingSpinner>Loading courses...</LoadingSpinner>
                ) : (
                  <Select
                    value={selectedCourseId}
                    onChange={(e) => setSelectedCourseId(e.target.value)}
                  >
                    {availableCourses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.title}{" "}
                        {course.type === "certification" ? "🎓" : "📘"}
                      </option>
                    ))}
                  </Select>
                )}
              </SettingGroup>
            )}

            {testMode === "course" && (
              <SettingGroup>
                <Label>Specific Topic (Optional)</Label>
                <Input
                  type="text"
                  placeholder="e.g., React Hooks, S3 Buckets"
                  value={settings.specificTopic}
                  onChange={(e) =>
                    setSettings({ ...settings, specificTopic: e.target.value })
                  }
                />
              </SettingGroup>
            )}

            {testMode === "aws" && (
              <SettingGroup>
                <Label>Domain</Label>
                <Select
                  value={settings.domain}
                  onChange={(e) =>
                    setSettings({ ...settings, domain: e.target.value })
                  }
                >
                  <option value="All">All Domains</option>
                  <option value="Security">Security (30%)</option>
                  <option value="Resilient">Resilient (26%)</option>
                  <option value="Performance">Performance (24%)</option>
                  <option value="Cost">Cost (20%)</option>
                </Select>
              </SettingGroup>
            )}

            <SettingGroup>
              <Label>Number of Questions</Label>
              <Select
                value={settings.questionCount}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    questionCount: Number(e.target.value),
                  })
                }
              >
                <option value={5}>5 questions</option>
                <option value={10}>10 questions</option>
                <option value={15}>15 questions</option>
                <option value={20}>20 questions</option>
              </Select>
            </SettingGroup>

            <SettingGroup>
              <Label>Difficulty</Label>
              <Select
                value={settings.difficulty}
                onChange={(e) =>
                  setSettings({ ...settings, difficulty: e.target.value })
                }
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </Select>
            </SettingGroup>

            <GenerateButton onClick={generateTest} disabled={loading}>
              {loading ? (
                <Loader2
                  size={16}
                  style={{ animation: "spin 1s linear infinite" }}
                />
              ) : (
                <Target size={16} />
              )}
              {loading ? "Generating..." : "Generate Test"}
            </GenerateButton>
          </SettingsRow>
        </SettingsCard>
      ) : loading ? (
        <LoadingSpinner>
          <Loader2
            size={24}
            style={{
              animation: "spin 1s linear infinite",
              marginBottom: "1rem",
            }}
          />
          <div>Generating your practice test with AI...</div>
        </LoadingSpinner>
      ) : submitted ? (
        <>
          <ResultsCard>
            <Score>{score}%</Score>
            <ScoreMessage $passed={score >= 75}>
              {score >= 75
                ? "🎉 Great job! You passed! Keep up the good work!"
                : "📚 Keep practicing! Review the explanations below to improve."}
            </ScoreMessage>

            {domainScores.length > 0 && (
              <DomainStatsContainer>
                <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>
                  Domain Breakdown:
                </p>
                {domainScores.map((ds) => (
                  <DomainStatRow key={ds.domain}>
                    <DomainName>{ds.domain}:</DomainName>
                    <DomainScore $percentage={(ds.correct / ds.total) * 100}>
                      {ds.correct}/{ds.total} (
                      {Math.round((ds.correct / ds.total) * 100)}%)
                    </DomainScore>
                  </DomainStatRow>
                ))}
              </DomainStatsContainer>
            )}

            <RetakeButton onClick={resetTest}>
              <RefreshCw size={14} /> Take Another Test
            </RetakeButton>
          </ResultsCard>

          {questions.map((q, idx) => {
            const isAnswerCorrect = answers[q.id] === q.correctAnswer;
            return (
              <QuestionCard key={q.id}>
                <QuestionHeader>
                  <QuestionNumber>
                    Question {idx + 1} of {questions.length}
                  </QuestionNumber>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <DomainBadge $domain={q.domain}>{q.domain}</DomainBadge>
                    <DifficultyBadge $difficulty={q.difficulty}>
                      {q.difficulty}
                    </DifficultyBadge>
                  </div>
                </QuestionHeader>

                <Scenario>📖 {q.scenario}</Scenario>
                <QuestionText>{q.question}</QuestionText>

                <OptionsContainer>
                  {q.options.map((option) => {
                    const letter = option.charAt(0);
                    const isSelected = answers[q.id] === letter;
                    const isCorrectAnswer = letter === q.correctAnswer;

                    return (
                      <OptionLabel
                        key={option}
                        $selected={isSelected}
                        $correct={isCorrectAnswer}
                        $wrong={isSelected && !isCorrectAnswer}
                        $showResult={true}
                      >
                        <RadioInput
                          type="radio"
                          name={`q${q.id}`}
                          value={letter}
                          checked={isSelected}
                          readOnly
                        />
                        <OptionText>{option}</OptionText>
                        {isCorrectAnswer && (
                          <CheckCircle size={16} color="#22c55e" />
                        )}
                        {isSelected && !isCorrectAnswer && (
                          <XCircle size={16} color="#ef4444" />
                        )}
                      </OptionLabel>
                    );
                  })}
                </OptionsContainer>

                <Explanation>
                  <ExplanationTitle>📖 Explanation:</ExplanationTitle>
                  <ExplanationText>{q.explanation}</ExplanationText>
                </Explanation>
              </QuestionCard>
            );
          })}
        </>
      ) : (
        <>
          {currentQuestion && (
            <QuestionCard>
              <QuestionHeader>
                <QuestionNumber>
                  Question {currentIndex + 1} of {questions.length}
                </QuestionNumber>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <DomainBadge $domain={currentQuestion.domain}>
                    {currentQuestion.domain}
                  </DomainBadge>
                  <DifficultyBadge $difficulty={currentQuestion.difficulty}>
                    {currentQuestion.difficulty}
                  </DifficultyBadge>
                </div>
              </QuestionHeader>

              <Scenario>📖 {currentQuestion.scenario}</Scenario>
              <QuestionText>{currentQuestion.question}</QuestionText>

              <OptionsContainer>
                {currentQuestion.options.map((option) => {
                  const letter = option.charAt(0);
                  const isSelected = answers[currentQuestion.id] === letter;

                  return (
                    <OptionLabel
                      key={option}
                      $selected={isSelected}
                      onClick={() => handleAnswer(currentQuestion.id, letter)}
                    >
                      <RadioInput
                        type="radio"
                        name={`q${currentQuestion.id}`}
                        value={letter}
                        checked={isSelected}
                        readOnly
                      />
                      <OptionText>{option}</OptionText>
                    </OptionLabel>
                  );
                })}
              </OptionsContainer>
            </QuestionCard>
          )}

          <NavigationButtons>
            <NavButton onClick={goToPrevious} disabled={currentIndex === 0}>
              <ChevronLeft size={16} /> Previous
            </NavButton>
            <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>
              {Object.keys(answers).length} of {questions.length} answered
            </span>
            {currentIndex < questions.length - 1 ? (
              <NavButton onClick={goToNext}>
                Next <ChevronRight size={16} />
              </NavButton>
            ) : (
              <SubmitButton
                onClick={submitTest}
                disabled={Object.keys(answers).length !== questions.length}
              >
                Submit Test
              </SubmitButton>
            )}
          </NavigationButtons>
        </>
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
