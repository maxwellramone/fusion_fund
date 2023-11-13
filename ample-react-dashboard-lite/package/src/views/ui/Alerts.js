import React, { useState, useEffect } from "react";
import {
  Alert,
  UncontrolledAlert,
  Card,
  CardBody,
  CardTitle,
} from "reactstrap";
// import record from "./test.json";

const Companyone = () => {
  // For Dismiss Button with Alert
  const [visible, setVisible] = useState(true);
  const [record, setRecord] = useState([]);

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
      const date = '08-11-2023'; // Replace with the desired date value
      const model = 'OpenAI'; // Replace with the desired model value
  
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date,
          model,
        }),
      };
  
      const response = await fetch('http://localhost:8000/getdata', requestOptions);
  
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
  

  useEffect(() => {
    onMount(); // Call the onMount function when the component is mounted
  }, []); // The empty dependency array ensures it runs only once on mount
  const onDismiss = () => {
    setVisible(false);
  };
  
  return (
    <div>
      {/* --------------------------------------------------------------------------------*/}
      {/* Card-1*/}
      {/* --------------------------------------------------------------------------------*/}

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
        <CardBody className="">
          <div className="mt-3">
            <h3>Replace this with company summary from backend</h3>
          </div>
        </CardBody>
      
      {/* --------------------------------------------------------------------------------*/}
      {/* Card-2*/}
      {/* --------------------------------------------------------------------------------*/}
      <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          <i className="bi bi-bell me-2" />
          company summary #2
        </CardTitle>
        <CardBody className="">
          <div>
            <h3></h3>
          </div>
        </CardBody>
      </Card>
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
      {/* --------------------------------------------------------------------------------
      {/* Card-4*/}
      {/* --------------------------------------------------------------------------------*/}
      {/* <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          <i className="bi bi-bell me-2" />
          Alert with Dissmissing
        </CardTitle>
        <CardBody className="">
          <div>
            <Alert color="info" isOpen={visible} toggle={onDismiss.bind(null)}>
              I am an alert and I can be dismissed!
            </Alert>
          </div>
        </CardBody>
      </Card> */}
      {/* --------------------------------------------------------------------------------*/}
      {/* Card-5*/}
      {/* --------------------------------------------------------------------------------*/}
      {/* <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          <i className="bi bi-bell me-2" />
          Alert with Uncontrolled [disable] Alerts
        </CardTitle>
        <CardBody className="">
          <div>
            <UncontrolledAlert color="info">
              I am an alert and I can be dismissed!
            </UncontrolledAlert>
          </div>
        </CardBody>
      </Card> */}
      {/* --------------------------------------------------------------------------------*/}
      {/* Card-6*/}
      {/* --------------------------------------------------------------------------------*/}
      {/* <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          <i className="bi bi-bell me-2" />
          Alerts without fade
        </CardTitle>
        <CardBody className="">
          <div>
            <Alert
              color="primary"
              isOpen={visible}
              toggle={onDismiss.bind(null)}
              fade={false}
            >
              I am a primary alert and I can be dismissed without animating!
            </Alert>
            <UncontrolledAlert color="warning" fade={false}>
              I am an alert and I can be dismissed without animating!
            </UncontrolledAlert>
          </div>
        </CardBody>
      </Card>  */}

      {/* --------------------------------------------------------------------------------*/}
      {/* End Inner Div*/}
      {/* --------------------------------------------------------------------------------*/}
    </div>
  );
};

export default Companyone;
