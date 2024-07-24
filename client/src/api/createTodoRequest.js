import { API_URL } from "./config";

export default async (todo, token) => {
  try {
    const response = await fetch(`${API_URL}/api/todos`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        text: todo.text,
        completed: false
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create todo');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
