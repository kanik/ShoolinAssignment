import { sortPayeeListLodash } from '../api/util';

describe("Payee list util", () => {
    it("should", () => {
        const list = [{"name":"Zac","payeeType":"LINKED","primary":{"isPrimary":true}},{"name":"Alex","payeeType":"PAY_ANYONE","primary":{"isPrimary":false}},{"name":"Ben","payeeType":"PAY_ANYONE","primary":{"isPrimary":false}},{"name":"Mary","payeeType":"PAY_ANYONE","primary":{"isPrimary":false}},{"name":"Angela","payeeType":"LINKED","primary":{"isPrimary":false}},{"name":"Sam","payeeType":"LINKED","primary":{"isPrimary":false}},{"name":"Zac","payeeType":"LINKED","primary":{"isPrimary":true}},{"name":"Andy","payeeType":"BPAY","primary":{"isPrimary":false}},{"name":"John","payeeType":"BPAY","primary":{"isPrimary":false}},{"name":"Zachary","payeeType":"BPAY","primary":{"isPrimary":false}}]
        expect(sortPayeeListLodash()).toEqual(list);
    })
})