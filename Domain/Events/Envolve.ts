import { Exam } from "../Models/Exam";
import { ExamEvent } from "../Models/ExamEvent";

export const evolve = (currentState: Exam, event: ExamEvent): Exam => {
  switch (event.type) {
    case "ExamCreated":
      return {
        id: event.data.examId,
        status: "Active",
        createAt: new Date(),
        questions: null,
      };
    case "QuestionRemoved":
      return currentState;
    case "QuestionAdded":
      var outcome = [
        {
          id: event.data.questionId,
          question: event.data.question,
          anwsers: event.data.anwsers,
          correctAnwser: event.data.correctAnwser,
          type: event.data.type,
        },
      ];

      if (currentState.questions) {
        currentState.questions.push({
          id: event.data.questionId,
          question: event.data.question,
          anwsers: event.data.anwsers,
          correctAnwser: event.data.correctAnwser,
          type: event.data.type,
        });
        outcome = currentState.questions;
      }

      return {
        id: event.data.examId,
        status: "Active",
        createAt: new Date(),
        questions: outcome,
      };
    default: {
      return currentState;
    }
  }
};
