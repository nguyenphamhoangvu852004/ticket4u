import { RequestData, ResponseData, UseCase } from './IUseCase';

export class OAuthLoginUseCase extends UseCase {
  execute(requestData: RequestData): Promise<ResponseData> {
    throw new Error('Method not implemented.');
  }
}
