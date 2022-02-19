import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

const ServiceV5 = ({ service }) => {
	let publicUrl = process.env.PUBLIC_URL + '/'
	console.log(service,"service")
	return (
		<div className="ltn__service-area section-bg-1 pt-115 pb-70 go-top">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="section-title-area ltn__section-title-2--- text-center">
							<h6 className="section-subtitle section-subtitle-2 ltn__secondary-color">Our Services</h6>
							<h1 className="section-title">Our Core Services</h1>
						</div>
					</div>
				</div>
				<div className="row  justify-content-center">
					{service?.map((data) => {
						return (
							<div className="col-lg-4 col-sm-6 col-12">
								<div className="ltn__feature-item ltn__feature-item-6 text-center bg-white  box-shadow-1">
									<div className="ltn__feature-icon">
										<img className='service_img' src={data.image} />
										{/* <span><i className="flaticon-house" /></span> */}
									</div>
									<div className="ltn__feature-info">
										<h3><Link to={`/service-details?edit=${data.id}`}>{data.name}</Link></h3>
										<p>{data.description}</p>
									</div>
								</div>
							</div>
						)
					})}

				</div>
			</div>
		</div>
	)
}

export default ServiceV5