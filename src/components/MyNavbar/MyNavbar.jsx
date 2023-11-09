import React, { useState} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';


function MyNavbar() {
  const [show, setShow] = useState(false);
  const [appointmentData, setAppointmentData] = useState({
    FullName: '',
    PhoneNo: '',
    Doctor: '', 
    AppointmentTime: '',
    AppointmentDate: '',
    Services: '',
  });


  const doctors = ['Dr. Aleah Sirintip', 'Dr. Jenny Berry', 'Dr. Joshua Lee']; 
  const services = [
    'Teeth Whitening', 
    'Dental Braces',
    'Cosmetic Dentistry', 
    'Oral Surgery',
    'Dental Implement', 
    'Endodontics',
    'Dentures', 
    'Crown',
    'Invisalign', 
    'Orthodontics',
    'Root canal treatment', 
    'Teeth cleaning',
    'Dental restoration', 
    'Dental sealant',
    'Pediatric dentistry', 
  ]; 

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/appointments', appointmentData)
      .then(() => {
        setAppointmentData({
          FullName: '',
          PhoneNo: '',
          Doctor: '', 
          AppointmentTime: '',
          AppointmentDate: '',
          Services: '',
        })
        setShow(false)
      })
      .catch(err => console.log(err));
  }

  const handleLogout = () => {
    alert("Are you sure you want to logout?");
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData({
      ...appointmentData,
      [name]: value,
    });
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg p-2" className='shadow'>
        <Navbar.Brand as={Link} to="/home">
          <img src='/logo.png' width={35} alt='logo'/>
          Tooth Specialist
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto p-2 gap-2">
            <Nav.Link as={Link} to="/home">Our Dentist</Nav.Link>
            <Nav.Link as={Link} to="/home/services">Services</Nav.Link>
            <Nav.Link as={Link} to="/home/about">About us</Nav.Link>
        
            <Nav.Link as={Link} to="/home/appointments">My Appointments</Nav.Link>
            <Nav.Link 
              onClick={handleShow}
              className='bg-light text-dark p-2 rounded' 
              style={{width: 'fit-content'}}>
              Book an appointment
            </Nav.Link>  
            <Nav.Link as={Link} to="/" onClick={handleLogout} className='bg-danger p-2 rounded' style={{width: 'fit-content'}}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create an appointment</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="FullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="FullName"
            value={appointmentData.FullName}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="PhoneNo">
          <Form.Label>Phone No.</Form.Label>
          <Form.Control
            type="number"
            name="PhoneNo"
            value={appointmentData.PhoneNo}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Doctor">
          <Form.Label>Doctor</Form.Label>
          <Form.Select
            name="Doctor"
            value={appointmentData.Doctor}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a doctor</option>
            {doctors.map((doctor, index) => (
              <option key={index} value={doctor}>
                {doctor}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="AppointmentTime">
          <Form.Label>Appointment Time</Form.Label>
          <Form.Control
            type="time"
            name="AppointmentTime"
            value={appointmentData.AppointmentTime}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="AppointmentDate">
          <Form.Label>Appointment Date</Form.Label>
          <Form.Control
            type="date"
            name="AppointmentDate"
            value={appointmentData.AppointmentDate}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Services">
          <Form.Label>Services</Form.Label>
          <Form.Select
            name="Services"
            value={appointmentData.Services}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a service</option>
            {services.map((service, index) => (
              <option key={index} value={service}>
                {service}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
    
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" type='submit'>
          Save Changes
        </Button>
      </Modal.Footer>
      </Form>      
    </Modal>
    </>
  );
}

export default MyNavbar;
