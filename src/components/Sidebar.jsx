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
    background: isOpen ? 'linear-gradient(to bottom, #ffffff 0%, #fafafa 100%)' : (isMobile ? 'transparent' : 'linear-gradient(to bottom, #ffffff 0%, #fafafa 100%)'),
    borderRight: isOpen ? '1px solid #e5e7eb' : 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 40,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    width: isOpen ? '320px' : (isMobile ? '0' : '72px'),
    transform: isOpen ? 'translateX(0)' : (isMobile ? 'translateX(-100%)' : 'translateX(0)'),
    boxShadow: isOpen && !isMobile ? '2px 0 8px rgba(0, 0, 0, 0.04)' : 'none',
  };

  const toggleButtonStyle = {
    position: 'fixed',
    left: '24px',
    top: '24px',
    zIndex: 50,
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%)',
    color: '#374151',
    padding: '12px',
    borderRadius: '12px',
    border: '1px solid rgba(229, 231, 235, 0.8)',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: isMobile ? 'flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(12px) saturate(180%)',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)',
  };

  const desktopToggleStyle = {
    position: 'absolute',
    top: '24px',
    right: '24px',
    zIndex: 50,
    background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
    color: '#6b7280',
    padding: '10px',
    borderRadius: '10px',
    border: '1px solid #e5e7eb',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: !isMobile && isOpen ? 'flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
  };

  const contentStyle = {
    padding: '24px 20px',
    paddingTop: isMobile ? '88px' : '24px',
    overflowY: 'hidden',
    overflow: 'visible',
    flex: 1,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: isOpen ? 'block' : (isMobile ? 'block' : 'none'),
    maxHeight: '100vh',
    width: '100%',
    boxSizing: 'border-box',
  };

  const headerStyle = {
    marginBottom: '32px',
    paddingBottom: '24px',
    borderBottom: '2px solid #f3f4f6',
  };

  const titleStyle = {
    fontSize: '22px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '8px',
    letterSpacing: '-0.02em',
    lineHeight: '1.3',
  };

  const subtitleStyle = {
    fontSize: '13px',
    color: '#6b7280',
    marginTop: '4px',
    fontWeight: '500',
    letterSpacing: '0.01em',
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
    background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
    color: '#6366f1',
    padding: '12px',
    borderRadius: '12px',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    border: '1px solid #e5e7eb',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
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
          e.currentTarget.style.background = 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)';
          e.currentTarget.style.borderColor = '#6366f1';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.15), 0 2px 6px rgba(0, 0, 0, 0.08)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%)';
          e.currentTarget.style.borderColor = 'rgba(229, 231, 235, 0.8)';
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)';
          e.currentTarget.style.transform = 'translateY(0)';
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
              e.currentTarget.style.background = 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.borderColor = '#6366f1';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.3)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)';
              e.currentTarget.style.color = '#6b7280';
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
              e.currentTarget.style.transform = 'translateY(0)';
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
