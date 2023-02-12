import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { ExamEvent } from "../Domain/Models/ExamEvent";
import eventService from "../Domain/Services/eventService";
import examService from "../Domain/Services/examService";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  let aggregateId = req.query["id"];

  context.res = await eventService
    .getAllByAggregateId(aggregateId)
    .then(updateExamView)
    .catch(responseError);
};

const updateExamView = (events: ExamEvent[]) =>
  examService.update(events).then(responseSuccess).catch(responseError);

const responseSuccess = (body: any) => response(body, 202);

const responseError = (error: any) => response(error, 500);

const response = (resultBody: any, status: number) => {
  return { body: resultBody, status: status };
};

export default httpTrigger;
