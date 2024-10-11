# Review Scraper API

## Overview

The **Review Scraper API** extracts reviews from any product page using **Playwright** for browser automation. It handles dynamic content and returns reviews in a structured JSON format.

## Features

- Scrapes reviews from product pages
- Handles dynamic content and pagination
- Returns reviews in JSON format

## Technologies

- **Node.js**, **Express.js**
- **Playwright** for browser automation

## Installation

1. Clone the Repo & Install Dependencies

   ```bash
   git clone https://github.com/rahilshah2003/gomarbleassignment
   cd review-scraper-api
   npm install
   npx playwright install
   ```

2. Run the API

   ```bash
   node index.js
   ```

## API Usage

### Endpoint

- **URL**: `/api/reviews`
- **Method**: `GET`
- **Query Parameter**: `url` (The product page URL)

### Example Request

```bash
curl "http://localhost:3000/api/reviews?url=https://example.com/product"
```

### Example Response

```json
{
  "reviews_count": 2,
  "reviews": [
    {
      "title": "Great Product",
      "body": "Loved it!",
      "rating": 5,
      "reviewer": "John"
    }
  ]
}
```

## Customization

- Update CSS selectors in the `extractReviews` function to match the review section of your target website.

## Contact

- **Email**: rahilshah4362@gmail.com
  
