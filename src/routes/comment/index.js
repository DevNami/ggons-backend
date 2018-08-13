/**
 * 댓글 등록/저장
 */
async function save(req, res) {
  const database = req.app.get('database');
  const {
    nickname,
    contents,
    post
  } = req.body;

  try {
    const comment = new database.CommentModel({
      nickname,
      contents,
      post
    });
    const result = await comment.save();
    
    if (result) {
      const comments = await database.CommentModel.findCommentsByPost(post);
      res.json({ comments });
    }
  } catch (e) { res.json({ ...e }); }
}

/**
 * 댓글 답변 등록/저장
 */
async function reply(req, res) {
  const database = req.app.get('database');
  const { id } = req.query;

  try {
    await database.CommentModel.findCommentById(id, function (err, comment) {
      comment.children.push({
        ...req.body,
        _id: randomId(),
        created_at: new Date().toISOString()
      });

      const result = comment.save(async (err) => {
        // if (err) res.status(500).json({error: 'failed to add reply'});
        
        const comments = await database.CommentModel.findCommentsByPost(req.body.post);
        res.json({ comments });
      });
    });
  } catch (e) { res.json({ ...e }); }
}

async function updateComment(req, res) {
  const database = req.app.get('database');
  const { id } = req.query;

  try {
    await database.CommentModel.findCommentById(id, function (err, comment) {
      comment.deleted_at = req.body.deleted_at;
      const result = comment.save(async (err) => {
        if (err) res.status(500).json({error: 'failed to add reply'});
        else {
          const comments = await database.CommentModel.findAll();
          res.json({ comments });
        }
      });
    });
  } catch (e) { res.json({ ...e }); }
}

/**
 * 댓글 등록/저장
 */
async function commentsByPost(req, res) {
  const database = req.app.get('database');
  const { post } = req.query;

  try {
    const comments = await database.CommentModel.findCommentsByPost(post);
    
    if (comments) {
      res.json({ comments });
    }

  } catch (e) { res.json({ ...e }); }
}

/**
 * 모든 댓글 가져오기
 */
async function all(req, res) {
  const database = req.app.get('database');

  try {
    const result = await database.CommentModel.findAll();
    
    if (result) {
      res.json({
        comments: result
      });
    }
  } catch (e) { res.json({ ...e }); }
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
  all,
  updateComment,
}