import { evolve } from "./Events/Envolve";
import { Exam } from "./Models/Exam";
import { ExamEvent } from "./Models/ExamEvent";

const events: ExamEvent[] = [
  {
    aggregateId: "a73d563c-9006-404f-9f32-862b2991a6cf",
    type: "ExamCreated",
    createdAt: new Date(),
    data: {
      examId: "a73d563c-9006-404f-9f32-862b2991a6cf",
      name: "",
      score: 800,
      createdAt: new Date(),
    },
  },
  {
    aggregateId: "a73d563c-9006-404f-9f32-862b2991a6cf",
    createdAt: new Date(),
    type: "QuestionAdded",
    data: {
      examId: "a73d563c-9006-404f-9f32-862b2991a6cf",
      questionId: "9d8cb35a-2729-4514-b3cb-0ac72e7f4443",
      question: "Question test?",
      anwsers: ["1 is correct", "2 is wrong"],
      correctAnwser: ["1 is correct"],
      type: "single_choice",
    },
  },
  {
    aggregateId: "a73d563c-9006-404f-9f32-862b2991a6cf",
    type: "QuestionAdded",
    createdAt: new Date(),
    data: {
      examId: "a73d563c-9006-404f-9f32-862b2991a6cf",
      questionId: "45a51b72-f729-46f2-830c-1140bff7bed8",
      question: "Question test?",
      anwsers: ["1 is correct", "2 is wrong"],
      correctAnwser: ["1 is correct", "2 is wrong"],
      type: "multiple_choice",
    },
  },
  {
    aggregateId: "a73d563c-9006-404f-9f32-862b2991a6cf",
    type: "QuestionAdded",
    createdAt: new Date(),
    data: {
      examId: "a73d563c-9006-404f-9f32-862b2991a6cf",
      questionId: "94e75270-6703-4db4-a7de-a8b3816475e2",
      question: "Question test?",
      anwsers: ["1 is correct", "2 is wrong"],
      correctAnwser: ["1 is correct"],
      type: "single_choice",
    },
  },
];

const exam = events.reduce<Exam>(evolve, {
  status: "",
  id: "",
  createAt: new Date(),
  questions: null,
});

console.log(exam);
