const chai = require('chai');
const app = require('../app');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('API', () => {

    it('CHECK LIST USERS - GET /api', (done) => {
        chai.request(app).get('/api')
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.length).to.equal(30);
                expect(res.body[0]).to.have.property('id');
                expect(res.body[0]).to.have.property('login');
                expect(res.body).to.be.a('array');
                done();
            })
    });

    it('CHECK LIST USER INFO - GET /api/user/PaulaoDev', (done) => {
        chai.request(app).get('/api/user/PaulaoDev')
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.login).to.equal('PaulaoDev');
                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('bio');
                expect(res.body).to.have.property('name');
                expect(res.body).to.be.a('Object');
                done();
            })
    });

    it('CHECK LIST USER REPOSITORIES - GET /api/user/PaulaoDev/repos', (done) => {
        chai.request(app).get('/api/user/PaulaoDev/repos')
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body[0]).to.have.property('id');
                expect(res.body[0]).to.have.property('node_id');
                expect(res.body[0]).to.have.property('full_name');
                expect(res.body).to.be.a('array');
                done();
            })
    });

});