import React from 'react';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import About from '../../assets/about.png';
const AboutPage = () => {
  const customStyles = {
    header: {
      marginTop: '20px',
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: '20px',
      textAlign: 'center',
    },
    text: {
      color: '#fff',
      fontSize: '1.2rem',
      textAlign: 'center',
    },
    image: {
      width: '100%',
      height: '400px',
      objectFit: 'cover',
      borderRadius: '15px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
  };

  return (
    <Container className='min-vh-100'>
      <h1 style={customStyles.header}>About Us</h1>
      <p style={customStyles.text}>
        We know that going to the dentist can be difficult sometimes, so we do everything we can to make sure you're relaxed and comfortable. Our first priority is to treat you as we want to be treated: with respect, patience, and clarity.
      </p>

      <Image src={About} alt="Clinic Interior" fluid style={customStyles.image} />
      <h2 style={customStyles.header}>Our History</h2>
      <p style={customStyles.text}>
        We want you to feel as comfortable as possible. That's been our goal from the very first
        day when we opened the clinic with a single dentist . Now, 25 years later and with ten professional dentists,
        it remains as true as ever.      
      </p>
    </Container>
  );
};

export default AboutPage;
