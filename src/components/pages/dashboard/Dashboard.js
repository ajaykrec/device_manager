import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Meta from '../../common/Meta';
import Chart from 'react-apexcharts'

import all_function from '../../../config/all_function';
import Api from '../../../config/Api';

const Dashboard = (props)=>{   

  const metaData = {
    meta_title			  : 'Dashboard',
    meta_description	: '',
    meta_keywords		  : '',
  }     
  
  const [total_companies, set_total_companies] = useState(0)   
  const [total_users, set_total_users] = useState(0)   
  const [total_devices, set_total_devices] = useState(0)  
  const [active_devices, set_active_devices] = useState(0)   
  const [inactive_devices, set_inactive_devices] = useState(0)    

  useEffect(() => {
      fetchCompanies() 
      fetchUsers()        
      fetchDevices() 
      fetchActiveDevices()               
      fetchInActiveDevices()                             
  },[]); 

  const fetchCompanies = async ()=>{          
      const res = await Api.companies({})
      if( res && (res.status === 200) ){
          const resData = res.data;              
          set_total_companies(resData.count)             
      }
  }

  const fetchUsers = async ()=>{          
      const res = await Api.users({})
      if( res && (res.status === 200) ){
          const resData = res.data;              
          set_total_users(resData.count)             
      }
  }

  const fetchDevices = async ()=>{          
      const res = await Api.company_devices({})
      if( res && (res.status === 200) ){
          const resData = res.data;              
          set_total_devices(resData.count)             
      }
  }

  const fetchActiveDevices = async ()=>{          
      const res = await Api.company_devices({status:1})
      if( res && (res.status === 200) ){
          const resData = res.data;              
          set_active_devices(resData.count)             
      }
  }

  const fetchInActiveDevices = async ()=>{          
    const res = await Api.company_devices({status:0})
    if( res && (res.status === 200) ){
        const resData = res.data;              
        set_inactive_devices(resData.count)             
    }
  }

  return (  
    <>  
    <Meta metaData={metaData} />
    <HelmetProvider>
    <Helmet>	 
    </Helmet>				
    </HelmetProvider>

    <div className="pagetitle">
      <h1>Dashboard</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/"><i className="bi bi-house-door"></i></Link></li>
          <li className="breadcrumb-item active">Dashboard</li>
        </ol>
      </nav>
    </div>

    <section className="section dashboard">

      <div className="row">  

          <div className="col-xxl-4 col-md-6">
          <Link to="/companies">
            <div className="card info-card sales-card">              
              <div className="card-body">
                <h5 className="card-title">Companies</h5>
                <div className="d-flex align-items-center">
                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i className="bi bi-building"></i>
                  </div>
                  <div className="ps-3">
                    <h6>{total_companies}</h6>                    
                  </div>
                </div>
              </div>
            </div>
            </Link>
          </div>

          <div className="col-xxl-4 col-md-6">
          <Link to="/users">
            <div className="card info-card revenue-card">              
              <div className="card-body">
                <h5 className="card-title">Users</h5>
                <div className="d-flex align-items-center">
                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i className="bi bi-people-fill"></i>
                  </div>
                  <div className="ps-3">
                    <h6>{total_users}</h6>                    
                  </div>
                </div>
              </div>
            </div>
            </Link>
          </div>

          <div className="col-xxl-4 col-xl-12">
          <Link to="/devices">
            <div className="card info-card customers-card">              
              <div className="card-body">
                <h5 className="card-title">Devices</h5>
                <div className="d-flex align-items-center">
                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i className="bi bi-hdd-network-fill"></i>
                  </div>
                  <div className="ps-3">
                    <h6>{total_devices}</h6>                   
                  </div>
                </div>
              </div>
            </div>
            </Link>
          </div>

      </div>

      <div className="row">      
        <div className="col-xxl-12 col-xl-12">      
          <Link to="/devices?status=1" className="btn btn-success btn-lg me-3">Active Devices : {active_devices}</Link>
          <Link to="/devices?status=0" className="btn btn-danger btn-lg">In Active Devices : {inactive_devices}</Link>
        </div>
      </div>      

    </section>
    
    </>
  );
 
}
export default Dashboard;

