'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var sfproductCtrlStub = {
  index: 'sfproductCtrl.index',
  show: 'sfproductCtrl.show',
  create: 'sfproductCtrl.create',
  upsert: 'sfproductCtrl.upsert',
  patch: 'sfproductCtrl.patch',
  destroy: 'sfproductCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var sfproductIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './sfproduct.controller': sfproductCtrlStub
});

describe('Sfproduct API Router:', function() {
  it('should return an express router instance', function() {
    expect(sfproductIndex).to.equal(routerStub);
  });

  describe('GET /api/sfproducts', function() {
    it('should route to sfproduct.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'sfproductCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/sfproducts/:id', function() {
    it('should route to sfproduct.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'sfproductCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/sfproducts', function() {
    it('should route to sfproduct.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'sfproductCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/sfproducts/:id', function() {
    it('should route to sfproduct.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'sfproductCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/sfproducts/:id', function() {
    it('should route to sfproduct.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'sfproductCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/sfproducts/:id', function() {
    it('should route to sfproduct.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'sfproductCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
