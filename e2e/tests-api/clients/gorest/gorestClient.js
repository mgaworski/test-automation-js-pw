import { BaseClient } from '../baseClient.js';

export class GorestClient extends BaseClient {
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