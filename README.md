# Zahlenspiel

## What is it?

This repository contains a digital version of **The Game**

The Game, a game which we like to call *"Zahlenspiel"*.

## Why?

During the COVID-19 pandemic we weren't able to play card games with our friends, so I decided to build a digital version of it.

It's not meant as a full replacement, but it serves its purpose as long as we can't meet in person.

## How to play?

1. Start or join a game
2. Once it's your turn (your avatar has a green border), select a card stack to drop cards onto by clicking on it
3. The selected card stack is indicated via a white border
4. Select the card you want to drop by clicking on it
5. Once you dropped enough cards, a skip button will appear right of your cards. Click it to finish your turn.
6. Try not to lose!

## Development

This whole thing here is a mono-repo setup using [lerna](https://lerna.js.org/).

It consists of a backend part in `packages/zahlenspiel-backend`,
a shared package which contains messages and entities for communication 
between frontend and backend in `packages/zahlenspiel-shared-entities` 
and a [React](https://reactjs.org/) frontend in `packages/zahlenspiel-ui`.

### Building the project

Run `npm i && npm run rebuild` on package root level.

### Running the project

Once built, you can run both backend and frontend via `npm start` in the respective package.

### Bundling the project

Running `npm i && npm run bundle` will bundle both frontend and backend in a single `bundle` folder on root level.

Starting it via `node bundle/app/index.js` gets everything running.

Visit `localhost:2567` for a closer look.