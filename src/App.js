
import React, { useState, useEffect } from 'react';
import { Menu, ChevronDown } from 'lucide-react';
import MultiCalendar from './MultiCalendar';
import './App.css';

const App = () => {
  const [isLebialemOpen, setIsLebialemOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const renderMainContent = () => (
    <div className="content-area">
      <section className="section">
        <h2>Welcome to Lebialem Portal</h2>
        <div className="box">
          <h3>Preserving Our Heritage: The Traditional Calendars of Lebialem</h3>
          <p>The Lebialem Portal serves as the definitive resource for the traditional calendars of our region. These time-keeping systems, deeply ingrained in our cultural heritage, continue to guide community life and safeguard our ancestral wisdom for future generations.</p>
        </div>
      </section>
      <section className="section">
        <h2>Latest Updates</h2>
        <div className="box">
          <h3>Multi-Calendar Integration: Unifying Our Diverse Traditions</h3>
          <p>In a landmark development, the Lebialem Portal now integrates multiple traditional calendars. This feature allows community members from Bangwa, Mundane, and Mmuock to access date-specific information according to their respective cultural traditions, fostering cultural preservation and enhancing inter-community understanding.</p>
        </div>
        <div className="box">
          <h3>Upcoming Community Events</h3>
          <p>The portal now features a comprehensive list of upcoming events aligned with both our traditional calendars and the Gregorian system. These gatherings serve as crucial platforms for community engagement, cultural expression, and collective decision-making, reinforcing our shared heritage.</p>
        </div>
      </section>
    </div>
  );

  const renderSidebar = () => (
    <aside className="sidebar">
      {!isMobile && (
        <section className="section">
          <h2>Traditional Calendar</h2>
          <MultiCalendar />
        </section>
      )}
      <section className="section">
        <h2>Upcoming Events</h2>
        <div className="box">
          <h3>Lebialem Development Forum</h3>
          <p>Date: 3rd Week of Current Cycle (all calendars)</p>
          <p>A pivotal meeting for community leaders and members to discuss and formulate strategies for sustainable development initiatives that honor our cultural heritage while addressing contemporary challenges.</p>
        </div>
        <div className="box">
          <h3>Annual Lebialem Cultural Festival</h3>
          <p>Date: 1st Week of Next Cycle (all calendars)</p>
          <p>This flagship event showcases the rich cultural tapestry of Lebialem through traditional music, dance, and cuisine. It serves as a vital platform for cultural preservation and inter-generational knowledge transfer, ensuring the continuity of our unique traditions.</p>
        </div>
      </section>
    </aside>
  );

  return (
    <div className="app-container">
      <header className="header">
        <h1>Lebialem Portal</h1>
        <button className="mobile-menu-button" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <Menu size={24} />
        </button>
        <button className="login-button">
          Login/Sign Up
        </button>
      </header>
      <nav className={`nav ${isMobileMenuOpen ? 'open' : ''}`}>
        <a href="#" className="nav-link">Home</a>
        <a href="#" className="nav-link">Events</a>
        <a href="#" className="nav-link">News</a>
        <a href="#" className="nav-link">Ndiah Alla‌ꞌ</a>
        <a href="#" className="nav-link">Ndiah Befu</a>
        <a href="#" className="nav-link">Ndiah Benyoyo</a>
        <div className="dropdown">
          <a onClick={() => setIsLebialemOpen(!isLebialemOpen)} className="nav-link">
            Lebialem <ChevronDown size={14} />
          </a>
          <div className={`dropdown-content ${isLebialemOpen ? 'open' : ''}`}>
            <a href="#" className="dropdown-item">Overview</a>
            <a href="#" className="dropdown-item">Alou</a>
            <a href="#" className="dropdown-item">Fontem</a>
            <a href="#" className="dropdown-item">Wabane</a>
          </div>
        </div>
        <a href="#" className="nav-link">Resources</a>
        <a href="#" className="nav-link">Community</a>
      </nav>
      <main className={`main-content ${isMobile ? 'mobile' : 'desktop'}`}>
        {isMobile && (
          <section className="section mobile-calendar">
            <h2>Traditional Calendar</h2>
            <MultiCalendar />
          </section>
        )}
        {renderMainContent()}
        {renderSidebar()}
      </main>
      <footer className="footer">
        <p>© 2025 Lebialem Portal | Contact | Privacy Policy</p>
      </footer>
    </div>
  );
};

export default App;
