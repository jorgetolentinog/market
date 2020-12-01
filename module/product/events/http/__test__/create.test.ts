import jestPlugin from 'serverless-jest-plugin';

import Product from '../../../models/product';
import * as mod from '../create';

const lambdaWrapper = jestPlugin.lambdaWrapper;

const wrapped = lambdaWrapper.wrap(mod);

describe("product events http create", () => {
  it("deberia quedar registrado en la bd", async (done) => {
    const response = await wrapped.run({
      body: JSON.stringify({
        title: "demo",
        price: 10,
      }),
    });
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(201);

    const data = JSON.parse(response.body);
    const exists = await Product.exists({ id: data.id });
    expect(exists).toEqual(true);
    done();
  });
});
