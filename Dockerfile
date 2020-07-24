FROM node:lts-alpine

# Create Directory for the Container
WORKDIR /imageprocessserver

# Only copy the package.json file to work directory
COPY package.json package-lock.json ./
RUN npm install

COPY . ./

RUN npm run build

# Start
CMD [ "npm", "start" ]
EXPOSE 3000