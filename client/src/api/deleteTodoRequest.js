import { API_URL } from "./config";

export default async (todo, token) => {
  try {
    const response = await fetch(`${API_URL}/api/todos/${todo._id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": 'application/json'
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete todo');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
