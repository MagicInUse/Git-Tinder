// I had lots of fun using Insomnia to practice with the GitHub API
// instead of using the console.log() method to see the data.

const searchGithub = async () => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;
    const token = import.meta.env.VITE_GITHUB_TOKEN;
    console.log('Token:', token); 
    const response = await fetch(`/api/users?since=${start}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }
    return data;
  } catch (err) {
    return [];
  }
};

const searchGithubUser = async (username: string) => {
  try {
    const token = import.meta.env.VITE_GITHUB_TOKEN;
    console.log('Token:', token); 
    const response = await fetch(`/api/users/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }
    return data;
  } catch (err) {
    console.log('An error occurred', err);
    return {};
  }
};

export { searchGithub, searchGithubUser };