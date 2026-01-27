import { BaseClient } from '../baseClient.js';

class GorestClient extends BaseClient {
  constructor(request, cfg = {}, version = "V2", token = "") {
    super(request, cfg);
    switch (version) {
      case "V0":
        this.baseURL = `${cfg.gorestURL}public-api/`;
        break;
      case "V1":
        this.baseURL = `${cfg.gorestURL}public/v1/`;
        break;
      case "V2":
        this.baseURL = `${cfg.gorestURL}public/v2/`;
        break;
    };
    this.token = token;
  };

  // Users
  async list_users() { return this.get("users", { headers: { Accept: `application/json` }, }); };
  async get_user(id) { return this.get(`users/${id}?access-token=${this.token}`); };
  async create_user(user) { return this.post(`users?access-token=${this.token}`, { data: user }); };
  async update_user(id, user) { return this.put(`users/${id}?access-token=${this.token}`, { data: user }); };
  async delete_user(id) { return this.delete(`users/${id}?access-token=${this.token}`); };

  // Posts
  async list_posts() { return this.get("posts", { headers: { Accept: `application/json` }, }); };
  async get_post(id) { return this.get(`posts/${id}?access-token=${this.token}`); };
  async create_post(post) { return this.post(`posts?access-token=${this.token}`, { data: post }); };
  async update_post(id, post) { return this.put(`posts/${id}?access-token=${this.token}`, { data: post }); };
  async delete_post(id) { return this.delete(`posts/${id}?access-token=${this.token}`); };

  // Comments
  async list_comments() { return this.get("comments", { headers: { Accept: `application/json` }, }); };
  async get_comment(id) { return this.get(`comments/${id}?access-token=${this.token}`); };
  async create_comment(comment) { return this.post(`comments?access-token=${this.token}`, { data: comment }); };
  async update_comment(id, comment) { return this.put(`comments/${id}?access-token=${this.token}`, { data: comment }); };
  async delete_comment(id) { return this.delete(`comments/${id}?access-token=${this.token}`); };

  // Todos
  async list_todos() { return this.get("todos", { headers: { Accept: `application/json` }, }); };
  async get_todo(id) { return this.get(`todos/${id}?access-token=${this.token}`); };
  async create_todo(comment) { return this.post(`todos?access-token=${this.token}`, { data: comment }); };
  async update_todo(id, comment) { return this.put(`todos/${id}?access-token=${this.token}`, { data: comment }); };
  async delete_todo(id) { return this.delete(`todos/${id}?access-token=${this.token}`); };

};

// Helper functions

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
  GorestClient,
  compare_users,
  compare_articles,
  compare_comments,
  compare_todos
}