import React, { useState, useEffect } from "react";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  Resize,
  DragAndDrop,
} from "@syncfusion/ej2-react-schedule";

import { scheduleData } from "../data/scheduleData";
import { Header, Sidebar } from "../components";

// Calendar
const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 11, 16));
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Syncfusion 버튼 텍스트를 한국어로 변경
  useEffect(() => {
    const translateButtons = () => {
      const translations = {
        'TODAY': '오늘',
        'DAY': '일',
        'WEEK': '주',
        'WORK WEEK': '주간',
        'MONTH': '월',
        'AGENDA': '목록'
      };

      // 모든 버튼 요소 찾기
      const toolbarItems = document.querySelectorAll('.e-schedule .e-toolbar-item');
      
      toolbarItems.forEach(item => {
        // 버튼 내부의 모든 텍스트 노드 찾기
        const walker = document.createTreeWalker(
          item,
          NodeFilter.SHOW_TEXT,
          null
        );

        let node;
        while (node = walker.nextNode()) {
          const text = node.textContent.trim();
          const upperText = text.toUpperCase();
          if (translations[upperText] && text.length < 20) {
            node.textContent = translations[upperText];
          }
        }

        // 버튼 요소 자체의 textContent도 변경
        const buttons = item.querySelectorAll('.e-btn, button, .e-btn-text');
        buttons.forEach(btn => {
          const text = btn.textContent.trim();
          const upperText = text.toUpperCase();
          if (translations[upperText] && text.length < 20) {
            // 이미 번역되지 않은 경우만 변경
            if (!btn.hasAttribute('data-translated')) {
              btn.textContent = translations[upperText];
              btn.setAttribute('data-translated', 'true');
            }
          }
        });
      });
    };

    // 여러 시점에서 실행
    const timers = [
      setTimeout(translateButtons, 100),
      setTimeout(translateButtons, 300),
      setTimeout(translateButtons, 600),
      setTimeout(translateButtons, 1000)
    ];

    // MutationObserver로 동적으로 추가되는 버튼도 감지
    const observer = new MutationObserver(() => {
      setTimeout(translateButtons, 50);
    });

    const scheduleElement = document.querySelector('.e-schedule');
    if (scheduleElement) {
      observer.observe(scheduleElement, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }

    // 주기적으로 확인
    const interval = setInterval(translateButtons, 300);

    return () => {
      timers.forEach(timer => clearTimeout(timer));
      observer.disconnect();
      clearInterval(interval);
    };
  }, [selectedDate]);

  const handleDateChange = (args) => {
    setSelectedDate(args.value);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
              <ScheduleComponent
                height={isMobile ? 'calc(100vh - 180px)' : 'calc(100vh - 120px)'}
                width="100%"
                eventSettings={{ dataSource: scheduleData }}
                selectedDate={selectedDate}
                cssClass="custom-schedule"
              >
                {/* Inject required services */}
                <Inject
                  services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]}
                />
              </ScheduleComponent>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
