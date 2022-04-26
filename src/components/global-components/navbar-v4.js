import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Social from "../section-components/social";
import axios from "axios";
import { GetWishlist } from "../apiActions/index";
import Modal from "../Model";
import { useLocation } from "react-router-dom";

const NavbarV3 = ({ user, Wish_list }) => {
  const [login_id, setLogin_id] = useState();
  let location=useLocation()
  let publicUrl = process.env.PUBLIC_URL + "/";
  let imgattr = "logo";
  let anchor = "#";
  let history = useHistory();
  const [wish_list, setWish_list] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (user === "user_id") {
      localStorage.removeItem("user_id");
    }
    GetWishlist().then((response) => {
      setWish_list(response.Response);
    });
  }, [Wish_list]);

  useEffect(() => {
    // axios({
    //   method: "POST",
    //   url: "https://nowway.in/$panel/api/auth_login",
    //   data: {
    //     email: "nowway",
    //     password: "12345678",
    //   },
    // }).then((response) => {
    //   localStorage.setItem(
    //     "Token",
    //     JSON.stringify(response.data.Response.token)
    //   );
    // });
    setLogin_id(JSON.parse(localStorage.getItem("user_id")));
  }, []);

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const openWishlist = () => {
    history.push(`/my-account?wish=${1}`);
  };

  return (
    <div>
      <header className="ltn__header-area ltn__header-5 ltn__header-logo-and-mobile-menu-in-mobile ltn__header-logo-and-mobile-menu ltn__header-transparent gradient-color-2">
        {/* ltn__header-top-area start */}
        <div className="ltn__header-top-area top-area-color-white d-none">
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                <div className="ltn__top-bar-menu">
                  <ul>
                    <li>
                      <a href="mailto:info@webmail.com">
                        <i className="icon-mail" /> nowway@gmail.com
                      </a>
                    </li>
                    <li>
                      <a href="locations.html">
                        <i className="icon-placeholder" /> 15/A, Nest Tower, NYC
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-5">
                <div className="top-bar-right text-end">
                  <div className="ltn__top-bar-menu">
                    <ul>
                      <li>
                        {/* ltn__language-menu */}
                        <div className="ltn__drop-menu ltn__currency-menu ltn__language-menu">
                          <ul>
                            <li>
                              <a href="#" className="dropdown-toggle">
                                <span className="active-currency">English</span>
                              </a>
                              <ul>
                                <li>
                                  <Link to="#">Arabic</Link>
                                </li>
                                <li>
                                  <Link to="#">Bengali</Link>
                                </li>
                                <li>
                                  <Link to="#">Chinese</Link>
                                </li>
                                <li>
                                  <Link to="#">English</Link>
                                </li>
                                <li>
                                  <Link to="#">French</Link>
                                </li>
                                <li>
                                  <Link to="#">Hindi</Link>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li>
                        {/* ltn__social-media */}
                        <div className="ltn__social-media">
                          <ul>
                            <li>
                              <a href="#" title="Facebook">
                                <i className="fab fa-facebook-f" />
                              </a>
                            </li>
                            <li>
                              <a href="#" title="Twitter">
                                <i className="fab fa-twitter" />
                              </a>
                            </li>
                            <li>
                              <a href="#" title="Instagram">
                                <i className="fab fa-instagram" />
                              </a>
                            </li>
                            <li>
                              <a href="#" title="Dribbble">
                                <i className="fab fa-dribbble" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ltn__header-top-area end */}
        {/* ltn__header-middle-area start */}
        <div className="ltn__header-middle-area ltn__header-sticky ltn__sticky-bg-black">
          <div className="container">
            <div className="row">
              <div className="col-lg-5">
                <div className="site-logo-wrap">
                  <div className="col--- ltn__header-options ltn__header-options-2 ">
                    <div className="mobile-menu-toggle d-xl-none">
                      <a
                        href="#ltn__utilize-mobile-menu"
                        className="ltn__utilize-toggle"
                      >
                        <svg viewBox="0 0 800 600">
                          <path
                            d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200"
                            id="top"
                          />
                          <path d="M300,320 L540,320" id="middle" />
                          <path
                            d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190"
                            id="bottom"
                            transform="translate(480, 320) scale(1, -1) translate(-480, -318) "
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="logoName">
                    <div className="site-logo go-top">
                      <Link to="/">
                        <img
                          src={publicUrl + "assets/img/logonow.png"}
                          alt="Logo"
                        />
                      </Link>
                    </div>
                    <div className="nameShow">NOW WAY</div>
                  </div>
                  <div
                    className="col-lg-1 d-flex wish-mobile"
                    onClick={openWishlist}
                  >
                    <div className="wishlistShow">
                      <i class="fa fa-heart" />
                    </div>
                    {wish_list.length > 0 && (
                      <div className="count_view">
                        {wish_list && wish_list.length}
                      </div>
                    )}
                  </div>
                  <Link to={`/#?edit=${"offer"}`} className="bolt-icon">
                    {" "}
                    <i class="fas fa-bolt"></i>
                  </Link>
                </div>
              </div>
              <div className="col-lg-6 header-menu-column menu-color-white">
                <div className="header-menu d-none d-xl-block go-top">
                  <nav>
                    <div className="ltn__main-menu">
                      <ul>
                      {JSON.parse(localStorage.getItem("wallet"))? <li style={{textAlign:"center"}}>
                        <Link to="/#">
                       
                        <div className="cash_style">₹{JSON.parse(localStorage.getItem("wallet"))}</div>
                       <img src={publicUrl + "assets/img/cash.png"} style={{width:"20px",height:"20px",marginTop:"-12px"}} />
                      </Link>
                     </li>:""}
                        <li>
                          <Link to="/service"> Services</Link>
                        </li>
                        <li>
                          <Link to="/faq"> FAQ</Link>
                        </li>
                        <li className="special-link">
                          <Link to={login_id ? "/add-listing" : "/login"}>
                            Add Listing
                          </Link>
                        </li>
                        <li>
                          {login_id && (
                            <div
                              className="col-lg-1 d-flex wish-web"
                              onClick={openWishlist}
                            >
                              <div className="wishlistShow">
                                <i class="fa fa-heart" />
                              </div>
                              {wish_list.length > 0 && (
                                <div className="count_view">
                                  {wish_list && wish_list.length}
                                </div>
                              )}
                            </div>
                          )}
                        </li>
                        {login_id && (
                          <li>
                            <Link to="/my-account"> My Profile</Link>
                          </li>
                        )}
                        {!login_id && (
                          <li className="signbtn">
                            <Link to="/login"> SIGN IN</Link>
                          </li>
                        )}
                        {/* {!login_id && (
                          <li className="signup">
                            <Link to="/register">/ Sign up</Link>
                          </li>
                        )} */}
                        {login_id && (
                          <li>
                            <Link to={`/login?edit=${"user_id"}`}>
                              {" "}
                              <label onClick={()=>localStorage.clear()}>Sign out</label>
                            </Link>
                          </li>
                        )}
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ltn__header-middle-area end */}
      </header>
      <div className="ltn__header-middle-area ltn__header-sticky ltn__sticky-bg-black">
        <div
          id="ltn__utilize-mobile-menu"
          className="ltn__utilize ltn__utilize-mobile-menu"
        >
          <div className="ltn__utilize-menu-inner ltn__scrollbar">
            <div className="ltn__utilize-menu-head">
              <div className="site-logo">
                <Link to="/">
                  <img src={publicUrl + "assets/img/logonow.png"} alt="Logo" />
                </Link>
                <div className="nameShow">NOW WAY</div>
              </div>
              <button className="ltn__utilize-close">×</button>
            </div>
            {/* <div className="ltn__utilize-menu-search-form">
					<form action={"#"}>
						<input type="text" placeholder="Search..." />
						<button><i className="fas fa-search" /></button>
					</form>
				</div> */}
            <div className="ltn__utilize-menu">
              <ul>
              
                <li>
                  <Link to="/service"> Services</Link>
                </li>
                <li>
                  <Link to="/faq"> FAQ</Link>
                </li>
                <li className="special-link">
                  <Link to={login_id ? "/add-listing" : "/login"}>
                    Add Listing
                  </Link>
                </li>

                {login_id && (
                  <li>
                    <Link to="/my-account"> My Profile</Link>
                  </li>
                )}

                {!login_id && (
                  <li className="signbtn">
                    <Link to="/login"> SIGN IN</Link>
                  </li>
                )}
                {/* {!login_id && (
                  <li className="signup">
                    <Link to="/register">/ Sign up</Link>
                  </li>
                )} */}
                {login_id && (
                  <li>
                    <Link> <label onClick={()=>{localStorage.clear();history.push("/login")}}>Sign out</label></Link>

                  </li>
                )}
              </ul>
            </div>
            <div className="ltn__social-media-2">
              <ul>
                <li>
                  <a href="#" title="Facebook">
                    <i className="fab fa-facebook-f" />
                  </a>
                </li>
                <li>
                  <a href="#" title="Twitter">
                    <i className="fab fa-twitter" />
                  </a>
                </li>
                <li>
                  <a href="#" title="Linkedin">
                    <i className="fab fa-linkedin" />
                  </a>
                </li>
                <li>
                  <a href="#" title="Instagram">
                    <i className="fab fa-instagram" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NavbarV3;
