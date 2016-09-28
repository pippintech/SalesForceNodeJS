'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var sforderCtrlStub = {
  index: 'sforderCtrl.index',
  show: 'sforderCtrl.show',
  create: 'sforderCtrl.create',
  upsert: 'sforderCtrl.upsert',
  patch: 'sforderCtrl.patch',
  destroy: 'sforderCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var sforderIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './sforder.controller': sforderCtrlStub
});

describe('Sforder API Router:', function() {
  it('should return an express router instance', function() {
    expect(sforderIndex).to.equal(routerStub);
  });

  describe('GET /api/sforders', function() {
    it('should route to sforder.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'sforderCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/sforders/:id', function() {
    it('should route to sforder.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'sforderCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/sforders', function() {
    it('should route to sforder.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'sforderCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/sforders/:id', function() {
    it('should route to sforder.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'sforderCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/sforders/:id', function() {
    it('should route to sforder.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'sforderCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/sforders/:id', function() {
    it('should route to sforder.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'sforderCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
