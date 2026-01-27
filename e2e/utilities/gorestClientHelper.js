function compare_users(userA, userB) {
    if (userA.name != userB.name) return false;
    if (userA.email != userB.email) return false;
    if (userA.gender != userB.gender) return false;
    if (userA.status != userB.status) return false;
    return true;
};

function compare_articles(articleA, articleB) {
    if (articleA.title != articleB.title) return false;
    if (articleA.body != articleB.body) return false;
    if (articleA.user_id != articleB.user_id) return false;
    return true;
};

function compare_comments(commentA, commentB) {
    if (commentA.name != commentB.name) return false;
    if (commentA.body != commentB.body) return false;
    if (commentA.email != commentB.email) return false;
    if (commentA.post_id != commentB.post_id) return false;
    return true;
};

function compare_todos(todoA, todoB) {
    if (todoA.title != todoB.title) return false;
    // if (todoA.due_on != todoB.due_on) return false;
    if (!time_compare(todoA.due_on,todoB.due_on)) return false;
    if (todoA.status != todoB.status) return false;
    if (todoA.user_id != todoB.user_id) return false;
    return true;
};

function time_compare(a, b) {
  return new Date(a).getTime() === new Date(b).getTime();
}

module.exports = { 
  compare_users,
  compare_articles,
  compare_comments,
  compare_todos
};