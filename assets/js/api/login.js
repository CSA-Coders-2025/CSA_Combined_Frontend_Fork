import { baseurl, pythonURI, fetchOptions } from './config.js';

console.log("login.js loaded");

document.addEventListener('DOMContentLoaded', function() {
    console.log("Base URL:", baseurl); // Debugging line
    getCredentials(baseurl) // Call the function to get credentials
        .then(data => {
            console.log("Credentials data:", data); // Debugging line
            const loginArea = document.getElementById('loginArea');
            if (data) {
                // show a link to profile instead of dropdown
                loginArea.innerHTML = `<a href="${baseurl}/profile">${data.name}</a>`;
            } else {
                // user is not authenticated, show login link
                loginArea.innerHTML = `<a href="${baseurl}/login">Login</a>`;
            }
            // set loginArea opacity to 1
            loginArea.style.opacity = "1";
        })
        .catch(err => {
            console.error("Error fetching credentials: ", err);
            // Show login link on error
            const loginArea = document.getElementById('loginArea');
            if (loginArea) {
                loginArea.innerHTML = `<a href="${baseurl}/login">Login</a>`;
            }
        });
});

function getCredentials(baseurl) {
    const URL = pythonURI + '/api/id';
    return fetch(URL, {
        ...fetchOptions,
        credentials: 'include' // Add this to include cookies
    })
    .then(response => {
        if (!response.ok) {
            console.warn("HTTP status code: " + response.status);
            return null;
        }
        return response.json();
    })
    .then(data => {
        if (data === null) return null;
        console.log("User data:", data);
        return data;
    })
    .catch(err => {
        console.error("Fetch error: ", err);
        // Return null instead of throwing to handle the error gracefully
        return null;
    });
}
