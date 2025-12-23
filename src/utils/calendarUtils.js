// Calendar utility functions for react-big-calendar

// Syncfusion 데이터 형식을 react-big-calendar 형식으로 변환
export const convertToBigCalendarEvents = (syncfusionData) => {
  return syncfusionData.map(event => ({
    id: event.Id,
    title: event.Subject,
    start: new Date(event.StartTime),
    end: new Date(event.EndTime),
    resource: {
      location: event.Location,
      color: event.CategoryColor || '#6366f1',
    },
  }));
};

// react-big-calendar 이벤트를 Syncfusion 형식으로 변환 (필요시)
export const convertToSyncfusionFormat = (bigCalendarEvent) => {
  return {
    Id: bigCalendarEvent.id,
    Subject: bigCalendarEvent.title,
    Location: bigCalendarEvent.resource?.location || '',
    StartTime: bigCalendarEvent.start.toISOString(),
    EndTime: bigCalendarEvent.end.toISOString(),
    CategoryColor: bigCalendarEvent.resource?.color || '#6366f1',
  };
};

