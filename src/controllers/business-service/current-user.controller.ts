/* eslint-disable @typescript-eslint/no-explicit-any */
// ####################################################################################################
// ## IMPORTACIÓNS
// ####################################################################################################
import HttpStatus from 'http-status-codes';
import { Operation } from 'fast-json-patch';
import { req, res, next } from 'express';

import { ResponseData, ResponseMe } from '../../interfaces/response-data.interface';
import { APIFilter } from '../../helpers/uri-filter.helper';

import { CommentAppService } from '../../services/models/commentapp.service';
import { ProjectService } from '../../services/models/project.service';
import { RepositoryAppService } from '../../services/models/repositoryapp.service';
import { RequirementService } from '../../services/models/requirement.service';
import { ResourceService } from '../../services/models/resource.service';
import { UserService } from '../../services/models/user.service';

// ##################################################################################################
// ## CONSTANTES
// ##################################################################################################
const TRANSLATION_NAME_MODEL : string = 'CURRENT_USER';

// ####################################################################################################
// ## CLASE CurrentUserController
// ####################################################################################################
export class CurrentUserController  {
  // ************************************************************************************************
  // ** ATRIBUTOS
  // ************************************************************************************************
  protected TRANSLATION_NAME_MODEL : string = TRANSLATION_NAME_MODEL;
  protected serviceName             : any;
  protected service                 : any;

  // ************************************************************************************************
  // ** CONSTRUTOR
  // ************************************************************************************************
  constructor(
    private commentAppService = new CommentAppService,
    private projectService = new ProjectService,
    private repositoryAppService = new RepositoryAppService,
    private requirementService = new RequirementService,
    private resourceService = new ResourceService,
    private userService = new UserService,
  ) { }

  // ************************************************************************************************
  // ** MÉTODOS CRUD (CREACIÓN)
  // ************************************************************************************************
  /**
   * Crea un novo proxecto. (POST)
   *
   * @param req - obxecto da petición
   * @param res - obxecto da resposta
   * @param next
   */
  public create = async (
    req   : req,
    res   : res,
    next  : next
  ): Promise<any> => {
    try {
      let response;

      const responseData : ResponseData = this.processResponse(req, response, 'CREATE');

      res.status(responseData.code).json(responseData);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Crea os proxectos dunha dunha lista pasada. (POST)
   *
   * @param req - obxecto da petición
   * @param res - obxecto da resposta
   * @param next
   */
  public createList = async (
    req   : req,
    res   : res,
    next  : next
  ): Promise<any> => {
    try {
      let response;

      const responseData : ResponseData = this.processResponse(req, response, 'CREATE_LIST');

      res.status(responseData.code).json(responseData);
    } catch (error) {
      next(error);
    }
  }

  // ************************************************************************************************
  // ** MÉTODOS CRUD (READ)
  // ************************************************************************************************
  /**
   * Recupera toda a información relacionada co usuario actual. (GET)
   *
   * @param req - obxecto da petición
   * @param res - obxecto da resposta
   * @param next
   */
  public getMe = async (
    req   : req,
    res   : res,
    next  : next
  ): Promise<any> => {
    try {
      const {
        orderBy,
        limit,
        offset,
        ...query
      } = req.query

      const queryParams = new APIFilter(query);

      const responseMe : ResponseMe = {
        code          : HttpStatus.OK,
        me            : null,
        comments      : await this.commentAppService.getAll(queryParams.getQueryString(), limit, offset),
        projects      : await this.projectService.getAll(queryParams.getQueryString(), limit, offset),
        repositories  : await this.repositoryAppService.getAll(queryParams.getQueryString(), limit, offset),
        requirements  : await this.requirementService.getAll(queryParams.getQueryString(), limit, offset),
        resources     : await this.resourceService.getAll(queryParams.getQueryString(), limit, offset),
      }

      // responseMe.projects = await service.getAll(queryParams.getQueryString(), limit, offset);

      // let response = await this.service.getAll(queryParams.getQueryString(), orderBy, limit, offset);

      // const responseData : ResponseData = this.processResponse(req, response, 'GET_LIST');

      res.status(responseMe.code).json(responseMe);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Recupera tódolos proxectos. (GET)
   *
   * @param req - obxecto da petición
   * @param res - obxecto da resposta
   * @param next
   */
  public getAll = async (
    req   : req,
    res   : res,
    next  : next
  ): Promise<any> => {
    try {
      const {
        orderBy,
        limit,
        offset,
        ...query
      } = req.query

      const queryParams = new APIFilter(query);

      let response = await this.service.getAll(queryParams.getQueryString(), orderBy, limit, offset);

      const responseData : ResponseData = this.processResponse(req, response, 'GET_LIST');

      res.status(responseData.code).json(responseData);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Recupera un proxecto en concreto. (GET)
   *
   * @param req - obxecto da petición
   * @param res - obxecto da resposta
   * @param next
   */
  public get = async (
    req   : req,
    res   : res,
    next  : next
  ): Promise<any> => {
    try {
      const { id } = req.params;
      const queryParams = new APIFilter(req.query);

      let response = await this.service.get(id, queryParams.getQueryString());

      const responseData : ResponseData = this.processResponse(req, response, 'GET');

      res.status(responseData.code).json(responseData);
    } catch (error) {
      next(error);
    }
  };

  // ************************************************************************************************
  // ** MÉTODOS CRUD (UPDATE)
  // ************************************************************************************************
  /**
   * Actualiza un proxecto. (PUT)
   *
   * @param req - obxecto da petición
   * @param res - obxecto da resposta
   * @param next
   */
  public update = async (
    req   : req,
    res   : res,
    next  : next
  ): Promise<any> => {
    try {
      const { id } = req.params;

      let response;

      const responseData : ResponseData = this.processResponse(req, response, 'UPDATE');

      res.status(responseData.code).json(responseData);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Actualiza un proxecto. (PATCH)
   *
   * @param req - obxecto da petición
   * @param res - obxecto da resposta
   * @param next
   */
   public modify = async (
    req   : req,
    res   : res,
    next  : next
  ): Promise<any> => {
    try {
      const { id } = req.params;
      const tempPatch: Operation[] = req.body;
      let objPatch: Operation[] = [];

      let response;

      if (tempPatch.length > 0) {
        // Quitanse as modficacións de ids.
        objPatch = tempPatch.filter(op => !op.path.includes("id"));
      }

      if (objPatch.length > 0) {
        response = await this.service.modify(id, objPatch);
      }

      const responseData : ResponseData = this.processResponse(req, response, 'UPDATE');

      res.status(responseData.code).json(responseData);
    } catch (error) {
      next(error);
    }
  };

  // ************************************************************************************************
  // ** MÉTODOS CRUD (DELETE)
  // ************************************************************************************************
  /**
   * Elimina un proxecto concreto. (DELETE)
   *
   * @param req - obxecto da petición
   * @param res - obxecto da resposta
   * @param next
   */
  public delete = async (
    req   : req,
    res   : res,
    next  : next
  ): Promise<any> => {
    try {
      const { id } = req.params;

      let response = await this.service.delete(id);

      const responseData : ResponseData = this.processResponse(req, response, 'DELETE');

      res.status(responseData.code).json(responseData);
    } catch (error) {
      next(error);
    }
  };

  // ************************************************************************************************
  // ** UTILIDADES
  // ************************************************************************************************
  /**
   * Procesa a resposta HTTP da conexión coa BD.
   *
   * @param req request do método HTTP
   * @param response resposta do método HTTP
   * @param method metótodo para o cal procesar a resposta
   * @returns ResponseData
   */
  protected processResponse(req, response: ResponseData, method: string): ResponseData {
    method = method.toUpperCase();

    let isPlural = method.includes('LIST');
    let isError  = false;
    let plural = (isPlural)
      ? '_PLURAL'
      : '';
    let id = (response && response.data && response.data.id)
      ? response.data.id
      : undefined;

    if (
      !response ||
      (
        response.code != HttpStatus.OK &&
        response.code != HttpStatus.CREATED
      )
    ) {
      isError = true;
    }

    let code = (response && response.code)
      ? response.code
      : HttpStatus.CONFLICT;
    let data = (response)
      ? response.data
      : undefined;
    let message = (!isError && response)
      ? response.message
      : undefined;
    let error = (isError && response)
      ? response.error
      : `ERROR.${method}`;

    if (message) {
      message = req.t(message, { entity: req.t(`${this.TRANSLATION_NAME_MODEL}.NAME${plural}`), id: id });
    }

    if (error) {
      error = req.t(error, { entity: req.t(`${this.TRANSLATION_NAME_MODEL}.NAME${plural}`), id: id });
    }

    const responseData: ResponseData = {
      code,
      data    : (!isError)
        ? data
        : undefined,
      message : (!isError)
        ? message
        : undefined,
      error   : (isError)
        ? error
        : undefined,
    };

    if (isPlural) {
      responseData.total = (response)
        ? response.total
        : 0;
      responseData.from = (response)
        ? response.from
        : 0;
      responseData.limit = (response)
        ? response.limit
        : 0;
    }

    return responseData;
  }
}
