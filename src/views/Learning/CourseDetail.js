import React, { useMemo, useState } from "react";
import { Box, Flex, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useLearning } from "context/LearningContext";
import LessonCard from "components/Learning/LessonCard";
import ChallengeModal from "components/Learning/ChallengeModal";

export default function CourseDetail() {
  const { courseId } = useParams();
  const { getCourseById, getLessonState, unlockLesson, completeLesson } = useLearning();
  const course = getCourseById(courseId);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeLesson, setActiveLesson] = useState(null);

  const lessons = useMemo(() => course?.lessons || [], [course]);

  if (!course) {
    return (
      <Box>
        <Text>Corso non trovato.</Text>
      </Box>
    );
  }

  const handleUnlock = (lesson) => {
    const ok = unlockLesson(course.id, lesson.id, lesson.cost);
    if (!ok) {
      toast({ title: "Crediti insufficienti", status: "warning", duration: 2000 });
    } else {
      toast({ title: `Lezione ${lesson.number} sbloccata!`, status: "success", duration: 1500 });
      setActiveLesson(lesson);
      onOpen();
    }
  };

  const handleStartChallenge = (lesson) => {
    setActiveLesson(lesson);
    onOpen();
  };

  const handleChallengeSubmit = (lesson, code) => {
    const passed = lesson.challenge.validate(code);
    if (passed) {
      const bonus = completeLesson(course.id, lesson.id);
      toast({ title: `Sfida superata! +${bonus} crediti bonus`, status: "success", duration: 2000 });
      onClose();
    } else {
      toast({ title: "Non ancora! Riprova.", status: "error", duration: 1500 });
    }
  };

  return (
    <Box>
      <Text fontSize='2xl' fontWeight='bold' mb='2'>
        {course.title}
      </Text>
      <Text color='gray.300' mb='6'>
        Sblocca lezioni con crediti e affronta le sfide.
      </Text>

      <Flex wrap='wrap' gap='16px'>
        {lessons.map((lesson) => {
          const state = getLessonState(course.id, lesson.id);
          return (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              unlocked={state.unlocked}
              completed={state.completed}
              onUnlock={() => handleUnlock(lesson)}
              onStart={() => handleStartChallenge(lesson)}
            />
          );
        })}
      </Flex>

      <ChallengeModal
        isOpen={isOpen}
        onClose={onClose}
        title={activeLesson?.challenge?.title}
        prompt={activeLesson?.challenge?.prompt}
        onSubmit={(code) => activeLesson && handleChallengeSubmit(activeLesson, code)}
      />
    </Box>
  );
}
