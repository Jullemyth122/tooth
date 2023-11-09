import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import General from '../../assets/general.png';
import Cosmetic from '../../assets/cosmetics.png';
import Ortho from '../../assets/ortho.png';

const services = [
  {
    title: 'General Dentistry',
    description: 'This includes everything from preventive and restorative services, x-rays, teeth cleanings, fillings, and sealants.',
    image: General,
  },
  {
    title: 'Cosmetic Dentistry',
    description: 'This covers any and all types of dental work that focus on improving your dental aesthetics.',
    image: Cosmetic,
  },
  {
    title: 'Orthodontic Dentistry',
    description: 'This includes the diagnosis, prevention, and correction of teeth, jaw, and bite patterns.',
    image: Ortho,
  },
];

const imageStyles = {
  width: '100%',
  height: '200px',
  objectFit: 'cover',
};

const ServicePage = () => {
  return (
    <Container className='min-vh-100'>
      <h1 className='text-white'>Our Services</h1>
      <Row>
        {services.map((service, index) => (
          <Col key={index} lg={4} md={6} sm={12}>
            <Card className="mb-4" style={{height: 350,}} >
              <Image src={service.image} alt={service.title} style={imageStyles} rounded  />
              <Card.Body>
                <Card.Title>{service.title}</Card.Title>
                <Card.Text>{service.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ServicePage;
