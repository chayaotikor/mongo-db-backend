# Description

- MongoDB backend to create an election information booklet for voters

# Endpoints

## Candidates

### Get All Candidates

- Returns json data containing an array of candidates on the ballot

* **URL**

  `/candidates`

* **Method:**

  `GET`

* **URL Params**

  **Required:**

  None

* **Data Params**

  None

* **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```

    ```

* **Error Response:**

* **Sample Call Using Axios:**

  ```javascript
  axios({
    method: "get",
    url: `${process.env.DB_URL}/candidates`,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  ```

---

### Get Candidate By ID

- Returns json data information about a single candidate including:
  - the name of the candidate
  - the title of the office they are running for
  - a candidate questionnaire

* **URL**

  `/candidates/:id`

* **Method:**

  `GET`

* **URL Params**

  **Required:**

  `id=[ObjectID]`

* **Data Params**

  None

* **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```

    ```

* **Error Response:**

* **Sample Call Using Axios:**

  ```javascript
  axios({
    method: "get",
    url: `${process.env.DB_URL}/candidate/5e3hfiahef5`,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  ```

  ---

### Add a New Candidate

- Adds a new candidate and returns the doc of the created candidate

* **URL**

  `/candidates`

* **Method:**

  `POST`

* **URL Params**

  **Required:**

  none

* **Data Params**

  ```
    {
      name=[string],
      requestedOffice=[ObjectID],
      candidateQuestionnaire=[buffer]
    }
  ```

* **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```

    ```

* **Error Response:**

* **Sample Call Using Axios:**

  ```javascript
  axios({
    method: "POST",
    url: `${process.env.DB_URL}/candidates`,
    data: {
      name: "Joe Schmoe",
      requestedOffice: "5ef3Rf60a2",
      candidateQuestionnaire: fs.readFileSync(
        path.resolve(__dirname, "../../../pdfs/example__questionnaire_1.pdf")
      ),
    },
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  ```

  ---

### Update Candidate By ID

- Updates the candidate associated with the given ID and upon success returns the updated doc.

* **URL**

  `/candidates/:id`

* **Method:**

  `PUT`

* **URL Params**

  **Required:**

  `id=[ObjectID]`

* **Data Params**

  ```
  {
    name=[string],
    requestedOffice=[ObjectID],
    candidateQuestionnaire=[buffer]
  }
  ```

* **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```

    ```

* **Error Response:**

* **Sample Call Using Axios:**

  ```javascript
  axios({
    method: "put",
    url: `${process.env.DB_URL}/candidates/6f3ki90skr5`,
    data: {
      name: "John Schmoe",
      requestedOffice: "5ef3Rf60a2",
      candidateQuestionnaire: fs.readFileSync(
        path.resolve(__dirname, "../../../pdfs/example__questionnaire_2.pdf")
      ),
    },
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  ```

  ---

### Delete Candidate By ID

- Delete the candidate associated with the given ID

* **URL**

  `/candidate/:id`

* **Method:**

  `DELETE`

* **URL Params**

  **Required:**

  `id=[ObjectID]`

* **Data Params**
  None

* **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```

    ```

* **Error Response:**

* **Sample Call Using Axios:**

  ```javascript
  axios({
    method: "delete",
    url: `${process.env.DB_URL}/candidates/5fu7eewh30h`,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  ```

---

## Judges

### Get All Judges

- Returns json data containing an array of judges on the ballot

* **URL**

  `/judges`

* **Method:**

  `GET`

* **URL Params**

  **Required:**

  None

* **Data Params**

  None

* **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```

    ```

* **Error Response:**

* **Sample Call Using Axios:**

  ```javascript
  axios({
    method: "get",
    url: `${process.env.DB_URL}/judges`,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  ```

---

### Get Judge By ID

- Returns json data information about a single judge including:
  - the name of the judge
  - the title of the office they are running for
  - a judge questionnaire

* **URL**

  `/judges/:id`

* **Method:**

  `GET`

* **URL Params**

  **Required:**

  `id=[ObjectID]`

* **Data Params**

  None

* **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```

    ```

* **Error Response:**

* **Sample Call Using Axios:**

  ```javascript
  axios({
    method: "get",
    url: `${process.env.DB_URL}/judge/5e3hfiahef5`,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  ```

  ---

### Add a New Judge

- Adds a new judge and returns the doc of the created judge

* **URL**

  `/judges`

* **Method:**

  `POST`

* **URL Params**

  **Required:**

  none

* **Data Params**

  ```
  {
    name=[string],
    court=[string],
    performanceReview=[buffer]
  }
  ```

* **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```

    ```

* **Error Response:**

* **Sample Call Using Axios:**

  ```javascript
  axios({
    method: "POST",
    url: `${process.env.DB_URL}/judges`,
    data: {
      name: "Jane Doe",
      court: "Eastern District of New York",
      performanceReview: fs.readFileSync(
        path.resolve(__dirname, "../../../pdfs/example_review_1.pdf")
      ),
    },
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  ```

  ---

### Update Judge By ID

- Updates the judge associated with the given ID and upon success returns the updated doc.

* **URL**

  `/judges/:id`

* **Method:**

  `PUT`

* **URL Params**

  **Required:**

  `id=[ObjectID]`

* **Data Params**

  ```
  {
    name=[string],
    court=[string],
    performanceReview=[buffer]
  }
  ```

* **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```

    ```

* **Error Response:**

* **Sample Call Using Axios:**

  ```javascript
  axios({
    method: "put",
    url: `${process.env.DB_URL}/judges/6f3ki90skr5`,
    data: {
      name: "John Schmoe",
      court: "DC Circuit Court",
      performanceReview: fs.readFileSync(
        path.resolve(__dirname, "../../../pdfs/example_review_2.pdf")
      ),
    },
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  ```

  ---

### Delete Judge By ID

- Delete the judge associated with the given ID

* **URL**

  `/judge/:id`

* **Method:**

  `DELETE`

* **URL Params**

  **Required:**

  `id=[ObjectID]`

* **Data Params**
  None

* **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```

    ```

* **Error Response:**

* **Sample Call Using Axios:**

  ```javascript
  axios({
    method: "delete",
    url: `${process.env.DB_URL}/judges/5fu7eewh30h`,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  ```

---

## Offices

### Get All Offices

- Returns json data containing an array of offices up for election in a cycle

* **URL**

  `/offices`

* **Method:**

  `GET`

* **URL Params**

  **Required:**

  None

* **Data Params**

  None

* **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```

    ```

* **Error Response:**

* **Sample Call Using Axios:**

  ```javascript
  axios({
    method: "get",
    url: `${process.env.DB_URL}/offices`,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  ```

---

### Get Office By ID

- Returns json data information about a single office including:
  - the title of the office
  - a pdf of duties / job description of the office
  - an array containing objectIDs of candidates that are running for the office

* **URL**

  `/offices/:id`

* **Method:**

  `GET`

* **URL Params**

  **Required:**

  `id=[ObjectID]`

* **Data Params**

  None

* **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```

    ```

* **Error Response:**

* **Sample Call Using Axios:**

  ```javascript
  axios({
    method: "get",
    url: `${process.env.DB_URL}/office/5e3hfiahef5`,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  ```

  ---

### Add a New Office

- Adds a new office and returns the doc of the created office

* **URL**

  `/offices`

* **Method:**

  `POST`

* **URL Params**

  **Required:**

  none

* **Data Params**

  ```
  {
    officeTitle=[string],
    officeDuties=[buffer]
    candidates=[array of ObjectIDs],
  }
  ```

* **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```

    ```

* **Error Response:**

* **Sample Call Using Axios:**

  ```javascript
  axios({
    method: "POST",
    url: `${process.env.DB_URL}/offices`,
    data: {
      officeTitle: "Governor",
      officeDuties: fs.readFileSync(
        path.resolve(__dirname, "../../../pdfs/governor_duties.pdf")
      ),
      candidates: ["5ffi3ao5", "6kajusiw", "7djjirs"],
    },
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  ```

  ---

### Update Office By ID

- Updates the office associated with the given ID and upon success returns the updated doc.

* **URL**

  `/offices/:id`

* **Method:**

  `PUT`

* **URL Params**

  **Required:**

  `id=[ObjectID]`

* **Data Params**

  ```
  {
    officeTitle=[string],
    officeDuties=[buffer]
    candidates=[array of ObjectIDs],
  }
  ```

* **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```

    ```

* **Error Response:**

* **Sample Call Using Axios:**

  ```javascript
  axios({
    method: "put",
    url: `${process.env.DB_URL}/offices/6f3ki90skr5`,
    data: {
      officeTitle: "Governor",
      officeDuties: fs.readFileSync(
        path.resolve(__dirname, "../../../pdfs/governor_duties.pdf")
      ),
      candidates: ["5ffi3ao5", "6kajusiw", "7djjirs", "5hsurjdi", "5fj99jdjs"],
    },
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  ```

  ---

### Delete Office By ID

- Delete the office associated with the given ID

* **URL**

  `/office/:id`

* **Method:**

  `DELETE`

* **URL Params**

  **Required:**

  `id=[ObjectID]`

* **Data Params**
  None

* **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```

    ```

* **Error Response:**

* **Sample Call Using Axios:**

  ```javascript
  axios({
    method: "delete",
    url: `${process.env.DB_URL}/offices/5fu7eewh30h`,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  ```

---

## Proposals

### Get All Proposals

- Returns json data containing an array of proposals on the ballot

* **URL**

  `/proposals`

* **Method:**

  `GET`

* **URL Params**

  **Required:**

  None

* **Data Params**

  None

* **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```

    ```

* **Error Response:**

* **Sample Call Using Axios:**

  ```javascript
  axios({
    method: "get",
    url: `${process.env.DB_URL}/proposals`,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  ```

---

### Get Proposal By ID

- Returns json data information about a single proposal including:
  - the name of the proposal
  - a pdf of the proposal details, analysis, for/against arguments, fiscal impact, etc.
  - a pdf of the proposal language

* **URL**

  `/proposals/:id`

* **Method:**

  `GET`

* **URL Params**

  **Required:**

  `id=[ObjectID]`

* **Data Params**

  None

* **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```

    ```

* **Error Response:**

* **Sample Call Using Axios:**

  ```javascript
  axios({
    method: "get",
    url: `${process.env.DB_URL}/proposal/5e3hfiahef5`,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  ```

  ---

### Add a New Proposal

- Adds a new proposal and returns the doc of the created proposal

* **URL**

  `/proposals`

* **Method:**

  `POST`

* **URL Params**

  **Required:**

  none

* **Data Params**

  ```
    {
      proposalName=[string],
      proposalDetails=[buffer]
      proposalLanguage=[buffer]
    }
  ```

* **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```

    ```

* **Error Response:**

* **Sample Call Using Axios:**

  ```javascript
  axios({
    method: "POST",
    url: `${process.env.DB_URL}/proposals`,
    data: {
      proposalName: "76",
      proposalDetails: fs.readFileSync(
        path.resolve(__dirname, "../../../pdfs/amendment_76.pdf")
      ),
      proposalLanguage: fs.readFileSync(
        path.resolve(__dirname, "../../../pdfs/amendment_76_language.pdf")
      ),
    },
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  ```

  ---

### Update Proposal By ID

- Updates the proposal associated with the given ID and upon success returns the updated doc.

* **URL**

  `/proposals/:id`

* **Method:**

  `PUT`

* **URL Params**

  **Required:**

  `id=[ObjectID]`

* **Data Params**

  ```
  {
    proposalName=[string],
    proposalDetails=[buffer]
    proposalLanguage=[buffer]
  }
  ```

* **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```

    ```

* **Error Response:**

* **Sample Call Using Axios:**

  ```javascript
  axios({
    method: "put",
    url: `${process.env.DB_URL}/proposals/6f3ki90skr5`,
    data: {
      proposalName: "77",
      proposalDetails: fs.readFileSync(
        path.resolve(__dirname, "../../../pdfs/amendment_77.pdf")
      ),
      proposalLanguage: fs.readFileSync(
        path.resolve(__dirname, "../../../pdfs/amendment_77_language.pdf")
      ),
    },
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  ```

  ---

### Delete Proposal By ID

- Delete the proposal associated with the given ID

* **URL**

  `/proposal/:id`

* **Method:**

  `DELETE`

* **URL Params**

  **Required:**

  `id=[ObjectID]`

* **Data Params**
  None

* **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```

    ```

* **Error Response:**

* **Sample Call Using Axios:**

  ```javascript
  axios({
    method: "delete",
    url: `${process.env.DB_URL}/proposals/5fu7eewh30h`,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  ```

---
