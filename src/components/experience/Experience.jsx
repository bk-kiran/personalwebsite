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
                    <ul>
                        <li>TBC</li>
                    </ul>
                    <span className='left-timelinetextbox-arrow'></span>
                </div>
            </div>

            <div className="timelinerightcontainer">
                <img src={lyh} alt=""/>
                <div className="timelinetextbox">
                    <h3>Software Engineer Intern @ Lee Yuen Housewares</h3>
                    <small>Jun 2025 - Aug 2025</small>
                    <ul>
                        <li>TBC</li>
                    </ul>
                    <span className='right-timelinetextbox-arrow'></span>
                </div>
            </div>

            <div className="timelineleftcontainer">
                <img src={cics} alt=""/>
                <div className="timelinetextbox">
                    <h3>Undergraduate Teaching Assistant</h3>
                    <small>Jan 2025-</small>
                    <ul>
                        <li>Employed as a an Undergraduate Course Assistant for the <strong>CS 119 (Introduction to Programming)</strong> course during the <strong>Spring 2025</strong> semester. </li>
                    </ul>
                    <span className='left-timelinetextbox-arrow'></span>
                </div>
            </div>

            <div className="timelinerightcontainer">
                <img src={trubridge} alt=""/>
                <div className="timelinetextbox">
                    <h3>Data Science Intern @ TruBridge Healthcare</h3>
                    <small>Dec 2024 - Jan 2025</small>
                    <ul>
                        <li>TBC</li>
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
                    </ul>
                    <span className='right-timelinetextbox-arrow'></span>
                </div>
            </div>

            <div className="timelineleftcontainer">
                <img src={intern} alt=""/>
                <div className="timelinetextbox">
                    <h3>Software Engineer Intern @ Zyntro.io</h3>
                    <small>July 2023 - Aug 2023</small>
                    <ul>
                        <li>Worked closely with a team of <strong>7</strong> students to collaborate for a tech startup (heya.space) on an instant-messaging communication system, executing
agile methodologies and tools like Git and Jira, leading to enhanced productivity.</li>
                        <li>Increased system efficiency by <strong>30%</strong> through the design and integration of two responsive features leveraging
ReactJS and Tailwind CSS, ensuring a seamless user experience across various platforms.</li>
                        <li>Diagnosed and resolved over <strong>50</strong> software issues using tools such as Chrome DevTools and Postman, ensuring the
system’s functionality and improving code quality across the application.</li>
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
