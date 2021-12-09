// ####################################################################################################
// ## IMPORTACIÓNS
// ####################################################################################################
import qs from 'qs';
import moment from 'moment';
import {
    isJSONValue,
    isJSONObject,
    isJSONArray,
    isString,
    isNumber,
    isBoolean,
    isNull,
    isUndefined,
    JSONObject,
    JSONValue,
    JSONArray
  } from "types-json";

// ####################################################################################################
// ## CLASE AssignedResource
// ####################################################################################################
export class APIFilter {
    // ************************************************************************************************
    // ** ATRIBUTOS
    // ************************************************************************************************
    public booleanFilters   : any[] = [];
    public dateFilters      : any[] = [];
    public numberFilters    : any[] = [];
    public orderByFilters   : any[] = [];
    public stringFilters    : any[] = [];

    // Relacións

    // ************************************************************************************************
    // ** CONSTRUTOR
    // ************************************************************************************************
    constructor(filters?: any) {
        this.parseFilters(filters);
    }

    // ************************************************************************************************
    // ** MÉTODOS
    // ************************************************************************************************
    /**
     * Extrae os filtros das propiedades dun obxecto e clasificaos polo tipo de datos.
     *
     * @param filters obxecto cunha colección de filtros como parámetros
     */
    private parseFilters(filters: any): void {
        for (let paramKey in filters as Object) {
            let paramValue = filters[paramKey];

            if (paramKey.toLowerCase() === 'sort' || paramKey.toLowerCase() === 'orderby') {
                this.orderByFilters =  paramValue.split(',');
            } else {
                if (isBoolean(paramValue)) {
                    this.booleanFilters.push(
                        { [paramKey] : Boolean(paramValue) }
                    );
                } else if (isNumber(paramValue)) {
                    this.numberFilters.push(
                        { [paramKey] : Number(paramValue) }
                    );
                } else {
                    let date = moment(paramValue, true); // Modo estricto

                    if (date.isValid()) {
                        this.dateFilters.push(
                            { [paramKey] : date.toISOString() }
                        );
                    } else {
                        this.stringFilters.push(
                            { [paramKey] : paramValue }
                        );
                    }
                }
            }
        }
    }

    private getObjectKeyValue(list: any[], result : Object) {
        for (let i = 0; i < list.length; i++) {
            let item = list[0];
            result[Object.keys(item)[0]] = Object.values(item)[0];
        }
    }

    public getQueryString() {
        let result : Object = {};

        if (this.orderByFilters.length > 0) {
            result['orderBy'] = this.orderByFilters;
        }

        this.getObjectKeyValue(this.booleanFilters, result);
        this.getObjectKeyValue(this.numberFilters, result);
        this.getObjectKeyValue(this.dateFilters, result);
        this.getObjectKeyValue(this.stringFilters, result);

        const queryParameters = qs.stringify(
            result,
            { arrayFormat: 'repeat' }
        );

        return queryParameters;

    }
}
