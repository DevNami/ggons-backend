const Schema = {};

Schema.createSchema = function (mongoose, autoIncrement) {
  const CounterSchema = mongoose.Schema({
    date: {
      type: Date
    }
  });

  CounterSchema.plugin(autoIncrement.plugin, {
    model: 'CounterModel',
    field: 'no',
    startAt: 0,
    incrementBy: 1
  });

  CounterSchema.statics.total = function (callback) {
    return this.find({}, callback);
  }

  return CounterSchema;
}

module.exports = Schema;