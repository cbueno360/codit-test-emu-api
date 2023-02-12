export type Exam = {
  status: string;
  id: string;
  createAt: Date;
  questions: Question[] | null;
};

export type Question = {
  id: string;
  question: string;
  anwsers: string[];
  correctAnwser: string[];
  type: string;
};

export type ExamView = {
  id: string;
  examId: string;
  createAt: Date;
  updatedAt: Date | null;
  title: string;
  questionsQtd: number;
  status: string;
};
