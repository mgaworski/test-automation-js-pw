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

module.exports = { 
  compare_users,
  compare_articles,
  compare_comments
};