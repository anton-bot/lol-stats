import { LolApi } from 'twisted'
import { IBaseApiParams } from 'twisted/dist/base/base.utils';

const api = createApi();

export const DEFAULT_LOL_CONFIG: IBaseApiParams = {
    key: process.env.RIOT_API_KEY,
};

function createApi(config = DEFAULT_LOL_CONFIG): LolApi {
    return new LolApi(config);
}

export default api;
