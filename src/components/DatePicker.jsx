import React, { useEffect } from "react";
import { CalendarComponent } from "@syncfusion/ej2-react-calendars";

// Date Picker Component
const DatePicker = ({ selectedDate, onDateChange }) => {
  // Syncfusion의 빨간색 인라인 스타일 완전 제거 및 이전 선택 클리어
  useEffect(() => {
    // selectedDate가 변경될 때 이전 선택을 즉시 클리어
    const clearPreviousSelections = () => {
      const calendarElement = document.querySelector('.calendar-wrapper .e-calendar');
      if (!calendarElement) return;

      // 모든 셀에서 e-selected 클래스가 없는 경우 인디고 색상 제거
      const allCells = calendarElement.querySelectorAll('.e-content td, .e-content .e-cell, .e-content .e-date-cell');
      allCells.forEach(cell => {
        if (cell instanceof HTMLElement && !cell.classList.contains('e-selected')) {
          const bgColor = cell.style.backgroundColor || window.getComputedStyle(cell).backgroundColor;
          if (bgColor && (
            bgColor.includes('#6366f1') ||
            bgColor.includes('rgb(99, 102, 241)') ||
            bgColor.includes('99, 102, 241')
          )) {
            cell.style.removeProperty('background-color');
            cell.style.removeProperty('background');
            cell.style.removeProperty('color');
          }
        }
      });
    };

    const removeRedStyles = () => {
      const calendarElement = document.querySelector('.calendar-wrapper .e-calendar');
      if (!calendarElement) return;

      // 모든 셀 찾기
      const allCells = calendarElement.querySelectorAll('.e-content td, .e-content .e-cell, .e-content .e-date-cell');
      
      // 먼저 모든 셀에서 인디고 색상 제거 (e-selected 클래스가 없는 경우)
      allCells.forEach(cell => {
        if (cell instanceof HTMLElement) {
          // e-selected 클래스가 없으면 인디고 색상 제거
          if (!cell.classList.contains('e-selected')) {
            const computedStyle = window.getComputedStyle(cell);
            const bgColor = cell.style.backgroundColor || computedStyle.backgroundColor;
            
            // 인디고 색상이 있으면 제거
            if (bgColor && (
              bgColor.includes('#6366f1') ||
              bgColor.includes('rgb(99, 102, 241)') ||
              bgColor.includes('99, 102, 241')
            )) {
              cell.style.removeProperty('background-color');
              cell.style.removeProperty('background');
              cell.style.removeProperty('color');
            }
          }
        }
      });

      // 이제 선택된 날짜와 오늘 날짜에만 인디고 색상 적용
      allCells.forEach(cell => {
        if (cell instanceof HTMLElement) {
          const computedStyle = window.getComputedStyle(cell);
          const bgColor = cell.style.backgroundColor || computedStyle.backgroundColor;
          
          // 선택된 날짜인 경우 인디고 색상 적용
          if (cell.classList.contains('e-selected')) {
            cell.style.setProperty('background-color', '#6366f1', 'important');
            cell.style.setProperty('background', '#6366f1', 'important');
            cell.style.setProperty('border', 'none', 'important');
            cell.style.setProperty('border-color', 'transparent', 'important');
            cell.style.setProperty('outline', 'none', 'important');
            cell.style.setProperty('box-shadow', 'none', 'important');
            cell.style.setProperty('pointer-events', 'auto', 'important');
            cell.style.setProperty('cursor', 'pointer', 'important');
            cell.style.setProperty('color', 'white', 'important');
            
            // 빨간색 제거
            if (bgColor && (
              bgColor.includes('227, 22') ||
              bgColor.includes('220, 53') ||
              bgColor.includes('rgb(227') ||
              bgColor.includes('rgb(220')
            )) {
              cell.style.setProperty('background-color', '#6366f1', 'important');
              cell.style.setProperty('background', '#6366f1', 'important');
            }
          } else if (cell.classList.contains('e-today') && !cell.classList.contains('e-selected')) {
            // 오늘 날짜이지만 선택되지 않은 경우 - 테두리만 표시하여 구분
            cell.style.setProperty('background-color', 'transparent', 'important');
            cell.style.setProperty('background', 'transparent', 'important');
            cell.style.setProperty('border', '2px solid #6366f1', 'important');
            cell.style.setProperty('color', '#111827', 'important');
            cell.style.setProperty('font-weight', '600', 'important');
          }

          // 빨간색 계열 색상 감지 (더 넓은 범위)
          const isRed = bgColor && (
            bgColor.includes('227, 22') ||
            bgColor.includes('220, 53') ||
            bgColor.includes('244, 67') ||
            bgColor.includes('233, 30') ||
            bgColor.includes('239, 68') ||
            bgColor.includes('248, 113') ||
            bgColor.toLowerCase().includes('red') ||
            bgColor.includes('#e31626') ||
            bgColor.includes('#dc3545') ||
            bgColor.includes('#f44336') ||
            bgColor.includes('#e91e63') ||
            bgColor.includes('#ef4444') ||
            bgColor.includes('#f87171')
          );

          if (isRed && !cell.classList.contains('e-selected') && !cell.classList.contains('e-today')) {
            // 빨간색이 발견되면 제거
            cell.style.setProperty('background-color', 'transparent', 'important');
            cell.style.setProperty('background', 'transparent', 'important');
          }

          // 빨간색 테두리 제거
          const borderColor = cell.style.borderColor || computedStyle.borderColor;
          if (borderColor && (
            borderColor.includes('227, 22') ||
            borderColor.includes('220, 53') ||
            borderColor.toLowerCase().includes('red')
          )) {
            cell.style.setProperty('border', 'none', 'important');
            cell.style.setProperty('border-color', 'transparent', 'important');
          }
        }
      });

      // 내부 요소들도 확인 (span, div 등)
      const innerElements = calendarElement.querySelectorAll('.e-selected *, .e-today *, .e-selected.e-today *');
      innerElements.forEach(el => {
        if (el instanceof HTMLElement) {
          const computedStyle = window.getComputedStyle(el);
          const bgColor = computedStyle.backgroundColor;
          if (bgColor && (
            bgColor.includes('227, 22') ||
            bgColor.includes('220, 53') ||
            bgColor.toLowerCase().includes('red')
          )) {
            el.style.setProperty('background-color', 'transparent', 'important');
            el.style.setProperty('background', 'transparent', 'important');
          }
        }
      });
    };

    // selectedDate 변경 시 즉시 이전 선택 클리어
    clearPreviousSelections();
    
    // 초기 실행 및 주기적 실행
    const timers = [100, 300, 600, 1000].map(delay => setTimeout(() => {
      clearPreviousSelections();
      removeRedStyles();
    }, delay));
    
    // MutationObserver로 동적 변경 감지 (debounce 적용)
    let debounceTimer;
    const observer = new MutationObserver((mutations) => {
      // e-selected 클래스가 제거된 경우 즉시 인디고 색상 제거
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const target = mutation.target;
          if (target instanceof HTMLElement) {
            // e-selected 클래스가 제거되었는지 확인
            const hadSelected = mutation.oldValue?.includes('e-selected');
            const hasSelected = target.classList.contains('e-selected');
            
            if (hadSelected && !hasSelected) {
              // e-selected 클래스가 제거되었으므로 인디고 색상 제거
              const bgColor = target.style.backgroundColor || window.getComputedStyle(target).backgroundColor;
              if (bgColor && (
                bgColor.includes('#6366f1') ||
                bgColor.includes('rgb(99, 102, 241)') ||
                bgColor.includes('99, 102, 241')
              )) {
                target.style.removeProperty('background-color');
                target.style.removeProperty('background');
                target.style.removeProperty('color');
              }
            }
          }
        }
      });
      
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        clearPreviousSelections();
        removeRedStyles();
      }, 200);
    });

    const calendarElement = document.querySelector('.calendar-wrapper .e-calendar');
    if (calendarElement) {
      observer.observe(calendarElement, {
        attributes: true,
        attributeFilter: ['class'], // style 변경은 관찰하지 않음 (클릭 이벤트 방해 방지)
        attributeOldValue: true, // 이전 값을 추적하기 위해 필요
        childList: true,
        subtree: true
      });
    }

    // 주기적으로 확인 (너무 자주 실행하면 클릭 이벤트 방해) - 클릭 후에는 잠시 대기
    let isClicking = false;
    const handleClick = () => {
      isClicking = true;
      setTimeout(() => { isClicking = false; }, 300);
    };
    
    if (calendarElement) {
      calendarElement.addEventListener('click', handleClick, true);
    }
    
    const interval = setInterval(() => {
      if (!isClicking) {
        removeRedStyles();
      }
    }, 1000); // 1초마다 실행

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(debounceTimer);
      observer.disconnect();
      clearInterval(interval);
      if (calendarElement) {
        calendarElement.removeEventListener('click', handleClick, true);
      }
    };
  }, [selectedDate]);

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
        <CalendarComponent
          value={selectedDate}
          change={onDateChange}
          isMultiSelection={false}
          cssClass="e-custom-calendar"
        />
      </div>
    </div>
  );
};

export default DatePicker;
