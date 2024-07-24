import { API_URL } from "./config";

export default async (todo, token) => {
  try {
    const response = await fetch(`${API_URL}/api/todos/${todo._id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        text: todo.text,
        completed: todo.completed
      })
    });

    if (!response.ok) {
      throw new Error('Failed to update todo');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
