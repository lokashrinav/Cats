import React, { useState } from 'react';
import './App.css';

function App() {
  const [banList, setBanList] = useState([]);
  const [catData, setCatData] = useState(null); // State to store cat data

  const fetchCatData = async () => {
    try {
      const response = await fetch(
        'https://api.thecatapi.com/v1/images/search?has_breeds=1&api_key=live_xkgY67HRtCEuRxOdRNJklwffpFimBPEPGzNxPbpQ1sUmY7cZl8ENEtwm3fAuAWXR'
      );

      if (response.ok) {
        const data = await response.json();
        setCatData(data[0]); // Save the cat data to state
      } else {
        console.error('Failed to fetch cat data');
      }
    } catch (error) {
      console.error('Error fetching cat data:', error);
    }
  }

  function ajax_get(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        console.log('responseText:' + xmlhttp.responseText);
        try {
          var data = JSON.parse(xmlhttp.responseText);
        } catch (err) {
          console.log(err.message + ' in ' + xmlhttp.responseText);
          return;
        }
        callback(data);
      }
    };

    xmlhttp.open('GET', url, true);
    xmlhttp.send();
  }

  function idk() {
    ajax_get('https://api.thecatapi.com/v1/images/search?has_breeds=1&api_key=live_xkgY67HRtCEuRxOdRNJklwffpFimBPEPGzNxPbpQ1sUmY7cZl8ENEtwm3fAuAWXR', function (data) {
      let x = data[0]['id'];
      let y = 'https://api.thecatapi.com/v1/images/' + x;
      ajax_get(y, function (idk) {
        document.getElementById('origin').innerHTML = idk['breeds'][0]['origin'];
        document.getElementById('life_span').innerHTML = idk['breeds'][0]['life_span'];
        document.getElementById('name').innerHTML = idk['breeds'][0]['name'];
        var html = '<img src="' + data[0]['url'] + '">';
        document.getElementById('image').innerHTML = html;
      });
    });
  }

  return (
    <div id="hello">
      <button onClick={idk}>Discover A Cat!</button>
      <div
        id="origin"
        onClick={() => {
          const origin = document.getElementById('origin').innerHTML;
          setBanList((prevBanList) => [...prevBanList, origin]);
        }}
      ></div>
      <div
        id="life_span"
        onClick={() => {
          const life_span = document.getElementById('life_span').innerHTML;
          setBanList((prevBanList) => [...prevBanList, life_span]);
        }}
      ></div>
      <div
        id="name"
        onClick={() => {
          const name = document.getElementById('name').innerHTML;
          setBanList((prevBanList) => [...prevBanList, name]);
        }}
      ></div>
      <div width="200px" height="200px" id="image"></div>
      <div className="banlist"> 
        <b>Ban List</b>
        <div>
          {banList.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;