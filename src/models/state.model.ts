// ####################################################################################################
// ## IMPORTS
// ####################################################################################################

// ####################################################################################################
// ## CLASS State
// ####################################################################################################
export class State {
    // ************************************************************************************************
    // ** ATTRIBUTES
    // ************************************************************************************************
    public name         : string;
    public description  : string;

    // ************************************************************************************************
    // ** CONSTRUCTOR
    // ************************************************************************************************
    constructor(obj?: Partial<State>) {
        Object.assign(this, obj);
    }

    // ************************************************************************************************
    // ** METHODS
    // ************************************************************************************************
}
