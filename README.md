# Mern NoteZipper App

## Deloyed URL

https://note-zipper-2o9s.onrender.com

## Deployment @ Render

- Root Directory: `backend`

- Build command:

```
npm i && npm run build && cd ../frontend && npm i && npm run build && cp -r dist ../backend/react-static
```

- NOTE- Automatic deployments via git are only triggered for root directory i.e **backend**. (changes in frontend folder will not trigger deployment)

-NOTE- Make sure to add Environment Varibles ->JWT_SECRET , MONGO_URI , and USE_STATIC_BUILD

## Source

Tutorial: [Click here]

## Development

1. Using frontend development server:

- To run development locally use `nr start:dev` (you need to start vite frontend server too)
- To run production locally use `nr start:prod` (you need to start vite frontend server too)

2. Using frontend static build files:

**NOTE:** You would need to build frontend with `npm run build` from frontend folder each time you change code in frontend folder.

To run static build of react you can use `nr start:dev-static` and `start:prod-static`.

Thanks.