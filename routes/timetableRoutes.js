const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const router = express.Router();

router.get('/solapur-bus-timetable', async (req, res) => {
  try {
    const url = 'https://stbustimetable.in/solpur-bus-stand-timetable-ticket-price-contact-number/';
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);
    const timetable = [];

    $('table').each((i, table) => {
      $(table).find('tbody tr').each((j, row) => {
        const cols = $(row).find('td');
        if (cols.length >= 2) {
          const routeName = $(cols[0]).text().trim();
          const times = $(cols[1]).text().trim().split(',').map(t => t.trim());
          timetable.push({ routeName, times });
        }
      });
    });

    res.json({ timetable });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch timetable' });
  }
});

module.exports = router;
