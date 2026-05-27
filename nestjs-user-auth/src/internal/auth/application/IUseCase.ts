export type RequestData = object | undefined | null;
export type ResponseData = object | undefined | null;

export abstract class UseCase {
  abstract execute(requestData: RequestData): Promise<ResponseData>;
}
