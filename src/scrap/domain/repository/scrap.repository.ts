import { Scrap } from '../entity/scrap';

export interface ScrapRepository {
  save(scrap: Scrap): Promise<void>;
}

export const SCRAP_REPOSITORY = Symbol('SCRAP_REPOSITORY');
