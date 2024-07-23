const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../src/app'); // Ensure this path is correct

chai.use(chaiHttp);

describe('User CRUD Operations', () => {
  it('should list all users on /users GET', (done) => {
    chai.request(app)
      .get('/users')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should add a single user on /users/add POST', (done) => {
    chai.request(app)
      .post('/users/add')
      .send({ username: 'newuser', email: 'newuser@example.com', age: 25 })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should update a user on /users/edit/:id PUT', (done) => {
    chai.request(app)
      .put('/users/edit/1')
      .send({ email: 'newuser.updated@example.com' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should delete a user on /users/delete/:id DELETE', (done) => {
    chai.request(app)
      .delete('/users/delete/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
