// TODO: Create an interface for the Candidate objects returned by the API

// Define an interface for the Candidate objects returned by the API

// Originally only utilizing the login property because that's really all we needed -- the username.
// Then decided to make a new API function ( fetchCandidateData() ) to return all of the candidate data
// received from the searchGithub function.
// The more detailed information will come from the searchGithubUser function.
// Utilizing the two functions, we can fetch the candidate data and return a Candidate object:

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