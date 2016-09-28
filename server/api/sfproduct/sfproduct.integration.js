'use strict';

var app = require('../..');
import request from 'supertest';

var newSfproduct;

describe('Sfproduct API:', function() {
  describe('GET /api/sfproducts', function() {
    var sfproducts;

    beforeEach(function(done) {
      request(app)
        .get('/api/sfproducts')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          sfproducts = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(sfproducts).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/sfproducts', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/sfproducts')
        .send({
          name: 'New Sfproduct',
          info: 'This is the brand new sfproduct!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newSfproduct = res.body;
          done();
        });
    });

    it('should respond with the newly created sfproduct', function() {
      expect(newSfproduct.name).to.equal('New Sfproduct');
      expect(newSfproduct.info).to.equal('This is the brand new sfproduct!!!');
    });
  });

  describe('GET /api/sfproducts/:id', function() {
    var sfproduct;

    beforeEach(function(done) {
      request(app)
        .get(`/api/sfproducts/${newSfproduct._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          sfproduct = res.body;
          done();
        });
    });

    afterEach(function() {
      sfproduct = {};
    });

    it('should respond with the requested sfproduct', function() {
      expect(sfproduct.name).to.equal('New Sfproduct');
      expect(sfproduct.info).to.equal('This is the brand new sfproduct!!!');
    });
  });

  describe('PUT /api/sfproducts/:id', function() {
    var updatedSfproduct;

    beforeEach(function(done) {
      request(app)
        .put(`/api/sfproducts/${newSfproduct._id}`)
        .send({
          name: 'Updated Sfproduct',
          info: 'This is the updated sfproduct!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedSfproduct = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSfproduct = {};
    });

    it('should respond with the original sfproduct', function() {
      expect(updatedSfproduct.name).to.equal('New Sfproduct');
      expect(updatedSfproduct.info).to.equal('This is the brand new sfproduct!!!');
    });

    it('should respond with the updated sfproduct on a subsequent GET', function(done) {
      request(app)
        .get(`/api/sfproducts/${newSfproduct._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let sfproduct = res.body;

          expect(sfproduct.name).to.equal('Updated Sfproduct');
          expect(sfproduct.info).to.equal('This is the updated sfproduct!!!');

          done();
        });
    });
  });

  describe('PATCH /api/sfproducts/:id', function() {
    var patchedSfproduct;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/sfproducts/${newSfproduct._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Sfproduct' },
          { op: 'replace', path: '/info', value: 'This is the patched sfproduct!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedSfproduct = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedSfproduct = {};
    });

    it('should respond with the patched sfproduct', function() {
      expect(patchedSfproduct.name).to.equal('Patched Sfproduct');
      expect(patchedSfproduct.info).to.equal('This is the patched sfproduct!!!');
    });
  });

  describe('DELETE /api/sfproducts/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/sfproducts/${newSfproduct._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when sfproduct does not exist', function(done) {
      request(app)
        .delete(`/api/sfproducts/${newSfproduct._id}`)
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
