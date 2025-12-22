import { ResponseData } from '@/internal/global/ResponseData';
import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';

export const ApiResponseData = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiExtraModels(ResponseData, model),

    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseData) },
          {
            properties: {
              data: { $ref: getSchemaPath(model) },
            },
          },
        ],
      },
    }),
  );
};
