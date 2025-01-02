import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const BangwaCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [inputDay, setInputDay] = useState('');
  const [inputMonth, setInputMonth] = useState('');
  const [inputYear, setInputYear] = useState('');
  const [convertedDate, setConvertedDate] = useState('');
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const gridRef = useRef(null);
  
  const startOfCycle = new Date('1970-05-24T00:00:00Z').getTime() / 1000;
  const bangwaDays = ['Ankoah', 'Anzoah', 'Alena', 'Amina', 'Afeah', 'Agong', 'Aseih', 'Alung'];
  const englishDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getBangwaDay = (date) => {
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const currentTimestamp = utcDate.getTime() / 1000;
    const daysSinceCycleStart = Math.floor((currentTimestamp - startOfCycle) / 86400);
    const index = daysSinceCycleStart % 8;
    return bangwaDays[index < 0 ? index + 8 : index];
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
    while (getBangwaDay(startDate) !== 'Ankoah') {
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

    const bangwaDay = getBangwaDay(date);
    const formattedDate = date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
    setConvertedDate(`${formattedDate} is ${bangwaDay} in the Bangwa Calendar`);
  };

  const calendarDays = generateCalendarDays();

  const containerStyle = {
    width: isDesktop ? '600px' : '100%',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '16px',
    fontSize: isDesktop ? '14px' : '12px',
    backgroundColor: '#f0f4f8',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    padding: '8px',
    backgroundColor: '#2c3e50',
    color: '#ecf0f1',
    borderRadius: '4px',
  };

  const buttonStyle = {
    padding: '8px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#ecf0f1',
  };

  const titleStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(8, 1fr)',
    gap: '2px',
    marginBottom: '16px',
    backgroundColor: '#ecf0f1',
    padding: '8px',
    borderRadius: '4px',
  };

  const cellStyle = {
    aspectRatio: '1',
    textAlign: 'center',
    padding: '2px',
    border: '1px solid #bdc3c7',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease',
  };

  const headerCellStyle = {
    ...cellStyle,
    fontWeight: 'bold',
    backgroundColor: '#34495e',
    color: '#ecf0f1',
    position: 'relative',
    overflow: 'hidden',
  };

  const diagonalTextStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) rotate(-45deg)',
    whiteSpace: 'nowrap',
    fontSize: isDesktop ? '0.9em' : '0.9em',
    fontWeight: 'bold',
    color: '#ecf0f1',
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
    width: '140%',
    textAlign: 'center',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    backgroundColor: '#ecf0f1',
    padding: '16px',
    borderRadius: '4px',
  };

  const inputContainerStyle = {
    display: 'flex',
    flexDirection: isDesktop ? 'row' : 'column',
    gap: '8px',
  };

  const inputStyle = {
    padding: '8px',
    border: '1px solid #bdc3c7',
    borderRadius: '4px',
    width: '100%',
    backgroundColor: '#fff',
  };

  const submitButtonStyle = {
    padding: '8px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <button onClick={() => changeMonth(-1)} style={buttonStyle}>
          <ChevronLeft size={16} />
        </button>
        <h2 style={titleStyle}>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button onClick={() => changeMonth(1)} style={buttonStyle}>
          <ChevronRight size={16} />
        </button>
      </div>
      <div ref={gridRef} style={gridStyle}>
        {bangwaDays.map(day => (
          <div key={day} style={headerCellStyle}>
            {isDesktop ? (
              day
            ) : (
              <span style={diagonalTextStyle}>{day}</span>
            )}
          </div>
        ))}
        {calendarDays.map((day, index) => (
          <div key={index} style={{
            ...cellStyle, 
            backgroundColor: day.isCurrentMonth ? '#fff' : '#f5f5f5',
            color: day.isCurrentMonth ? '#333' : '#999',
          }}>
            {day.day && (
              <>
                <div style={{fontSize: '1em', fontWeight: 'bold'}}>{day.day}</div>
                <div style={{fontSize: '0.7em', color: '#666'}}>{day.englishDay}</div>
              </>
            )}
          </div>
        ))}
      </div>
      <div>
        <form onSubmit={handleDateConversion} style={formStyle}>
          <label style={{fontWeight: 'bold', color: '#2c3e50'}}>Conver a date to Nweh:</label>
          <div style={inputContainerStyle}>
            <input
              type="number"
              value={inputDay}
              onChange={(e) => setInputDay(e.target.value)}
              placeholder="Day"
              style={inputStyle}
              min="1"
              max="31"
            />
            <input
              type="number"
              value={inputMonth}
              onChange={(e) => setInputMonth(e.target.value)}
              placeholder="Month"
              style={inputStyle}
              min="1"
              max="12"
            />
            <input
              type="number"
              value={inputYear}
              onChange={(e) => setInputYear(e.target.value)}
              placeholder="Year"
              style={inputStyle}
            />
          </div>
          <button type="submit" style={submitButtonStyle}>Convert</button>
        </form>
        {convertedDate && (
          <div style={{marginTop: '8px', fontWeight: 'bold', color: '#2c3e50'}}>{convertedDate}</div>
        )}
      </div>
    </div>
  );
};