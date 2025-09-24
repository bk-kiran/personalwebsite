import React from 'react'
import './Portfolio.css'
import waproject from '../../assets/whatsapp.webp'
import djproject from '../../assets/stocks.jpeg'
import videogameproject from '../../assets/vgproject.png'
import foodproject from '../../assets/cuisineresultspage.png'
import amazonproject from '../../assets/amazon.jpg'
import vgamefinder from '../../assets/vgamefinder.jpeg'

const Portfolio = () => {
  return (
    <section className='portfoliopage' id="portfoliopage">
        <div className='portfoliopageheadings'>
            <p className='porfoliopagetitle'>PROJECTS</p>
            <br></br>
            <h2>Here is what I have been working on 💡 </h2>
        </div>

        <div className='project1'>
            <img className='project1screenshot' src={vgamefinder}/>
            <h1 className='project1title'>VGameFinder 2.0 🕹️</h1>
            <br></br>
            <p className='project1caption'>Looking for your next video game adventure? Use VGameFinder 2.0 to discover over 3,000 game entries and recieve personalized recommendations based on your previous plays! The front-end application was architected using ReactJS, Tailwind CSS and the RAWG API. Whereas, the game recommendation system integrated pandas dataframes and scikit-learn's cosine
similarity algorithm.</p>
            <br></br>
            <p><span className='projecttag4'>#react</span>&nbsp;&nbsp;&nbsp;<span className='projecttag5'>#machine learning</span>&nbsp;&nbsp;&nbsp;<span className='projecttag1'>#pandas</span></p>
            <br></br>
            <p><a className='viewcodedemo' href="https://github.com/bk-kiran/VGameFinderFiles" target='__blank'>Code</a>&nbsp;&nbsp;👨‍💻&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a className='viewcodedemo' href="https://vgamefinder.kiranbk.com/" target='__blank'>Live Demo</a>&nbsp;&nbsp;🖥️</p>
        </div>

        <div className='project2'>
            <img className='project2screenshot' src={amazonproject}/>
            <h1 className='project2title'>Amazon Product Tracker 📦</h1>
            <br></br>
            <p className='project2caption'>Never miss a deal with the Amazon Price Tracker! This webscraping tool allows users to securely monitor Amazon product prices in real-time and make smarter purchasing decisions. This project utilized Python, Flask, SQL and BeautifulSoup4 to create the web application, implement a robust authentication system, manage database operations and extract real-time product data from Amazon.com.</p>
            <br></br>
            <p><span className='projecttag3'>#flask</span>&nbsp;&nbsp;&nbsp;<span className='projecttag7'>#web scraping</span>&nbsp;&nbsp;&nbsp;<span className='projecttag2'>#python</span></p>
            <br></br>
            <p><a className='viewcodedemo' href="https://github.com/bk-kiran/AmazonProductScraper" target='__blank'>Code</a>&nbsp;&nbsp;👨‍💻&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a className='viewcodedemo' href="#" target='__blank'>Live Demo</a>&nbsp;&nbsp;🖥️</p>
        </div>

        <div className='project1'>
            <img className='project1screenshot' src={waproject}/>
            <h1 className='project1title'>WhatsApp Chat Analyser 💬</h1>
            <br></br>
            <p className='project1caption'>Who are the nicest people in your WhatsApp Chat? Who are the most active? How often do you guys text? Find out through this WhatsApp Chat Analyser. This app utilized pandas dataframes, NLP sentiment analysis through NLTKVader and data visualization through libraries such as matplotlib and seaborn.</p>
            <br></br>
            <p><span className='projecttag1'>#python</span>&nbsp;&nbsp;&nbsp;<span className='projecttag2'>#data visualization</span>&nbsp;&nbsp;&nbsp;<span className='projecttag7'>#NLP sentiment analysis</span></p>
            <br></br>
            <p><a className='viewcodedemo' href="https://github.com/bk-kiran/whatsappchatanalyser" target='__blank'>Code</a>&nbsp;&nbsp;👨‍💻&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a className='viewcodedemo' href="https://whatsappchatanalyser-cnsjbvlaepxyamcaabw24q.streamlit.app/" target='__blank'>Live Demo</a>&nbsp;&nbsp;🖥️</p>
        </div>
        <div className='project2'>
            <img className='project2screenshot' src={foodproject}/>
            <h1 className='project2title'>Recipe Finder 🍳</h1>
            <br></br>
            <p className='project2caption'>Need to chef something up in just 15 minutes? Are you looking to explore fascinating cuisines? Or do you just want to expand your culinary palette? Through this recipe finder, search for 500+ recipes based on cuisine, ingredients or dietary requirements! This app was built using reactjs and utilized the spoonacular API to obtain recipe information. </p>
            <br></br>
            <p><span className='projecttag2'>#HTML</span>&nbsp;&nbsp;&nbsp;<span className='projecttag7'>#CSS</span>&nbsp;&nbsp;&nbsp;<span className='projecttag3'>#reactjs</span>&nbsp;&nbsp;&nbsp;<span className='projecttag1'>#spoonacular API</span></p>
            <br></br>
            <p><a className='viewcodedemo' href="https://github.com/bk-kiran/recipefinder" target='__blank'>Code</a>&nbsp;&nbsp;👨‍💻&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://drive.google.com/file/d/1UNgvQHlVNIBIbcb2FwobRH0bASfIZlQ7/view?usp=sharing" target='__blank' className='viewcodedemo'>Live Demo</a>&nbsp;&nbsp;🖥️</p>
        </div>
        <div className='project1'>
            <img className='project1screenshot' src={videogameproject}/>
            <h1 className='project1title'>Video Game Recommender 🎮</h1>
            <br></br>
            <p className='project1caption'>Level up your gaming experience! This game recommender will help you find your next favorite game based on your previous play. This web app was developed using a python cosine similarity algorithm and the streamlit framework. </p>
            <br></br>
            <p><span className='projecttag6'>#python</span>&nbsp;&nbsp;&nbsp;<span className='projecttag7'>#machine learning</span>&nbsp;&nbsp;&nbsp;<span className='projecttag2'>#streamlit</span></p>
            <br></br>
            <p><a className='viewcodedemo' href="https://github.com/bk-kiran/gamerecommender" target='__blank'>Code</a>&nbsp;&nbsp;👨‍💻&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a className='viewcodedemo' href="https://gamerecommender-xioczcvbfed8mlpny35wni.streamlit.app/" target='__blank'>Live Demo</a>&nbsp;&nbsp;🖥️</p>
        </div>
        <div className='project2'>
            <img className='project2screenshot' src={djproject}/>
            <h1 className='project2title'>Predicting Stock Prices 📈</h1>
            <br></br>
            <p className='project2caption'>Predict future stock prices of the FAAMG companies! This app was developed using streamlit, a Random Forest Regression machine learning model and utilized web scraping to obtain stock data.</p>
            <br></br>
            <p><span className='projecttag3'>#python</span>&nbsp;&nbsp;&nbsp;<span className='projecttag5'>#machine learning</span>&nbsp;&nbsp;&nbsp;<span className='projecttag4'>#web scraping</span></p>
            <br></br>
            <p><a className='viewcodedemo' href="https://github.com/bk-kiran/stockpricepredictor" target='__blank'>Code</a>&nbsp;&nbsp;👨‍💻&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://stockpricepredictor-wdukdnfvqm84pzvcmavbqe.streamlit.app/" target='__blank' className='viewcodedemo'>Live Demo</a>&nbsp;&nbsp;🖥️</p>
        </div>



    </section>
  )
}

export default Portfolio
