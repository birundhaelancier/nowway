import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class MyAccount extends Component {

	render() {

		let publicUrl = process.env.PUBLIC_URL + '/'

		return <div className="liton__wishlist-area pb-70">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						{/* PRODUCT TAB AREA START */}
						<div className="ltn__product-tab-area">
							<div className="container">
								<div className="row">
									<div className="col-lg-4">
										<div className="ltn__tab-menu-list mb-50">
											<div className="nav">
												<a data-bs-toggle="tab" href="#liton_tab_1_1">Dashboard <i className="fas fa-home" /></a>
												<a data-bs-toggle="tab" className="active show" href="#liton_tab_1_2">Wishlist <i className="fas fa-heart" /></a>
												<a data-bs-toggle="tab" href="#liton_tab_1_0">Contacted <i className="fas fa-phone" /></a>
												<a data-bs-toggle="tab" href="#liton_tab_1_3">Downloads <i className="fas fa-arrow-down" /></a>
												<a data-bs-toggle="tab" href="#liton_tab_1_4">address <i className="fas fa-map-marker-alt" /></a>
												<a data-bs-toggle="tab" href="#liton_tab_1_5">Account Details <i className="fas fa-user" /></a>
												<Link className="go-top" to="/login">Logout <i className="fas fa-sign-out-alt" /></Link>
											</div>
										</div>
									</div>
									<div className="col-lg-8">
										<div className="tab-content">
											<div className="tab-pane fade" id="liton_tab_1_1">
												<div className="ltn__myaccount-tab-content-inner">
													<p>Hello <strong>UserName</strong> (not <strong>UserName</strong>? <small><a href="login-register.html">Log out</a></small> )</p>
													<p>From your account dashboard you can view your <span>recent orders</span>, manage your <span>shipping and billing addresses</span>, and <span>edit your password and account details</span>.</p>
												</div>
											</div>
											<div className="tab-pane fade active show" id="liton_tab_1_2">
												<div className="ltn__myaccount-tab-content-inner">
													<div className="table-responsive">
														<div className='contact-container'>
															<div className='grid-Shows'>
																<div className='up-cross'><i class="far fa-window-close"></i></div>
																<div className="product-img go-top">
																	<Link to="/product-details"><img src={publicUrl + "assets/img/product-3/1.jpg"} alt="#" /></Link>
																	<div className="product-badge re-content">
																		<button className='rm-btn'>Rent</button>
																	</div>
																</div>
																<div className='cont-amount'>
																	<div className='nw-amount'>₹15,000</div>
																	<div>Kamarajar Street, Madurai</div>
																</div>
																<div></div>
																{/* <div className='cont-address'>
																	<div className='icon'> <i class="fas fa-user"></i> MuthuKumar</div>
																	<div className='icon'> <i class="fas fa-phone"></i>7890787878</div>
																	<div className='cont-mail'>nowway@gmail.com</div>
																</div> */}
																<div className='low-cross'><i class="far fa-window-close"></i></div>

															</div>
															<div className='grid-Shows'>
																<div className='up-cross'><i class="far fa-window-close"></i></div>
																<div className="product-img go-top">
																	<Link to="/product-details"><img src={publicUrl + "assets/img/product-3/1.jpg"} alt="#" /></Link>
																	<div className="product-badge re-content">
																		<button className='rm-btn'>Rent</button>
																	</div>
																</div>
																<div className='cont-amount'>
																	<div className='nw-amount'>₹17,000</div>
																	<div>Kamarajar Street, Madurai</div>
																</div>
																<div></div>
																{/* <div className='cont-address'>
																	<div className='icon'> <i class="fas fa-user"></i> Krishna</div>
																	<div className='icon'> <i class="fas fa-phone"></i>9865432878</div>
																	<div className='cont-mail'>nowway@gmail.com</div>
																</div> */}
																<div className='low-cross'><i class="far fa-window-close"></i></div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="tab-pane fade" id="liton_tab_1_0">
												<div className="ltn__myaccount-tab-content-inner">
													<div className="table-responsive">
														<div className='contact-container'>
															<div className='grid-Show'>
																<div className="product-img go-top">
																	<Link to="/product-details"><img src={publicUrl + "assets/img/product-3/1.jpg"} alt="#" /></Link>
																	<div className="product-badge re-content">
																		<button className='rm-btn'>Rent</button>
																	</div>
																</div>
																<div className='cont-amount'>
																	<div className='nw-amount'>₹15,000</div>
																	<div>Kamarajar Street, Madurai</div>
																</div>
																<div className='cont-address'>
																	<div className='icon'> <i class="fas fa-user"></i> MuthuKumar</div>
																	<div className='icon'> <i class="fas fa-phone"></i>7890787878</div>
																	<div className='cont-mail'>nowway@gmail.com</div>
																</div>

															</div>
															<div className='grid-Show'>
																<div className="product-img go-top">
																	<Link to="/product-details"><img src={publicUrl + "assets/img/product-3/1.jpg"} alt="#" /></Link>
																	<div className="product-badge re-content">
																		<button className='rm-btn'>Rent</button>
																	</div>
																</div>
																<div className='cont-amount'>
																	<div className='nw-amount'>₹17,000</div>
																	<div>Kamarajar Street, Madurai</div>
																</div>
																<div className='cont-address'>
																	<div className='icon'> <i class="fas fa-user"></i> Krishna</div>
																	<div className='icon'> <i class="fas fa-phone"></i>9865432878</div>
																	<div className='cont-mail'>nowway@gmail.com</div>
																</div>

															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="tab-pane fade" id="liton_tab_1_3">
												<div className="ltn__myaccount-tab-content-inner">
													<div className="table-responsive">
														<table className="table">
															<thead>
																<tr>
																	<th>Product</th>
																	<th>Date</th>
																	<th>Expire</th>
																	<th>Download</th>
																</tr>
															</thead>
															<tbody>
																<tr>
																	<td>Carsafe - Car Service PSD Template</td>
																	<td>Nov 22, 2020</td>
																	<td>Yes</td>
																	<td><a href="#"><i className="far fa-arrow-to-bottom mr-1" /> Download File</a></td>
																</tr>
																<tr>
																	<td>Carsafe - Car Service HTML Template</td>
																	<td>Nov 10, 2020</td>
																	<td>Yes</td>
																	<td><a href="#"><i className="far fa-arrow-to-bottom mr-1" /> Download File</a></td>
																</tr>
																<tr>
																	<td>Carsafe - Car Service WordPress Theme</td>
																	<td>Nov 12, 2020</td>
																	<td>Yes</td>
																	<td><a href="#"><i className="far fa-arrow-to-bottom mr-1" /> Download File</a></td>
																</tr>
															</tbody>
														</table>
													</div>
												</div>
											</div>
											<div className="tab-pane fade" id="liton_tab_1_4">
												<div className="ltn__myaccount-tab-content-inner">
													<p>The following addresses will be used on the checkout page by default.</p>
													<div className="row">
														<div className="col-md-6 col-12 learts-mb-30">
															<h4>Billing Address <small><a href="#">edit</a></small></h4>
															<address>
																<p><strong>Alex Tuntuni</strong></p>
																<p>1355 Market St, Suite 900 <br />
																	San Francisco, CA 94103</p>
																<p>Mobile: (123) 456-7890</p>
															</address>
														</div>
														<div className="col-md-6 col-12 learts-mb-30">
															<h4>Shipping Address <small><a href="#">edit</a></small></h4>
															<address>
																<p><strong>Alex Tuntuni</strong></p>
																<p>1355 Market St, Suite 900 <br />
																	San Francisco, CA 94103</p>
																<p>Mobile: (123) 456-7890</p>
															</address>
														</div>
													</div>
												</div>
											</div>
											<div className="tab-pane fade" id="liton_tab_1_5">
												<div className="ltn__myaccount-tab-content-inner">
													<p>The following addresses will be used on the checkout page by default.</p>
													<div className="ltn__form-box">
														<form method="GET">
															<div className="row mb-50">
																<div className="col-md-6">
																	<label>First name:</label>
																	<input type="text" name="ltn__name" />
																</div>
																<div className="col-md-6">
																	<label>Last name:</label>
																	<input type="text" name="ltn__lastname" />
																</div>
																<div className="col-md-6">
																	<label>Display Name:</label>
																	<input type="text" name="ltn__lastname" placeholder="Ethan" />
																</div>
																<div className="col-md-6">
																	<label>Display Email:</label>
																	<input type="email" name="ltn__lastname" placeholder="example@example.com" />
																</div>
															</div>
															<fieldset>
																<legend>Password change</legend>
																<div className="row">
																	<div className="col-md-12">
																		<label>Current password (leave blank to leave unchanged):</label>
																		<input type="password" name="ltn__name" />
																		<label>New password (leave blank to leave unchanged):</label>
																		<input type="password" name="ltn__lastname" />
																		<label>Confirm new password:</label>
																		<input type="password" name="ltn__lastname" />
																	</div>
																</div>
															</fieldset>
															<div className="btn-wrapper">
																<button type="submit" className="btn theme-btn-1 btn-effect-1 text-uppercase mb-15">Save Changes</button>
															</div>
														</form>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* PRODUCT TAB AREA END */}
					</div>
				</div>
			</div>
		</div>
	}
}

export default MyAccount;

{/* <div className='contact-container'>
<div className='wishlist-flow'>
	<div className='cross-btn'>
		<i class="far fa-window-close"></i>
	</div>
	<div className='grid-Shows'>
		<div className="product-img go-top">
			<Link to="/product-details"><img src={publicUrl + "assets/img/product-3/1.jpg"} alt="#" /></Link>
			<div className="product-badge re-content">
				<button className='rm-btn'>Rent</button>
			</div>
		</div>
		<div className='cont-amount'>
			<div className='nw-amount'>₹15,000</div>
			<div>Kamarajar Street, Madurai</div>
		</div>
		<div className='cont-address'>
			<div className='icon'> <i class="fas fa-user"></i> MuthuKumar</div>
			<div className='icon'> <i class="fas fa-phone"></i>7890787878</div>
			<div className='cont-mail'>nowway@gmail.com</div>
		</div>

	</div>
</div>
<div className='wishlist-flow'>
	<div className='cross-btn'><i class="far fa-window-close"></i></div>
	<div className='grid-Shows'>
		<div className="product-img go-top">
			<Link to="/product-details"><img src={publicUrl + "assets/img/product-3/1.jpg"} alt="#" /></Link>
			<div className="product-badge re-content">
				<button className='rm-btn'>Rent</button>
			</div>
		</div>
		<div className='cont-amount'>
			<div className='nw-amount'>₹17,000</div>
			<div>Kamarajar Street, Madurai</div>
		</div>
		<div className='cont-address'>
			<div className='icon'> <i class="fas fa-user"></i> Krishna</div>
			<div className='icon'> <i class="fas fa-phone"></i>9865432878</div>
			<div className='cont-mail'>nowway@gmail.com</div>
		</div>

	</div>
</div>
</div> */}