// Assuming your backend server is running on http://localhost:3000

export async function getPlayer(id: string) {
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
