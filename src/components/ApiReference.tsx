import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import axios from 'axios';

// const opeartionMock = require('../../specs/mock.json');

export default function ApiReference({ source, operationId }) {
  const [openApi, setOpenApi] = useState();

  //@ts-ignore
  useEffect(()=>{
      axios.get(`https://fakestoreapi.com/products?source=${source}&operationId=${operationId}`).then(res =>{
      // axios.get('https://bo.wix.com/_api/portal-service/v2/portals').then(res =>{
        if(res.status === 200){
          // setOpenApi(opeartionMock)
        }
      })
  },[])
  // const endpoint = get(openApi.paths, methodPath.split("."))
  console.log({ openApi })
  return (
      <div >
        {/* {endpoint.summary} */}
      </div>
  );
}
