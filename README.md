# Image Delivery Server(IDS)

> This project ia mainly a Node JS server running, which accepts an runtime API request from any clients. Based on the request it will convert the remage size on run-time and return the image to the User.

### Scripts

#### `npm run start:dev`

Starts the application in development using `nodemon`.

#### `npm run build`

Builds the app at `build` folder, before sytaring will clean up the folders.

#### `npm run start`

Starts the app in production by first building the project with `npm run build`, and then executing the compiled JavaScript at `build/index.js`.

### Development

```bash
$ npm istall
$ npm run start:dev
$ open http://localhost:3333/
```

### Deploy

```bash
$ npm run tsc
$ npm run build
```

### Npm Scripts

- Use `npm run lint` to check code style
- Use `npm test` to run unit test

### Requirements

- Node.js latest
- Typescript latest

### Image API Usage

- Open `http://localhost:3333/image/image1.jpg?size=1080x1920` in any REST supported medium.
- Options:
    - Size = height x width
    - Images available - image1, image2 and image 3
- On runtime images can be added in any of the below folders and without re-compilling the images will be served by the server.
    - `src\assets\image`
    - `build\assest\image`

### Stats API Usage

- Open `http://localhost:3333/stats` in any REST supported medium.
- Example Response
    ```bash
    {
        "up_since": "Fri Jul 24 2020 18:27:57 GMT+0530 (India Standard Time)",
        "images": {
            "processed_images": "1",
            "raw_images": "3"
        },
        "request": {
            "total_requests": "2",
            "new_hits": "0",
            "cache_hits": "0"
        }
    }
    ```

### Docker
 - Below are the steps to run the docker image app
 - Start the Docker app
 - Execute `docker build -t <Path>/auto-image-serve .` in terminal to build the Docker image
 - Execute `docker images` in terminal list all your docker images, where the previous line build will be seen.
 - Execute `docker run -p 3000:3333 auto-image-serve` in your terminal
 - Open Browser and test the API's


