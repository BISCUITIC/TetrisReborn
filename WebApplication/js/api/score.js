import client from "./client.js";

export async function getLeaderboard() {
  const result = await client("/scores/leaderboard", {
    method: "GET",
  });

  return result;
}

export async function createScore(newScore) {
  const createScoreRequest = { Value: newScore };

  const result = await client("/scores", {
    method: "POST",
    body: JSON.stringify(createScoreRequest),
  });

  return result;
}
