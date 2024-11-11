// TODO: Create an interface for the Candidate objects returned by the API

// Define an interface for the Candidate objects returned by the API

// Originally only utilizing the login property from searchGitHub() because that's really all we needed -- the username.
// The more detailed information will come from the searchGithubUser() function.

// Utilizing the first of the API functions, we can fetch the random candidate data to provide a username
// With the username, we then acquire the 2nd API call's response and return a Candidate object:

export interface Candidate {
    login: string;
    avatar_url: string;
    html_url: string;
    name: string;
    location: string;
    email: string;
    company: string;
    bio: string;
}