import React, { useState, useEffect } from "react";
import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import Feeds from "../components/dashboard/Feeds";
import ProjectTables from "../components/dashboard/ProjectTable";
import TopCards from "../components/dashboard/TopCards";
import Blog from "../components/dashboard/Blog";
import bg1 from "../assets/images/bg/bg1.jpg";
import bg2 from "../assets/images/bg/bg2.jpg";
import bg3 from "../assets/images/bg/bg3.jpg";
import bg4 from "../assets/images/bg/bg4.jpg";
import {
  Alert,
  UncontrolledAlert,
  Card,
  CardBody,
  CardTitle,
} from "reactstrap";
import { Dropdown, DropdownToggle, DropdownMenu } from "react-bootstrap";


const BlogData = [
  {
    image: bg1,
    title: "This is simple blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg2,
    title: "Lets be simple blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg3,
    title: "Don't Lamp blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg4,
    title: "Simple is beautiful",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
];



const Starter = () => {

  const [record, setRecord] = useState([]);

  const [date, setdate] = useState("");
  const [aimodel, setaimodel] = useState("");


  const [totalwords, settotalwords] = useState(0);
  const [totaltechstracked, settotaltechstracked] = useState(0);
  const [totalsums, settotalsums] = useState(0);
  const [rsite, setrsite] = useState("");


  const handleChangedate = (e) => {
    setrsite(e.value)
  };


  const [researchvals, setresearchvals] = useState(
    [{ text: 'Pubmed', value: 'Pubmed' },
    { text: 'Scopus', value: 'Scopus' },
    { text: 'IEEE', value: 'IEEE' }
    ]);



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
        }),
      };

      const response = await fetch('http://localhost:8000/summarize', requestOptions);

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


  const researchtrigger = async () => {
    try {
      // const date = '08-11-2023'; // Replace with the desired date value
      // const model = 'OpenAI'; // Replace with the desired model value

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rsite
        }),
      };

      const response = await fetch('http://localhost:8000/searchresearch', requestOptions);

      if (response.ok) {
        const data = await response.json();
        console.log(JSON.parse(data)); // Update the state with the fetched data
      } else {
        console.error('Failed to fetch data from the API');
      }
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
    }
  };

  async function fetchDataFromBackendAPI() {
    try {
      const response = await fetch('http://localhost:8000/getindistats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stat: 'sumsbytech',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data from the backend API');
      }

      const data = await response.json();
      console.log(data)
      console.log("Printing Data")
      return data;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchDataFromBackendAPI();
        if (data) {

          settotalwords(data["totalwords"]);
          settotaltechstracked(data["totaltechstracked"]);
          settotalsums(data["totalsums"]);
          // setChartData({...rawData, ...data});
        } else {
          console.log('Failed to fetch data from the API.');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }

    fetchData();
  }, []);


  const sayHello = () => {
    alert('Hello!');

    // onMount();

  }

  const runresearch = () => {
    alert('Hello! 2');

    researchtrigger();

  }

  return (
    <div>
      {/***Top Cards***/}
      <Row>
        <Col sm="4" lg="4">
          <TopCards
            bg="bg-light-success text-success"
            title="Total Words"
            subtitle="Total Words"
            earning={totalwords}
            icon="bi bi-wallet"
          />
        </Col>
        <Col sm="4" lg="4">
          <TopCards
            bg="bg-light-danger text-danger"
            title="Total Techs Tracked"
            subtitle="Total Techs Tracked"
            earning={totaltechstracked}
            icon="bi bi-coin"
          />
        </Col>
        <Col sm="4" lg="4">
          <TopCards
            bg="bg-light-warning text-warning"
            title="Total Summaries Collected"
            subtitle="Total Summaries Collected"
            earning={totalsums}
            icon="bi bi-basket3"
          />
        </Col>

      </Row>

      <Row>
        <Col xxl="12">
          <SalesChart />
        </Col>
      </Row>
      {/***Table ***/}
      <Row>
        <Col>


        </Col>
      </Row>

      <Row>
        <Col sm="6" lg="6" onClick={runresearch}>
          <TopCards
            bg="bg-light-success text-success"
            subtitle="Click here !  Run the Web crawler for research engines !"
          >
            <button onClick={sayHello}>
              Run the Web crawler for web engines !
            </button>
          </TopCards>
        </Col>
        <Col sm="6" lg="6" >

          <Card>
            {/* <CardTitle tag="h6" className="border-bottom p-3 mb-0"> */}
             
                <Dropdown onselect={handleChangedate}>
                  <DropdownToggle variant="primary">Select Research Site</DropdownToggle>
                  <DropdownMenu>
                    {researchvals.map((option) => (
                      <Dropdown.Item key={option.value} onClick={() => handleChangedate(option)}>{option.text}</Dropdown.Item>
                    ))}
                          
                  </DropdownMenu><h3>{rsite}</h3>
                </Dropdown>

                <button onClick={runresearch} onClick={runresearch}>
              Click to trigger search !
            </button>

          

            {/* </CardTitle> */}

          </Card>
          {/* <TopCards
            bg="bg-light-danger text-danger"
            subtitle="Click here ! Run the Web crawler for research engines !"
          >
            <button onClick={runresearch}>
              Run the Web crawler for research engines !
            </button>
          </TopCards> */}
        </Col>


      </Row>



    </div>
  );
};

export default Starter;
