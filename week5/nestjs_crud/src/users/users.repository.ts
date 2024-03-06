import { readFile, writeFile } from "fs/promises";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersRepository {
  async findOne(id: string) {
    const contents = await readFile('users.json', 'utf-8');
    const users = JSON.parse(contents);
    return users[id];
  }

  async findByUsername(username: string) {
    const contents = await readFile('users.json', 'utf-8');
    const users = JSON.parse(contents);

    for(let key in users) {
      if(users[key].username === username) {
        return users[key];
      }
    }
    return null;
  }

  async findAll() {
    const contents = await readFile('users.json', 'utf-8');
    const users = JSON.parse(contents);
    return users;
  }

  async create(content: string) {
    const contents = await readFile('users.json', 'utf-8');
    const users = JSON.parse(contents);

    const id = Math.floor(Math.random() * 9999).toString();

    users[id] = { id: id, username: JSON.parse(content).username, password: JSON.parse(content).password };

    await writeFile('users.json', JSON.stringify(users));
    return users[id];
  }

  async update(id: string, content: string) {
    const contents = await readFile('users.json', 'utf-8');
    const users = JSON.parse(contents);

    if (users[id] !== null && users[id] !== undefined) users[id] = { id: id, username: JSON.parse(content).username, password: JSON.parse(content).password };
    else return null;

    await writeFile('users.json', JSON.stringify(users));
    return users[id]
  }

  async delete(id: string) {
    const contents = await readFile('users.json', 'utf-8');
    const users = JSON.parse(contents);

    if (users[id] !== null && users[id] !== undefined) delete users[id];
    else return null;

    await writeFile('users.json', JSON.stringify(users));
  }
}
