import React, { useState, useEffect } from 'react';
import { fetched } from './api';
import Graph from './Graph';

const App = () => {
  const [fetchedData, setFetchedData] = useState();
  const [resultData, setResultData] = useState([]);

  //Input Date
  const [minDate, setMinDate] = useState();
  const [maxDate, setMaxDate] = useState();
  const [inputStart, setInputStart] = useState(''); //YYYY-MM
  const [inputEnd, setInputEnd] = useState('');
  const [filterStart, setFilterStart] = useState(); //YYYY-MM-DDT00:00:00.000Z
  const [filterEnd, setFilterEnd] = useState();

  //Input abv
  const [filterAbv, setFilterAbv] = useState(0);

  useEffect(() => {
    const myData = async () => {
      const myFetchedData = await fetched();
      setFetchedData(myFetchedData); //2007-09-01T00:00:00.000Z
      setResultData(myFetchedData);

      //set format
      ///////////////////////////////////////////////
      const getFirstBrewed = myFetchedData.map(
        (item) => new Date(item.first_brewed) //Mon Dec 01 2008 08:00:00
      );

      const getMinDate = new Date(Math.min(...getFirstBrewed)).toISOString(); //2007-09-01T00:00:00.000Z
      const getMaxDate = new Date(Math.max(...getFirstBrewed)).toISOString();

      setMinDate(getMinDate.substring(0, 7)); //2000-01
      setMaxDate(getMaxDate.substring(0, 7));

      setInputStart(getMinDate.substring(0, 7)); //2000-01
      setInputEnd(getMaxDate.substring(0, 7));
      setFilterStart(getMinDate); //2010-01-23T00:00:00.000Z
      setFilterEnd(getMaxDate);
    };
    myData();
  }, []);

  const handleDate = (e) => {
    const changeDate = new Date(e.target.value + '-01').toISOString(); //2007-09->2007-09-01T00:00:00.000Z
    if (e.target.id === 'start') {
      setInputStart(changeDate.substring(0, 7)); // 2007-09
      setFilterStart(changeDate);
      filterDate(changeDate, filterEnd, filterAbv);
    } else if (e.target.id === 'end') {
      setInputEnd(changeDate.substring(0, 7));
      setFilterEnd(changeDate);
      filterDate(filterStart, changeDate, filterAbv);
    }
  };

  const handleAbv = (e) => {
    const changeAbv = +e.target.value;
    setFilterAbv(changeAbv);
    filterDate(filterStart, filterEnd, changeAbv);
  };

  const filterDate = (StartDate, EndDate, AbvValue) => {
    const bbb = fetchedData.filter((item) =>
      AbvValue === 0
        ? new Date(item.first_brewed) >= new Date(StartDate) &&
          new Date(item.first_brewed) <= new Date(EndDate) &&
          item.abv
        : AbvValue === 51
        ? new Date(item.first_brewed) >= new Date(StartDate) &&
          new Date(item.first_brewed) <= new Date(EndDate) &&
          item.abv >= 51
        : new Date(item.first_brewed) >= new Date(StartDate) &&
          new Date(item.first_brewed) <= new Date(EndDate) &&
          item.abv <= AbvValue &&
          item.abv > AbvValue - 10
    );
    setResultData(bbb);
  };

  return (
    <div className="App">
      <nav className="Nav">
        <div className="dateFilter">
          <h3>Date filter</h3>
          <input
            type="month"
            id="start"
            name="start"
            min={minDate}
            max={maxDate}
            value={inputStart}
            onChange={handleDate}
          ></input>
          -
          <input
            type="month"
            id="end"
            name="end"
            min={minDate}
            max={maxDate}
            value={inputEnd}
            onChange={handleDate}
          ></input>
        </div>
        <div>
          <label htmlFor="abv-select">
            <h3>Filter by ABV</h3>
          </label>
          <select id="abv-select" onChange={handleAbv}>
            <option value="0">--Please choose an option--</option>
            <option value="10">0-10</option>
            <option value="20">11-20</option>
            <option value="30">21-30</option>
            <option value="40">31-40</option>
            <option value="50">41-50</option>
            <option value="51">≥51</option>
          </select>
        </div>
      </nav>

      <Graph resultData={resultData} />
    </div>
  );
};

export default App;
