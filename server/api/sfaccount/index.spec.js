'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var sfaccountCtrlStub = {
  index: 'sfaccountCtrl.index',
  show: 'sfaccountCtrl.show',
  create: 'sfaccountCtrl.create',
  upsert: 'sfaccountCtrl.upsert',
  patch: 'sfaccountCtrl.patch',
  destroy: 'sfaccountCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var sfaccountIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './sfaccount.controller': sfaccountCtrlStub
});

describe('Sfaccount API Router:', function() {
  it('should return an express router instance', function() {
    expect(sfaccountIndex).to.equal(routerStub);
  });

  describe('GET /api/sfaccounts', function() {
    it('should route to sfaccount.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'sfaccountCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/sfaccounts/:id', function() {
    it('should route to sfaccount.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'sfaccountCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/sfaccounts', function() {
    it('should route to sfaccount.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'sfaccountCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/sfaccounts/:id', function() {
    it('should route to sfaccount.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'sfaccountCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/sfaccounts/:id', function() {
    it('should route to sfaccount.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'sfaccountCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/sfaccounts/:id', function() {
    it('should route to sfaccount.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'sfaccountCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
