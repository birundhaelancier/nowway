import React, { useEffect, useState } from 'react';
import Navbar from '../global-components/navbar-v4';
import PageHeader from '../global-components/new-page-header';
import Footer from '../global-components/footer';
import { Refund_list } from '../apiActions'
const RefundPolicy = () => {
 const [RefundData,setRefundData]=useState([])    
useEffect(()=>{
    Refund_list().then((res)=>{
       setRefundData(res.Response)
    })
},[])
    return <div>
        <Navbar />
        <PageHeader headertitle="Refund Policy" subheader="Refund" />
        <div className='container'>
        {
            RefundData.map((data)=>{
                return(
               <div dangerouslySetInnerHTML={{__html:data.refund}}></div>
            )})
        }
        </div>
        <Footer />
    </div>
}

export default RefundPolicy

