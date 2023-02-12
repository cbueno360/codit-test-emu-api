import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { evolve } from "../Domain/Events/Envolve";
import { Exam } from "../Domain/Models/Exam";
import { ExamEvent } from "../Domain/Models/ExamEvent";
import eventService from "../Domain/Services/eventService";
import examService from "../Domain/Services/examService";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  let aggregateId = req.query["id"];

  var outcome = await eventService
    .getAllByAggregateId(aggregateId)
    .then(apply)
    .then(responseSuccess)
    .catch(responseError);
  console.log(outcome);
  context.res = outcome;
};

const apply = (events: ExamEvent[]): Exam => {
  console.log("Total of events to be calculated:" + events.length);
  return events.reduce<Exam>(evolve, {
    status: "",
    id: "",
    createAt: new Date(),
    questions: null,
  });
};

const responseSuccess = (body: any) => response(body, 202);

const responseError = (error: any) => response(error, 500);

const response = (resultBody: any, status: number) => {
  return { body: resultBody, status: status };
};

export default httpTrigger;
