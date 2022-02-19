import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { Collapse } from 'antd';

const Plan = () => {
    let publicUrl = process.env.PUBLIC_URL + '/'
    let img = "https://assets.nobroker.in/static/img/owner_plan_icons/refund.png";
    const [test, setTest] = useState(false);
    const { Panel } = Collapse;

    function callback(key) {
        console.log(key);
    }

    const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

    return (
        <div className="ltn__login-area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title-area text-center">
                            <div className='planTopTitle'>Get Tenants Quickly. SAVE THOUSANDS on Brokerage.</div>
                            <div>For assistance call us at :+91-92-430-099-80
                            </div>

                        </div>
                    </div>
                </div>
                <>
                    {/* <div className="table-container">

                    <div className='cardsContainer'>
                        <div className="table-card-1">
                            <div className='side-top-grid'>Plan and Price</div>
                            <div className='side-bottom-grid'>
                                <div className='sider-list'>
                                    <img src={img} />
                                    <div>Guaranteed tenants or Moneyback</div>
                                </div>
                                <div className='sider-list'>
                                    <img src={img} />
                                    <div>Guaranteed tenants or Moneyback</div>
                                </div>
                                <div className='sider-list'>
                                    <img src={img} />
                                    <div>Guaranteed tenants or Moneyback</div>
                                </div>
                                <div className='sider-list'>
                                    <img src={img} />
                                    <div>Guaranteed tenants or Moneyback</div>
                                </div>
                                <div className='sider-list'>
                                    <img src={img} />
                                    <div>Guaranteed tenants or Moneyback</div>
                                </div>
                                <div className='sider-list'>
                                    <img src={img} />
                                    <div>Guaranteed tenants or Moneyback</div>
                                </div>
                            </div>
                        </div>
                        <div className="table-card">
                            <div className='top-grid'>
                                <div className='card-title'>Relax Plan</div>
                                <div className='card-amount'>₹2,999</div>
                                <div className='card-button'>
                                    <button>Subscribe</button>
                                </div>
                                <div className='description'>
                                    <ul>
                                        <li>Lots of tenant choices. Relationship Manager for Super-fast closure.</li>
                                    </ul>
                                </div>
                                <div className='side-bottom-grid'>
                                    <div className='sider-list'>
                                        <div className='tick'>✔</div>
                                    </div>
                                    <div className='sider-list'>
                                        <div className='tick'>✔</div>
                                    </div>
                                    <div className='sider-list'>
                                        <div className='tick'>✔</div>
                                    </div>
                                    <div className='sider-list'>
                                        <div className='tick'>✔</div>
                                    </div>
                                    <div className='sider-list'>
                                        <div className='tick'>✔</div>
                                    </div>
                                    <div className='sider-list'>
                                        <div className='tick'>✔</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="table-card">
                            <div className='top-grid'>
                                <div className='card-title'>Relax Plan</div>
                                <div className='card-amount'>₹2,999</div>
                                <div className='card-button'>
                                    <button>Subscribe</button>
                                </div>
                                <div className='description'>
                                    <ul>
                                        <li>Lots of tenant choices. Relationship Manager for Super-fast closure.</li>
                                    </ul>
                                </div>
                                <div className='side-bottom-grid'>
                                    <div className='sider-list'>
                                        <div className='tick'>✔</div>
                                    </div>
                                    <div className='sider-list'>
                                        <div className='tick'>✔</div>
                                    </div>
                                    <div className='sider-list'>
                                        <div className='tick'>✔</div>
                                    </div>
                                    <div className='sider-list'>
                                        <div className='tick'>✔</div>
                                    </div>
                                    <div className='sider-list'>
                                        <div className='tick'>✔</div>
                                    </div>
                                    <div className='sider-list'>
                                        <div className='tick'>✔</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="table-card">
                            <div className='top-grid'>
                                <div className='card-title'>Relax Plan</div>
                                <div className='card-amount'>₹2,999</div>
                                <div className='card-button'>
                                    <button>Subscribe</button>
                                </div>
                                <div className='description'>
                                    <ul>
                                        <li>Lots of tenant choices. Relationship Manager for Super-fast closure.</li>
                                    </ul>
                                </div>
                                <div className='side-bottom-grid'>
                                    <div className='sider-list'>
                                        <div className='tick'>✔</div>
                                    </div>
                                    <div className='sider-list'>
                                        <div className='tick'>✔</div>
                                    </div>
                                    <div className='sider-list'>
                                        <div className='tick'>✔</div>
                                    </div>
                                    <div className='sider-list'>
                                        <div className='tick'>✔</div>
                                    </div>
                                    <div className='sider-list'>
                                        <div className='tick'>✔</div>
                                    </div>
                                    <div className='sider-list'>
                                        <div className='tick'>✔</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="table-card">
                            <div className='top-grid'>
                                <div className='card-title'>Relax Plan</div>
                                <div className='card-amount'>₹2,999</div>
                                <div className='card-button'>
                                    <button>Subscribe</button>
                                </div>
                                <div className='description'>
                                    <ul>
                                        <li>Lots of tenant choices. Relationship Manager for Super-fast closure.</li>
                                    </ul>
                                </div>
                                <div className='side-bottom-grid'>
                                    <div className='sider-list'>
                                        <div className='tick'>✔</div>
                                    </div>
                                    <div className='sider-list'>
                                        <div className='tick'>✔</div>
                                    </div>
                                    <div className='sider-list'>
                                        <div className='tick'>✔</div>
                                    </div>
                                    <div className='sider-list'>
                                        <div className='tick'>✔</div>
                                    </div>
                                    <div className='sider-list'>
                                        <div className='tick'>✔</div>
                                    </div>
                                    <div className='sider-list'>
                                        <div className='tick'>✔</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div> */}
                </>
            </div>

            <div>
                <div className='collaps-Container'>
                    <div className='collaps-header' onClick={() => setTest(!test)}>
                        <div>Guaranteed tenants or Moneyback</div>
                        {test ? <i class="fas fa-chevron-down"></i> : <i class="fas fa-chevron-right"></i>}
                    </div>
                    {test && <div className='collaps-content'>
                        <div className='descriptions'>
                            <ul>
                                <li>Lots of tenant choices. Relationship Manager for Super-fast closure.</li>
                            </ul>
                        </div>
                        <div className='content-link'>
                            <div>
                                <div className='c-amount'>2000</div>
                                <div className='gst'>+18 GST</div>
                            </div>
                            <button>Subscribe</button>
                        </div>


                    </div>}
                </div>
            </div>

            <div>
                <div id="table-scroll" className="table-scroll">
                    <table id="main-table" className="main-table">
                        <tbody>
                            <tr>
                                <td>
                                    <div className="table-card">
                                        <div className='side-top-grid'>Plan and Price</div>
                                        <div className='side-bottom-grid'>
                                            <div className='sider-list-head'>
                                                <img src={img} />
                                                <div>Guaranteed tenants or Moneyback</div>
                                            </div>
                                            <div className='sider-list-head'>
                                                <img src={img} />
                                                <div>Personal Field assistant</div>
                                            </div>
                                            <div className='sider-list-head'>
                                                <img src={img} />
                                                <div>Property promotion on site</div>
                                            </div>
                                            <div className='sider-list-head'>
                                                <img src={img} />
                                                <div>Relationship Manager (RM)</div>
                                            </div>
                                            <div className='sider-list-head'>
                                                <img src={img} />
                                                <div>Facebook Marketing Of Property</div>
                                            </div>
                                            <div className='sider-list-head'>
                                                <img src={img} />
                                                <div>Plan Validity</div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="table-card">
                                        <div className='top-grid'>
                                            <div className='card-title'>Relax Plan</div>
                                            <div className='card-amount'>₹2,999</div>
                                            <div className='card-button'>
                                                <button>Subscribe</button>
                                            </div>
                                            <div className='description'>
                                                <ul>
                                                    <li>Lots of tenant choices. Relationship Manager for Super-fast closure.</li>
                                                </ul>
                                            </div>
                                            <div className='side-bottom-grid'>
                                                <div className='sider-list'>
                                                    <div className='tick'>✔</div>
                                                </div>
                                                <div className='sider-list'>
                                                    {/* <div className='tick'>✔</div> */}
                                                </div>
                                                <div className='sider-list'>
                                                    <div className='tick'>✔</div>
                                                </div>
                                                <div className='sider-list'>
                                                    {/* <div className='tick'>✔</div> */}
                                                </div>
                                                <div className='sider-list'>
                                                    <div className='tick'>✔</div>
                                                </div>
                                                <div className='sider-list'>
                                                    <div className='days'>40 Days</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div></td>
                                <td>
                                    <div className="table-card">
                                        <div className='top-grid'>
                                            <div className='card-title'>Relax Plan</div>
                                            <div className='card-amount'>₹2,999</div>
                                            <div className='card-button'>
                                                <button>Subscribe</button>
                                            </div>
                                            <div className='description'>
                                                <ul>
                                                    <li>Lots of tenant choices. Relationship Manager for Super-fast closure.</li>
                                                </ul>
                                            </div>
                                            <div className='side-bottom-grid'>
                                                <div className='sider-list'>
                                                    {/* <div className='tick'>✔</div> */}
                                                </div>
                                                <div className='sider-list'>
                                                    {/* <div className='tick'>✔</div> */}
                                                </div>
                                                <div className='sider-list'>
                                                    <div className='tick'>✔</div>
                                                </div>
                                                <div className='sider-list'>
                                                    <div className='tick'>✔</div>
                                                </div>
                                                <div className='sider-list'>
                                                    {/* <div className='tick'>✔</div> */}
                                                </div>
                                                <div className='sider-list'>
                                                    <div className='days'>65 Days</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="table-card">
                                        <div className='top-grid'>
                                            <div className='card-title'>Relax Plan</div>
                                            <div className='card-amount'>₹2,999</div>
                                            <div className='card-button'>
                                                <button>Subscribe</button>
                                            </div>
                                            <div className='description'>
                                                <ul>
                                                    <li>Lots of tenant choices. Relationship Manager for Super-fast closure.</li>
                                                </ul>
                                            </div>
                                            <div className='side-bottom-grid'>
                                                <div className='sider-list'>
                                                    <div className='tick'>✔</div>
                                                </div>
                                                <div className='sider-list'>
                                                    {/* <div className='tick'>✔</div> */}
                                                </div>
                                                <div className='sider-list'>
                                                    {/* <div className='tick'>✔</div> */}
                                                </div>
                                                <div className='sider-list'>
                                                    <div className='tick'>✔</div>
                                                </div>
                                                <div className='sider-list'>
                                                    {/* <div className='tick'>✔</div> */}
                                                </div>
                                                <div className='sider-list'>
                                                    <div className='days'>45 Days</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="table-card">
                                        <div className='top-grid'>
                                            <div className='card-title'>Relax Plan</div>
                                            <div className='card-amount'>₹2,999</div>
                                            <div className='card-button'>
                                                <button>Subscribe</button>
                                            </div>
                                            <div className='description'>
                                                <ul>
                                                    <li>Lots of tenant choices. Relationship Manager for Super-fast closure.</li>
                                                </ul>
                                            </div>
                                            <div className='side-bottom-grid'>
                                                <div className='sider-list'>
                                                    <div className='tick'>✔</div>
                                                </div>
                                                <div className='sider-list'>
                                                    <div className='tick'>✔</div>
                                                </div>
                                                <div className='sider-list'>
                                                    {/* <div className='tick'>✔</div> */}
                                                </div>
                                                <div className='sider-list'>
                                                    {/* <div className='tick'>✔</div> */}
                                                </div>
                                                <div className='sider-list'>
                                                    <div className='tick'>✔</div>
                                                </div>
                                                <div className='sider-list'>
                                                    <div className='days'>30 Days</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        {/* <tfoot>
                        <tr>
                            <th>Footer 1</th>
                            <td>Footer 2</td>
                            <td>Footer 3</td>
                            <td>Footer 4</td>
                            <td>Footer 5</td>
                            <td>Footer 6</td>
                            <td>Footer 7</td>
                            <td>Footer 8</td>
                        </tr>
                    </tfoot> */}
                    </table>
                </div>
            </div>
        </div >
    )
}

export default Plan;