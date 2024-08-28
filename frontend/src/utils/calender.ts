import { Streak } from '../components/streak';

export function renderCalendar(container: HTMLElement, streaks: Streak[]) {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    container.innerHTML = `
        <div class="calendar">
            <div class="calendar-header">
                <button id="prev-month">&lt;</button>
                <h3 id="current-month-year">${getMonthName(currentMonth)} ${currentYear}</h3>
                <button id="next-month">&gt;</button>
            </div>
            <div class="calendar-body" id="calendar-body"></div>
            <div id="streak-info"></div>
        </div>
    `;

    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const currentMonthYearElement = document.getElementById('current-month-year');

    prevMonthBtn?.addEventListener('click', () => changeMonth(-1));
    nextMonthBtn?.addEventListener('click', () => changeMonth(1));

    function changeMonth(delta: number) {
        today.setMonth(today.getMonth() + delta);
        if (currentMonthYearElement) {
            currentMonthYearElement.textContent = `${getMonthName(today.getMonth())} ${today.getFullYear()}`;
        }
        renderCalendarBody(today.getMonth(), today.getFullYear());
    }

    function renderCalendarBody(month: number, year: number) {
        const calendarBody = document.getElementById('calendar-body');
        if (!calendarBody) return;

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let html = '<table><tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr><tr>';

        for (let i = 0; i < firstDay; i++) {
            html += '<td></td>';
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const streakData = getStreakDataForDate(streaks, date);
            const isToday = isSameDay(date, today);
            const cellClass = `${streakData ? 'has-streak' : ''} ${isToday ? 'today' : ''}`;
            html += `<td class="${cellClass}" data-date="${date.toISOString()}">${day}</td>`;

            if ((firstDay + day) % 7 === 0) {
                html += '</tr><tr>';
            }
        }

        html += '</tr></table>';
        calendarBody.innerHTML = html;

        // Add click event listeners to cells
        const cells = calendarBody.querySelectorAll('td');
        cells.forEach(cell => {
            cell.addEventListener('click', (e) => {
                const clickedDate = new Date((e.target as HTMLElement).getAttribute('data-date') || '');
                const streakInfo = getStreakDataForDate(streaks, clickedDate);
                displayStreakInfo(streakInfo);
            });
        });
    }

    function displayStreakInfo(streakInfo: string | null) {
        const streakInfoElement = document.getElementById('streak-info');
        if (streakInfoElement) {
            if (streakInfo) {
                streakInfoElement.innerHTML = `<h4>Streak Information</h4><p>${streakInfo}</p>`;
            } else {
                streakInfoElement.innerHTML = '';
            }
        }
    }

    renderCalendarBody(currentMonth, currentYear);
}

function getMonthName(month: number): string {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[month];
}

function getStreakDataForDate(streaks: Streak[], date: Date): string | null {
    const events: { [key: string]: string[] } = {
        Created: [],
        Updated: [],
        Reset: [],
        Deleted: []
    };

    streaks.forEach(streak => {
        console.log('Streak data:', JSON.stringify(streak, null, 2));
        
        if (streak.createdAt && isSameDay(new Date(streak.createdAt), date)) {
            console.log('Created event found:', streak.name);
            events.Created.push(streak.name);
        }
        if (isSameDay(new Date(streak.lastUpdated), date)) {
            console.log('Updated event found:', streak.name);
            events.Updated.push(streak.name);
        }
        if (streak.lastReset && isSameDay(new Date(streak.lastReset), date)) {
            console.log('Reset event found:', streak.name);
            events.Reset.push(streak.name);
        }
        if (streak.deletedAt && isSameDay(new Date(streak.deletedAt), date)) {
            console.log('Deleted event found:', streak.name);
            events.Deleted.push(streak.name);
        }
    });
    
    const eventsList = Object.entries(events)
        .filter(([_, streaks]) => streaks.length > 0)
        .map(([category, streaks]) => `
            <li>
                <details>
                    <summary>${category}</summary>
                    <ol>
                        ${streaks.map(streak => `<li>${streak}</li>`).join('')}
                    </ol>
                </details>
            </li>
        `)
        .join('');

    if (eventsList) {
        return `<ul class="streak-events">${eventsList}</ul>`;
    }
    return null;
}

function isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
}
