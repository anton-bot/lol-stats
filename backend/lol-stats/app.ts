import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getSummonerByName } from './api/getSummonerByName';
import { Regions } from 'twisted/dist/constants';

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const summoner = await getSummonerByName('Doublelift', Regions.AMERICA_NORTH);
        return {
            statusCode: 200,
            body: JSON.stringify(summoner),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };
    }
};
