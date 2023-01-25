import { CosmosClient } from "@azure/cosmos";

// Set connection string from CONNECTION_STRING value in local.settings.json
const CONNECTION_STRING = process.env.CONNECTION_STRING;

const examService = {
  init() {
    try {
      this.client = new CosmosClient(CONNECTION_STRING);
      this.database = this.client.database("CoditExams");
      this.container = this.database.container("exams");
    } catch (err) {
      console.log(err.message);
    }
  },
  async create(examToCreate) {
    const { resource } = await this.container.items.create(examToCreate);
    return resource;
  },
  async read(): Promise<string> {
    const iterator = this.container.items.readAll();
    const { resources } = await iterator.fetchAll();
    return JSON.stringify(resources);
  },
  async update(exam) {
    const { resource } = await this.container
      .item(exam.id, exam.brand.name)
      .replace(exam);
    return resource;
  },
  async delete(id) {
    const result = await this.container.item(id).delete();
  },
};

examService.init();

export default examService;
