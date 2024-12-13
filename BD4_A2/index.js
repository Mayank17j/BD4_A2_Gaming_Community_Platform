const express = require('express');
const { resolve } = require('path');
let cors = require('cors');
const { open } = require('sqlite');
let sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.port || 3000;
app.use(cors());
app.use(express.json());

let db;
(async () => {
  db = await open({
    filename: './BD4_A2/database.sqlite',
    driver: sqlite3.Database,
  });
})();

// Exercise 1: Get All Games
const fetchAllGames = async () => {
  const query = 'SELECT * FROM games';
  const response = await db.all(query, []);
  return { games: response };
};

app.get('/games', async (req, res) => {
  try {
    const result = await fetchAllGames();
    if (result.games.length === 0) {
      return res.status(404).json({
        message: 'No games are found!',
      });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Get Game by ID
const fetchGameById = async (id) => {
  const query = 'SELECT * FROM games WHERE id = ?';
  const response = await db.all(query, [id]);
  return { game: response };
};

app.get('/games/details/:id', async (req, res) => {
  let id = req.params.id;
  try {
    const result = await fetchGameById(id);
    if (!result.game) {
      return res.status(404).json({
        message: `Game with ID ${id} not found!`,
      });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Get Games by Genre
const fetchGamesByGenre = async (genre) => {
  const query = 'SELECT * FROM games WHERE genre = ?';
  const response = await db.all(query, [genre]);
  return { games: response };
};

app.get('/games/genre/:genre', async (req, res) => {
  let genre = req.params.genre;
  try {
    const result = await fetchGamesByGenre(genre);
    if (result.games.length === 0) {
      return res.status(404).json({
        message: `No games found for genre ${genre}!`,
      });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 4: Get Games by Platform
const fetchGamesByPlatform = async (platform) => {
  const query = 'SELECT * FROM games WHERE platform = ?';
  const response = await db.all(query, [platform]);
  return { games: response };
};

app.get('/games/platform/:platform', async (req, res) => {
  let platform = req.params.platform;
  try {
    const result = await fetchGamesByPlatform(platform);
    if (result.games.length === 0) {
      return res.status(404).json({
        message: `No games found for platform ${platform}!`,
      });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 5: Get Games Sorted by Rating
const fetchGamesSortedByRating = async () => {
  const query = 'SELECT * FROM games ORDER BY rating DESC';
  const response = await db.all(query, []);
  return { games: response };
};

app.get('/games/sort-by-rating', async (req, res) => {
  try {
    const result = await fetchGamesSortedByRating();
    if (result.games.length === 0) {
      return res.status(404).json({
        message: 'No games found!',
      });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 6: Get All Players
const fetchAllPlayers = async () => {
  const query = 'SELECT * FROM players';
  const response = await db.all(query, []);
  return { players: response };
};

app.get('/players', async (req, res) => {
  try {
    const result = await fetchAllPlayers();
    if (result.players.length === 0) {
      return res.status(404).json({
        message: 'No players are found!',
      });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 7: Get Player by ID
const fetchPlayerById = async (id) => {
  const query = 'SELECT * FROM players WHERE id = ?';
  const response = await db.all(query, [id]);
  return { players: response };
};

app.get('/players/details/:id', async (req, res) => {
  let id = req.params.id;
  try {
    const result = await fetchPlayerById(id);
    if (!result.players) {
      return res.status(404).json({
        message: `Players with ID ${id} not found!`,
      });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 8: Get Players by Platform
const fetchPlayerByPlatform = async (platform) => {
  const query = 'SELECT * FROM players WHERE platform  = ?';
  const response = await db.all(query, [platform]);
  return { players: response };
};

app.get('/players/platform/:platform', async (req, res) => {
  let platform = req.params.platform;
  try {
    const result = await fetchPlayerByPlatform(platform);
    if (!result.players) {
      return res.status(404).json({
        message: `Players with platform ${platform} not found!`,
      });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 9: Get Players Sorted by Rating
const fetchAllPlayersSortedByRating = async () => {
  const query = 'SELECT * FROM players ORDER BY rating DESC';
  const response = await db.all(query, []);
  return { players: response };
};

app.get('/players/sort-by-rating', async (req, res) => {
  try {
    const result = await fetchAllPlayersSortedByRating();
    if (result.players.length === 0) {
      return res.status(404).json({
        message: 'No players are found!',
      });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 10: Get All Tournaments
const fetchAllTournaments = async () => {
  const query = 'SELECT * FROM tournaments';
  const response = await db.all(query, []);
  return { tournaments: response };
};

app.get('/tournaments', async (req, res) => {
  try {
    const result = await fetchAllTournaments();
    if (result.tournaments.length === 0) {
      return res.status(404).json({
        message: 'No tournaments are found!',
      });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 11: Get Tournament by ID
const fetchAllTournamentsById = async (id) => {
  const query = 'SELECT * FROM tournaments WHERE id = ?';
  const response = await db.all(query, [id]);
  return { tournaments: response };
};

app.get('/tournaments/details/:id', async (req, res) => {
  let id = req.params.id;
  try {
    const result = await fetchAllTournamentsById(id);
    if (result.tournaments.length === 0) {
      return res.status(404).json({
        message: 'No tournaments are found by id: ${id}!',
      });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 12: Get Tournaments by Game ID
const fetchAllTournamentsByGameId = async (id) => {
  const query = 'SELECT * FROM tournaments WHERE gameId = ?';
  const response = await db.all(query, [id]);
  return { tournaments: response };
};

app.get('/tournaments/games/:gameId', async (req, res) => {
  let id = req.params.gameId;
  try {
    const result = await fetchAllTournamentsByGameId(id);
    if (result.tournaments.length === 0) {
      return res.status(404).json({
        message: 'No tournaments are found by gameId: ${id}!',
      });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 13: Get Tournaments Sorted by Prize Pool
const fetchAllTournamentsSortByPrizePool = async () => {
  const query = 'SELECT * FROM tournaments ORDER BY prizePool DESC';
  const response = await db.all(query, []);
  return { tournaments: response };
};

app.get('/tournaments/sort-by-prize-pool', async (req, res) => {
  try {
    const result = await fetchAllTournamentsSortByPrizePool();
    if (result.tournaments.length === 0) {
      return res.status(404).json({
        message: 'No tournaments are found!',
      });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
