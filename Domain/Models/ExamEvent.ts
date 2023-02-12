export type ExamEvent =
  | {
      aggregateId: string;
      createdAt: Date;
      type: "ExamCreated";
      data: {
        examId: string;
        name: string;
        score: number;
        createdAt: Date;
      };
    }
  | {
      aggregateId: string;
      createdAt: Date;
      type: "QuestionAdded";
      data: {
        examId: string;
        questionId: string;
        question: string;
        anwsers: string[];
        correctAnwser: string[];
        type: string;
      };
    }
  | {
      aggregateId: string;
      createdAt: Date;
      type: "QuestionRemoved";
      data: {
        examId: string;
        questionId: string;
      };
    }
  | {
      aggregateId: string;
      createdAt: Date;
      type: "ExamDeleted";
    };
