// Assuming your backend server is running on http://localhost:5000

export async function getPlayers() {
  try {
    const response = await fetch("http://localhost:5000/players");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operartion: ", error);
  }
}

export async function getPlayer(id: number) {
  try {
    const response = await fetch(`http://localhost:5000/players/${id}`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation: ", error);
  }
}

export async function addPlayer(data: any) {
  try {
    const response = await fetch("http://localhost:5000/players", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("There was a problem with the fetch operation: ", error);
  }
}

export async function getPlayerStats(playerId: number) {
  try {
    const response = await fetch(
      `http://localhost:5000/player-stats/player/${playerId}`,
    );
    if (!response.ok) {
      throw new Error("Network reponse was not ok");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("There was a problem with the fetch operation: ", error);
  }
}

export async function addPlayerStats(playerId: number, data: any) {
  try {
    const response = await fetch(
      `http://localhost:5000/player-stats/player/${playerId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
    );
    if (!response.ok) {
      throw new Error("Network response was not ok: ");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("There was a problem with the fetch operation");
  }
}
