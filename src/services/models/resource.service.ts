// ####################################################################################################
// ## IMPORTACIÓNS
// ####################################################################################################
import { Resource } from '../../models/resource.model';
import { BaseModelService } from './base-model.service';

// ##################################################################################################
// ## CONSTANTES
// ##################################################################################################
const ENDPOINT : string = 'resources';

// ####################################################################################################
// ## CLASE ResourceService
// ####################################################################################################
export class ResourceService extends BaseModelService<Resource> {
  // ************************************************************************************************
  // ** ATRIBUTOS
  // ************************************************************************************************

  // ************************************************************************************************
  // ** CONSTRUTOR
  // ************************************************************************************************
  constructor() {
    super(Resource, ENDPOINT);
  }

  // ************************************************************************************************
  // ** UTILIDADES
  // ************************************************************************************************
}
