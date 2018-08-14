const user = [
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
];

const counter = [
  // 카운트 가져오기
  {
    file: './counter',
    path: '/api/counter/count',
    method: 'count',
    type: 'get'
  },
];

/**
 * 1. 코멘트 등록하기
 * 2. 코멘트 답글 달기
 * 3. 전체 또는 포스트이름에 해당하는 코멘트들 가져오기
 * 4. 코멘트 수정하기 (테스트)
 */
const comment = [
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
    path: '/api/comment/comment',
    method: 'updateComment',
    type: 'put'
  },
];

module.exports = [
  ...user,
  ...counter,
  ...comment
];