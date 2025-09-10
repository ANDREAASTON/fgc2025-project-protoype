// Logout function: returns user to welcome screen and resets nav highlights
function logoutUser() {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    // Show welcome screen
    document.getElementById('welcome-screen').classList.add('active');
    // Remove nav highlights
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
}
// Teteza App JavaScript - extracted from index.html

// Navigation function
function navigateTo(screenId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    // Show the requested page
    document.getElementById(screenId).classList.add('active');
    // Update navigation highlights
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
}
// Set up navigation item clicks
window.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.nav-item').forEach(navItem => {
                navItem.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
});
