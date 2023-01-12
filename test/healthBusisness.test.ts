import chai, { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import sinonChai from 'sinon-chai';
import HeathBusisness from '../src/busisness/health';
import nock from 'nock';
import BadRequestError from '../src/error/BadRequestError';

chai.use(sinonChai);

describe('Test', () => {
    let mocks: { 
        HeathBusisness: {
            add: SinonStub
        }
    };

    beforeEach(() => {
        mocks = { 
            HeathBusisness: {
                add: sinon.stub(HeathBusisness, 'add')
            }
        };
    });

    afterEach(() => {
        sinon.restore(); 
    });
    
    it('add method return 3', () => {
        mocks.HeathBusisness.add.withArgs(1,2).returns(3);
        var result = HeathBusisness.add(1,2);

        expect(result).to.be.equal(3);
        expect(mocks.HeathBusisness.add).to.be.calledWithExactly(1,2);
    });

    it('add method return 4', () => {
        mocks.HeathBusisness.add.withArgs(1,3).returns(4);
        var result = HeathBusisness.callAdd(1,3);

        expect(mocks.HeathBusisness.add).to.be.calledOnce;
        expect(mocks.HeathBusisness.add).to.be.calledWithExactly(1,3);
        expect(result).to.be.equal(4);
    });

    it('spy the callback function return value', () => {

        var spyCallBack = sinon.spy(HeathBusisness,'callCallBackFunction');

        function callBackTest(): number { return 1000 };
        var result = HeathBusisness.callCallBackFunction(callBackTest);

        expect(result).to.be.equals(1000);
        expect(spyCallBack).to.be.calledOnceWith(callBackTest);
    });

    it('spy the callback function', () => {

        var spyCallBack = sinon.spy();

        var result = HeathBusisness.callCallBackFunction(spyCallBack);

        expect(spyCallBack).to.be.calledOnce;
    });

    it('Test promise', async () => {
        var result = await HeathBusisness.usePromise();
        expect(result).to.be.equal(2);
    });

    it('Test AXIOS', async () => {

        var spyCallBack = sinon.spy(HeathBusisness,'getUrl');

        const promise = new Promise((resolve, reject) => {
            resolve;
        })
        const domainNameUrl = 'https://images.unsplash.com';
        const scope = nock(domainNameUrl)
        .persist(true)
        .get(
            '/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80'
          )
          .reply(200,[promise, promise, promise]);

        await HeathBusisness.getUrl();
        
        expect(spyCallBack).to.be.calledOnce;
    });

    it('Test AXIOS Error', async () => {

        var spyCallBack = sinon.spy(HeathBusisness,'getUrl');

        const promise = new Promise((resolve, reject) => {
            reject;
        })
        const domainNameUrl = 'https://images.unsplash.com';
        const scope = nock(domainNameUrl)
        .get(
            '/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80'
          )
          .reply(200,[promise, promise, promise]);
        const errorMessage = `Nock: No match for request {\n  \"method\": \"GET\",\n  \"url\": \"https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80\",\n  \"headers\": {\n    \"accept\": \"application/json, text/plain, */*\",\n    \"user-agent\": \"axios/0.27.2\"\n  }\n}`;
        const error = new BadRequestError(errorMessage);
        HeathBusisness.getUrl().catch((e) => {
            expect(e).to.be.equals(error);
        });
        
        expect(spyCallBack).to.be.calledOnce;
    });

});