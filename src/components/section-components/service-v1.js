import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import MediaComp from '../section-components/Loading'
const ServiceV5 = ({ service }) => {
	let publicUrl = process.env.PUBLIC_URL + '/'
	return (
		<div className="ltn__service-area section-bg-1 pt-115 pb-70 go-top">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="section-title-area ltn__section-title-2--- text-center">
							<h6 className="section-subtitle section-subtitle-2 ltn__secondary-color">Our Services</h6>
							<h1 className="section-title">Our Main Focus</h1>
						</div>
					</div>
				</div>
				{service.length>0 ?
				<div className="row  justify-content-center">
					{service?.map((data) => {
						return (
							<div className="col-lg-4 col-sm-6 col-12">
								<div className="ltn__feature-item ltn__feature-item-6 text-center bg-white  box-shadow-1">
									<div className="ltn__feature-icon">
										<img className='service_img' src={data.image} />
									</div>
									<div className="ltn__feature-info">
									{/* <Link to={`/service-details/${data.slug}&&service=${data.service}`} */}
										<Link to={`/service-details/${data.slug}/?service=${data.service}`}><h3 style={{color:"#333"}}>{data.name}</h3></Link>
										<p  dangerouslySetInnerHTML={{__html:data.description}}></p>
									</div>
								</div>
							</div>
						)
					})}

				</div>
				:
				<div className="row  justify-content-center">
				{[...Array(3)].map((data) => {
						return (
				<div className="col-lg-4 col-sm-6 col-12">
				   <MediaComp/>
				</div>
				)})}
				</div>
				}

			</div>
		</div>
	)
}

export default ServiceV5