import { Regions } from "twisted/dist/constants";

export function isValidRegion(region: string | undefined): region is Regions {
    return Object.values(Regions).includes(region as Regions);
}
