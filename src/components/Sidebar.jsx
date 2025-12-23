import React, { useState, useEffect } from "react";
import { DatePicker } from "./";

// Sidebar Component
const Sidebar = ({ selectedDate, onDateChange, isOpen, onToggle }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sidebarStyle = {
    position: isMobile ? 'fixed' : 'relative',
    left: 0,
    top: 0,
    height: '100vh',
    backgroundColor: isOpen ? '#fafafa' : (isMobile ? 'transparent' : '#fafafa'),
    borderRight: isOpen ? '1px solid #e5e7eb' : 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 40,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    width: isOpen ? '300px' : (isMobile ? '0' : '72px'),
    transform: isOpen ? 'translateX(0)' : (isMobile ? 'translateX(-100%)' : 'translateX(0)'),
  };

  const toggleButtonStyle = {
    position: 'fixed',
    left: '20px',
    top: '20px',
    zIndex: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    color: '#374151',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: isMobile ? 'flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(8px)',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
  };

  const desktopToggleStyle = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    zIndex: 50,
    backgroundColor: 'transparent',
    color: '#6b7280',
    padding: '8px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: !isMobile && isOpen ? 'flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const contentStyle = {
    padding: '24px',
    paddingTop: isMobile ? '80px' : '24px',
    overflowY: 'hidden',
    overflow: 'hidden',
    flex: 1,
    transition: 'all 0.3s',
    display: isOpen ? 'block' : (isMobile ? 'block' : 'none'),
    maxHeight: '100vh',
  };

  const headerStyle = {
    marginBottom: '28px',
    paddingBottom: '20px',
    borderBottom: '1px solid #f3f4f6',
  };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '6px',
    letterSpacing: '-0.01em',
  };

  const subtitleStyle = {
    fontSize: '13px',
    color: '#6b7280',
    marginTop: '4px',
    fontWeight: '400',
  };

  const datePickerContainerStyle = {
    backgroundColor: 'transparent',
    borderRadius: '0',
    padding: '0',
    border: 'none',
  };

  const collapsedViewStyle = {
    display: !isMobile && !isOpen ? 'flex' : 'none',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: '12px',
    cursor: 'pointer',
  };

  const collapsedIconStyle = {
    backgroundColor: 'transparent',
    color: '#9ca3af',
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    border: '1px solid #f3f4f6',
  };

  const collapsedTextStyle = {
    color: '#9ca3af',
    fontSize: '11px',
    fontWeight: '500',
    transform: 'rotate(-90deg)',
    whiteSpace: 'nowrap',
    letterSpacing: '0.05em',
  };

  const overlayStyle = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 30,
    display: isMobile && isOpen ? 'block' : 'none',
    backdropFilter: 'blur(2px)',
  };

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        onClick={onToggle}
        style={toggleButtonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#ffffff';
          e.currentTarget.style.borderColor = '#d1d5db';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
          e.currentTarget.style.borderColor = '#e5e7eb';
        }}
        aria-label="사이드바 토글"
      >
        <svg
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d={isOpen ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
          />
        </svg>
      </button>

      {/* Sidebar */}
      <div style={sidebarStyle}>
        {/* Toggle Button for Desktop */}
        {isOpen && (
          <button
            onClick={onToggle}
            style={desktopToggleStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f9fafb';
              e.currentTarget.style.color = '#374151';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#6b7280';
            }}
            aria-label="사이드바 토글"
          >
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {/* Content */}
        <div style={contentStyle}>
          {/* Header */}
          <div style={headerStyle}>
            <h2 style={titleStyle}>캘린더</h2>
            <p style={subtitleStyle}>날짜를 선택하세요</p>
          </div>

          {/* Date Picker */}
          <div style={datePickerContainerStyle}>
            <DatePicker selectedDate={selectedDate} onDateChange={onDateChange} />
          </div>
        </div>

        {/* Collapsed View - Icon Only */}
        {!isOpen && (
          <div 
            style={collapsedViewStyle} 
            onClick={onToggle}
            onMouseEnter={(e) => {
              const icon = e.currentTarget.querySelector('div');
              if (icon) {
                icon.style.backgroundColor = '#f9fafb';
                icon.style.borderColor = '#e5e7eb';
                icon.style.color = '#374151';
              }
            }}
            onMouseLeave={(e) => {
              const icon = e.currentTarget.querySelector('div');
              if (icon) {
                icon.style.backgroundColor = 'transparent';
                icon.style.borderColor = '#f3f4f6';
                icon.style.color = '#9ca3af';
              }
            }}
          >
            <div style={collapsedIconStyle}>
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
            <div style={collapsedTextStyle}>캘린더</div>
          </div>
        )}
      </div>

      {/* Overlay for mobile */}
      {isOpen && <div style={overlayStyle} onClick={onToggle} />}
    </>
  );
};

export default Sidebar;
