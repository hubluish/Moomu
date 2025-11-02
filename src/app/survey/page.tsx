"use client";
import React, { useState } from "react";
import { supabase } from "@/utils/supabase";
import {
  Wrapper,
  FormContainer,
  Title,
  Subtitle,
  FormGroup,
  Label,
  Textarea,
  SubmitButton,
  ErrorMessage,
  SuccessMessage,
  StarRatingContainer,
  StarLabel,
} from "./survey.styled";

const SurveyPage = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [goodPoints, setGoodPoints] = useState("");
  const [feedback, setFeedback] = useState("");
  const [cheeringMessage, setCheeringMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const isFormValid =
    rating > 0 && goodPoints.trim() !== "" && feedback.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      setError("필수 항목(*)을 모두 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("로그인이 필요합니다. 로그인 후 다시 시도해주세요.");
      }

      const { error: insertError } = await supabase.from("feedback").insert({
        user_id: session.user.id,
        rating: rating,
        good_points: goodPoints,
        feedback: feedback,
        cheering_message: cheeringMessage || null,
      });

      if (insertError) throw insertError;

      setIsSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "설문 제출에 실패했습니다.");
      } else {
        setError("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <Wrapper>
        <FormContainer>
          <SuccessMessage>
            <Title>감사합니다!</Title>
            <p>소중한 의견이 성공적으로 제출되었습니다.</p>
          </SuccessMessage>
        </FormContainer>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <FormContainer onSubmit={handleSubmit}>
        <Title>Moomu 피드백 설문</Title>
        <Subtitle>
          안녕하세요,,, Moomu 개발팀입니다.. 설문 제발 부탁드려요...😭❤️‍🔥
          <br />
          Moomu를 사용하면서 느낀 점들을 솔직하게 적어주시면, 서비스 개선에 많은
          도움이 됩니다! <br />
          모든 항목은 익명으로 처리되며, 약 2~3분 정도 소요됩니다.
        </Subtitle>

        <FormGroup>
          <Label htmlFor="rating">Moomu 평점</Label>
          <StarRatingContainer>
            {[1, 2, 3, 4, 5].map((star) => (
              <StarLabel
                key={star}
                $isActive={star <= (hoverRating || rating)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              >
                ★
              </StarLabel>
            ))}
          </StarRatingContainer>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="good-points">Moomu를 사용했을 때 좋은 점</Label>
          <Textarea
            id="good-points"
            value={goodPoints}
            onChange={(e) => setGoodPoints(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="feedback">피드백 (수정했으면 좋을 사항)</Label>
          <Textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="cheering" className="optional">
            응원 메세지
          </Label>
          <Textarea
            id="cheering"
            value={cheeringMessage}
            onChange={(e) => setCheeringMessage(e.target.value)}
          />
        </FormGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <SubmitButton type="submit" disabled={!isFormValid || isLoading}>
          {isLoading ? "제출 중..." : "제출하기"}
        </SubmitButton>
      </FormContainer>
    </Wrapper>
  );
};

export default SurveyPage;
