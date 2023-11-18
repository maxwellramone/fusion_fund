import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";

const About = () => {
  return (
    <Row>
      <Col>
        {/* Card-1 */}
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"></i>
            About Us
          </CardTitle>
          <CardBody className="p-4">
            <Row>
              <Col lg="8">
                <h1>About Us</h1>
                <p>
                  Welcome to <strong>Fusion Fund's AI Dashboard</strong>, with a collection of various demonstrations of our AI on multiple select AI-startup companies. Through our AI, clients can keep up to date with companies' online presences through our AI's generated summaries and selections of company updates.
                </p>
<h2>Our Mission</h2>
                <p>
                  Our mission is to empower our clients and venture capital firms with the knowledge they need to make their own informed decisions in the rapidly evolving landscape of artificial intelligence companies. We understand the challenges of staying up to date with various upstarts in such a dynamic field, and that's why we've developed a capable web-scraper for our clients.
                </p>

                <h2>What We Do</h2>
                <p>
                  Our web scraper tirelessly aggregates and distills summaries and the latest from leading AI firms, ensuring that you receive comprehensive yet digestible updates on the latest trends, breakthroughs, and industry insights. By leveraging automation and data extraction techniques, we bring you curated summaries that save you time and keep you informed.
                </p>

                <h2>Why Choose <strong>Our Web Scraper</strong>?</h2>
                <ol>
                  <li><strong>Timely Updates:</strong> Stay ahead of the curve with real-time summaries from top AI firms.</li>
                  <li><strong>Comprehensive Insights:</strong> Our web scraper covers a wide range of topics, providing a holistic view of the AI landscape.</li>
                  <li><strong>User-Friendly Interface:</strong> Accessing the latest AI information has never been easier. Our platform is designed with simplicity and user experience in mind.</li>
                  <li><strong>Customization:</strong> Tailor your updates to match your specific interests and focus areas within the AI domain.</li>
                </ol>
<h2>Our Commitment to Quality</h2>
                <p>
                  We are committed to delivering accurate, reliable, and high-quality information to our clients. Our web scraper undergoes continuous refinement to adapt to the ever-changing nature of AI news sources, ensuring that you receive content you can trust.
                </p>

                <p>
                  Fusion Fund and other venture capitalist firms deserve updates that are instant, accurate, and informative in order to best leverage the progress and investability of startups across the business landscape.
                </p>
              </Col>
              <img
                  src="https://www.wrappixel.com/wp-content/uploads/edd/2020/09/ample-react-admin-template-y.png"
                  alt="my" className="w-100"
                />
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};


export default About;