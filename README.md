# Music Playlist API

A RESTful API for managing a personal music playlist using **Node.js, Express, MongoDB, and Mongoose**.

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* dotenv

## Project Structure

```text
Music Playlist API/
│
├── config/
│   └── db.js
├── models/
│   └── songs.js
├── controllers/
│   └── songsController.js
├── routes/
│   └── songs.js
├── middleware/
│   └── errorHandler.js
├── .env
├── .gitignore
├── index.js
├── package.json
├── package-lock.json
└── README.md
```

## Song Data

Each song contains the following fields:

| Field         | Type    | Rules                                                 |
| ------------- | ------- | ----------------------------------------------------- |
| `song`        | String  | Required, extra spaces are trimmed                    |
| `durationSec` | Number  | Required, minimum 30 and maximum 1200                 |
| `mood`        | String  | `happy`, `sad`, `chill`, or `party`. Default: `chill` |
| `liked`       | Boolean | Default: `false`                                      |
| `releasedOn`  | Date    | Optional, use `YYYY-MM-DD`                            |

## API Endpoints

| Method | Endpoint                  | Description                  | Status          |
| ------ | ------------------------- | ---------------------------- | --------------- |
| GET    | `/songs`                  | Get all songs                | 200             |
| GET    | `/songs?mood=happy`       | Get songs filtered by mood   | 200             |
| GET    | `/songs?sort=durationSec` | Get songs sorted by duration | 200             |
| GET    | `/songs/:id`              | Get a single song            | 200 / 400 / 404 |
| POST   | `/songs`                  | Create a new song            | 201 / 400       |
| PUT    | `/songs/:id`              | Update a song                | 200 / 400 / 404 |
| DELETE | `/songs/:id`              | Delete a song                | 200 / 400 / 404 |

## How to Run

### 1. Install dependencies

Open the project folder in the terminal and run:

```bash
npm install
```

### 2. Create the `.env` file

Create a `.env` file in the project root:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Do not upload or push the `.env` file to GitHub.

### 3. Start the server

For development:

```bash
npm run dev
```

Or:

```bash
node index.js
```

The API will run at:

```text
http://localhost:5000
```

## Example POST Request

### Endpoint

```text
POST /songs
```

### Request Body

```json
{
  "song": "Butta Bomma",
  "durationSec": 210,
  "mood": "party"
}
```

### Expected Response

```json
{
  "song": "Butta Bomma",
  "durationSec": 210,
  "mood": "party",
  "liked": false
}
```

Status:

```text
201 Created
```

## Query Examples

### Filter by Mood

```text
GET /songs?mood=happy
```

Returns only songs with the `happy` mood.

### Sort by Duration

```text
GET /songs?sort=durationSec
```

Returns songs from the shortest duration to the longest duration.

## Error Handling

The API handles errors using a centralized error handler.

| Error                       | Status | Response         |
| --------------------------- | ------ | ---------------- |
| Invalid data                | 400    | Validation error |
| Invalid MongoDB ID          | 400    | `Invalid id`     |
| Valid ID but song not found | 404    | Song not found   |
| Unexpected server error     | 500    | Server error     |

## Testing

The API was tested using **Postman**.

Important test cases include:

* Create a valid song
* Create a song without `song`
* Create a song with `durationSec: 29`
* Create a song with an invalid mood
* Get all songs
* Filter songs by mood
* Sort songs by duration
* Get a song using its ID
* Test an invalid ID such as `/songs/abc`
* Update a song
* Delete a song

## Screenshots

### Postman API Response

Add your Postman screenshot here.


```

### MongoDB Atlas Data

Add your MongoDB Atlas screenshot here.



```
