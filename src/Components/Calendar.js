import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import huLocale from '@fullcalendar/core/locales/hu';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';



const events = [
  { title: 'Meeting', start: new Date() }
]



//const [currentEvents, setCurrentEvents] = useState([])

function Calendar() {

  return (
    <div className='demo-app-main'>
      <h1>Időpontfoglalás</h1> 
      <Sidebar
          currentEvents={this.state.currentEvents}
        />
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay'
        }}
        initialView='dayGridWeek'
        weekends={false}
        events={events} 
        Draggable={true}
        selectable={true}
        contentHeight={"auto"}
        locale={huLocale}
        handleWindowResize={true}
        windowResizeDelay={100}
        eventContent={renderEventContent}
      />
    </div>
  )
}

// a custom render function
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}
function Sidebar({ weekendsVisible, handleWeekendsToggle, currentEvents }) {
  return (
    <div className='demo-app-sidebar'>
      <div className='demo-app-sidebar-section'>
        <h2>Instructions</h2>
        <ul>
          <li>Select dates and you will be prompted to create a new event</li>
          <li>Drag, drop, and resize events</li>
          <li>Click an event to delete it</li>
        </ul>
      </div>
      <div className='demo-app-sidebar-section'>
        <label>
          <input
            type='checkbox'
            checked={weekendsVisible}
            onChange={handleWeekendsToggle}
          ></input>
          toggle weekends
        </label>
      </div>
      <div className='demo-app-sidebar-section'>
        <h2>All Events ({this.state.currentEvents.length})</h2>
        <ul>
          {this.state.currentEvents.map((event) => (
            <SidebarEvent key={event.id} event={event} />
          ))}
        </ul>
      </div>
    </div>
  )
} 

function SidebarEvent({ event }) {
  return (
    <li key={event.id}>
      <i>{event.title}</i>
    </li>
  )
}
export default Calendar;