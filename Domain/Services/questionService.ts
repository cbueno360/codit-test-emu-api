import { CosmosClient, SqlQuerySpec } from "@azure/cosmos";
import { Question } from "../Models/Exam";

// Set connection string from CONNECTION_STRING value in local.settings.json
const CONNECTION_STRING = process.env.CONNECTION_STRING;

const query = (id) => {
  const query: SqlQuerySpec = {
    query: "SELECT * FROM examsEvents event where event.id = @id",
    parameters: [{ name: "@id", value: id }],
  };
};

const questionService = {
  init() {
    try {
      this.client = new CosmosClient(CONNECTION_STRING);
      this.database = this.client.database("CoditExams");
      this.container = this.database.container("examEvents");
    } catch (err) {
      console.log(err.message);
    }
  },
  async readById(id): Promise<Question> {
    const { resources } = await this.container.items.query(query).fetchAll();
    return resources;
  },
  async readAllByExamId(id): Promise<Question[]> {
    const query: SqlQuerySpec = {
      query: "SELECT * FROM examsEvents event where event.id = @id",
      parameters: [{ name: "@id", value: id }],
    };
    const iterator = this.container.items.query(query);
    const { resources } = await iterator.fetchAll();
    return resources;
  },
};

questionService.init();

export default questionService;
