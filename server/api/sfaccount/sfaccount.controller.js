/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/sfaccounts              ->  index
 * POST    /api/sfaccounts              ->  create
 * GET     /api/sfaccounts/:id          ->  show
 * PUT     /api/sfaccounts/:id          ->  upsert
 * PATCH   /api/sfaccounts/:id          ->  patch
 * DELETE  /api/sfaccounts/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Sfaccount from './sfaccount.model';
import * as sfauth from '../../sfauth/sfauth.service';

function respondWithResult(res, statusCode) {
  console.log("respondWithREsult" + statusCode);
  statusCode = statusCode || 200;
  return function(entity) {
    console.log("Entity  " + entity);
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

// Gets a list of Sfaccounts
export function index(req, res) {
  //Get list of accounts from salesforce and return the same
    
  sfauth.getSFConnect()
  .then(function(con) {
    return new Promise(function(resolve, reject) {
            con.query("SELECT Id, Name, BillingCity, AccountNumber, Phone FROM Account", function(err, result) {
              if (err)  reject(err);
              else  resolve(result);
            });
    })
  })
  .then(respondWithResult(res))
  .catch(handleError(res));

}

// Gets a single Sfaccount from the DB
export function show(req, res) {
 

 sfauth.getSFConnect()
  .then(function(con) {
    return new Promise(function(resolve, reject) {
            var records = [];
            console.log("Id :" + req.params.id);
   
        con.sobject("Account").retrieve(req.params.id, function(err, account) {
           if (err)  reject(err);
           else  {
             resolve(account);
             console.log("Name : " + account.Name);
             
            }
         
          });

    })
  })
  .then(respondWithResult(res))
  .catch(handleError(res));

}



// Creates a new Sfaccount in the DB
export function create(req, res) {
  // Call get token
  
  // IMplement Create Account details
  console.log(req.body);
  sfauth.getSFConnect()
  .then(function(con) {
    return new Promise(function(resolve, reject) {
        con.sobject("Account").create(req.body, function(err, ret) {
        if (err || !ret.success) { return console.error(err, ret); }
          console.log("Created Contract id : " + ret.id);
          if (err)  reject(err);
          else  resolve(ret);
        
        });
    })
  })
  .then(respondWithResult(res))
  .catch(handleError(res));
}

// Upserts the given Sfaccount in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Sfaccount.findOneAndUpdate({_id: req.params.id}, req.body, {upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Sfaccount in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Sfaccount.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Sfaccount from the DB
export function destroy(req, res) {
  return Sfaccount.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

// Gets a single Sforder from the DB
export function getorders(req, res) {
 console.log("getorders");
 
  sfauth.getSFConnect()
  .then(function(con) {
    return new Promise(function(resolve, reject) {
            con.sobject("Order")
             .find({"accountId": req.params.id})
              .execute(function(err, records) {
                console.log("records" + records);
              if (err)  reject(err);
              else  resolve(records);
            });
    })
  })
  .then(respondWithResult(res))
  .catch(handleError(res));


}