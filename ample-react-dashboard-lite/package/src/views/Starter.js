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
    alert('Are you sure you wanna trigger crawler!');

    // onMount();

  }

  const runresearch = () => {

    alert('Are you sure you wanna trigger research crawler!');
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
        <Col sm="6" lg="6" onClick={sayHello}>

          <TopCards
            bg="bg-light-success text-success"
            subtitle="Click here !  Run the Web crawler for AI tech Pages !"
          >
            <button  onClick={sayHello}>
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
              Click to trigger Research search !
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
      <Row>
        <Col sm="6" lg="6" >

          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
               
              OpenAI:
            </CardTitle>
            <CardBody className="">
              <div>
                <Alert color="success">
                  {/* <h4 className="alert-heading">Well done!</h4> */}
                  <p>
                    Focus: Artificial General Intelligence (AGI) research and development.
                    Notable: Known for creating advanced language models like GPT-3 and working towards the ethical and safe development of artificial intelligence.
                  </p>

                </Alert>
              </div>
            </CardBody>
          </Card>

        </Col>

        <Col sm="6" lg="6" >

          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
               
              SAIL (Stanford Artificial Intelligence Lab)::
            </CardTitle>
            <CardBody className="">
              <div>
                <Alert color="success">
                  {/* <h4 className="alert-heading">Well done!</h4> */}
                  <p>
                    Focus: Artificial General Intelligence (AGI) research and development.
                    Notable: Known for creating advanced language models like GPT-3 and working towards the ethical and saAffiliation: Stanford University.
                    Focus: Research and development in various areas of artificial intelligence, including machine learning and robotics.
                  </p>

                </Alert>
              </div>
            </CardBody>
          </Card>

        </Col>
      </Row>

      

      <Row>
        <Col sm="6" lg="6">

          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
               
              BAIR (Berkeley Artificial Intelligence Research Lab):
            </CardTitle>
            <CardBody className="">
              <div>
                <Alert color="success">
                  {/* <h4 className="alert-heading">Well done!</h4> */}
                  <p>
                  Affiliation: University of California, Berkeley.
Focus: Research in a wide range of AI areas, including computer vision, natural language processing, robotics, and machine learning.
                  </p>

                </Alert>
              </div>
            </CardBody>
          </Card>

        </Col>

        <Col sm="6" lg="6" >

          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
               
              Vector Institute:
            </CardTitle>
            <CardBody className="">
              <div>
                <Alert color="success">
                  {/* <h4 className="alert-heading">Well done!</h4> */}
                  <p>
                  Location: Toronto, Canada.
Focus: A research institute dedicated to advancing artificial intelligence, with a focus on deep learning and machine learning.
                  </p>

                </Alert>
              </div>
            </CardBody>
          </Card>

        </Col>
      </Row>

      <Row>
        <Col sm="6" lg="6">

          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
               
              CMU (Carnegie Mellon University):

            </CardTitle>
            <CardBody className="">
              <div>
                <Alert color="success">
                  {/* <h4 className="alert-heading">Well done!</h4> */}
                  <p>
                  Affiliation: Carnegie Mellon University.
Focus: Leading research institution in various AI disciplines, including robotics, computer vision, natural language processing, and machine learning.
                  </p>

                </Alert>
              </div>
            </CardBody>
          </Card>

        </Col>

        <Col sm="6" lg="6" >

          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
               
              FAIR (Facebook AI Research):
            </CardTitle>
            <CardBody className="">
              <div>
                <Alert color="success">
                  {/* <h4 className="alert-heading">Well done!</h4> */}
                  <p>
                  Affiliation: Facebook.
Focus: Conducts research in various AI fields, with a focus on advancing the state of the art in machine learning and artificial intelligence.
                  </p>

                </Alert>
              </div>
            </CardBody>
          </Card>

        </Col>
      </Row>

      <Row>
        <Col sm="6" lg="6">

          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
               
              Google AI/Google Research:


            </CardTitle>
            <CardBody className="">
              <div>
                <Alert color="success">
                  {/* <h4 className="alert-heading">Well done!</h4> */}
                  <p>
                  Affiliation: Google.
Focus: Conducts research across a broad spectrum of AI disciplines, including machine learning, natural language processing, computer vision, and robotics.
                  </p>

                </Alert>
              </div>
            </CardBody>
          </Card>

        </Col>

        <Col sm="6" lg="6" >

          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
               
              AI2 (Allen Institute for Artificial Intelligence):
            </CardTitle>
            <CardBody className="">
              <div>
                <Alert color="success">
                  {/* <h4 className="alert-heading">Well done!</h4> */}
                  <p>
                  Founder: Paul Allen.
Focus: A research institute that aims to contribute to the field of AI by conducting high-impact research in areas such as natural language processing, computer vision, and machine learning.
                  </p>

                </Alert>
              </div>
            </CardBody>
          </Card>

        </Col>
      </Row>

      <Row>
        

        <Col sm="6" lg="6" >

          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
               
            DeepMind:

            </CardTitle>
            <CardBody className="">
              <div>
                <Alert color="success">
                  {/* <h4 className="alert-heading">Well done!</h4> */}
                  <p>
                  Acquired by: Google (Alphabet Inc.).

                  Focus: Specializes in deep learning and artificial general intelligence. Known for achievements in game-playing AI (e.g., AlphaGo) and healthcare applications.
                  </p>

                </Alert>
              </div>
            </CardBody>
          </Card>

        </Col>
      </Row>




    </div>
  );
};

export default Starter;
