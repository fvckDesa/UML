function uuid() {
  let id = 0;
  return function () {
    return "a" + ++id;
  };
}

const v4 = uuid();

export { v4 };
