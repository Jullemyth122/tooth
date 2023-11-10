import React, { useEffect, useState } from 'react';
import './admin.scss';
import { Link } from 'react-router-dom';

function Accounts() {
    const [accounts, setAccounts] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [editingAccount, setEditingAccount] = useState(null);
    const [filteredAccounts, setFilteredAccounts] = useState([]);
    const [updatedEmail, setUpdatedEmail] = useState('');
    const [updatedFName, setUpdatedFName] = useState('');
    const [updatedLName, setUpdatedLName] = useState('');

    useEffect(() => {
        // Fetch account data and populate the table
        fetch('http://localhost:5000/api/users/')
            .then((response) => response.json())
            .then((data) => {
                setAccounts(data);
                setFilteredAccounts(data); // Initialize filtered accounts with all accounts
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this account?')) {
            // Send a request to delete the account with the given ID
            fetch(`http://localhost:5000/api/users/${id}`, {
                method: 'DELETE',
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.status === 200) {
                        // Remove the deleted account from the list
                        setAccounts((prevAccounts) => prevAccounts.filter((account) => account.id !== id));
                        setFilteredAccounts((prevAccounts) => prevAccounts.filter((account) => account.id !== id));
                    } else {
                        alert('Failed to delete the account.');
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    const handleEdit = (account) => {
        setEditingAccount(account);
        // Set the initial values for the input fields
        setUpdatedEmail(account.UserEmail);
        setUpdatedFName(account.UserFName);
        setUpdatedLName(account.UserLName);
    };

    const handleSaveEdit = (accountId, updatedEmail, updatedFName, updatedLName) => {
        const updatedUserData = {
            UserEmail: updatedEmail,
            UserFName: updatedFName,
            UserLName: updatedLName,
        };

        // Send a PUT request to update the user data
        fetch(`http://localhost:5000/api/users/${accountId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUserData),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.status === 200) {
                // Data updated successfully
            } else {
                console.error('Error updating data:', data);
            }
        })
        .catch((error) => {
            console.error('Error updating data:', error);
        });

        setEditingAccount(null);
    };

    const handleCancelEdit = () => {
        setEditingAccount(null);
    };

    const handleSearch = (e) => {
        const searchText = e.target.value.toLowerCase();

        setSearchText(searchText);

        // Filter accounts based on search text
        setFilteredAccounts(
            accounts.filter((account) => {
                const accountName = `${account.UserFName} ${account.UserLName}`.toLowerCase();
                const accountEmail = account.UserEmail.toLowerCase();

                // Include the account if the search text is empty or if it matches the name or email
                return searchText === '' || accountName.includes(searchText) || accountEmail.includes(searchText);
            })
        );
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
                    {editingAccount && (
                        <div className="edit-form">
                            <h2>Edit Accounts {editingAccount.id} </h2>
                            <label htmlFor="edit-email">Email:</label>
                            <input
                                type="text"
                                id="edit-email"
                                value={updatedEmail}
                                onChange={(e) => setUpdatedEmail(e.target.value)}
                            />
                            <label htmlFor="edit-name">First Name:</label>
                            <input
                                type="text"
                                id="edit-fname"
                                value={updatedFName}
                                onChange={(e) => setUpdatedFName(e.target.value)}
                            />
                            <label htmlFor="edit-name">Last Name:</label>
                            <input
                                type="text"
                                id="edit-lname"
                                value={updatedLName}
                                onChange={(e) => setUpdatedLName(e.target.value)}
                            />
                            <button
                                onClick={() =>
                                    handleSaveEdit(
                                        editingAccount.id,
                                        updatedEmail,
                                        updatedFName,
                                        updatedLName
                                    )
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
                            placeholder="Search by name or email"
                            value={searchText}
                            onChange={handleSearch}
                        />
                    </div>

                    <div className="list-of-accounts">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAccounts.map((account) => (
                                    <tr key={account.id}>
                                        <td>{`${account.UserFName} ${account.UserLName}`}</td>
                                        <td>{account.UserEmail}</td>
                                        <td>
                                            {editingAccount === account ? (
                                                <div className='button-option'>
                                                    <button
                                                        onClick={() =>
                                                            handleSaveEdit(
                                                                account.id,
                                                                updatedEmail,
                                                                updatedFName,
                                                                updatedLName
                                                            )
                                                        }
                                                    >
                                                        Save
                                                    </button>
                                                    <button onClick={handleCancelEdit}>Cancel</button>
                                                </div>
                                            ) : (
                                                <div className='button-option'>
                                                    <button onClick={() => handleEdit(account)}>Edit</button>
                                                    <button onClick={() => handleDelete(account.id)}>Delete</button>
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

export default Accounts;
