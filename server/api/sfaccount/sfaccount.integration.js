'use strict';

var app = require('../..');
import request from 'supertest';

var newSfaccount;

describe('Sfaccount API:', function() {
  describe('GET /api/sfaccounts', function() {
    var sfaccounts;

    beforeEach(function(done) {
      request(app)
        .get('/api/sfaccounts')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          sfaccounts = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(sfaccounts).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/sfaccounts', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/sfaccounts')
        .send({
          name: 'New Sfaccount',
          info: 'This is the brand new sfaccount!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newSfaccount = res.body;
          done();
        });
    });

    it('should respond with the newly created sfaccount', function() {
      expect(newSfaccount.name).to.equal('New Sfaccount');
      expect(newSfaccount.info).to.equal('This is the brand new sfaccount!!!');
    });
  });

  describe('GET /api/sfaccounts/:id', function() {
    var sfaccount;

    beforeEach(function(done) {
      request(app)
        .get(`/api/sfaccounts/${newSfaccount._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          sfaccount = res.body;
          done();
        });
    });

    afterEach(function() {
      sfaccount = {};
    });

    it('should respond with the requested sfaccount', function() {
      expect(sfaccount.name).to.equal('New Sfaccount');
      expect(sfaccount.info).to.equal('This is the brand new sfaccount!!!');
    });
  });

  describe('PUT /api/sfaccounts/:id', function() {
    var updatedSfaccount;

    beforeEach(function(done) {
      request(app)
        .put(`/api/sfaccounts/${newSfaccount._id}`)
        .send({
          name: 'Updated Sfaccount',
          info: 'This is the updated sfaccount!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedSfaccount = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSfaccount = {};
    });

    it('should respond with the original sfaccount', function() {
      expect(updatedSfaccount.name).to.equal('New Sfaccount');
      expect(updatedSfaccount.info).to.equal('This is the brand new sfaccount!!!');
    });

    it('should respond with the updated sfaccount on a subsequent GET', function(done) {
      request(app)
        .get(`/api/sfaccounts/${newSfaccount._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let sfaccount = res.body;

          expect(sfaccount.name).to.equal('Updated Sfaccount');
          expect(sfaccount.info).to.equal('This is the updated sfaccount!!!');

          done();
        });
    });
  });

  describe('PATCH /api/sfaccounts/:id', function() {
    var patchedSfaccount;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/sfaccounts/${newSfaccount._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Sfaccount' },
          { op: 'replace', path: '/info', value: 'This is the patched sfaccount!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedSfaccount = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedSfaccount = {};
    });

    it('should respond with the patched sfaccount', function() {
      expect(patchedSfaccount.name).to.equal('Patched Sfaccount');
      expect(patchedSfaccount.info).to.equal('This is the patched sfaccount!!!');
    });
  });

  describe('DELETE /api/sfaccounts/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/sfaccounts/${newSfaccount._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when sfaccount does not exist', function(done) {
      request(app)
        .delete(`/api/sfaccounts/${newSfaccount._id}`)
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
