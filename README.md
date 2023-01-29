# NFT Analytics Website

[DEDA](https://www.deda.app) is a project started as a personal experiment to learn how to develop a web app.
It started very simple but soon expanded. The objective of this website is to provide a complete set of data and analytics on multiple
NFT project for people who are less familiar in this world. It was made for people who are getting started but also for people who are looking for
an easy-to-understand dashboard that provide all the essential information needed to evaluate a project.

I'll keep this README as simple as possible for a full explanation of this website and its story please read
this [LinkedIn-article](https://www.linkedin.com/pulse/building-website-coding-experience-6-months-journey-luca-conti/),
please to leave a Like!

## What is in this repository?
This project contains 3 elements:
1. Client
2. Server
3. NGINX load balancer

These elements are all dockerized into containers, managed by a docker-composer file

## Technology used:

### Client
The client was made in React JS and has the following dependencies:
- Axios
- HTTPS
- moment
- MUI
- sass
- Use local storage
- React select
- React icons
- React router hash link
- recharts

### Server
The server is based on Node JS and has the following dependencies:
- Express
- Cors
- Dotenv
- Mongo DB

### NGINX
NGINX load balancer initialed in the docker file and the configured in default.conf

### Deployment
This project runs on a free tier EC2 machine in AWS

> I kept server, load balancer and client in the same machine since this project doesn't have commercial use,
> for that reason I preferred keeping a structure that is simpler to manage and only needs a EC2 machine to run.