import React, { useEffect } from 'react'
import { Calendar as BigCalendar, momentLocalizer, Event, View, DateLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/tr";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("tr-TR");
const localizer: DateLocalizer = momentLocalizer(moment);

interface MyEvent extends Event {
  id: number;
  resourceId?: number;
}
const localMessages = {
    allDay: 'Tüm gün',
    previous: 'Önceki',
    next: 'Sonraki',
    today: 'Bugün',
    month: 'Ay',
    week: 'Hafta',
    day: 'Gün',
    agenda: 'Gündem', // eğer agenda view kullanıyorsanız
    date: 'Tarih',
    time: 'Saat',
    event: 'Etkinlik', 
    // ... diğer çevirileri buraya ekleyebilirsiniz
  };
  
interface Resource {
  resourceId: number;
  resourceTitle: string;
}
  
  const events = [
    {
        id: 0,
        title: "Toplantı",
        start: new Date(2023, 9, 12, 20, 0, 0),
        end: new Date(2023, 9, 12, 21, 0, 0), 
        resourceId: 1
      }
      
   
  ];
  

  
  const styles = {
    container: {
      width: "80wh",
      height: "60vh",
      margin: "2em"
    }
  };
  

  const CustomCalendar: React.FC = () => {
    return (
        <div style={styles.container}>
         <BigCalendar
          selectable
          localizer={localizer}
          events={events}
          defaultView="day" 
          views={["day", "month", "week"]}
          step={60} 
          defaultDate={new Date()} 
          resourceIdAccessor="resourceId"
          resourceTitleAccessor="resourceTitle"
          messages={localMessages}  // Burada çevirileri ekliyoruz
        />
      </div>
    );
  }
  
  export default CustomCalendar;
  