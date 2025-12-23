import React from "react";
import Calendar from 'react-calendar';

// Date Picker Component
const DatePicker = ({ selectedDate, onDateChange }) => {
  const handleDateChange = (date) => {
    if (onDateChange) {
      // Sidebar에서 기대하는 형식으로 전달
      onDateChange({ value: date });
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ 
          fontSize: '16px', 
          fontWeight: '700', 
          color: '#111827', 
          marginBottom: '6px',
          letterSpacing: '-0.02em',
          lineHeight: '1.4'
        }}>
          날짜 선택
        </h3>
        <p style={{ 
          fontSize: '12px', 
          color: '#6b7280', 
          margin: 0,
          fontWeight: '500',
          letterSpacing: '0.01em'
        }}>
          원하는 날짜를 클릭하세요
        </p>
      </div>
      <div className="calendar-wrapper" style={{ width: '100%', overflow: 'visible', boxSizing: 'border-box' }}>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          locale="ko-KR"
          formatDay={(locale, date) => date.getDate().toString()}
          formatMonthYear={(locale, date) => `${date.getFullYear()}년 ${date.getMonth() + 1}월`}
          formatShortWeekday={(locale, date) => {
            const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
            return weekdays[date.getDay()];
          }}
        />
      </div>
    </div>
  );
};

export default DatePicker;
