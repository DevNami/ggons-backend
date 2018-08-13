module.exports = [
  {
    file: './user',
    path: '/api/user/register',
    method: 'register',
    type: 'post'
  },
  {
    file: './user',
    path: '/api/user/login',
    method: 'login',
    type: 'post'
  },
  {
    file: './user',
    path: '/api/user/login',
    method: 'login_auto',
    type: 'get'
  },
  {
    file: './user',
    path: '/api/user/logout',
    method: 'logout',
    type: 'get'
  },
  {
    file: './counter',
    path: '/api/counter/count',
    method: 'count',
    type: 'get'
  },
  {
    file: './comment',
    path: '/api/comment/save',
    method: 'save',
    type: 'post'
  },
  {
    file: './comment',
    path: '/api/comment/reply',
    method: 'reply',
    type: 'put'
  },
  {
    file: './comment',
    path: '/api/comment/comments',
    method: 'commentsByPost',
    type: 'get'
  },
  {
    file: './comment',
    path: '/api/comment/all',
    method: 'all',
    type: 'get'
  },
  {
    file: './comment',
    path: '/api/comment/comment',
    method: 'updateComment',
    type: 'put'
  },
]