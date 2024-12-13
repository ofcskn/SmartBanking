# API Documentation

## Base URL

Local development: `http://localhost:5000/api`

---

## Endpoints

### `GET /api/users`

**Description**: Get users from the database.

**Request Body**: None

**Response**:

```json
{
  [{
   "_id": "",
   "name": ""
  },
  {
   "_id": "",
   "name": ""
  }]
}
```

---

### `POST /api/users/create`

**Description**: Create a user in the bank.

**Request Body**:

```json
{
  "name": "John Doe",
  "email": "john@doe.com",
  "password": "123"
}
```

**Response**:

```json
{
  "name": "John Doe",
  "email": "john@doe.com",
  "password": "123"
}
```

---

### `POST /api/users/login`

**Description**: Login to the app.

**Request Body**

```json
{
  "email": "john@doe.com",
  "password": "123"
}
```

**Response**:

```json
{
  "token": "TOKEN"
}
```

---

### `GET /api/users/verify`

**Description**: Verify the token and migrate the user.

**Request Body**

```json
{
  "token": "TOKEN"
}
```

**Response**:

```json
{
  "name": "John DOE",
  "email": "john@doe.com",
  "password": "0xfgdgdg",
  "imageUrl": ""
}
```

---

### `POST /api/users/uploadImage`

**Description**: Upload a user image for the profile (imageUrl).

**Request Body**

```json
{
  "userId": "user's _id",
  "file": {
    "uri": "image URL",
    "name": "image name",
    "type": "image/jpg"
  }
}
```

**Response**:

```json
{
  "message": "Image uploaded successfully",
  "imageUrl": "https://localhost:5000/uploads"
}
```
