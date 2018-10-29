function getConfig() {
  let config = {
    init: (selector1, selector2, resultSelector) => {
      config.first = $(selector1);
      config.second = $(selector2);
      config.result = $(resultSelector);
    },
    add: () => {
      config.result.val(
        +config.first.val() + +config.second.val()
      );
    },
    subtract: () => {
      config.result.val(
        +config.first.val() - +config.second.val()
      );
    }
  };
  return config;
}
