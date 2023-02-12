import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import eventService from "../Domain/Services/eventService";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const exam = req.body;
  context.res = await eventService
    .append(exam)
    .then(responseSuccess)
    .catch(responseError);
};

const responseSuccess = (body: any) => response(body, 202);

const responseError = (error: any) => response(error, 500);

const response = (resultBody: any, status: number) => {
  return { body: resultBody, status: status };
};

export default httpTrigger;
