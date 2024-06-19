import express from "express";
import cron from "node-cron";

const app = express();

const defaultMessage = "Kanye West quotes (every 10 seconds)";

let quotes: string[] = [defaultMessage];
let quoteIndex = 0;

async function fetchQuotes() {
  try {
    const response = await fetch("https://api.kanye.rest/quotes");
    const data = (await response.json()) as string[];

    if (quoteIndex < data.length) {
      quotes.push(data[quoteIndex]);
      quoteIndex++;
    } else {
      quotes = [defaultMessage];
      quoteIndex = 0;
      console.log("All quotes fetched, starting over...");
    }
  } catch (error) {
    console.log("Error fetching quotes: ", error);
  }
}

// fetch every 10 secondss

cron.schedule("*/10 * * * * *", fetchQuotes);

// I'm a Kanye fan, so....

app.get("/", (req, res) => {
  res.json(quotes);
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
  console.log("I'm literally Ye");
});
