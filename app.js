const express = require('express');
const path = require('path');
const { BigQuery } = require('@google-cloud/bigquery');

const app = express();
const bigquery = new BigQuery();

app.use(express.static(path.join(__dirname))); // Serves index.html

// Route 1 - Query Shakespeare
app.get('/query1', async (req, res) => {
  const sqlQuery = `
    SELECT
  e.traffic_source,
  COUNT(*) AS total_orders
FROM \`amir-coursework-attempt.thelook.order_items\` o
JOIN \`amir-coursework-attempt.thelook.events\` e
  ON o.user_id = e.user_id
WHERE o.status = 'Complete'
  AND e.traffic_source IS NOT NULL
GROUP BY e.traffic_source
ORDER BY total_orders DESC;
`;

  const options = {
    query: sqlQuery,
    location: 'US',
    params: { corpus: 'romeoandjuliet', min_word_count: 400 },
  };

  try {
    const [rows] = await bigquery.query(options);
    res.json(rows);
  } catch (err) {
    console.error('Query 1 Error:', err);
    res.status(500).send(err.message);
  }
});

// Route 2 - Placeholder for second query
app.get('/query2', async (req, res) => {
  const sqlQuery = `
    SELECT
  e.traffic_source,
  COUNT(*) AS total_orders
FROM \`amir-coursework-attempt.thelook.order_items\` o
JOIN \`amir-coursework-attempt.thelook.events\` e
  ON o.user_id = e.user_id
WHERE o.status = 'Complete'
  AND e.traffic_source IS NOT NULL
GROUP BY e.traffic_source
ORDER BY total_orders DESC;
`;

  const options = {
    query: sqlQuery,
    location: 'US',
  };

  try {
    const [rows] = await bigquery.query(options);
    res.json(rows);
  } catch (err) {
    console.error('Query 2 Error:', err);
    res.status(500).send(err.message);
  }
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});




