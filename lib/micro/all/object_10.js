var obj = {};
var result = [];

for (var i = 0; i < 10; i++) {
  result.push(obj);
}

var suite = {
  name: "All object 10",
  initialize: function(Constructor) {
    return result;
  },
  test: function(Constructor, testInstance, array) {
    Constructor.all(array).then(function() {
      testInstance.end();
    });
  },
  options: {
    defer: true
  }
};

export suite;