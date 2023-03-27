import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getSummonerByName } from './api/getSummonerByName';
import { Regions } from 'twisted/dist/constants';
import { createError } from './utils/createError';
import { isValidSummonerName } from './validation/isValidSummonerName';
import { isValidRegion } from './validation/isValidRegion';
import { SummonerV4DTO } from 'twisted/dist/models-dto';

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        if (!event.queryStringParameters) {
            return createError('No query string parameters provided.', 400);
        }

        const { summoner, region } = event.queryStringParameters;

        if (!isValidSummonerName(summoner)) {
            return createError('Invalid summoner name in `summoner` param', 400);
        }

        if (!isValidRegion(region)) {
            return createError('Invalid region in `region` param', 400);
        }

        let foundSummoner: SummonerV4DTO;
        try {
            foundSummoner = await getSummonerByName(summoner, region);
        } catch (err) {
            return createError('Summoner not found', 404);
        }

        return {
            statusCode: 200,
            body: JSON.stringify(foundSummoner),
        };
    } catch (err) {
        return createError('Unknown error occurred');
    }
};
