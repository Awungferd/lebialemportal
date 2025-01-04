
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
  const mundaniDays = ['Aghà̧', 'Abù‌ꞌ', 'Ngȩ̀', 'Kèlu̧', 'Èwenesa̧', 'Èwenelà̧', 'Nkwanyȩ', 'Mèndeè'];
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
      case 'mundani':
        return mundaniDays[index < 0 ? index + 8 : index];
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
    setConvertedDate(`${formattedDate} is ${localDay} in the ${selectedCalendar.charAt(0).toUpperCase() + selectedCalendar.slice(1)} Calendar`);
  };

  const calendarDays = generateCalendarDays();

  const containerStyle = {
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '16px',
    fontSize: '14px',
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
    backgroundColor: '#34495e',
    color: '#ecf0f1',
    fontSize: '0.8em',
    padding: '4px',
    position: 'relative',
    height: '60px',
    width: 'calc(100% - 8px)', // Adjust width to account for padding
  };

  const headerTextStyle = {
    position: 'absolute',
    bottom: '2px',
    left: '2px',
    transform: 'rotate(-45deg)',
    transformOrigin: 'left bottom',
    width: '200%', // Increase width to prevent text clipping
    textAlign: 'left',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    paddingLeft: '10px', // Add left padding to prevent text clipping
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
    flexDirection: 'row',
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

  const radioGroupStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '16px',
  };

  const radioLabelStyle = {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <button onClick={() => changeMonth(-1)} style={buttonStyle}>
          <ChevronLeft size={16} />
        </button>
        <h2 style={titleStyle}>
          {monthNames[currentDate.getUTCMonth()]} {currentDate.getUTCFullYear()}
        </h2>
        <button onClick={() => changeMonth(1)} style={buttonStyle}>
          <ChevronRight size={16} />
        </button>
      </div>
      <div style={radioGroupStyle}>
        <label style={radioLabelStyle}>
          <input
            type="radio"
            value="nweh"
            checked={selectedCalendar === 'nweh'}
            onChange={(e) => setSelectedCalendar(e.target.value)}
          />
          Nweh
        </label>
        <label style={radioLabelStyle}>
          <input
            type="radio"
            value="upperMmuock"
            checked={selectedCalendar === 'upperMmuock'}
            onChange={(e) => setSelectedCalendar(e.target.value)}
          />
          Upper Mmuock
        </label>
        <label style={radioLabelStyle}>
          <input
            type="radio"
            value="mmockbie"
            checked={selectedCalendar === 'mmockbie'}
            onChange={(e) => setSelectedCalendar(e.target.value)}
          />
          Mmockbie
        </label>
        <label style={radioLabelStyle}>
          <input
            type="radio"
            value="mundani"
            checked={selectedCalendar === 'mundani'}
            onChange={(e) => setSelectedCalendar(e.target.value)}
          />
          Wabane
        </label>
      </div>
      <div style={gridStyle}>
        {(selectedCalendar === 'nweh' ? nwehDays :
          selectedCalendar === 'upperMmuock' ? upperMmuockDays :
          selectedCalendar === 'mmockbie' ? mmockbieDays :
          mundaniDays).map(day => (
          <div key={day} style={headerCellStyle}>
            <span style={headerTextStyle}>{day}</span>
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
          <label style={{fontWeight: 'bold', color: '#2c3e50'}}>Convert Date to Local Calendar:</label>
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

export default MultiCalendar;
