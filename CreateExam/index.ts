import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import examService from "../services/examsService";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("HTTP trigger function processed a request.");
  let response;

  try {
    const exam = req.body;
    const result = await examService.create(exam);
    response = { body: result, status: 200 };
  } catch (err) {
    response = { body: err.message, status: 500 };
  }

  context.res = response;
};

export default httpTrigger;
