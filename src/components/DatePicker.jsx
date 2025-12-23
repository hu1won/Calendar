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
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ 
          fontSize: '14px', 
          fontWeight: '600', 
          color: '#111827', 
          marginBottom: '4px',
          letterSpacing: '-0.01em'
        }}>
          날짜 선택
        </h3>
        <p style={{ 
          fontSize: '11px', 
          color: '#9ca3af', 
          margin: 0,
          fontWeight: '400'
        }}>
          원하는 날짜를 클릭하세요
        </p>
      </div>
      <div className="calendar-wrapper">
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
