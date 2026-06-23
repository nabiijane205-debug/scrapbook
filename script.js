// ==========================================================================
// SCRAPBOOK LOGIC ENGINE: script.js
// ==========================================================================

// 1. DYNAMICALLY GENERATE THE 10 "THINGS I LOVE ABOUT YOU" HEARTS
const loveReasons = [
    "Your smile.", "Your laugh.", "Your mighty sneezes.", "Your sense of humour.",
    "Your eyes.", "Your soft hands.", "Your kindness.", "Your sexy brain.",
    "how sensitive you are.", "The way you care."
];

function generateHearts() {
    const grid = document.getElementById('hearts-grid');
    if (!grid) return;
    grid.innerHTML = ""; 

    loveReasons.forEach((reason, index) => {
        const card = document.createElement('div');
        card.className = 'heart-card';
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });

        card.innerHTML = `
            <div class="heart-inner">
                <div class="heart-front">
                    <i class="fas fa-heart"></i>
                    <span>Reason #${index + 1}</span>
                </div>
                <div class="heart-back">
                    <span>${reason}</span>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// 2. PAGE CHANGER ENGINE (BACK AND NEXT BUTTON DIARY SYSTEM)
function changePage(pageNumber) {
    const pages = document.querySelectorAll('.scrapbook-page');
    pages.forEach(page => {
        page.classList.add('hidden');
    });

    const targetPage = document.getElementById(`page-${pageNumber}`);
    if (targetPage) {
        targetPage.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Trigger soft background soundtrack on first page flip action
    if (pageNumber === 1) {
        const bgMusic = document.getElementById('bg-music');
        if (bgMusic && bgMusic.paused) {
            bgMusic.volume = 0.15; // Set volume directly to a soft 15% ambiance
            bgMusic.play().catch(err => console.log("Audio waiting for active user action profile."));
        }
    }
}

// 3. RELATIONSHIP TICKER COUNTER (Live Counting Up by the Second)
function initRelationshipCounter() {
    const anniversaryDate = new Date("April 1, 2026 00:00:00").getTime();
    const counterContainer = document.getElementById('counter');

    if (!counterContainer) return;

    function updateTime() {
        const now = new Date().getTime();
        const difference = now - anniversaryDate;

        const msecPerSecond = 1000;
        const msecPerMinute = msecPerSecond * 60;
        const msecPerHour = msecPerMinute * 60;
        const msecPerDay = msecPerHour * 24;

        let totalDays = Math.floor(difference / msecPerDay);
        
        let calculatedYears = Math.floor(totalDays / 365);
        let remainderDaysAfterYears = totalDays % 365;
        let calculatedMonths = Math.floor(remainderDaysAfterYears / 30);
        let calculatedDays = remainderDaysAfterYears % 30;

        let calculatedHours = Math.floor((difference % msecPerDay) / msecPerHour);
        let calculatedMinutes = Math.floor((difference % msecPerHour) / msecPerMinute);
        let calculatedSeconds = Math.floor((difference % msecPerMinute) / msecPerSecond);

        counterContainer.innerHTML = `
            <div class="counter-grid">
                <div class="counter-block"><span class="num">${calculatedYears}</span><span class="label">Years</span></div>
                <div class="counter-block"><span class="num">${calculatedMonths}</span><span class="label">Months</span></div>
                <div class="counter-block"><span class="num">${calculatedDays}</span><span class="label">Days</span></div>
                <div class="counter-block"><span class="num">${calculatedHours}</span><span class="label">Hrs</span></div>
                <div class="counter-block"><span class="num">${calculatedMinutes}</span><span class="label">Min</span></div>
                <div class="counter-block highlight"><span class="num">${calculatedSeconds}</span><span class="label">Sec</span></div>
            </div>
        `;
    }
    setInterval(updateTime, 1000);
    updateTime();
}

// 4. SECRET PASSWORD GATEKEEPER
function checkPassword() {
    const input = document.getElementById('password-input').value;
    const authForm = document.getElementById('auth-form');
    const secretLetter = document.getElementById('secret-letter');

    if (input.trim().toLowerCase() === "kamwizi") {
        authForm.classList.add('hidden');
        secretLetter.classList.remove('hidden');
    } else {
        alert("The wax seal didn't budge. Try again, love.");
    }
}

// 5. ONLOAD LIFECYCLE INITIALIZER
window.addEventListener('DOMContentLoaded', () => {
    generateHearts();
    initRelationshipCounter();
});