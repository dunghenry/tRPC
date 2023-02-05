# Build api using tRPC + Expressjs + Docker

## API endpoint

### Create Post

```js
curl -X POST "http://localhost:4000/api/post.createPost" -d '{"title": "Xin chao" }' -H 'content-type: application/json'
```

### Greeting

```js
http://localhost:4000/api/greeting?batch=1&input={"0":{"name":"Dung"}}
```

### List Posts

```js
http://localhost:4000/api/post.listPosts
```
