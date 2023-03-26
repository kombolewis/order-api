// eslint-disable-next-line node/no-unpublished-import
import chai from 'chai';
import chaiHttp from 'chai-http';
// eslint-disable-next-line node/no-unpublished-import
import 'mocha';
import app from '../../src/app';

const expect = chai.expect;
chai.use(chaiHttp);

describe('baseRoute', () => {
  it('should respond with HTTP 200 status', async () => {
    return chai
      .request(app)
      .get('/index')
      .then(res => {
        expect(res.status).to.be.equal(200);
      });
  });
  it('should respond with success message', async () => {
    return chai
      .request(app)
      .get('/index')
      .then(res => {
        expect(res.body.status).to.be.equal('success');
      });
  });
});
