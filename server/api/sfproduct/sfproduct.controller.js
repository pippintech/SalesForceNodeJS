/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/sfproducts              ->  index
 * POST    /api/sfproducts              ->  create
 * GET     /api/sfproducts/:id          ->  show
 * PUT     /api/sfproducts/:id          ->  upsert
 * PATCH   /api/sfproducts/:id          ->  patch
 * DELETE  /api/sfproducts/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Sfproduct from './sfproduct.model';
import * as sfauth from '../../sfauth/sfauth.service';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Sfproducts
export function index(req, res) {

 sfauth.getSFConnect()
  .then(function(con) {
    return new Promise(function(resolve, reject) {
            con.query("SELECT Id, Name from Product2", function(err, result) {
              console.log("Result:" + result);
              if (err)  reject(err);
              else  resolve(result);
            });
    })
  })
  .then(respondWithResult(res))
  .catch(handleError(res));

}

// Gets a single Sfproduct from the DB
export function show(req, res) {
  return Sfproduct.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Sfproduct in the DB
export function create(req, res) {
  return Sfproduct.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Sfproduct in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Sfproduct.findOneAndUpdate({_id: req.params.id}, req.body, {upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Sfproduct in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Sfproduct.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Sfproduct from the DB
export function destroy(req, res) {
  return Sfproduct.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
