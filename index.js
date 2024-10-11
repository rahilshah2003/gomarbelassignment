require('dotenv').config();
const express = require('express');
const playwright = require('playwright');

const app = express();
const PORT = process.env.PORT || 3000;

// Function to extract reviews using Playwright
const extractReviews = async (url) => {
  let browser;
  try {
    // Launch a Chromium browser (can also use firefox or webkit)
    browser = await playwright.chromium.launch();
    const page = await browser.newPage();

    // Navigate to the URL with an extended timeout and wait for the network to be idle
    await page.goto(url, {
      timeout: 60000, // Increase the timeout to 60 seconds
      waitUntil: 'networkidle0', // Wait until all network requests are done
    });

    // Extract reviews using CSS selectors
    const reviews = await page.evaluate(() => {
      // Replace these selectors with actual selectors on the product page
      return Array.from(document.querySelectorAll('.review-class')).map(review => ({
        title: review.querySelector('.review-title-class').innerText,
        body: review.querySelector('.review-body-class').innerText,
        rating: review.querySelector('.review-rating-class').innerText,
        reviewer: review.querySelector('.reviewer-name-class').innerText
      }));
    });

    return {
      reviews_count: reviews.length,
      reviews,
    };
  } catch (error) {
    throw new Error(`Error extracting reviews: ${error.message}`);
  } finally {
    if (browser) {
      await browser.close(); // Close the browser
    }
  }
};

// API Endpoint to get reviews
app.get('/api/reviews', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  try {
    // Call the review extraction function
    const reviewData = await extractReviews(url);
    res.json(reviewData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});

