import React, { useState, useEffect } from "react";
import {
  Alert,
  UncontrolledAlert,
  Card,
  CardBody,
  CardTitle,
} from "reactstrap";
// import record from "./test.json";
import VariantsExample from "./Dropdown";
import { Dropdown, DropdownToggle, DropdownMenu } from "react-bootstrap";
import { startOfMonth, addWeeks, isSunday, format, isAfter, isToday, startOfWeek, subWeeks, eachDayOfInterval } from 'date-fns';


const Companyone = () => {
  // For Dismiss Button with Alert
  const [visible, setVisible] = useState(true);
  const [record, setRecord] = useState([]);


  const [ddata, setddata] = useState([]);


  const [date, setdate] = useState("");
  const [aimodel, setaimodel] = useState("");


  const [options, setOptions] = useState([]);

  function convertToDictList(inputArray) {
    let resultArray = [];

    for (let i = 0; i < inputArray.length; i++) {
        resultArray.push({
            text: inputArray[i],
            value: inputArray[i]
        });
    }

    return resultArray;
}

  const handleChangedate = (e) => {
    setdate(e.value)
    };

    const handleChangeai = (e) => {
      setaimodel(e.value)
      };

      function getLatestFiveSundays() {
          // Get the current date
          const currentDate = new Date();
        
          // Find the most recent Sunday
          const lastSunday = startOfWeek(currentDate);
        
          // Generate an array of dates for the latest five Sundays
          const latestFiveSundays = eachDayOfInterval({
            start: subWeeks(lastSunday, 4),  // Subtract 4 weeks to get the latest five Sundays
            end: lastSunday,
          });
        
          // Convert dates to string format
          const dateStrings = latestFiveSundays.map(date => format(date, 'yyyy-MM-dd'));
        
          console.log(dateStrings);

          const dateStrings2 = dateStrings.map((text, index) => ({
            text,
            value: text,
          }));

          return dateStrings2;
        }
const [days,setdays] = useState ([])



  // const onMount = async () => {
  //   try {
  //     const response = await fetch('http://localhost:8000/getdata');
  //     if (response.ok) {
  //       const data = await response.json();
  //       setRecord(data); // Update the state with the fetched data
  //     } else {
  //       console.error('Failed to fetch data from the API');
  //     }
  //   } catch (error) {
  //     console.error('An error occurred while fetching data:', error);
  //   }
  // };
  const onMount = async () => {
    try {
      // const date = '08-11-2023'; // Replace with the desired date value
      // const model = 'OpenAI'; // Replace with the desired model value
  
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date,
          aimodel,
          "model":aimodel
        }),
      };
  
      const response = await fetch('http://localhost:8000/getsummaries', requestOptions);
  
      if (response.ok) {
        const data = await response.json();
        setRecord(JSON.parse(data)); // Update the state with the fetched data
      } else {
        console.error('Failed to fetch data from the API');
      }
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
    }
  };
  
  const onMount2 = async () => {
    try {
      // const date = '08-11-2023'; // Replace with the desired date value
      // const model = 'OpenAI'; // Replace with the desired model value
  
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date,
          aimodel,
          "model":aimodel
        }),
      };
  
      const response = await fetch('http://localhost:8000/getdates', requestOptions);
  
      if (response.ok) {
        const data = await response.json();
        setddata(data); // Update the state with the fetched data

        setdays(convertToDictList(data["date"]))
        setOptions(convertToDictList(data["models"]))
      } else {
        console.error('Failed to fetch data from the API');
      }
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
    }
  };



  useEffect(() => {
    onMount2();
    onMount(); // Call the onMount function when the component is mounted
  }, []); // The empty dependency array ensures it runs only once on mount
  
  useEffect(() => {
    onMount();
  }, [date, aimodel]);

  const onDismiss = () => {
    setVisible(false);
  };
  
  return (
    <div>
      {/* --------------------------------------------------------------------------------*/}
      {/* Card-1*/}
      {/* --------------------------------------------------------------------------------*/}

      <CardBody className="">
          <div className="mt-3">
            <h3>
      <> Showing Data for {date} and Ai-technology from {aimodel}</>
    </h3>
          </div>
        </CardBody>
      
      {/* --------------------------------------------------------------------------------*/}
      {/* Card-2*/}
      {/* --------------------------------------------------------------------------------*/}
      <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          <i className="bi bi-bell me-2" />
          Select your conditions of the information
          <div className="sbs">
      <Dropdown onselect={handleChangedate}>
        <DropdownToggle variant="primary">Select Date</DropdownToggle>
        <DropdownMenu>
          {days.map((option) => (
            <Dropdown.Item key={option.value} onClick={() => handleChangedate(option)}>{option.text}</Dropdown.Item>
          ))}
        </DropdownMenu>
      </Dropdown>
           <h3>{date}</h3>
      <Dropdown>
        <DropdownToggle variant="primary">Select AI</DropdownToggle>
        <DropdownMenu>
          {options.map((option) => (
            <Dropdown.Item key={option.value} onClick={() => handleChangeai(option)}>{option.text}</Dropdown.Item>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>

        </CardTitle>
        <CardBody className="">
          <div>
            <h3></h3>
          </div>
        </CardBody>
      </Card>

 
      <CardTitle tag="h6" className="border-bottom p-3 mb-0">
        <i className="bi bi-bell me-2"> </i>
        {
          record.length > 0 && record.map(data => {
            if (true) {
              return (
                <div key={data}>
                  <Card>
                    {data} </Card>
                </div>
              )
      //   {
      //     record && record.map(data => {
      //       if (data.Model == "OpenAI") {
      //         return (
      //           <div key={data.Model}>
      //             <Card><strong>{data.Model}</strong> <br /> {data.Date} <br />
      //               {data.Summary_Bart} </Card>
      //           </div>
      //         )
      }
            else {
              return null;
            }



          })}
          
        </CardTitle>
        
      {/* --------------------------------------------------------------------------------*/}
      {/* Card-3*/}
      {/* --------------------------------------------------------------------------------*/}
      <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          <i className="bi bi-bell me-2" />
          summary #3
        </CardTitle>
        <CardBody className="">
          <div>
            {/* <Alert color="success">
              <h4 className="alert-heading">Well done!</h4>
              <p>
                Aww yeah, you successfully read this important alert message.
                This example text is going to run a bit longer so that you can
                see how spacing within an alert works with this kind of content.
              </p>
              <hr />
              <p className="mb-0">
                Whenever you need to, be sure to use margin utilities to keep
                things nice and tidy.
              </p>
            </Alert> */}
            <h3>add</h3>
          </div>
        </CardBody>
      </Card>
      
    </div>
  );
};

export default Companyone;
