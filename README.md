# JSON ↔ CSV Converter API

This API allows you to convert between JSON and CSV formats easily using two simple endpoints.

---

## 📩 Access Instructions

To start using this API:

1. **Email me** to request access.
2. You will receive:
   - A **public `apiKey`**
   - A **`secretKey`**

You must include these in your request headers for authentication.

---

## 🔐 Authentication

Each request must contain:

- **`apiKey`** – Your public key
- **`hash`** – An HMAC-SHA256 hash of the request body signed with your secret key

### HMAC Hash Example (Node.js)

```js
const crypto = require("crypto");

const hash = crypto.createHmac("sha256", secretKey).update(data).digest("hex");
```

### Required Headers Example

```http
apiKey: your-public-api-key
hash: generated-hash
```

---

## 📦 Endpoints

### 1. `POST /json-to-csv`

Converts JSON input to CSV format.

#### ✅ Request Body Example:

```json
{
  "data": [
    {
      "name": "John Doe",
      "age": 30
    }
  ]
}
```

#### 📤 Response Example:

```
name,age
John Doe,30
```

---

### 2. `POST /csv-to-json`

Converts CSV input (raw text) to JSON.

#### ✅ Request Body Example:

```
name,age
John,30
Alice,25
```

#### 📤 Response Example:

```json
{
  "data": [
    {
      "name": "John",
      "age": 30
    },
    {
      "name": "Alice",
      "age": 25
    }
  ]
}
```

---

## ❌ Error Handling

### Missing Headers

If `apiKey` or `hash` headers are missing:

```json
{
  "success": false,
  "error": {
    "message": "Missing required headers: hash or apiKey"
  }
}
```

### Invalid JSON Format for `/json-to-csv`

If the input is not valid JSON or does not have the expected structure:

```json
{
  "success": false,
  "error": {
    "message": "Invalid JSON format. Expected an array."
  }
}
```

## 📌 Upcoming Feature

We're working on adding support for sending CSV-formatted files directly (e.g. as file uploads), so you can receive the parsed JSON object in the response.

This feature will make the API even more flexible, allowing users to convert uploaded .csv files without needing to manually paste CSV content in the request body.

Stay tuned — this feature is coming soon!
