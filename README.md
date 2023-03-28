# League of Legends Sample Stats App #

This simple MVP fetches stats from the League of Legends API. The user can search by summoner name to display the latest 5 matches of that user. 

## Tech and Deployment ##

Backend: AWS Lambda that calls Riot Games API and returns processed data to frontend.

Frontend: React + TypeScript single-page app hosted on S3 behind Cloudfront.

The frontend is deployed at https://d288aw004gpvw5.cloudfront.net/

## Lessons Learned ##

It was fun exploring the Riot Games API, and besides that, I've learned a couple of things:

- Some packages like `kayn` don't work with `esbuild` and `sam deploy`, so I had to learn the Layers feature in AWS to deploy this library separately as a layer.

- Do more research on a library before using it. The `kayn` library that I used at first was not maintained for years and the Match API v4 that it uses has been disabled by Riot Games. 

## What I Would Do Differently ##

Given more time, here are some things I would do that are now missing in this MVP:

### Essentials ###

- Unit tests

- Error handling on the frontend

- Use AWS Secrets Manager to store API key instead of environment variable

- Display more stats in the UI

### Nice-to-haves ###

- Use Gateway API instead of hardcoding Lambda URL in the frontend

- Allow user to select region instead of hardcoding North America

- Fetch region list from server rather than hardcoding it

- Avoid hitting API rate limits: Redis cache + spread requests across time

- Use Redux Toolkit on the frontend and refactor data fetching frontend code

- Provision S3 bucket via CloudFormation as well, not just the Lambda

- Refactor inputs validation code in Lambda to be more streamlined

- Refactor API code in Lambda to use dependency injection rather than depending on the LoL API library

- Support multiple languages in the UI using `react-i18next`
