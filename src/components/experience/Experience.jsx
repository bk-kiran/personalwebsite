import React from 'react'
import './Experience.css'
import icons from '../../assets/icons.png'
import coco from '../../assets/coco.jpeg'
import cics from '../../assets/cics.jpg'
import intern from '../../assets/intern.webp'
import trubridge from '../../assets/trubridge_logo.jpeg'
import build from '../../assets/buildumass_logo.jpeg'
import lyh from '../../assets/leeyuen_ltd_logo.jpeg'

const Experience = () => {
  return (
    <section className='experiencepage' id="experiencepage">
        <div className='experiencepageheadings'>
            <p className='experiencepagetitle'>EXPERIENCE</p>
            <br></br>
            <h2>Relevant Experience 🛠️ </h2>
        </div>

        <div className="timeline">

            <div className="timelineleftcontainer">
                <img src={build} alt=""/>
                <div className="timelinetextbox">
                    <h3>Software Developer @ BUILD UMass</h3>
                    <small>Sep 2025-</small>
                    <p>BUILD is a pro-bono organization working with local businesses, charities to build technical products.</p>
                    <span className='left-timelinetextbox-arrow'></span>
                </div>
            </div>

            <div className="timelinerightcontainer">
                <img src={lyh} alt=""/>
                <div className="timelinetextbox">
                    <h3>Software Engineer Intern @ Lee Yuen Housewares</h3>
                    <small>Jun 2025 - Aug 2025</small>
                    <p>I built AI-driven systems to improve SKU-level demand forecasting, supplier pricing analysis, and product lifecycle management for household goods</p>
                    <ul>
                        <li>Built a Python + scikit-learn pipeline to forecast SKU-level sales demand, raising prediction accuracy to <strong>82%</strong>, reducing overstock by <strong>15%</strong>, and cutting annual storage costs by <strong>$20K</strong>.</li>
                        <li>Engineered a React.js + Spring Boot platform that centralized BOM data, supplier pricing, and production schedules, reducing quotation turnaround time by <strong>30%</strong> and speeding OEM client delivery.</li>
                        <li>Deployed Node.js + Docker microservices on Azure to scrape and benchmark competitor pricing across <strong>10K+</strong> SKUs, reducing runtime by <strong>40%</strong> and improving procurement decision-making.</li>
                    </ul>
                    <span className='right-timelinetextbox-arrow'></span>
                </div>
            </div>

            <div className="timelineleftcontainer">
                <img src={cics} alt=""/>
                <div className="timelinetextbox">
                    <h3>Undergraduate Teaching Assistant</h3>
                    <small>Jan 2025-</small>
                    <p>Graded quizzes, held weekly office hours, answered questions on Piazza for CICS classes with over <strong>150+</strong> students.</p>
                    <ul>
                        <li>Fall 2025: <strong>CS 230 Computer Systems</strong></li>
                        <li>Spring 2025: <strong>CS 119 Introduction to Programming with Python</strong></li>
                    </ul>
                    <span className='left-timelinetextbox-arrow'></span>
                </div>
            </div>

            <div className="timelinerightcontainer">
                <img src={trubridge} alt=""/>
                <div className="timelinetextbox">
                    <h3>Data Science Intern @ TruBridge Healthcare</h3>
                    <small>Dec 2024 - Jan 2025</small>
                    <p>I focused on analyzing hospital readmission data and building scalable ETL pipelines to improve healthcare analytics across multiple hospital systems</p>
                    <ul>
                        <li>Analyzed <strong>50K+</strong> healthcare records using pandas, NumPy, and SQLAlchemy to uncover drivers of hospital readmissions.</li>
                        <li>Built logistic regression and OLS models linking infection control KPIs to readmission rates, identifying significant predictors <strong>(p ≤ 0.01)</strong>.</li>
                        <li>Optimized Python ETL pipelines on AWS S3/Lambda with vectorized preprocessing and async I/O, cutting runtime by <strong>35%</strong> and improving reliability for downstream hospital analytics.</li>
                    </ul>
                    <span className='right-timelinetextbox-arrow'></span>
                </div>
            </div>

            <div className="timelineleftcontainer">
                <img src={cics} alt=""/>
                <div className="timelinetextbox">
                    <h3>Undergraduate Researcher @ BioNLP Lab</h3>
                    <small>Dec 2024 - Feb 2025</small>
                    <ul>
                        <li>One of <strong>33</strong> undergraduates chosen to particpate in the Undergraduate Research Volunteer Program for <strong>Winter 2024.</strong></li>
                        <li>Conducted research on <strong>evaluating large language models (LLMs)</strong> for their ability to perform medical calculations, analyzing their accuracy, limitations, and potential applications in clinical decision-making.</li>
                    </ul>
                    <span className='left-timelinetextbox-arrow'></span>
                </div>
            </div>


            <div className="timelinerightcontainer">
                <img src={icons} alt=""/>
                <div className="timelinetextbox">
                    <h3>iCons Scholar (14th Cohort)</h3>
                    <small>Feb 2024-</small>
                    <ul>
                        <li>One of <strong>72</strong> freshman and sophomores accepted into a highly competitive 20-credit STEM research program</li>
                        <li>iCons 2: Researched AI-driven energy forecasting using real-time UMass campus data; developed and evaluated mL models to predict peak electricity consumption, enabling smarter energy optimization strategies.<strong>(pandas, scikit-learn)</strong></li>
                        <li>iCons 1: Analyzed rural perceptions of wind energy using sentiment analysis <strong>(NLTK VADER, Pandas, CAD)</strong>; co-developed a 3D-printed wind-powered energy storage prototype balancing engineering feasibility with social acceptance.</li>
                    </ul>
                    <span className='right-timelinetextbox-arrow'></span>
                </div>
            </div>

            <div className="timelineleftcontainer">
                <img src={intern} alt=""/>
                <div className="timelinetextbox">
                    <h3>Software Engineer Intern @ Zyntra.io</h3>
                    <small>July 2023 - Aug 2023</small>
                    <p>I worked on scaling a real-time messaging platform for workplace collaboration:</p>
                    <ul>
                        <li>Built a distributed messaging system with React.js, Node.js, MongoDB, and Socket.IO to support 2K+ concurrent users with low latency.</li>
                        <li>Integrated REST + GraphQL APIs with secure blob handling and custom state synchronization, reducing render and API errors by <strong>35%</strong>.</li>
                        <li>Implemented JWT-based authentication with refresh tokens and session expiration, cutting auth failures by <strong>60%</strong> and ensuring secure access control.</li>
                    </ul>
                    <span className='left-timelinetextbox-arrow'></span>
                </div>
            </div>

            <div className="timelinerightcontainer">
                <img src={coco} alt=""/>
                <div className="timelinetextbox">
                    <h3>ESF Computer Science Conference 2022 Co-Leader</h3>
                    <small>Feb 2022 - Sep 2022</small>
                    <ul>
                        <li>Spearheaded the planning and execution of a regional Computer Science conference, drawing participation from <strong>300+</strong> students.</li>
                        <li>Successfully garnered support and sponsorship from industry giants, including <strong>Apple, BSD Education, and Mojang.</strong></li>
                        <li>Conducted weekly departmental meetings for <strong>15+ members</strong> to foster collaboration, monitor progress, and achieve collective objectives.</li>
                    </ul>
                    <span className='right-timelinetextbox-arrow'></span>
                </div>
            </div>

        </div>

    </section>
  )
}

export default Experience
