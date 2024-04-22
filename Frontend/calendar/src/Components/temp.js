import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import huLocale from '@fullcalendar/core/locales/hu';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import { createEventId } from './event-utils';
import 'rsuite/dist/rsuite.min.css';
import '../Custom.css';
import { Button, CustomProvider, Modal, Form, InputNumber, Nav, Navbar, SelectPicker, DatePicker  } from 'rsuite';

//DatePicker -->Nem heti ismétlődő események -
//-> renderEvents
//https://rsuitejs.com/guide/introduction/#license

//Tréningek -->Background és extrazonosító ->Név elég?
//Konzultáció: Fixen telefon
//Online Coaching -->Meet, emailen linket kap (manuális)

//Modal megjelenítés (Coach ülés --> Hossz hiányzik), defaultValue...

export default function Calendar() {
  const nullevent = [
    {
      id: Number,
      backgroundColor: "green", //#2EFF2E, lightgreen
      textColor: "white", //Black
      title: "",
      end: Date,
      start: new Date(),
      occasions: 0,
      lengths: 0,
      extendedProps: {
        platform: "",
        duration: 0,
        location: "",
        traintitle: "Tréning címe/témája"
      }
    }
  ];  
  const [open, setOpen] = useState(false);
  const [editable, setEditable] = useState(true);
  const [showEventData, setshowEventData] = useState({});
  const [showExtendedData, setshowExtendedData] = useState({});
  const [buttonTexts, setButtonTexts] = useState(["Létrehozás", "Esemény Elvetése"]);
  const timelength = ["1", "1.5", "2", "4"].map(item => ({label: item, value: item}));
  const hhmm = ["8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"].map(item => ({label: item, value: item}));
  const [numDatePickers, setnumDatePickers] = useState(0);
  const handleOpen = openType => {
    setEditable(openType);
    setOpen(true);
  };
  const handleClose = () =>{
    setOpen(false);
  }



  useEffect(() => {
    const containerEl = document.querySelector("#events");
    let draggable = new Draggable(containerEl, {
      itemSelector: ".event",
      eventData: (eventEl) => {
        const duration = parseFloat(eventEl.getAttribute('data-duration'));
        const end = calculateEndTime(duration);
        const platform = eventEl.getAttribute('platform');
        var corrected = "";
        if (duration === 0.5){
          corrected = "00:30";
        }
        else if (duration === 1.5){
          corrected = "01:30";
        }
        else{
          corrected = duration + ":00";
        }
        return {
          id: createEventId(),
          backgroundColor: "green",//#2EFF2E, lightgreen
          textColor: "white",//Black
          title: eventEl.innerText,
          platform : platform,
          duration: corrected,
          start: new Date(),
          location: "",
          occasions: 0,
          traintitle: "Tréning címe/témája",
          lengths: duration,
          end: end 
        };
      }
    });
    return () => draggable.destroy();
  }, []);

  //const [currentEvents, setCurrentEvents] = useState([])


  function handleEventClick(clickInfo) {
      setshowExtendedData(clickInfo.event.extendedProps);
      setshowEventData(clickInfo.event);
      setButtonTexts(["Szerkesztés", "Kilépés"]);//Jogosultságtól függően más
      handleOpen(true);
  }

  function eventReceive(info){
    //window.alert("Időzítésileg itt lenne az extra datok megadása...");
    const helyszín = "Pesti ház";
    info.event.setExtendedProp("location", helyszín);
    setshowExtendedData(info.event.extendedProps);
    setshowEventData(info.event);
    //console.log(showEventData.extendedProps.lengths);
    setButtonTexts(["Létrehozás", "Esemény Elvetése"]);
    handleOpen(false);
    return {};
  };

  const createDates = (value) => {
    setnumDatePickers(value);
  };

  const disabledDate = (date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return date < yesterday;
  };

  function eventCheck(){
    if (numDatePickers >= 1){
      window.alert("Több event" + numDatePickers);
      //RenderEvents lefutása
    }else{
      window.alert("Egy event" + numDatePickers);
    }
  }
  function refreshOff(event) {
    // Disable browser refresh by preventing default dragover behavior
    document.addEventListener('dragover', preventDefault);
  }
  
  function preventDefault(event) {
    event.preventDefault();
  }
  
  function handleEventDrop(eventDropInfo) {
    const slotMaxTime = '20:00:00';
    const eventEndTime = eventDropInfo.event.end.toLocaleTimeString('en-US', { hour12: false });
    if (eventEndTime > slotMaxTime) {
      eventDropInfo.revert();
    }
}


  return (
    <CustomProvider>
      <Navbar className='centered-nav navbar-child' appearance='default' id="events">
          <Nav>
            <Nav.Item className="event" data-duration="1" platform="Online"><Button color='green' appearance='primary' className="event" data-duration="1" platform="Online">Konzultáció</Button></Nav.Item>
            <Nav.Item className="event" data-duration="1.5" platform="Online"><Button color='green' appearance='primary' className="event" data-duration="1.5" platform="Online">Coach ülés</Button></Nav.Item>
            <Nav.Item className="event" data-duration="4" platform="Online"><Button color='green' appearance='primary' className="event" data-duration="4" platform="Online">Tréning</Button></Nav.Item>
          </Nav>
      </Navbar>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        allDaySlot={false}
        initialView='timeGridWeek'
        slotMinTime='08:00:00'
        slotMaxTime='20:00:00'
        dayMaxEvents={true}
        locale={huLocale}
        editable={true}
        selectable={true} 
        droppable={true}
        eventOverlap={false}
        contentHeight='auto'
        longPressDelay={1000}
        eventDragStart={refreshOff()}
        eventDrop={handleEventDrop}
        eventDragMinDistance={1}
        eventDataTransform={eventData => ({ // Transform event data
          id: eventData.id,
          title: eventData.title,
          start: eventData.start, 
          end: eventData.end,
          location: eventData.extendedProps.location,
          platform: eventData.extendedProps.platform,
          occasions: eventData.extendedProps.occasions,
          traintitle: eventData.extendedProps.traintitle,
          lengths: eventData.extendedProps.lengths
        })}
        eventReceive={eventReceive}
        //initialEvents={nullevent} // alternatively, use the `events` setting to fetch from a feed
        //eventContent={renderEventContent} // custom render function
        eventClick={handleEventClick}
        //eventsSet={handleEvents} // called after events are initialized/added/changed/removed
        /* you can update a remote database when these fire:
        eventAdd={function(){}}
        eventChange={function(){}}
        eventRemove={function(){}}
        Hossz -->eventData.end + duration * 60 * 60 * 1000
        */
      />



      <Modal open={open} size={"sm"} backdrop={editable} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>{showEventData.title}</Modal.Title>
        </Modal.Header>
          {showEventData && showExtendedData && ( //conditional rendering
          <Modal.Body>
            <Form fluid hidden={showEventData.title !== "Coach ülés"} plaintext={editable} formValue={showExtendedData}>
              <Form.Group>
                <Form.ControlLabel>Platform</Form.ControlLabel>
                <Form.Control name="platform" />
              </Form.Group>
            </Form>
            <Form fluid plaintext={editable} formValue={showExtendedData}>
              <Form.Group style={{marginBottom : 0}} hidden={showEventData.title === "Konzultáció"}>
                <Form.ControlLabel>Hossz</Form.ControlLabel>
                <SelectPicker plaintext={editable} data={timelength} placeholder={String(showExtendedData.lengths)} defaultValue={String(showExtendedData.lengths)} searchable={false} block />
                <Form.ControlLabel>Helyszín</Form.ControlLabel>
                <Form.Control name="location" />
              </Form.Group>
              <Form.Group hidden={showEventData.title !== "Tréning"}>
                <Form.ControlLabel>Cím/Téma</Form.ControlLabel>
                <Form.Control name="traintitle"/>
                <Form.ControlLabel>További Alkalmak száma</Form.ControlLabel>
                <InputNumber min={0} max={7} placeholder={showExtendedData.occasions} defaultValue={showExtendedData.occasions} plaintext={editable} onChange={createDates} name="occasions"/>
                {Array.from({ length: numDatePickers }).map((_, index) => (
                  <>
                    <Form.ControlLabel>{`${index + 2}. Alkalom`}</Form.ControlLabel>
                    <DatePicker shouldDisableDate={disabledDate} oneTap plaintext={editable} key={index} block></DatePicker>
                    <SelectPicker plaintext={editable} data={hhmm} searchable={false} block/>
                  </>
                ))}
              </Form.Group>
            </Form>
            <br></br>
            <p>
              {showEventData.start && showEventData.start.toLocaleString('hu-HU', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: 'numeric', 
                minute: 'numeric' 
              })}
              {showEventData.end && ' - ' + showEventData.end.toLocaleString('hu-HU', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: 'numeric', 
                minute: 'numeric' 
              })}
            </p>
          </Modal.Body>
          )}
        <Modal.Footer>
          <Button onClick={() => {handleClose();}} appearance="primary">{buttonTexts[0]}</Button>
          <Button onClick={handleClose} appearance="subtle">{buttonTexts[1]}</Button>
        </Modal.Footer>
      </Modal>
      
    </CustomProvider>

  )
}

function calculateEndTime(duration) {
  const now = new Date();
  const endTime = new Date(now.getTime() + duration * 60 * 60 * 1000); // Calculate end time based on duration
  return endTime;
}



function eventChange(changeInfo){
  //console.log(changeInfo.event.extendedProps.platform);
  //window.alert("Időzítésileg itt lenne az extra datok megadása...");
  //const helyszín = "Pesti ház";
  //info.location = helyszín;
  return {
  };
};
/*
function Sidebar() {
  return (
    <Grid xs={19} sm={12} md={24} fluid>
      <Col xs={19} sm={12} md={24}>  
        <h2>Kiadható Események</h2>
        <Container id="events" style={{marginTop: 50}}>
            <Button color='green' appearance='primary' className="event" data-duration="0.5" platform="Online">Konzultáció</Button>
            <br></br>
            <Button color='green' appearance='primary' className="event" data-duration="1.5" platform="Online">Coach ülés</Button>
            <br></br>
            <Button color='green' appearance='primary' className="event" data-duration="4" platform="Online">Tréning</Button>
        </Container>

      </Col>
    </Grid>
  )
}
*/
