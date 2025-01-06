
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './MultiCalendar.css';

const MultiCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [inputDay, setInputDay] = useState('');
  const [inputMonth, setInputMonth] = useState('');
  const [inputYear, setInputYear] = useState('');
  const [convertedDate, setConvertedDate] = useState('');
  const [selectedCalendar, setSelectedCalendar] = useState('nweh');

  const startOfCycle = Date.UTC(1970, 4, 24) / 1000;
  const nwehDays = ['Ankoah', 'Anzoah', 'Alena', 'Amina', 'Afeah', 'Agong', 'Aseih', 'Alung'];
  const upperMmuockDays = ['Ngangà', 'Mbeqgnúá', 'Mbeqlěq', 'Njœêngong', 'Mbeqńkœó', 'Njœêlekœr̄', 'Fa‌ꞌà', 'Télǎng'];
  const mmockbieDays = ['Ngangà', 'Betaâgnúá', 'Mbeqlěq', 'Ngong', 'Mbeqńkœó', 'Njœêlekœr̄', 'Fa‌ꞌà', 'Télǎng'];
  const mundaneDays = ['Aghà̧', 'Abù‌ꞌ', 'Ngȩ̀', 'Kèlu̧', 'Èwenesa̧', 'Èwenelà̧', 'Nkwanyȩ', 'Mèndeè'];
  const englishDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getLocalDay = (date) => {
    const utcTimestamp = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) / 1000;
    const daysSinceCycleStart = Math.floor((utcTimestamp - startOfCycle) / 86400);
    const index = daysSinceCycleStart % 8;
    switch (selectedCalendar) {
      case 'upperMmuock':
        return upperMmuockDays[index < 0 ? index + 8 : index];
      case 'mmockbie':
        return mmockbieDays[index < 0 ? index + 8 : index];
      case 'mundane':
        return mundaneDays[index < 0 ? index + 8 : index];
      default:
        return nwehDays[index < 0 ? index + 8 : index];
    }
  };

  const getEnglishDay = (date) => {
    return englishDays[date.getUTCDay()];
  };

  const getDaysInMonth = (year, month) => {
    return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  };

  const generateCalendarDays = () => {
    const year = currentDate.getUTCFullYear();
    const month = currentDate.getUTCMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = new Date(Date.UTC(year, month, 1));
    const days = [];

    let startDate = new Date(firstDayOfMonth);
    while (getLocalDay(startDate) !== (selectedCalendar === 'nweh' ? 'Ankoah' : (selectedCalendar === 'upperMmuock' || selectedCalendar === 'mmockbie' ? 'Ngangà' : 'Aghà̧'))) {
      startDate.setUTCDate(startDate.getUTCDate() - 1);
    }

    while (startDate < firstDayOfMonth) {
      days.push({ day: null, englishDay: getEnglishDay(startDate), isCurrentMonth: false });
      startDate.setUTCDate(startDate.getUTCDate() + 1);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(Date.UTC(year, month, day));
      days.push({ day, englishDay: getEnglishDay(date), isCurrentMonth: true });
    }

    while (days.length % 8 !== 0) {
      const nextMonthDate = new Date(Date.UTC(year, month + 1, days.length - daysInMonth + 1));
      days.push({ day: null, englishDay: getEnglishDay(nextMonthDate), isCurrentMonth: false });
    }

    return days;
  };

  const changeMonth = (increment) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(Date.UTC(prevDate.getUTCFullYear(), prevDate.getUTCMonth() + increment, 1));
      return newDate;
    });
  };

  const handleDateConversion = (e) => {
    e.preventDefault();
    const day = parseInt(inputDay, 10);
    const month = parseInt(inputMonth, 10);
    const year = parseInt(inputYear, 10);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      setConvertedDate('Please enter valid numbers for day, month, and year.');
      return;
    }

    const date = new Date(Date.UTC(year, month - 1, day));
    if (isNaN(date.getTime())) {
      setConvertedDate('Invalid date. Please check your input.');
      return;
    }

    const localDay = getLocalDay(date);
    const formattedDate = date.toUTCString().split(' ').slice(0, 4).join(' ');
    setConvertedDate(`${formattedDate} corresponds to ${localDay} in the ${selectedCalendar.charAt(0).toUpperCase() + selectedCalendar.slice(1)} Calendar`);
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={() => changeMonth(-1)} className="calendar-button">
          <ChevronLeft size={16} />
        </button>
        <h2 className="calendar-title">
          {monthNames[currentDate.getUTCMonth()]} {currentDate.getUTCFullYear()}
        </h2>
        <button onClick={() => changeMonth(1)} className="calendar-button">
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="calendar-radio-group">
        <label className="calendar-radio-label">
          <input
            type="radio"
            value="nweh"
            checked={selectedCalendar === 'nweh'}
            onChange={(e) => setSelectedCalendar(e.target.value)}
          />
          Nweh
        </label>
        <label className="calendar-radio-label">
          <input
            type="radio"
            value="upperMmuock"
            checked={selectedCalendar === 'upperMmuock'}
            onChange={(e) => setSelectedCalendar(e.target.value)}
          />
          Upper Mmuock
        </label>
        <label className="calendar-radio-label">
          <input
            type="radio"
            value="mmockbie"
            checked={selectedCalendar === 'mmockbie'}
            onChange={(e) => setSelectedCalendar(e.target.value)}
          />
          Mmockbie
        </label>
        <label className="calendar-radio-label">
          <input
            type="radio"
            value="mundane"
            checked={selectedCalendar === 'mundane'}
            onChange={(e) => setSelectedCalendar(e.target.value)}
          />
          Wabane
        </label>
      </div>
      <div className="calendar-grid">
        {(selectedCalendar === 'nweh' ? nwehDays :
          selectedCalendar === 'upperMmuock' ? upperMmuockDays :
          selectedCalendar === 'mmockbie' ? mmockbieDays :
          mundaneDays).map(day => (
          <div key={day} className="calendar-header-cell">
            <span className="calendar-header-text">{day}</span>
          </div>
        ))}
        {calendarDays.map((day, index) => (
          <div key={index} className={`calendar-cell ${day.isCurrentMonth ? 'current-month' : 'other-month'}`}>
            {day.day && (
              <>
                <div className="day-number">{day.day}</div>
                <div className="english-day">{day.englishDay}</div>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="calendar-form-container">
        <form onSubmit={handleDateConversion} className="calendar-form">
          <label className="form-label">Convert Date to Local Calendar:</label>
          <div className="calendar-input-container">
            <input
              type="number"
              value={inputDay}
              onChange={(e) => setInputDay(e.target.value)}
              placeholder="Day"
              className="calendar-input"
              min="1"
              max="31"
            />
            <input
              type="number"
              value={inputMonth}
              onChange={(e) => setInputMonth(e.target.value)}
              placeholder="Month"
              className="calendar-input"
              min="1"
              max="12"
            />
            <input
              type="number"
              value={inputYear}
              onChange={(e) => setInputYear(e.target.value)}
              placeholder="Year"
              className="calendar-input"
            />
          </div>
          <button type="submit" className="calendar-submit-button">Convert</button>
        </form>
        {convertedDate && (
          <div className="converted-date-result">{convertedDate}</div>
        )}
      </div>
    </div>
  );
};

export default MultiCalendar;

