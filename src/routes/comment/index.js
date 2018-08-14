/**
 * 댓글 등록
 */
function save(req, res) {
  const database = req.app.get('database');

  try {
    const newComment = new database.CommentModel({ ...req.body });
    newComment.save((err, comment) => {
      if (err) {
        res.status(500).json({ error: 'failed to register comment' });
        return true;
      }

      const { post } = comment;
      database.CommentModel.findCommentsByCondition({ post }, (err, comments) => {
        res.json({ comments });
      });
    });
  } catch (e) { res.status(500).json({ error: e.message }); }
}

/**
 * 댓글 답변 등록
 */
function reply(req, res) {
  const database = req.app.get('database');
  const { id } = req.query;

  try {
    database.CommentModel.findCommentById(id, function (err, comment) {
      if (err) {
        res.status(404).json({ error: 'failed to register reply' });
        return true;
      }

      comment.children.push({
        ...req.body,
        _id: randomId(),
        created_at: new Date().toISOString()
      });

      comment.save((err) => {
        if (err) {
          res.status(500).json({ error: 'failed to register reply' });
          return true;
        }
        
        database.CommentModel.findCommentsByCondition({ post: req.body.post }, (err, comments) => {
          res.json({ comments });
        });
      });
    });
  } catch (e) { res.status(500).json({ error: e.message }); }
}


/**
 * 코멘트들 가져오기 (포스트 이름에 의한, 전체)
 */
function commentsByPost(req, res) {
  const database = req.app.get('database');
  const { post } = req.query;

  try {
    database.CommentModel.findCommentsByCondition(post && { post } || {}, (err, comments) => {
      res.json({ comments });
    });
  } catch (e) { res.status(500).json({ error: e.message }); }
}

async function updateComment(req, res) {
  const database = req.app.get('database');
  const { id } = req.query;

  try {
    await database.CommentModel.findCommentById(id, function (err, comment) {
      comment.deleted_at = req.body.deleted_at;
      const result = comment.save(async (err) => {
        if (err) res.status(500).json({ error: 'failed to add reply' });
        else {
          const comments = await database.CommentModel.findAll();
          res.json({ comments });
        }
      });
    });
  } catch (e) { res.status(500).json({ error: e.message }); }
}

function randomId() {
  let _id = '';
  for (var i = 0; i < 24; i++) {
    let char = parseInt(Math.random() * 10, 10);
    _id += char === parseInt(Math.random() * 10, 10) ? String.fromCharCode(97 + char) : char;
  }

  return _id;
}

module.exports = {
  save,
  reply,
  commentsByPost,
  updateComment,
}