import React, { useState, useEffect, useMemo } from "react";
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import 'moment/locale/ko';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { scheduleData } from "../data/scheduleData";
import { convertToBigCalendarEvents } from "../utils/calendarUtils";
import { Header, Sidebar } from "../components";

// moment 한국어 로케일 설정
moment.locale('ko');
const localizer = momentLocalizer(moment);

// 드래그앤드롭 기능 추가
const DnDCalendar = withDragAndDrop(Calendar);

// Calendar
const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 11, 16));
  const [currentView, setCurrentView] = useState(Views.MONTH);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [events, setEvents] = useState([]);

  // 데이터 변환
  useEffect(() => {
    const convertedEvents = convertToBigCalendarEvents(scheduleData);
    setEvents(convertedEvents);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDateChange = (args) => {
    // react-calendar는 직접 Date 객체를 전달하거나 { value: Date } 형식으로 전달
    const date = args?.value || args;
    setSelectedDate(date);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // 이벤트 이동 (드래그앤드롭)
  const moveEvent = ({ event, start, end }) => {
    setEvents((prevEvents) => {
      const existing = prevEvents.find((e) => e.id === event.id) ?? {};
      const filtered = prevEvents.filter((e) => e.id !== event.id);
      return [...filtered, { ...existing, start, end }];
    });
  };

  // 이벤트 리사이즈
  const resizeEvent = ({ event, start, end }) => {
    setEvents((prevEvents) => {
      const existing = prevEvents.find((e) => e.id === event.id) ?? {};
      const filtered = prevEvents.filter((e) => e.id !== event.id);
      return [...filtered, { ...existing, start, end }];
    });
  };

  // 이벤트 스타일 커스터마이징
  const eventStyleGetter = (event) => {
    const color = event.resource?.color || '#6366f1';
    return {
      style: {
        backgroundColor: color,
        borderRadius: '6px',
        opacity: 0.9,
        color: 'white',
        border: 'none',
        padding: '4px 8px',
        fontSize: '13px',
      },
    };
  };

  // 날짜 포맷 커스터마이징
  const formats = {
    dayFormat: 'D일',
    weekdayFormat: 'ddd',
    monthHeaderFormat: 'YYYY년 M월',
    dayHeaderFormat: 'M월 D일 dddd',
    dayRangeHeaderFormat: ({ start, end }) =>
      `${moment(start).format('M월 D일')} - ${moment(end).format('M월 D일')}`,
  };

  // 뷰 전환 핸들러
  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  // 날짜 네비게이션 핸들러
  const handleNavigate = (date) => {
    setSelectedDate(date);
  };

  return (
    <div style={{ width: '100%', height: '100vh', backgroundColor: '#ffffff', display: 'flex', position: 'relative', overflow: 'hidden', margin: 0, padding: 0 }}>
      {/* Sidebar */}
      <Sidebar
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
      />

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          height: '100vh',
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          backgroundColor: '#ffffff',
        }}
      >
        <div style={{ 
          padding: 0,
          paddingTop: isMobile ? '80px' : '0',
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Calendar */}
          <div style={{ 
            backgroundColor: '#ffffff', 
            borderRadius: 0,
            boxShadow: 'none',
            padding: 0,
            border: 'none',
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}>
            {/* Header */}
            <div style={{ marginBottom: '0', flexShrink: 0, paddingLeft: '32px', paddingRight: '32px', paddingTop: '28px', paddingBottom: '20px' }}>
              <Header category="App" title="Calendar" />
            </div>
            <div style={{ flex: 1, overflow: 'hidden', minHeight: 0, position: 'relative', width: '100%', paddingLeft: 0, paddingRight: 0 }}>
              <DnDCalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: isMobile ? 'calc(100vh - 180px)' : 'calc(100vh - 120px)' }}
                view={currentView}
                views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
                date={selectedDate}
                onNavigate={handleNavigate}
                onView={handleViewChange}
                onEventDrop={moveEvent}
                onEventResize={resizeEvent}
                eventPropGetter={eventStyleGetter}
                formats={formats}
                messages={{
                  next: '다음',
                  previous: '이전',
                  today: '오늘',
                  month: '월',
                  week: '주',
                  day: '일',
                  agenda: '목록',
                  date: '날짜',
                  time: '시간',
                  event: '이벤트',
                  noEventsInRange: '이 기간에 일정이 없습니다.',
                }}
                popup
                popupOffset={{ x: 30, y: -300 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
