import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function SeeAppointment() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/appointments')
      .then(result => setAppointments(result.data))
      .catch(err => console.log(err));
  }, [appointments]);

  const handleDelete = (id) => {
    alert("Do you want to cancel this booking")
    axios.delete('http://localhost:5000/api/appointments/' + id)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="table-responsive">
      <h1 className='text-white'>My Appointments</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Appointment Ticket No</th>
            <th>Name</th>
            <th>Phone No.</th>
            <th>Doctor</th>
            <th>Appointment Time</th>
            <th>Appointment Date</th>
            <th>Services</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length === 0 ? 
          "You have no appoinment" : 
          appointments.map(appointment => (
            <tr key={appointment.id}>
              <td>{appointment.id}</td>
              <td>{appointment.FullName}</td>
              <td>{appointment.PhoneNo}</td>
              <td>{appointment.Doctor}</td>
              <td>{appointment.AppointmentTime}</td>
              <td>{appointment.AppointmentDate}</td>
              <td>{appointment.Services}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(appointment.id)}
                >
                  Cancel
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default SeeAppointment;
