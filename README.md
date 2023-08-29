# ImgFlow

ImgFlow is a node-based *batch* image processing pipeline creator and runner. It's a fully finished SaaS product and it generated, get ready, 0$... Since it's a dead project, I wanted to open source it.

Btw, I built this in 30 days, here is the [first commit](https://github.com/Stradi/imgflow.app/commit/7897c15f6a8a4686d561bcf987412549a67af325) and here is the [last commit](https://github.com/Stradi/imgflow.app/commit/4cd6ca4521b0030fa764b92c2f7d4f889592f9ca).
Technically after I commit this `README.md` change, last commit will not be the linked commit above but you get it.

## What is This?

Like I've said. This is a node-based *batch* image processing pipeline creator and runner. You drag some nodes into the canvas, you connect those nodes and save it. After that, you select the pipeline you've just created, upload your images and click run. After a while,
series of operations will be applied to all of the files you've uploaded. Then, you can download all the files as `.zip` and be happy.

## Project Structure

This repository is a monorepo with some config files (for deployment) aside. Monorepo contains two projects, [`backend`](https://github.com/Stradi/imgflow.app/tree/main/apps/backend) and [`frontend`](https://github.com/Stradi/imgflow.app/tree/main/apps/frontend).

### Frontend

Frontend is using Next.js, Tailwind CSS, Radix UI, Zustand and some other libraries. Since it's a Next.js application, you can just deploy it to Vercel and be happy. While deploying, you need to set some environment variables.

- `NEXT_PUBLIC_CDN_URL`: This is the Cloudflare R2 url. It is only used in one place. After processing and clicking the download button, a modal will open and you will see the thumbnails of the processed images. Heh, that's where this is used.
- `NEXT_PUBLIC_API_URL`: This is the API url. Mine was `https://api.imgflow.app`.

### Backend

Backend stuff is written in TypeScript and uses Prisma, Express.js, Redis and some other libraries. For storage, I've used Cloudflare R2's free tier. So before deploying you need to create a bucket in R2 and get the necessary tokens from dashboard.
To deploy backend, you need to fill some environment variables.

- `DATABASE_URL`: I forgot to remove this. You don't need this.
- `JWT_ACCESS_SECRET`: This is used for generating access and refresh tokens that are used in authentication process. Write something really secure in here.
- `CF_R2_ENDPOINT`: You will get this in Cloudflare R2 dashboard page. You can refer to their documentation.
- `CF_R2_ACCESS_KEY_ID`: You will get this in Cloudflare R2 dashboard page. You can refer to their documentation.
- `CF_R2_SECRET_ACCESS_KEY`: You will get this in Cloudflare R2 dashboard page. You can refer to their documentation.
- `REDIS_HOST`: You can get this in your Redis deployment.
- `REDIS_PORT`: You can get this in your Redis deployment.
- `REDIS_USERNAME`?: [Optional] You can get this in your Redis deployment.
- `REDIS_PASSWORD`?: [Optional] You can get this in your Redis deployment.
- `LEMONSQUEEZY_API_KEY`: This is used for payments. I've used LemonSqueezy for payment processor and got 0$ sales.

## Deploying

Deploying is actually really easy, thanks to my `docker-compose` files. You first need to deploy backend project because you need that API url in backend project.

To deploy the backend, you just need to run `make up` in a Docker installed Linux server. The `make up` command will setup your API, [Nginx Proxy Manager](https://nginxproxymanager.com/), [Uptime Kuma](https://uptime.kuma.pet)
and [Plausible Analytics](https://plausible.io/).

After doing that, you need to setup Nginx Proxy Manager and configure your domains. I've personally used `https://api.imgflow.app` for backend, `https://status.imgflow.app` for Uptime Kuma and `https://analytics.imgflow.app` for Plausible Analytics. You just need
to create DNS records for `api`, `status` and `analytics` and point these into your server IP. Nginx will handle the rest.

After everything related backend is done, go to Vercel and select this repository. Fill the environment variables and click Deploy. Vercel will compile and do stuff with your code and frontend application will be deployed on a Vercel domain.

Lastly, you need to configure your DNS records and everything should work.

---

This project doesn't have a license. It was merely a challenge for me (building a product in one month) and I completed that. To be honest, I've had really high expectations on ImgFlow, but building product is the easy part, validating the idea is harder.
