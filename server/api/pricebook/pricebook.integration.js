'use strict';

var app = require('../..');
import request from 'supertest';

var newPricebook;

describe('Pricebook API:', function() {
  describe('GET /api/pricebooks', function() {
    var pricebooks;

    beforeEach(function(done) {
      request(app)
        .get('/api/pricebooks')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          pricebooks = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(pricebooks).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/pricebooks', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/pricebooks')
        .send({
          name: 'New Pricebook',
          info: 'This is the brand new pricebook!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newPricebook = res.body;
          done();
        });
    });

    it('should respond with the newly created pricebook', function() {
      expect(newPricebook.name).to.equal('New Pricebook');
      expect(newPricebook.info).to.equal('This is the brand new pricebook!!!');
    });
  });

  describe('GET /api/pricebooks/:id', function() {
    var pricebook;

    beforeEach(function(done) {
      request(app)
        .get(`/api/pricebooks/${newPricebook._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          pricebook = res.body;
          done();
        });
    });

    afterEach(function() {
      pricebook = {};
    });

    it('should respond with the requested pricebook', function() {
      expect(pricebook.name).to.equal('New Pricebook');
      expect(pricebook.info).to.equal('This is the brand new pricebook!!!');
    });
  });

  describe('PUT /api/pricebooks/:id', function() {
    var updatedPricebook;

    beforeEach(function(done) {
      request(app)
        .put(`/api/pricebooks/${newPricebook._id}`)
        .send({
          name: 'Updated Pricebook',
          info: 'This is the updated pricebook!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedPricebook = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPricebook = {};
    });

    it('should respond with the original pricebook', function() {
      expect(updatedPricebook.name).to.equal('New Pricebook');
      expect(updatedPricebook.info).to.equal('This is the brand new pricebook!!!');
    });

    it('should respond with the updated pricebook on a subsequent GET', function(done) {
      request(app)
        .get(`/api/pricebooks/${newPricebook._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let pricebook = res.body;

          expect(pricebook.name).to.equal('Updated Pricebook');
          expect(pricebook.info).to.equal('This is the updated pricebook!!!');

          done();
        });
    });
  });

  describe('PATCH /api/pricebooks/:id', function() {
    var patchedPricebook;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/pricebooks/${newPricebook._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Pricebook' },
          { op: 'replace', path: '/info', value: 'This is the patched pricebook!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedPricebook = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedPricebook = {};
    });

    it('should respond with the patched pricebook', function() {
      expect(patchedPricebook.name).to.equal('Patched Pricebook');
      expect(patchedPricebook.info).to.equal('This is the patched pricebook!!!');
    });
  });

  describe('DELETE /api/pricebooks/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/pricebooks/${newPricebook._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when pricebook does not exist', function(done) {
      request(app)
        .delete(`/api/pricebooks/${newPricebook._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
