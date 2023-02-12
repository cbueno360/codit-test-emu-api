import { Exam, ExamView } from "../Models/Exam";
import { ExamEvent } from "../Models/ExamEvent";

export const evolveView = (
  currentState: ExamView,
  event: ExamEvent
): ExamView => {
  switch (event.type) {
    case "ExamCreated":
      return {
        id: event.data.examId,
        examId: event.data.examId,
        createAt: event.data.createdAt,
        updatedAt: event.data.createdAt,
        title: event.data.name,
        questionsQtd: 0,
        status: "Active",
      };
    case "QuestionRemoved":
      return {
        ...currentState,
        questionsQtd: currentState.questionsQtd - 1,
        updatedAt: event.createdAt,
      };
    case "QuestionAdded":
      return {
        ...currentState,
        questionsQtd: currentState.questionsQtd + 1,
        updatedAt: event.createdAt,
      };
    case "ExamDeleted":
      return {
        ...currentState,
        status: "Inactive",
      };
    default: {
      return currentState;
    }
  }
};
