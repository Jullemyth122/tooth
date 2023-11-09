import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function CreateAppointment() {
  const [appointmentData, setAppointmentData] = useState({
    AppointmentTicketNo: '',
    FullName: '',
    PhoneNo: '',
    Doctor: '',
    AppointmentTime: '',
    AppointmentDate: '',
    Services: '',
  });

  const navigate = useNavigate();

  const doctors = ['Doctor 1', 'Doctor 2', 'Doctor 3', 'Doctor 4'];
  const services = [
    'Service 1',
    'Service 2', 
    'Service  3',
    'Service 4'
  ];

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/appointments', appointmentData)
      .then(result => {
        console.log(result);
        navigate("/home/appointments");
      })
      .catch(err => console.log(err));
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData({
      ...appointmentData,
      [name]: value,
    });
  }

  return (
    <>
      <h1>Create an Appointment</h1>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="AppointmentTicketNo">
          <Form.Label>Appointment Ticket No.</Form.Label>
          <Form.Control
            type="text"
            name="AppointmentTicketNo"
            value={appointmentData.AppointmentTicketNo}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="FullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="FullName"
            value={appointmentData.FullName}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="PhoneNo">
          <Form.Label>Phone No.</Form.Label>
          <Form.Control
            type="number"
            name="PhoneNo"
            value={appointmentData.PhoneNo}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Doctor">
          <Form.Label>Doctor</Form.Label>
          <Form.Select
            name="Doctor"
            value={appointmentData.Doctor}
            onChange={handleInputChange}
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
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="AppointmentDate">
          <Form.Label>Appointment Date</Form.Label>
          <Form.Control
            type="date"
            name="AppointmentDate"
            value={appointmentData.AppointmentDate}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Services">
          <Form.Label>Services</Form.Label>
          <Form.Control
            type="text"
            name="Services"
            value={appointmentData.Services}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Doctor">
          <Form.Label>Doctor</Form.Label>
          <Form.Select
            name="Services"
            value={appointmentData.Services}
            onChange={handleInputChange}
          >
            <option value="">Select services</option>
            {services.map((service, index) => (
              <option key={index} value={service}>
                {service}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button type="submit">Add Appointment</Button>
        <Button variant="secondary" onClick={() => navigate("/appointments")}>
          Cancel
        </Button>
      </Form>
    </>
  );
}

export default CreateAppointment;
