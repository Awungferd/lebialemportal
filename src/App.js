import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import MultiCalendar from './MultiCalendar';



const App = () => {
  const [isLebialemOpen, setIsLebialemOpen] = useState(false);

  const headerStyle = {
    backgroundColor: '#2c3e50',
    color: '#ecf0f1',
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const navStyle = {
    backgroundColor: '#34495e',
    padding: '10px',
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '20px',
    flexWrap: 'wrap',
    position: 'relative',
  };

  const navLinkStyle = {
    color: '#ecf0f1',
    textDecoration: 'none',
    fontSize: '14px',
    cursor: 'pointer',
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
  };

  const dropdownItemStyle = {
    color: '#ecf0f1',
    padding: '12px 16px',
    textDecoration: 'none',
    display: 'block',
  };

  const mainContentStyle = {
    display: 'flex',
    padding: '20px',
    gap: '20px',
  };

  const contentAreaStyle = {
    flex: '3',
    backgroundColor: '#ffffff',
    border: '1px solid #bdc3c7',
    padding: '20px',
  };

  const sidebarStyle = {
    flex: '1',
    backgroundColor: '#ffffff',
    border: '1px solid #bdc3c7',
    padding: '20px',
  };

  const sectionStyle = {
    marginBottom: '20px',
  };

  const boxStyle = {
    backgroundColor: '#ecf0f1',
    padding: '20px',
    marginBottom: '10px',
  };

  const footerStyle = {
    backgroundColor: '#2c3e50',
    color: '#ecf0f1',
    padding: '10px',
    textAlign: 'center',
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f0f4f8', minHeight: '100vh' }}>
      <header style={headerStyle}>
        <h1>Lebialem Portal</h1>
        <button style={{ backgroundColor: '#3498db', color: '#ecf0f1', border: 'none', padding: '10px 20px', borderRadius: '5px' }}>
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
