import React, { useEffect, useState } from 'react';
import { getMentor, getClassrooms } from '../../Utils/requests';
import { message } from 'antd';
import './Study.less';
import DashboardDisplayCodeModal from '../Mentor/Dashboard/DashboardDisplayCodeModal';
import MentorSubHeader from '../../components/MentorSubHeader/MentorSubHeader';
import NavBar from '../../components/NavBar/NavBar';
import { useGlobalState } from '../../Utils/userState';
import { useNavigate } from 'react-router-dom';

export default function Study() {
    const [studies, setstudies] = useState([]);
    const [value] = useGlobalState('currUser');
    const navigate = useNavigate();

    useEffect(() => {
        let studyIDs = [];
        getMentor().then((res) => {
            if (res.data) {
                res.data.studies.forEach((study) => {
                    studyIDs.push(study.id);
                });
                getClassrooms(studyIDs).then((studies) => {
                    setstudies(studies);
                });
            } else {
                message.error(res.err);
                navigate('/research-dashboard');
            }
        });
    }, []);

    const handleViewstudy = (studyID) => {
        navigate(`/study/${studyID}`);
    };

    return (
        <div className='container nav-padding'>
            <NavBar />
            <div id='main-header'>Welcome {value.name}</div>
            <MentorSubHeader title={'Your studies'}></MentorSubHeader>
            <div id='studies-container'>
                <div id='dashboard-card-container'>
                    {studies.map((study) => (
                        <div key={study.id} id='dashboard-class-card'>
                            <div id='card-left-content-container'>
                                <h1 id='card-title'>{study.name}</h1>
                                <div id='card-button-container' className='flex flex-row'>
                                    <button onClick={() => handleViewstudy(study.id)}>
                                        View
                                    </button>
                                </div>
                            </div>
                            <div id='card-right-content-container'>
                                <DashboardDisplayCodeModal code={study.code} />
                                <div id='divider' />
                                <div id='student-number-container'>
                                    <h1 id='number'>{study.students.length}</h1>
                                    <p id='label'>Students</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
