'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var pricebookCtrlStub = {
  index: 'pricebookCtrl.index',
  show: 'pricebookCtrl.show',
  create: 'pricebookCtrl.create',
  upsert: 'pricebookCtrl.upsert',
  patch: 'pricebookCtrl.patch',
  destroy: 'pricebookCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var pricebookIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './pricebook.controller': pricebookCtrlStub
});

describe('Pricebook API Router:', function() {
  it('should return an express router instance', function() {
    expect(pricebookIndex).to.equal(routerStub);
  });

  describe('GET /api/pricebooks', function() {
    it('should route to pricebook.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'pricebookCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/pricebooks/:id', function() {
    it('should route to pricebook.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'pricebookCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/pricebooks', function() {
    it('should route to pricebook.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'pricebookCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/pricebooks/:id', function() {
    it('should route to pricebook.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'pricebookCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/pricebooks/:id', function() {
    it('should route to pricebook.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'pricebookCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/pricebooks/:id', function() {
    it('should route to pricebook.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'pricebookCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
