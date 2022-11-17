function uuid() {
  let id = 0;
  return function () {
    return String(++id);
  };
}

const v4 = uuid();

export { v4 };
