
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MultiCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [inputDay, setInputDay] = useState('');
  const [inputMonth, setInputMonth] = useState('');
  const [inputYear, setInputYear] = useState('');
  const [convertedDate, setConvertedDate] = useState('');
  const [selectedCalendar, setSelectedCalendar] = useState('nweh');

  // ... [Previous helper functions remain unchanged]

  const containerStyle = {
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '16px',
    fontSize: '14px',
    backgroundColor: '#f0f4f8',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    '@media (max-width: 768px)': {
      padding: '8px',
    },
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
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
    },
  };

  const buttonStyle = {
    padding: '8px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#ecf0f1',
    fontSize: '16px',
    '@media (max-width: 768px)': {
      fontSize: '20px',
    },
  };

  const titleStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    '@media (max-width: 768px)': {
      fontSize: '1.5rem',
    },
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(8, 1fr)',
    gap: '2px',
    marginBottom: '16px',
    backgroundColor: '#ecf0f1',
    padding: '8px',
    borderRadius: '4px',
    '@media (max-width: 768px)': {
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '4px',
    },
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
    '@media (max-width: 768px)': {
      padding: '4px',
    },
  };

  const headerCellStyle = {
    ...cellStyle,
    backgroundColor: '#34495e',
    color: '#ecf0f1',
    fontSize: '0.7em',
    padding: '4px',
    position: 'relative',
    height: '60px',
    width: 'calc(100% - 8px)',
    '@media (max-width: 768px)': {
      height: '50px',
      fontSize: '0.6em',
    },
  };

  const headerTextStyle = {
    position: 'absolute',
    bottom: '2px',
    left: '2px',
    transform: 'rotate(-45deg)',
    transformOrigin: 'left bottom',
    width: '200%',
    textAlign: 'left',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    paddingLeft: '5px',
    '@media (max-width: 768px)': {
      transform: 'rotate(-60deg)',
      width: '150%',
    },
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    backgroundColor: '#ecf0f1',
    padding: '16px',
    borderRadius: '4px',
    '@media (max-width: 768px)': {
      padding: '12px',
    },
  };

  const inputContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    gap: '8px',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
    },
  };

  const inputStyle = {
    padding: '8px',
    border: '1px solid #bdc3c7',
    borderRadius: '4px',
    width: '100%',
    backgroundColor: '#fff',
    '@media (max-width: 768px)': {
      padding: '12px',
      fontSize: '16px',
    },
  };

  const submitButtonStyle = {
    padding: '8px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    '@media (max-width: 768px)': {
      padding: '12px',
      fontSize: '16px',
    },
  };

  const radioGroupStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '16px',
    flexWrap: 'wrap',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      gap: '8px',
    },
  };

  const radioLabelStyle = {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '@media (max-width: 768px)': {
      fontSize: '16px',
    },
  };

  // ... [Rest of the component remains the same]

  return (
    <div style={containerStyle}>
      {/* ... [Component JSX remains the same] */}
    </div>
  );
};

export default MultiCalendar;

import React, { useState } from 'react';
import { Menu, ChevronDown } from 'lucide-react';
import MultiCalendar from './MultiCalendar';

const App = () => {
  const [isLebialemOpen, setIsLebialemOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const headerStyle = {
    backgroundColor: '#2c3e50',
    color: '#ecf0f1',
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '@media (max-width: 768px)': {
      flexWrap: 'wrap',
    },
  };

  const navStyle = {
    backgroundColor: '#34495e',
    padding: '10px',
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '20px',
    flexWrap: 'wrap',
    position: 'relative',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'center',
      display: isMobileMenuOpen ? 'flex' : 'none',
    },
  };

  const navLinkStyle = {
    color: '#ecf0f1',
    textDecoration: 'none',
    fontSize: '14px',
    cursor: 'pointer',
    '@media (max-width: 768px)': {
      fontSize: '16px',
      padding: '10px 0',
    },
  };

  const dropdownStyle = {
    position: 'relative',
    display: 'inline-block',
  };

  const dropdownContentStyle = {
    display: isLebialemOpen ? 'block' : 'none',
    position: 'absolute',
    backgroundColor: '#34495e',
    minWidth: '160px',
    boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
    zIndex: 1,
    '@media (max-width: 768px)': {
      position: 'static',
      boxShadow: 'none',
    },
  };

  const dropdownItemStyle = {
    color: '#ecf0f1',
    padding: '12px 16px',
    textDecoration: 'none',
    display: 'block',
    '@media (max-width: 768px)': {
      padding: '10px 0',
    },
  };

  const mainContentStyle = {
    display: 'flex',
    padding: '20px',
    gap: '20px',
    flexDirection: 'column',
    '@media (min-width: 769px)': {
      flexDirection: 'row',
    },
  };

  const contentAreaStyle = {
    flex: '3',
    backgroundColor: '#ffffff',
    border: '1px solid #bdc3c7',
    padding: '20px',
    '@media (max-width: 768px)': {
      padding: '15px',
    },
  };

  const sidebarStyle = {
    flex: '1',
    backgroundColor: '#ffffff',
    border: '1px solid #bdc3c7',
    padding: '20px',
    '@media (max-width: 768px)': {
      padding: '15px',
    },
  };

  const sectionStyle = {
    marginBottom: '20px',
  };

  const boxStyle = {
    backgroundColor: '#ecf0f1',
    padding: '20px',
    marginBottom: '10px',
    '@media (max-width: 768px)': {
      padding: '15px',
    },
  };

  const footerStyle = {
    backgroundColor: '#2c3e50',
    color: '#ecf0f1',
    padding: '10px',
    textAlign: 'center',
  };

  const mobileMenuButtonStyle = {
    display: 'none',
    '@media (max-width: 768px)': {
      display: 'block',
      backgroundColor: 'transparent',
      border: 'none',
      color: '#ecf0f1',
      fontSize: '24px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f0f4f8', minHeight: '100vh' }}>
      <header style={headerStyle}>
        <h1>Lebialem Portal</h1>
        <button style={mobileMenuButtonStyle} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <Menu size={24} />
        </button>
        <button style={{ 
          backgroundColor: '#3498db', 
          color: '#ecf0f1', 
          border: 'none', 
          padding: '10px 20px', 
          borderRadius: '5px',
          '@media (max-width: 768px)': {
            width: '100%',
            marginTop: '10px',
          },
        }}>
          Login/Sign Up
        </button>
      </header>
      <nav style={navStyle}>
        <a href="#" style={navLinkStyle}>Home</a>
        <a href="#" style={navLinkStyle}>Events</a>
        <a href="#" style={navLinkStyle}>News</a>
        <a href="#" style={navLinkStyle}>Ndiah Alla‌ꞌ</a>
        <a href="#" style={navLinkStyle}>Ndiah Befu</a>
        <a href="#" style={navLinkStyle}>Ndiah Benyoyo</a>
        <div style={dropdownStyle}>
          <a onClick={() => setIsLebialemOpen(!isLebialemOpen)} style={navLinkStyle}>
            Lebialem <ChevronDown size={14} />
          </a>
          <div style={dropdownContentStyle}>
            <a href="#" style={dropdownItemStyle}>Overview</a>
            <a href="#" style={dropdownItemStyle}>Alou</a>
            <a href="#" style={dropdownItemStyle}>Fontem</a>
            <a href="#" style={dropdownItemStyle}>Wabane</a>
          </div>
        </div>
        <a href="#" style={navLinkStyle}>Resources</a>
        <a href="#" style={navLinkStyle}>Community</a>
      </nav>
      <main style={mainContentStyle}>
        <div style={contentAreaStyle}>
          <section style={sectionStyle}>
            <h2>Welcome to Lebialem Portal</h2>
            <div style={boxStyle}>
              <h3>Preserving Our Heritage: The Traditional Calendars of Lebialem</h3>
              <p>Immerse yourself in the wisdom of our ancestors through our traditional calendars. These timekeeping systems connect us to our roots and guide our community's rhythm of life across the diverse ethnic groups of Lebialem.</p>
            </div>
          </section>
          <section style={sectionStyle}>
            <h2>Latest Updates</h2>
            <div style={boxStyle}>
              <h3>Multi-Calendar Integration: Celebrating Our Diversity</h3>
              <p>We are proud to announce the integration of multiple traditional calendars into our digital portal. This feature allows community members from Bangwa, Mundane, and Mmuock to track important dates and events according to their specific cultural traditions, fostering a deeper connection to our shared heritage.</p>
            </div>
            <div style={boxStyle}>
              <h3>Upcoming Community Gatherings</h3>
              <p>Join us in celebrating our shared heritage through upcoming events that honor both our traditional calendars and the modern Gregorian system. These gatherings serve as a testament to our community's resilience and unity, strengthening the bonds that tie us to our land and to each other.</p>
            </div>
          </section>
        </div>
        <aside style={sidebarStyle}>
          <section style={sectionStyle}>
            <h2>Traditional Calendar</h2>
            <MultiCalendar />
          </section>
          <section style={sectionStyle}>
            <h2>Upcoming Events</h2>
            <div style={boxStyle}>
              <h3>Lebialem Development Forum</h3>
              <p>Date: 3rd Week of Current Cycle (all calendars)</p>
              <p>Unite with fellow community members to discuss and shape sustainable development initiatives that honor our traditions while embracing progress.</p>
            </div>
            <div style={boxStyle}>
              <h3>Annual Lebialem Cultural Festival</h3>
              <p>Date: 1st Week of Next Cycle (all calendars)</p>
              <p>Immerse yourself in the vibrant tapestry of our culture through traditional music, dance, and cuisine. Let's come together to celebrate the spirit of Lebialem!</p>
            </div>
          </section>
        </aside>
      </main>
      <footer style={footerStyle}>
        <p>© 2025 Lebialem Portal | Contact | Privacy Policy</p>
      </footer>
    </div>
  );
};

export default App;
