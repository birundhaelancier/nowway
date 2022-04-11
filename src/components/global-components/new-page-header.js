import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Page_header extends Component {

    render() {

        let HeaderTitle = this.props.headertitle;
        let publicUrl = process.env.PUBLIC_URL + '/'
        let Subheader = this.props.subheader ? this.props.subheader : HeaderTitle
        let CustomClass = this.props.customclass ? this.props.customclass : ''
        let Img = this.props.Img ? this.props.Img : '14.jpg'

        return (
            // <div className='pageHeder'>
            <div className={"ltn__breadcrumb-area text-left bg-overlay-white-30 bg-image " + CustomClass} data-bs-bg={publicUrl + "assets/img/bg/14.jpg"}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 col-sm-12">
                            <div className="ltn__breadcrumb-inner">
                                <h2 className="page-title">{HeaderTitle}</h2>
                                <div className="ltn__breadcrumb-list">
                                    <ul>
                                        <li><Link to="/"><span className="ltn__secondary-color"><i className="fas fa-home" /></span> Home</Link></li>
                                        <li>{Subheader}</li>
                                    </ul>
                                </div>
                            </div>
                        </div> 

                        <div className="col-lg-5 col-sm-12">
                        <div className="need-support  need_cus">
                                <h4 style={{fontWeight:"500",marginBottom:"20px"}}>Still need help? Reach out to support 24/7</h4>
                                <div><i className="fas fa-phone" style={{color:"#8ab74f"}}/>   <span style={{fontSize:"20px",fontWeight:"600",paddingLeft:"10px",color:"#ec4249"}}>+91 7010143257</span></div>

                         </div>
                        </div>

                    </div>
                </div>
            </div>


        )
    }
}


export default Page_header