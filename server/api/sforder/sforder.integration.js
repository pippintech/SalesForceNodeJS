'use strict';

var app = require('../..');
import request from 'supertest';

var newSforder;

describe('Sforder API:', function() {
  describe('GET /api/sforders', function() {
    var sforders;

    beforeEach(function(done) {
      request(app)
        .get('/api/sforders')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          sforders = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(sforders).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/sforders', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/sforders')
        .send({
          name: 'New Sforder',
          info: 'This is the brand new sforder!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newSforder = res.body;
          done();
        });
    });

    it('should respond with the newly created sforder', function() {
      expect(newSforder.name).to.equal('New Sforder');
      expect(newSforder.info).to.equal('This is the brand new sforder!!!');
    });
  });

  describe('GET /api/sforders/:id', function() {
    var sforder;

    beforeEach(function(done) {
      request(app)
        .get(`/api/sforders/${newSforder._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          sforder = res.body;
          done();
        });
    });

    afterEach(function() {
      sforder = {};
    });

    it('should respond with the requested sforder', function() {
      expect(sforder.name).to.equal('New Sforder');
      expect(sforder.info).to.equal('This is the brand new sforder!!!');
    });
  });

  describe('PUT /api/sforders/:id', function() {
    var updatedSforder;

    beforeEach(function(done) {
      request(app)
        .put(`/api/sforders/${newSforder._id}`)
        .send({
          name: 'Updated Sforder',
          info: 'This is the updated sforder!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedSforder = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSforder = {};
    });

    it('should respond with the original sforder', function() {
      expect(updatedSforder.name).to.equal('New Sforder');
      expect(updatedSforder.info).to.equal('This is the brand new sforder!!!');
    });

    it('should respond with the updated sforder on a subsequent GET', function(done) {
      request(app)
        .get(`/api/sforders/${newSforder._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let sforder = res.body;

          expect(sforder.name).to.equal('Updated Sforder');
          expect(sforder.info).to.equal('This is the updated sforder!!!');

          done();
        });
    });
  });

  describe('PATCH /api/sforders/:id', function() {
    var patchedSforder;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/sforders/${newSforder._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Sforder' },
          { op: 'replace', path: '/info', value: 'This is the patched sforder!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedSforder = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedSforder = {};
    });

    it('should respond with the patched sforder', function() {
      expect(patchedSforder.name).to.equal('Patched Sforder');
      expect(patchedSforder.info).to.equal('This is the patched sforder!!!');
    });
  });

  describe('DELETE /api/sforders/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/sforders/${newSforder._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when sforder does not exist', function(done) {
      request(app)
        .delete(`/api/sforders/${newSforder._id}`)
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
