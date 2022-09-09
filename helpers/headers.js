module.exports = {
  setHeaders(token) {
    const header = {
      "x-token": token,
      Accept: "application/json",
    };
    return header;
  },
};
