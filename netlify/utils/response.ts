export const createResponse = ({ status, ...body }) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export const createUnauthorizedResponse = () =>
  createResponse({
    message: "Unauthorized",
    token: null,
    status: 401,
  });
