// ####################################################################################################
// ## IMPORTACIÓNS
// ####################################################################################################
import { IRouter, Router } from 'express';

// ####################################################################################################
// ## CONSTANTES
// ####################################################################################################
const api_version = process.env.npm_package_version;
const router = Router();

// ####################################################################################################
// ## RUTAS
// ####################################################################################################
/**
 * Función que conten as rutas da aplicación
 *
 * @returns router
 */
function routes(): IRouter {
  router.get('/', (req, res) => {
    res.json(res.__('WELCOME', api_version));
  });

  return router;
};

// ####################################################################################################
// ## EXPORTACIÓNS
// ####################################################################################################
export default routes;
