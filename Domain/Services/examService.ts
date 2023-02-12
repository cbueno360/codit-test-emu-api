import {
  CosmosClient,
  FeedResponse,
  ItemResponse,
  SqlQuerySpec,
} from "@azure/cosmos";
import { evolveView } from "../Events/EnvolveView";
import { ExamView } from "../Models/Exam";
import { ExamEvent } from "../Models/ExamEvent";

// Set connection string from CONNECTION_STRING value in local.settings.json
const CONNECTION_STRING = process.env.CONNECTION_STRING;

const examService = {
  init() {
    try {
      this.client = new CosmosClient(CONNECTION_STRING);
      this.database = this.client.database("CoditExams");
      this.container = this.database.container("examView");
    } catch (err) {
      console.log(err.message);
    }
  },
  async update(events: ExamEvent[]): Promise<ExamView> {
    return this.container.items
      .upsert(apply(events))
      .then(outcomeUpdateSuccess)
      .catch(errorHandle);
  },
  async readAll(): Promise<ExamView[]> {
    return await this.container.items
      .query(query())
      .fetchAll()
      .then(outcomeSuccess)
      .catch(errorsHandle);
  },
};

const apply = (events: ExamEvent[]): ExamView =>
  events.reduce<ExamView>(evolveView, {
    id: "",
    examId: "",
    createAt: new Date(),
    updatedAt: new Date(),
    title: "",
    questionsQtd: 0,
    status: "",
  });

const errorHandle = (error: any): ExamView => {
  console.log("Error reading exams:");
  console.log(error);

  return {
    id: "",
    examId: "",
    createAt: new Date(),
    updatedAt: new Date(),
    title: "",
    questionsQtd: 0,
    status: "",
  };
};

const errorsHandle = (error: any): ExamView[] => {
  console.log(error);
  return [
    {
      id: "",
      examId: "",
      createAt: new Date(),
      updatedAt: new Date(),
      title: "",
      questionsQtd: 0,
      status: "",
    },
  ];
};

const outcomeUpdateSuccess = (outcome: ItemResponse<ExamView>): ExamView =>
  outcome.resource;

const outcomeSuccess = (outcome: any): ExamView[] => {
  console.log(outcome);
  return outcome.resources;
};

const query = () => {
  const query: SqlQuerySpec = {
    query: "SELECT * FROM ExamView",
  };
  return query;
};

examService.init();

export default examService;
