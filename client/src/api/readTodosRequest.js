import { API_URL } from "./config";

export default async (token) => {
  try {
    console.log(token)
    const response = await fetch(`${API_URL}/api/todos`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// import { API_URL } from "./config";

// export default async (token) => {
//   try {
//     const response = await fetch(`${API_URL}/todos`, {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": 'application/json'
//       }
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch todos');
//     }

//     return await response.json();
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }
