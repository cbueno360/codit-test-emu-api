import { CosmosClient, SqlQuerySpec } from "@azure/cosmos";

// Set connection string from CONNECTION_STRING value in local.settings.json
const CONNECTION_STRING = process.env.CONNECTION_STRING;

const questionService = {
  init() {
    try {
      this.client = new CosmosClient(CONNECTION_STRING);
      this.database = this.client.database("CoditExams");
      this.container = this.database.container("exams");
    } catch (err) {
      console.log(err.message);
    }
  },
  async readAllById(id): Promise<string> {
    const query: SqlQuerySpec = {
      query: "SELECT * FROM exams f where f.id = @id",
      parameters: [{ name: "@id", value: id }],
    };
    const iterator = this.container.items.query(query);
    const { resources } = await iterator.fetchAll();
    return JSON.stringify(resources);
  },
};

questionService.init();

export default questionService;
