// Static logs data - Edit this array to add/modify your daily logs
const logs = [
    {
        date: "Saturday, June 14, 2025",
        thought: "I should seriously focus on how to be diplomatic in my conversations. I usually get myself overwhelmed while others can play it so cool. Time to begin mastering the art of diplomacy.",
        mood: "productive", // Add mood property
        events: [
            "Had a conversation with V about our relationship. I handled her with grace and patience.",
            "Well, I made lots of promises to V today. I'll give my best so that I never lose her and we stay always together.",
            "Found it easy to build the portfolio rather than fixing the bug. Did today's share of work on portfolio.Apparently, I've a cool <a href=\"https://theaniketraj.netlify.app\" target=\"blank\">Portfolio</a> ↗.",
            "I need to be more consistent with my work. I tend to procrastinate a lot.",
        ],
        tags: ["work", "relationships"] // Add tags property
    },
    {
        date: "Friday, June 13, 2025",
        thought: "There is a fine line between formal and informal. That line is known as being diplomatic. I need to learn how to be diplomatic in my conversations. I must learn to express my thoughts without being too formal or too overwhelming.",
        mood: "frustrated",
        events: [
            "Pulse bugs still persist. They just won't go easily. I need to be more persistent.",
            "In an attempt to fix a bug in my portfolio, I ended up breaking the entire site. I need to be more careful with my changes.",
            "The day was good personally, but utterly poor in terms of productivity.",
            "I need to fix my sleep schedule. I have been sleeping late and waking up late, which is affecting my productivity.",
        ],
        tags: ["work", "personal"]
    },
    {
        date: "Thursday, June 12, 2025",
        thought: "There lies a huge difference between friends made in school and friends made in college. The former are more genuine and the latter are more opportunistic. They're more like acquaintances than friends.",
        mood: "thoughtful",
        events: [
            "Keeping it slow with V. I need to understand her personal space and give her time.",
            "Realized how much I miss the simplicity of school friendships.",
            "I need to be more cautious about who I trust in college.",
            "Tired of this one bug in Pulse. Dear God!! Holy hell, I need to fix it.",
            "Why do I'm always on multiple projects simultaneously? It seriously delays all of them. I need to learn from the patterns.",
            "I should focus on one project at a time to ensure quality and timely completion.",
        ],
        tags: ["relationships", "work"]
    },
    {
        date: "Wednesday, June 11, 2025",
        thought: "Coding is about 90% debugging and 10% writing code. tbh I'm falling in love with debugging.",
        mood: "neutral",
        events: [
            "Taking it slow with V. I need to be more patient and understanding.",
            "Pulse is still in development. I need to focus on completing it.",
        ],
        tags: ["work"]
    },
    {
        date: "Tuesday, June 10, 2025",
        thought: "Life is truly weird. One moment you're dealing with the heart, the next you've got to deal with the mind and god forbid a conflict between the two.",
        mood: "anxious",
        events: [
            "Started a new project Pulse - A Visual Studio Code extension to monitor application metrics and logs in real-time, integrating with tools like Prometheus and Grafana.",
            "Will publish Pulse tomorrow on the vscode marketplace.",
            "Checked the conditions for publishing extensions on the marketplace. I need to ensure that my extension meets all the requirements.",
            "Had minimal conversations with V today. I need to make more effort to connect with her.",
            "My semester exams are over, and I feel relieved. I hope I did well.",
            "I should also work on my personal projects and hobbies. I have a lot of ideas that I want to explore.",
        ],
        tags: ["work", "personal"]
    },
    {
        date: "Monday, June 09, 2025",
        thought: "Feelings get lost in translation. If not expressed carefully, they hurt like a knife. If not reciprocated, they fade away like a distant memory & very fast.",
        mood: "regretful",
        events: [
            "Had a terrible fight with V. Will try to make up with her as soon as possible.",
            "I should have been more patient with V. I need to work on my temper and communication skills.",
            "I'll try to apologize and make things right with V. I value our relationship too much to let this go.",
            "I need to reflect on what triggered my anger and how I can handle similar situations better in the future.",
            "I'll try to restart afresh with V and show her that I care about her feelings. I can't just let her be sad because of me.",
            "Tomorrow is my last exam for this semester. I need to study.",
        ],
        tags: ["relationships", "personal"]
    },
    {
        date: "Sunday, June 08, 2025",
        thought: "Today, I thought about how this simple daily log will help me track my personal growth and capture meaningful moments that might otherwise be forgotten.",
        mood: "hopeful",
        events: [
            "Beggining daily log today",
            "Will plan to refactor the codebase for journaling along with the daily log",
            "Let's begin this journey of self-reflection and growth",
        ],
        tags: ["personal"]
    },
];

// Add these variables at the top of your file
let currentDisplayMonth = new Date();

// Theme persistence
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    document.getElementById('theme-text').textContent = savedTheme === 'dark' ? '☀️ Light' : '🌙 Dark';
}

function toggleTheme() {
    const body = document.body;
    const themeText = document.getElementById('theme-text');
    const newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    themeText.textContent = newTheme === 'dark' ? '☀️ Light' : '🌙 Dark';
    localStorage.setItem('theme', newTheme);
}

// Show logs section
function showLogs() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('logs').classList.add('active');
    displayLogs();
}

// Display logs
function displayLogs(filteredLogs = logs) {
    const container = document.getElementById('logsContainer');

    if (filteredLogs.length === 0) {
        container.innerHTML = '<div class="no-results">No logs match your search. Try different keywords.</div>';
        return;
    }

    container.innerHTML = filteredLogs.map(log => `
                <div class="log-entry">
                    <div class="log-date">${log.date}</div>
                    ${log.mood ? `
                        <div class="mood-indicator mood-${log.mood}">
                            ${getMoodEmoji(log.mood)} ${log.mood}
                        </div>
                    ` : ''}
                    <div class="log-thought">${log.thought}</div>
                    ${log.tags ? `
                        <div class="log-tags">
                            ${log.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                        </div>
                    ` : ''}
                    <div class="log-events">
                        <h4>Notable Events</h4>
                        <ul>
                            ${log.events.map(event => `<li>${event}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `).join('');
}

function getMoodEmoji(mood) {
    const moodEmojis = {
        productive: '💪',
        happy: '😊',
        neutral: '😐',
        frustrated: '😤'
    };
    return moodEmojis[mood] || '🤔';
}

// Calendar functionality
function updateMonthDisplay() {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    document.getElementById('currentMonth').textContent = 
        `${monthNames[currentDisplayMonth.getMonth()]} ${currentDisplayMonth.getFullYear()}`;
}

function renderCalendar() {
    const firstDay = new Date(currentDisplayMonth.getFullYear(), currentDisplayMonth.getMonth(), 1);
    const lastDay = new Date(currentDisplayMonth.getFullYear(), currentDisplayMonth.getMonth() + 1, 0);
    
    updateMonthDisplay();
    const calendarGrid = document.getElementById('calendarGrid');
    calendarGrid.innerHTML = '';
    
    // Add day headers
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day header';
        dayHeader.textContent = day;
        calendarGrid.appendChild(dayHeader);
    });
    
    // Add blank spaces for first week
    for (let i = 0; i < firstDay.getDay(); i++) {
        const blank = document.createElement('div');
        blank.className = 'calendar-day blank';
        calendarGrid.appendChild(blank);
    }
    
    // Update the day creation part
    for (let i = 1; i <= lastDay.getDate(); i++) {
        const day = document.createElement('div');
        day.className = 'calendar-day';
        day.textContent = i;
        
        const dateStr = `${currentDisplayMonth.getFullYear()}-${currentDisplayMonth.getMonth() + 1}-${i}`;
        const matchingLogs = logs.filter(log => 
            new Date(log.date).toDateString() === new Date(dateStr).toDateString()
        );
        
        if (matchingLogs.length > 0) {
            day.classList.add('has-entry');
            day.addEventListener('click', () => showLogsForDate(matchingLogs));
        }
        
        calendarGrid.appendChild(day);
    }
}

// Add this new function to handle showing logs for a specific date
function showLogsForDate(matchingLogs) {
    const container = document.getElementById('logsContainer');
    
    container.innerHTML = matchingLogs.map(log => `
        <div class="log-entry highlight-entry">
            <div class="log-date">${log.date}</div>
            ${log.mood ? `
                <div class="mood-indicator mood-${log.mood}">
                    ${getMoodEmoji(log.mood)} ${log.mood}
                </div>
            ` : ''}
            <div class="log-thought">${log.thought}</div>
            <div class="log-events">
                <h4>Notable Events</h4>
                <ul>
                    ${log.events.map(event => `<li>${event}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');

    // Scroll to the logs container
    container.scrollIntoView({ behavior: 'smooth' });
}

// Stats calculations
function updateStats() {
    const totalEntries = logs.length;
    document.getElementById('totalEntries').textContent = totalEntries;
    
    // Calculate streak
    let streak = 0;
    const today = new Date();
    let checkDate = new Date();
    
    while (logs.some(log => new Date(log.date).toDateString() === checkDate.toDateString())) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
    }
    
    document.getElementById('currentStreak').textContent = `${streak} days`;
}

// Enhanced search with highlighting
function searchLogs() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    if (searchTerm === '') {
        displayLogs();
        return;
    }
    
    const filteredLogs = logs.filter(log =>
        log.thought.toLowerCase().includes(searchTerm) ||
        log.events.some(event => event.toLowerCase().includes(searchTerm)) ||
        log.date.toLowerCase().includes(searchTerm)
    );
    
    displayLogsWithHighlight(filteredLogs, searchTerm);
}

function displayLogsWithHighlight(filteredLogs, searchTerm) {
    const container = document.getElementById('logsContainer');
    
    if (filteredLogs.length === 0) {
        container.innerHTML = '<div class="no-results">No logs match your search. Try different keywords.</div>';
        return;
    }
    
    container.innerHTML = filteredLogs.map(log => {
        const highlightedThought = highlightText(log.thought, searchTerm);
        const highlightedEvents = log.events.map(event => highlightText(event, searchTerm));
        
        return `
            <div class="log-entry">
                <div class="log-date">${log.date}</div>
                <div class="log-thought">${highlightedThought}</div>
                <div class="log-events">
                    <h4>Notable Events</h4>
                    <ul>
                        ${highlightedEvents.map(event => `<li>${event}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }).join('');
}

function highlightText(text, searchTerm) {
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}

// Tag initialization and filtering
function initializeTags() {
    const allTags = new Set();
    logs.forEach(log => {
        if (log.tags) {
            log.tags.forEach(tag => allTags.add(tag));
        }
    });
    
    const tagsList = document.getElementById('tagsList');
    tagsList.innerHTML = Array.from(allTags).map(tag => `
        <button class="tag" data-tag="${tag}">
            #${tag}
        </button>
    `).join('');
    
    // Add click handlers
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('click', () => {
            tag.classList.toggle('active');
            filterLogsByTags();
        });
    });
}

function filterLogsByTags() {
    const activeTags = Array.from(document.querySelectorAll('.tag.active'))
        .map(tag => tag.dataset.tag);
    
    if (activeTags.length === 0) {
        displayLogs(logs);
        return;
    }
    
    const filteredLogs = logs.filter(log => 
        log.tags && log.tags.some(tag => activeTags.includes(tag))
    );
    
    displayLogs(filteredLogs);
}

// Keyboard shortcuts
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        document.getElementById('logs').classList.remove('active');
        document.getElementById('home').style.display = 'block';
        document.getElementById('searchInput').value = '';
    }
});

// Subtle animations on scroll
window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.intro-card');
    if (parallax) {
        const speed = scrolled * 0.1;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderCalendar();
    updateStats();
    
    // Add accessibility improvements
    document.querySelectorAll('button').forEach(button => {
        button.setAttribute('aria-label', button.textContent.trim());
    });
    
    document.getElementById('searchInput').setAttribute('aria-label', 'Search logs');
    initializeTags();
});