import React, { Component, useEffect, useState } from "react";
import { Tabs } from "antd";
import "./seopage.scss";
import { useDispatch, useSelector } from "react-redux";
import { GetSeo_list } from "../../Redux/Action/allActions";
import { Link } from "@mui/material";
const SeoPage = () => {
  let dispatch = useDispatch();
  const Detailspage = useSelector((state) => state.AllReducer.Seo_list);
  const [readmore,setreadmore]=useState(false)
  const { TabPane } = Tabs;
  const onChange = (key) => {
    console.log(key);
  };
  useEffect(() => {
    dispatch(GetSeo_list());
  }, []);
  const [isMobile, setIsMobile] = useState(false)
 
//choose the screen size 
const handleResize = () => {
  if (window.innerWidth < 720) {
      setIsMobile(true)
  } else {
      setIsMobile(false)
  }
}

// create an event listener
useEffect(() => {
  window.addEventListener("resize", handleResize)
})
  console.log(Detailspage, "kkkkkkkk");
  return (
    <footer className="ltn__footer-area">
      <div className="seopagefoot section-bg-2 ">
        <div className="">
          <Tabs defaultActiveKey="1" tabPosition={isMobile?"top":"left"} onChange={onChange}>
            {Detailspage?.Response?.map((data, index) => (
              <TabPane tab={data.name} key={index}>
                <div className="row">
                  {data.sub_category.map((val) => (
                    <>
                      <div className="parent_seotags">
                        <div className="tab_section">{val.name}</div>
                        <div>
                          {val.list.slice(0,readmore?val.list.length-1:20).map((valss) => (
                            <div className="display_name"><Link to={valss.link}>{valss.name}</Link></div>
                          ))}
                        </div>
                      </div>
                      {/* <div className="col-xl-3 col-md-6 col-sm-6 col-12 inner_sec">
                                           <div className='tab_section'>{val.name}</div>
                                           {val.list.map((valss)=>
                                             <div>{valss.name}</div>
                                           )}
                                           
                        </div> */}
                    </>
                  ))}
                      <div className="read_more" onClick={()=>setreadmore(!readmore)}>Read More...</div>

                </div>
              </TabPane>
            ))}
          </Tabs>
        </div>
      </div>
    </footer>
  );
};

export default SeoPage;
