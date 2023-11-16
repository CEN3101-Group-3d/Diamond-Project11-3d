import React, { useEffect, useState } from 'react';
import { getResearcher, getStudies } from '/src/Utils/requests';
import { message } from 'antd';
import '/src/views/mentor/Dashboard/Dashboard.less';
import DashboardDisplayCodeModal from '/src/views/mentor/Dashboard/DashboardDisplayCodeModal';
import MentorSubHeader from '/src/components/MentorSubHeader/MentorSubHeader';
import NavBar from '/src/components/NavBar/NavBar';
import { useGlobalState } from '/src/Utils/userState';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [studies, setStudies] = useState([]);
    const [value] = useGlobalState('currUser');
    const navigate = useNavigate();

    useEffect(() => {
        let studyids = [];
        getResearcher().then((res) => {
            if (res.data) {
                res.data.studies.forEach((study) => {
                    studyids.push(study.id);
                });
                getStudies(studyids).then((studies) => {
                    setStudies(studies);
                });
            } else {
                message.error(res.err);
                navigate('/teacherlogin');
            }
        });
    }, []);

    const handleViewStudy = (studyId) => {
        navigate(`/study/${studyId}`);
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
