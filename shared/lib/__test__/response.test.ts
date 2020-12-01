import response from "../response";

describe("response", () => {
  it("respuesta debe ser 200 por defecto", () => {
    const resp = response.json({ ok: true });
    expect(resp.statusCode).toEqual(200);
  });
});
