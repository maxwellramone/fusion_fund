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
  
    onMount();

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
        {/* <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-info text-into"
            title="Sales"
            subtitle="Weekly Sales"
            earning="210"
            icon="bi bi-bag"
          />
        </Col> */}
      </Row>
      {/***Sales & Feed***/}
      <Row>
        <Col xxl="12">
          <SalesChart />
        </Col>
      </Row>
      {/***Table ***/}
      <Row>
      <Col>
      <button onClick={sayHello}>
      Click me!
    </button>
    </Col>
    </Row>
      {/* <Row>
        <Col lg="7" xxl="8" md="12">
          <ProjectTables />
        </Col>
        <Col md="12" lg="5" xxl="4">
          <Feeds />
        </Col>
      </Row> */}
      {/***Blog Cards***/}
      {/* <Row>
        {BlogData.map((blg, index) => (
          <Col sm="6" lg="6" xl="3" key={index}>
            <Blog
              image={blg.image}
              title={blg.title}
              subtitle={blg.subtitle}
              text={blg.description}
              color={blg.btnbg}
            />
          </Col>
        ))}
      </Row> */}
    </div>
  );
};

export default Starter;
