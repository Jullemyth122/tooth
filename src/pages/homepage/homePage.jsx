import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Aleah from "../../assets/aleah.png";
import Jenny from "../../assets/jenny.png"
import Joshua from "../../assets/joshua.png"

const dentists = [
  {
    name: 'Dr. Aleah Sirintip',
    description: 'Experienced in general dentistry and orthodontics.',
    image: Aleah, 
  },
  {
    name: 'Dr. Jenny Berry',
    description: 'Specialized in pediatric dentistry and oral hygiene.',
    image: Jenny, 
  },
  {
    name: 'Dr. Joshua Lee',
    description: 'Skilled in cosmetic dentistry and smile makeovers.',
    image: Joshua, 
  },
];

const HomePage = () => {
  return (
    <Container className='min-vh-100'>
      <h1 className='text-white'>Meet Our Dentists</h1>
      <Row >
        {dentists.map((dentist, index) => (
          <Col key={index} lg={4} md={6} sm={12}>
            <Card className='mb-4'>
              <Card.Img variant="top object-fit-cover" src={dentist.image} alt={dentist.name} height={350} />
              <Card.Body>
                <Card.Title>{dentist.name}</Card.Title>
                <Card.Text>{dentist.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;
