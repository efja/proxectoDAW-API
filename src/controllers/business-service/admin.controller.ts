/* eslint-disable @typescript-eslint/no-explicit-any */
// ####################################################################################################
// ## IMPORTACIÓNS
// ####################################################################################################
import { Project } from '../../models/project.model';
import { BaseController } from '../base.controller';

// ##################################################################################################
// ## CONSTANTES
// ##################################################################################################
const TRANSLATION_NAME_MODEL : string = 'ADMIN';

// ####################################################################################################
// ## CLASE AdminController
// ####################################################################################################
export class AdminController extends BaseController {
  // ************************************************************************************************
  // ** ATRIBUTOS
  // ************************************************************************************************
  protected TRANSLATION_NAME_MODEL : string = TRANSLATION_NAME_MODEL;

  // ************************************************************************************************
  // ** CONSTRUTOR
  // ************************************************************************************************
  constructor() {
    super(Project)
  }

  // ************************************************************************************************
  // ** UTILIDADES
  // ************************************************************************************************
}
