// ####################################################################################################
// ## IMPORTS
// ####################################################################################################

// ####################################################################################################
// ## ENUMS
// ####################################################################################################
export enum TargetRole {
    PERFORMANCE,
    PROJECT,
    REQUIREMENT,
    STAGE,
    STATE,
    SYSTEM,
}

// ####################################################################################################
// ## CLASS Role
// ####################################################################################################
export class Role {
    // ************************************************************************************************
    // ** ATTRIBUTES
    // ************************************************************************************************
    public name         : string;
    public description  : string;
    public scope        : string;

    // Relations
    public permissions  : Permissions;
    public TargetRole   : TargetRole;

    // ************************************************************************************************
    // ** CONSTRUCTOR
    // ************************************************************************************************
    constructor(obj?: Partial<Role>) {
        Object.assign(this, obj);
    }

    // ************************************************************************************************
    // ** METHODS
    // ************************************************************************************************
}
