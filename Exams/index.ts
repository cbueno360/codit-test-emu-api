import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import examService from "../Domain/Services/examService";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.res = await examService
    .readAll()
    .then(responseSuccess)
    .catch(responseError);
};

const responseSuccess = (body: any) => response(body, 202);

const responseError = (error: any) => response(error, 500);

const response = (resultBody: any, status: number) => {
  return { body: resultBody, status: status };
};

export default httpTrigger;
