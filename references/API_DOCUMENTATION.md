# 🩺 Diabetes Predictor API Documentation

Welcome to the **Diabetes Predictor API** documentation! 

If you are a frontend developer or building another application (web/mobile), you can easily integrate my AI-powered Diabetes Prediction Model into your own app using this public REST API.

---

## 🚀 Base URL
If running locally:
```text
http://localhost:5000
```
*(If you deploy the Flask backend to a cloud server like Heroku, Render, AWS, or DigitalOcean, use your server's public URL instead.)*

---

## 📌 Endpoint: Predict Diabetes

This endpoint allows you to send patient health metrics and receive a prediction (0 = Negative, 1 = Positive).

- **URL:** `/api/predict`
- **Method:** `POST`
- **Content-Type:** `application/json`

### 📥 Request Body (JSON payload)

You need to send the following 8 features in your JSON payload payload:

| Field | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `pregnancies` | Integer | Number of pregnancies | `1` |
| `glucose` | Integer | Plasma glucose concentration (mg/dL) | `85` |
| `bloodpressure` | Integer | Diastolic blood pressure (mm Hg) | `66` |
| `skinthickness` | Integer | Triceps skin fold thickness (mm) | `29` |
| `insulin` | Integer | 2-Hour serum insulin (mu U/ml) | `0` |
| `bmi` | Float | Body mass index (weight in kg/(height in m)^2) | `26.6` |
| `dpf` | Float | Diabetes pedigree function | `0.351` |
| `age` | Integer | Age (years) | `31` |

**Example Request (JavaScript/Fetch):**

```javascript
const apiUrl = "http://localhost:5000/api/predict";

const patientData = {
    pregnancies: 1,
    glucose: 85,
    bloodpressure: 66,
    skinthickness: 29,
    insulin: 0,
    bmi: 26.6,
    dpf: 0.351,
    age: 31
};

fetch(apiUrl, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(patientData)
})
.then(response => response.json())
.then(data => {
    console.log("Prediction Result:", data.prediction);
    if(data.prediction === 1) {
        console.log("Result: Diabetic");
    } else {
        console.log("Result: Non-Diabetic");
    }
})
.catch(error => console.error("Error:", error));
```
> **Note:** This is a generic JavaScript/Fetch example commonly used in **React** applications. If you are using another framework (like Angular, Vue, or Next.js) or a different HTTP client (like Axios), you can adjust this request according to your tool's standard practices.

**Example Request (cURL):**

```bash
curl -X POST http://localhost:5000/api/predict \
     -H "Content-Type: application/json" \
     -d '{
           "pregnancies": 1,
           "glucose": 85,
           "bloodpressure": 66,
           "skinthickness": 29,
           "insulin": 0,
           "bmi": 26.6,
           "dpf": 0.351,
           "age": 31
         }'
```

---

### 📤 Response

The API will evaluate the parameters using the Random Forest Classifier model and return a JSON object containing the prediction outcome.

**Success Response (200 OK):**
```json
{
  "prediction": 0
}
```

- `0` means **Negative** (No signs of diabetes).
- `1` means **Positive** (Signs of diabetes detected).

**Error Handling:**
Ensure that all 8 fields are provided in the exact format (numbers, not strings) and spelled correctly. Missing fields or strings instead of numbers will cause a `500 Internal Server Error` as the model expects an exact shape of numerical features.

---
## 🛡️ Cross-Origin Resource Sharing (CORS)

Our API has CORS enabled by default, meaning you can easily make requests to it from any frontend application (React, Angular, Vue, Vanilla JS) running on different ports or domains without encountering blocked requests.
