const Schema = {};

Schema.createSchema = function (mongoose, autoIncrement) {
  const CommentSchema = mongoose.Schema({
    email: {
      type: String
    },
    nickname: {
      type: String,
      required: true
    },
    contents: {
      type: String,
      required: true
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    deleted_at: {
      type: Date
    },
    // 포스트 이름 (어디 포스트에 코멘트를 달았는지 알기 위함)
    post: {
      type: String
    },
    children: {
      type: Array,
      default: []
    }
  });

  CommentSchema.plugin(autoIncrement.plugin, {
    model: 'CommentModel',
    field: 'no',
    startAt: 0,
    incrementBy: 1
  });

  CommentSchema.statics.findCommentsByPost = function (post) {
    return this.find({ post });
  }

  CommentSchema.statics.findAll = function () {
    return this.find();
  }

  CommentSchema.statics.findCommentById = function (id, callback) {
    return this.findById(id, callback);
  }

  return CommentSchema;
}

module.exports = Schema;