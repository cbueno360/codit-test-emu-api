import { CosmosClient, ItemResponse, SqlQuerySpec } from "@azure/cosmos";
import { ExamEvent } from "../Models/ExamEvent";

// Set connection string from CONNECTION_STRING value in local.settings.json
const CONNECTION_STRING = process.env.CONNECTION_STRING;

const eventService = {
  init() {
    try {
      this.client = new CosmosClient(CONNECTION_STRING);
      this.database = this.client.database("CoditExams");
      this.container = this.database.container("examEvents");
    } catch (err) {
      console.log(err.message);
    }
  },
  async append(event: ExamEvent) {
    return await this.container.items
      .create(event)
      .then(outcomeSuccess)
      .catch(erroHandle);
  },
  async getAllByAggregateId(aggregateId: string): Promise<ExamEvent[]> {
    const query: SqlQuerySpec = {
      query:
        "SELECT * FROM examEvents event where event.aggregateId = @aggregateId",
      parameters: [{ name: "@aggregateId", value: aggregateId }],
    };
    const iterator = this.container.items.query(query);
    const { resources } = await iterator.fetchAll();
    console.log(resources);
    return resources;
  },
};

const erroHandle = (error: any): ExamEvent => {
  console.log(error);
  return {
    aggregateId: "error",
    createdAt: new Date(),
    type: "ExamCreated",
    data: {
      examId: "error",
      name: "error",
      score: 0,
      createdAt: new Date(),
    },
  };
};

const outcomeSuccess = (outcome: ItemResponse<ExamEvent>): ExamEvent =>
  outcome.resource;

eventService.init();

export default eventService;
