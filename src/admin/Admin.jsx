import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import './admin.scss';
import { Link } from 'react-router-dom';

function Admin() {
    const [accountsCount, setAccountsCount] = useState(0);
    const [appointmentCount, setAppointmentsCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const accountsResponse = await fetch('http://localhost:5000/api/users/');
            const appointmentResponse = await fetch('http://localhost:5000/api/appointments/');
            const [accountsData, appointmentData] = await Promise.all([
                accountsResponse.json(),
                appointmentResponse.json(),
            ]);
            setAccountsCount(accountsData.length);
            setAppointmentsCount(appointmentData.length);
        } catch (error) {
            console.error(error);
        }
        };

        fetchData();
    }, []);

    useEffect(() => {
        animateBarBodies();
    },[
        accountsCount,appointmentCount
    ])

    const animateBarBodies = () => {
        const tl = gsap.timeline();
        // Animation configuration for each bar-body
        const animations = [
            { target: '.acc', duration: 3.5, delay: 0.5, height: `${accountsCount * 20}px` },
            { target: '.ord', duration: 3.5, delay: 1, height: `${appointmentCount * 20}px` },
        ];

        // Animate each bar-body
        animations.forEach((animation) => {
        tl.fromTo(
            animation.target,
            {
                height: '0px',
                scaleY: 0,
            },
            {
            scaleY: 1,
                ease: 'sin.inOut',
                duration: animation.duration,
                delay: animation.delay,
                height: animation.height,
            },
            0
        );
        });

        return tl;
    };
    return (
        <div className='admin-comp'>
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

            <div className="dashboard-component">
                <div className="dash-subcomponent">
                    <div className="show-data">
                        <div className="data">
                            <div className="field-data">
                                <h5> Accounts </h5>
                                <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 13.0001V15.0001H0V13.0001C0 13.0001 0 9.00005 7 9.00005C14 9.00005 14 13.0001 14 13.0001ZM10.5 3.50005C10.5 2.80782 10.2947 2.13113 9.91014 1.55556C9.52556 0.979985 8.97893 0.531381 8.33939 0.266474C7.69985 0.00156766 6.99612 -0.067744 6.31718 0.0673043C5.63825 0.202353 5.01461 0.535695 4.52513 1.02518C4.03564 1.51466 3.7023 2.1383 3.56725 2.81724C3.4322 3.49617 3.50152 4.1999 3.76642 4.83944C4.03133 5.47899 4.47993 6.02561 5.0555 6.4102C5.63108 6.79478 6.30777 7.00005 7 7.00005C7.92826 7.00005 8.8185 6.6313 9.47487 5.97493C10.1313 5.31855 10.5 4.42831 10.5 3.50005ZM13.94 9.00005C14.5547 9.4758 15.0578 10.0805 15.4137 10.7716C15.7696 11.4626 15.9697 12.2233 16 13.0001V15.0001H20V13.0001C20 13.0001 20 9.37005 13.94 9.00005ZM13 5.2579e-05C12.3117 -0.00378014 11.6385 0.202008 11.07 0.590053C11.6774 1.43879 12.0041 2.45634 12.0041 3.50005C12.0041 4.54377 11.6774 5.56132 11.07 6.41005C11.6385 6.7981 12.3117 7.00389 13 7.00005C13.9283 7.00005 14.8185 6.6313 15.4749 5.97493C16.1313 5.31855 16.5 4.42831 16.5 3.50005C16.5 2.57179 16.1313 1.68156 15.4749 1.02518C14.8185 0.368802 13.9283 5.2579e-05 13 5.2579e-05Z" fill="#fff"/>
                                </svg>
                                <h5 id="accounts-count">{accountsCount}</h5>
                            </div>
                            <div className="under-line"></div>
                        </div>
                        <div className="data">
                            <div className="field-data">
                                <h5> Appointments </h5>
                                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M5.33301 3.66667V0H6.33301V3.66667H18.6663V0H19.6663V3.66667H22.4997C23.0743 3.66667 23.6254 3.89494 24.0317 4.30127C24.4381 4.7076 24.6663 5.2587 24.6663 5.83333V22.5C24.6663 23.0746 24.4381 23.6257 24.0317 24.0321C23.6254 24.4384 23.0743 24.6667 22.4997 24.6667H2.49967C1.92504 24.6667 1.37394 24.4384 0.96761 24.0321C0.561281 23.6257 0.333008 23.0746 0.333008 22.5V5.83333C0.333008 5.2587 0.561281 4.7076 0.96761 4.30127C1.37394 3.89494 1.92504 3.66667 2.49967 3.66667H5.33301ZM5.33301 4.66667H2.49967C2.19026 4.66667 1.89351 4.78958 1.67472 5.00838C1.45592 5.22717 1.33301 5.52391 1.33301 5.83333V22.5C1.33301 22.8094 1.45592 23.1062 1.67472 23.325C1.89351 23.5437 2.19026 23.6667 2.49967 23.6667H22.4997C22.8091 23.6667 23.1058 23.5437 23.3246 23.325C23.5434 23.1062 23.6663 22.8094 23.6663 22.5V5.83333C23.6663 5.52391 23.5434 5.22717 23.3246 5.00838C23.1058 4.78958 22.8091 4.66667 22.4997 4.66667H19.6663V8.33333H18.6663V4.66667H6.33301V8.33333H5.33301V4.66667ZM9.99967 13H4.99967V12H9.99967V13ZM14.9997 12H19.9997V13H14.9997V12ZM9.99967 18H4.99967V17H9.99967V18ZM19.9997 18H14.9997V17H19.9997V18Z" fill="white"/>
                                </svg>
                                <h5 id="reservations-count">{appointmentCount}</h5>
                            </div>
                            <div className="under-line"></div>
                        </div>
                    </div>
                    <div className="daily-orders">
                        <h5> Daily Reports </h5>
                        <div className="bar-chart">
                            <div className="bar-body-chart">
                                <div className="bar-body acc">
                                    <div className="text"> Accounts <div className="dash"></div> {accountsCount}  </div>
                                    <div className="box"></div>
                                </div>
                                <div className="bar-body ord">
                                    <div className="text"> Appointments <div className="dash"></div> {appointmentCount} </div>
                                    <div className="box ord"></div>
                                </div>
                            </div>
                            <div className="range-high">
                                <div className="line">
                                    <h5> 10000 </h5>
                                    <div className="under_line"></div>
                                    <h5> 9999 </h5>
                                </div>
                                <div className="line">
                                    <h5> 5000 </h5>
                                    <div className="under_line"></div>
                                    <h5> 4999 </h5>
                                </div>
                                <div className="line">
                                    <h5> 100 </h5>
                                    <div className="under_line"></div>
                                    <h5> 99 </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin