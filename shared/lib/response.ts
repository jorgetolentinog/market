const json = (body: Object = {}, status: number = 200) => ({
  headers: {
    "Content-Type": "application/json",
  },
  statusCode: status,
  body: body != null ? JSON.stringify(body) : "",
});

export default {
  json,
};
