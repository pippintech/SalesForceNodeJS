/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/sforders              ->  index
 * POST    /api/sforders              ->  create
 * GET     /api/sforders/:id          ->  show
 * PUT     /api/sforders/:id          ->  upsert
 * PATCH   /api/sforders/:id          ->  patch
 * DELETE  /api/sforders/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Sforder from './sforder.model';
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

// Gets a list of Sforders
export function index(req, res) {
  
  return Sforder.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Sforder from the DB
export function show(req, res) {

 sfauth.getSFConnect()
  .then(function(con) {
    return new Promise(function(resolve, reject) {
            var records = [];
            console.log("Id :" + req.params.id);
   
        con.sobject("Order").retrieve(req.params.id, function(err, account) {
        
           if (err)  reject(err);
           else  {
             resolve(account);
             console.log("Prosuct : " + account);
            }
         
          });
    })
  })
  .then(respondWithResult(res))
  .catch(handleError(res));

}

// Creates a new Sforder in the DB
export function create(req, res) {
  sfauth.getSFConnect()
  .then(function(con) {
    return new Promise(function(resolve, reject) {
        con.sobject("Order").create(req.body, function(err, ret) {
        if (err || !ret.success) { return console.error(err, ret); }
          console.log("Created Order id : " + ret.id);
          if (err)  reject(err);
          else  resolve(ret);
        
        });
    })
  })
  .then(respondWithResult(res))
  .catch(handleError(res));

}

function createOrderItem(lineItem){

   console.log("createOrdeItem", lineItem );
  sfauth.getSFConnect()
  .then(function(con) {
    return new Promise(function(resolve, reject) {
             con.sobject("OrderItem").create(lineItem, function(err, result) {
              console.log("Result:" , result);
              if (err)  { 
                   console.log("Error:" + err);
                reject(err);
              }
              else  resolve(result);
            });
    })
  })
  .then(respondWithResult(res))
  .catch(handleError(res));
}

// Upserts the given Sforder in the DB at the specified ID
export function upsert(req, res) {

sfauth.getSFConnect()
  .then(function(con) {
    return new Promise(function(resolve, reject) {
        
  console.log("req.body.PricebookEntryId " + req.body.PricebookEntryId);
  console.log("req.body.PriceBook2Id " + req.params.id);

      con.sobject("PricebookEntry")
      .find({"Product2Id": req.body.PricebookEntryId,
              "PriceBook2Id": req.params.id  })
                  .execute(function(err, records) {
                    console.log("PricebookEntry :records" , records);
                  if (err)  reject(err);
                  else  {
                    req.body.PricebookEntryId = records[0].Id;
                    resolve(createOrderItem(req.body));
                  }
                });
    })
  })
  .then(respondWithResult(res))
  .catch(handleError(res));

}

// Updates an existing Sforder in the DB
export function patch(req, res) {
  console.log("Order Id:" +req.params.id);
  console.log("Pridebook Id:" +req.body.Id)

  sfauth.getSFConnect()
  .then(function(con) {
    return new Promise(function(resolve, reject) {
             con.sobject("Order").update({ Id : req.params.id, Pricebook2Id : req.body.Id }, function(err, result) {
              console.log("Result:" + result);
              if (err)  reject(err);
              else  resolve(result);
            });
    })
  })
  .then(respondWithResult(res))
  .catch(handleError(res));


}

// Deletes a Sforder from the DB
export function destroy(req, res) {
  return Sforder.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
