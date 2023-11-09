import React, { useEffect, useState } from 'react';
import './admin.scss';
import { Link } from 'react-router-dom';

function Appointment() {
    const [appointments, setAppointments] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [editingAppointment, setEditingAppointment] = useState(null);
    const [updatedFullName, setUpdatedFullName] = useState('');
    const [updatedPhoneNo, setUpdatedPhoneNo] = useState('');
    const [updatedDoctor, setUpdatedDoctor] = useState('');
    const [updatedAppointmentDate, setUpdatedAppointmentDate] = useState('');
    const [updatedAppointmentTime, setUpdatedAppointmentTime] = useState('');
    const [updatedServices, setUpdatedServices] = useState('');

    const serviceMapping = {
        1: 'Pet Boarding',
        2: 'Pet Feeding',
        3: 'Pet Grooming',
        4: 'Pet Training',
        5: 'Pet Exercise',
        6: 'Pet Treatment',
    };

    useEffect(() => {
        // Fetch appointment data and populate the table
        fetch('http://localhost:5000/api/appointments/')
            .then((response) => response.json())
            .then((data) => {
                setAppointments(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleSearch = (e) => {
        setSearchText(e.target.value.toLowerCase());
    };

    const filterAppointments = (appointment) => {
        // Make sure that the properties exist before calling toLowerCase()
        const appointmentName = appointment.FullName ? appointment.FullName.toLowerCase() : '';
        const appointmentDoctor = appointment.Doctor ? appointment.Doctor.toLowerCase() : '';
        const appointmentServices = appointment.Services ? appointment.Services.toLowerCase() : '';

        return (
            appointmentName.includes(searchText) ||
            appointmentDoctor.includes(searchText) ||
            appointmentServices.includes(searchText)
        );
    };

    const handleEdit = (appointment) => {
        setEditingAppointment(appointment);
        // Set the initial values for the input fields
        setUpdatedFullName(appointment.FullName);
        setUpdatedPhoneNo(appointment.PhoneNo);
        setUpdatedDoctor(appointment.Doctor);
        setUpdatedAppointmentDate(appointment.AppointmentDate);
        setUpdatedAppointmentTime(appointment.AppointmentTime);
        setUpdatedServices(appointment.Services);
    };

    const handleCancelEdit = () => {
        setEditingAppointment(null);
    };

    const handleSaveEdit = (appointment) => {
        // Send a PUT request to update the appointment data
        fetch(`http://localhost:5000/api/appointments/${appointment.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(appointment),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 200) {
                // Data updated successfully
                setEditingAppointment(null);
            } else {
                console.error('Failed to update data:', data);
            }
        })
        .catch((error) => {
            console.error('Error updating data:', error);
        })
        setEditingAppointment(null);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this appointment?')) {
            // Send a request to delete the appointment with the given ID
            fetch(`http://localhost:5000/api/appointments/${id}`, {
                method: 'DELETE',
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.status === 200) {
                        // Remove the deleted appointment from the list
                        setAppointments((prevAppointments) =>
                            prevAppointments.filter((appointment) => appointment.id !== id)
                        );
                    } else {
                        alert('Failed to delete the appointment.');
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    return (
        <div>
            <div className="navbar">
                <ul>
                    <li>
                        <Link to="/admin"> Dashboard </Link>
                    </li>
                    <li>
                        <Link to="/admin/account"> Accounts </Link>
                    </li>
                    <li>
                        <Link to="/admin/appointment"> Appointment </Link>
                    </li>
                </ul>
            </div>

            <div className="accounts-component">
                <div className="account-subcomponent">
                    {editingAppointment && (
                        <div className="edit-form">
                            <h2>Edit Appointment {editingAppointment.id} </h2>
                            <label htmlFor="edit-fullName">Full Name:</label>
                            <input
                                type="text"
                                id="edit-fullName"
                                value={updatedFullName}
                                onChange={(e) => setUpdatedFullName(e.target.value)}
                            />
                            <label htmlFor="edit-phoneNo">Phone Number:</label>
                            <input
                                type="text"
                                id="edit-phoneNo"
                                value={updatedPhoneNo}
                                onChange={(e) => setUpdatedPhoneNo(e.target.value)}
                            />
                            <label htmlFor="edit-doctor">Doctor:</label>
                            <input
                                type="text"
                                id="edit-doctor"
                                value={updatedDoctor}
                                onChange={(e) => setUpdatedDoctor(e.target.value)}
                            />
                            <label htmlFor="edit-appointmentDate">Appointment Date:</label>
                            <input
                                type="text"
                                id="edit-appointmentDate"
                                value={updatedAppointmentDate}
                                onChange={(e) => setUpdatedAppointmentDate(e.target.value)}
                            />
                            <label htmlFor="edit-appointmentTime">Appointment Time:</label>
                            <input
                                type="text"
                                id="edit-appointmentTime"
                                value={updatedAppointmentTime}
                                onChange={(e) => setUpdatedAppointmentTime(e.target.value)}
                            />
                            <label htmlFor="edit-services">Services:</label>
                            <input
                                type="text"
                                id="edit-services"
                                value={updatedServices}
                                onChange={(e) => setUpdatedServices(e.target.value)}
                            />
                            <button
                                onClick={() =>
                                    handleSaveEdit({
                                        ...editingAppointment,
                                        FullName: updatedFullName,
                                        PhoneNo: updatedPhoneNo,
                                        Doctor: updatedDoctor,
                                        AppointmentDate: updatedAppointmentDate,
                                        AppointmentTime: updatedAppointmentTime,
                                        Services: updatedServices,
                                    })
                                }
                            >
                                Save
                            </button>
                            <button onClick={handleCancelEdit}>Cancel</button>
                        </div>
                    )}

                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search by name or doctor or services"
                            value={searchText}
                            onChange={handleSearch}
                        />
                    </div>

                    <div className="list-of-accounts">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Doctor</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Service</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments
                                    .filter(filterAppointments)
                                    .map((appointment) => (
                                        <tr key={appointment.id}>
                                            <td>{`${appointment.FullName}`}</td>
                                            <td>{appointment.PhoneNo}</td>
                                            <td>{appointment.Doctor}</td>
                                            <td>{appointment.AppointmentDate}</td>
                                            <td>{appointment.AppointmentTime}</td>
                                            <td>{serviceMapping[appointment.Services]}</td>
                                            <td>
                                                {editingAppointment === appointment ? (
                                                    <div className='button-option'>
                                                        <button onClick={() => handleSaveEdit(appointment)}>Save</button>
                                                        <button onClick={handleCancelEdit}>Cancel</button>
                                                    </div>
                                                ) : (
                                                    <div className='button-option'>
                                                        <button onClick={() => handleEdit(appointment)}>Edit</button>
                                                        <button onClick={() => handleDelete(appointment.id)}>Delete</button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Appointment;
