# ncc-no-app

The National Coordination Center for Research and Innovation in Cyber ​​Security (NCC-NO) is administered by NSM and the Research Council.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Building and Running the Docker Container

## Build the Docker Container

To build the Docker image, run the following command:

```
docker build -t ncc-no-app .
```

This will create a Docker image with the tag ncc-no-app using the Dockerfile in the current directory.

## Running the Docker Container

Once the image is built, you can run the container using the command:

```
docker run -dp 3000:3000 ncc-no-app

```

This will start the container and map `port 3000` of the container to `port 3000` on the host machine.

## Verifying the Running Container

To verify that the container is running, use the following command:

```
docker ps
```

This will list all running containers, showing the `CONTAINER_ID` and other information.

## Start and Stop an Existing Container

To start or stop an already created container, use the following commands:

```
docker start CONTAINER_ID
docker stop CONTAINER_ID
```

Replace `CONTAINER_ID` with the actual ID of the container, which can be retrieved using `docker ps` or `docker ps -a` for all containers.

# Using Docker Compose

If you prefer to manage your Docker containers with Docker Compose, follow these instructions:

## Build and Run with Docker Compose

To build and run the container with Docker Compose, use the following commands:

```
docker-compose build
docker-compose up
```

This will build and run the containers as defined in the `docker-compose.yml` file.

## Stop Containers Managed by Docker Compose

To stop the containers created by Docker Compose:

```
docker-compose down
```

This command stops and removes the containers, networks, and volumes defined in the `docker-compose.yml` file.

# Running a Development Container

For development purposes, you can build and run a development environment using a specific Docker Compose configuration.

## Build the Development Container

```
docker-compose -f .devcontainer/docker-compose.yml build
```

This will build the container using the `docker-compose.dev.yml` configuration file.

## Run the Development Container

To start the development container, use one of the following options:

```
docker-compose -f .devcontainer/docker-compose.yml up
```

or

```
docker-compose -f .devcontainer/docker-compose.yml up --build
```

The `--build` flag forces a rebuild of the container before starting it.

## Viewing Logs

To view logs of a running container:

```
docker logs CONTAINER_ID
```

Replace `CONTAINER_ID` with the actual ID or name of the container.

## Removing Unused Containers and Images

To clean up unused containers and images, run:

```
docker system prune
```

This will remove stopped containers, unused networks, and dangling images.
