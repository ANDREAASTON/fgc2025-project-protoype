// --- State ---
let likes = [24, 42, 35];
let comments = [
    [
        { text: 'Great job!', time: new Date().toLocaleString() },
        { text: 'Awesome!', time: new Date().toLocaleString() },
        { text: 'Keep it up!', time: new Date().toLocaleString() },
        { text: 'Love this!', time: new Date().toLocaleString() },
        { text: 'So inspiring!', time: new Date().toLocaleString() }
    ],
    [
        { text: 'Amazing work!', time: new Date().toLocaleString() },
        { text: 'Thank you!', time: new Date().toLocaleString() },
        { text: 'Beach looks clean!', time: new Date().toLocaleString() },
        { text: '👏👏', time: new Date().toLocaleString() },
        { text: 'Let’s do more!', time: new Date().toLocaleString() },
        { text: 'Wow!', time: new Date().toLocaleString() },
        { text: 'Respect!', time: new Date().toLocaleString() },
        { text: '💚', time: new Date().toLocaleString() }
    ],
    [
        { text: 'Recycling hero!', time: new Date().toLocaleString() },
        { text: 'Nice!', time: new Date().toLocaleString() },
        { text: '♻️', time: new Date().toLocaleString() }
    ]
];
let points = 120;
const rewardThresholds = [100, 200, 500];
const rewardNames = ['Eco Badge', 'Airtime', 'Shopping Voucher'];

// --- Likes ---
function updateLikeDisplay(feed) {
    document.getElementById('like-count-' + feed).textContent = likes[feed - 1];
}

function likeFeed(feed) {
    likes[feed - 1]++;
    updateLikeDisplay(feed);
}

// --- Comments ---
function updateCommentDisplay(feed) {
    document.getElementById('comment-count-' + feed).textContent = comments[feed - 1].length;
    const list = document.getElementById('comments-list-' + feed);
    if (list) {
        list.innerHTML = comments[feed - 1]
            .map(c => `<div style='margin-bottom:4px;'><span style='font-size:13px;'>${c.text}</span> <span style='color:#888;font-size:11px;'>${c.time}</span></div>`)
            .join('');
    }
}

function addComment(feed) {
    const input = document.getElementById('comment-input-' + feed);
    if (input.value.trim()) {
        comments[feed - 1].push({ text: input.value, time: new Date().toLocaleString() });
        input.value = '';
        updateCommentDisplay(feed);
    }
}

function toggleCommentSection(feed) {
    const section = document.getElementById('comment-section-' + feed);
    if (section) section.style.display = section.style.display === 'none' ? 'block' : 'none';
    updateCommentDisplay(feed);
}

// --- Points & Rewards ---
function updatePointsDisplay() {
    // Home screen
    const pointsEls = document.querySelectorAll('h1[style*="font-size: 36px"]');
    pointsEls.forEach(el => (el.textContent = points));
    // Progress bar
    const bar = document.querySelector('.progress-bar');
    if (bar) {
        let percent = Math.min((points % 100) / 100, 1) * 100;
        bar.style.width = percent + '%';
    }
    // Points to next reward
    let next = rewardThresholds.find(t => t > points);
    let msg = '';
    if (next) {
        msg = `${next - points} points until your next reward!`;
    } else {
        msg = 'You have unlocked all rewards!';
    }
    document.querySelectorAll('p').forEach(p => {
        if (p.textContent.includes('points until your next reward') || p.textContent.includes('You have unlocked all rewards!')) {
            p.textContent = msg;
        }
    });
    // Show reward if reached
    let reward = null;
    for (let i = rewardThresholds.length - 1; i >= 0; i--) {
        if (points >= rewardThresholds[i]) {
            reward = rewardNames[i];
            break;
        }
    }
    const rewardMsg = document.getElementById('reward-message');
    if (rewardMsg) {
        rewardMsg.textContent = reward ? `You can claim: ${reward}` : '';
    }
}

function reportActivity() {
    points += 50;
    updatePointsDisplay();
}

// --- Logout ---
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
        // Reset likes/comments/points
        likes = [24, 42, 35];
        comments = [
            [
                { text: 'Great job!', time: new Date().toLocaleString() },
                { text: 'Awesome!', time: new Date().toLocaleString() },
                { text: 'Keep it up!', time: new Date().toLocaleString() },
                { text: 'Love this!', time: new Date().toLocaleString() },
                { text: 'So inspiring!', time: new Date().toLocaleString() }
            ],
            [
                { text: 'Amazing work!', time: new Date().toLocaleString() },
                { text: 'Thank you!', time: new Date().toLocaleString() },
                { text: 'Beach looks clean!', time: new Date().toLocaleString() },
                { text: '👏👏', time: new Date().toLocaleString() },
                { text: 'Let’s do more!', time: new Date().toLocaleString() },
                { text: 'Wow!', time: new Date().toLocaleString() },
                { text: 'Respect!', time: new Date().toLocaleString() },
                { text: '💚', time: new Date().toLocaleString() }
            ],
            [
                { text: 'Recycling hero!', time: new Date().toLocaleString() },
                { text: 'Nice!', time: new Date().toLocaleString() },
                { text: '♻️', time: new Date().toLocaleString() }
            ]
        ];
        points = 120;
        // Update UI
        for (let i = 1; i <= 3; i++) {
            updateLikeDisplay(i);
            updateCommentDisplay(i);
        }
        updatePointsDisplay();
        // Hide all comment sections
        document.querySelectorAll('.comment-section').forEach(cs => cs.style.display = 'none');
        // Hide reward message
        const rewardMsg = document.getElementById('reward-message');
        if (rewardMsg) rewardMsg.textContent = '';
}

// Navigation function
function navigateTo(screenId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
}

// Set up navigation item clicks and like/comment events
window.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.nav-item').forEach(navItem => {
                navItem.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    // Like buttons
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            likeFeed(Number(this.dataset.feed));
        });
    });
    // Comment buttons
    document.querySelectorAll('.comment-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            toggleCommentSection(Number(this.dataset.feed));
        });
    });
    // Initial UI
    for (let i = 1; i <= 3; i++) {
      updateLikeDisplay(i);
      updateCommentDisplay(i);
    }
    updatePointsDisplay();
    // Report activity button
    const reportBtn = document.querySelector('#report-activity-screen .btn.btn-primary[onclick*="alert"]');
    if (reportBtn) {
      reportBtn.onclick = function() {
        reportActivity();
        alert('Activity submitted! +50 points');
        navigateTo('home-screen');
      };
    }
});
