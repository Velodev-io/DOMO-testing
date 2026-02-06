// Mock domo.js for local development
window.domo = {
    navigate: function (url, openInNewTab) {
        console.log('Navigating to:', url);
    },
    get: function (endpoint) {
        console.log('GET request to Domo endpoint:', endpoint);
        return Promise.resolve({});
    }
};
