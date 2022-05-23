import React, { useState,useEffect } from "react";
import Button from "./components/Button";
import CandidateCard from "./components/CandidateCard";
import axios from 'axios';
import "./styles.css";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading]= useState(true);
  const [error, seterror]=useState(false);
  const [page,setPage]=useState(1);
  const [sortPrice,setsortprice]=useState("ASC")


useEffect(()=>{
 fetchdata({page,sortPrice})
},[page,sortPrice])

const fetchdata = async ({page,sortPrice})=>{
  setLoading(true);
  axios({
    method:'get',
    url:"http://localhost:8080/candidates",
    params:{
      _page:page,
      _limit:5,
      _sort:"salary",
      _order:sortPrice,
    },
  })
  .then((res)=>{
    setData(res.data);
    setLoading(false)
  })
  .catch((err)=>{
    seterror(true)
    setLoading(false)
  })
}

console.log("data:", data)

  return (
    <div className="App">
      <div>
       {loading&& <div id="loading-container" >...Loading</div>}
       {sortPrice === 'DESC' ? (
          <Button
            id='SORT_BUTTON'
            onClick={() => setsortprice('ASC')}
            title={`Sort by Ascending Salary`}
          />
        ) : (
          <Button
            id='SORT_BUTTON'
            onClick={() => setsortprice('DESC')}
            title={`Sort by Dscending Salary`}
          />
        )}
        <Button disabled={page===1} onClick={()=>setPage(()=>page-1)} title="PREV" id="PREV"  />
        <Button id="NEXT" onClick={()=>setPage(()=>page+1)}  title="NEXT" />
      </div>
      {data.map((item) => (<CandidateCard key={item.id}{...item}/>))}
    </div>
  );
}
