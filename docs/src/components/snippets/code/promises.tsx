const promise = fetch("https://example.com");

const response = new State(promise).await(null); // State<Response | null>

response.value; // null

await promise;

response.value; // Response { ... }
