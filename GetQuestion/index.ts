import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import questionService from "../services/questionService";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("HTTP trigger function processed a request.");
  let id = req.query["id"];
  let response;
  try {
    let exams = await questionService.readAllById(id);
    response = { body: exams, status: 200 };
  } catch (err) {
    response = { body: err.message, status: 500 };
  }
  context.res = response;
};

export default httpTrigger;
