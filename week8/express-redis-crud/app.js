import express from 'express'
import { createClient } from 'redis'
import fs from 'fs/promises'

const PORT = 3030;
const app = express();
const dataFilePath = './data.json'

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

const redisClient = await createClient()
  .on('error', err => console.log('Redis client error', err))
  .connect()

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})

const usersCacheMiddleware = async (req, res, next) => {
  try {
    const key = 'users';
    const data = await redisClient.get(key);

    if(data) {
      console.log('user data fetched from redis cache');
      req.users = JSON.parse(data);
    }
    else req.users = null;

    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

app.get('/users', usersCacheMiddleware, async (req, res) => {
  try {
    let data;

    if(req.users) data = req.users;

    else {
      data = await fs.readFile(dataFilePath, 'utf-8');
      data = JSON.parse(data);
      await redisClient.setEx('users', 3600, JSON.stringify(data));
    }

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
})

app.get('/users/:id', usersCacheMiddleware, async (req, res) => {
  try {
    let data;

    if(req.users) data = req.users;
    else {
      data = await fs.readFile(dataFilePath, 'utf-8');
      data = JSON.parse(data);
      await redisClient.setEx('users', 3600, JSON.stringify(data));
    }

    const user = data.filter((u) => u.id === parseInt(req.params.id));

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
})

app.post('/users', async (req, res, next) => {
  try {
    const { name } = req.body;
    let data = await fs.readFile(dataFilePath, 'utf-8');
    data = JSON.parse(data);

    const user = {
      id: data[data.length - 1].id + 1,
      name: name
    }

    data.push(user)

    await fs.writeFile(dataFilePath, JSON.stringify(data));
    await redisClient.del('users')

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
})

app.put('/users/:id', async (req, res) => {
  try {
    const { name } = req.body;
    let data = await fs.readFile(dataFilePath, 'utf-8');
    data = JSON.parse(data);
    
    data = data.map((u) => {
      if(u.id !== parseInt(req.params.id)) return u;
      else {
        u.name = name;
        return u;
      }
    })

    await fs.writeFile(dataFilePath, JSON.stringify(data));
    await redisClient.del('users')

    res.status(200).json({
      message: 'user data updated successfully!'
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
})

app.delete('/users/:id', async (req, res) => {
  try {
    let data = await fs.readFile(dataFilePath, 'utf-8');
    data = JSON.parse(data);

    data = data.filter((u) => u.id !== parseInt(req.params.id));

    await fs.writeFile(dataFilePath, JSON.stringify(data));
    await redisClient.del('users');

    res.status(200).json({
      message: 'user deleted successfully.'
    })
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
})