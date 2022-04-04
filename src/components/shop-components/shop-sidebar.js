import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Checkbox, notification } from 'antd'
import { GetPropertyType_Search } from '../../Redux/Action/allActions';
import { useDispatch, connect } from 'react-redux';
import { GetAmenities, GetPropertyType, GetBathroom } from '../../components/apiActions/index';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const Sidebar = (props) => {
	let publicUrl = process.env.PUBLIC_URL + '/'
	const { apartment,city,type } = useParams()
	const [Amenities, setAmenities] = useState([])
	const [Property_type, setProperty_type] = useState([])
	const [Bathroom_type, setBathroom_type] = useState([])
    const [SearchData,setSearchData]=useState("")
	let dispatch = useDispatch()
	const PriceRange = [{ heading: "Low Price", from: 5000, to: 10000 }, { heading: "Medium", from: 10000, to: 30000 }, { heading: "High Price", from: 30000, to: 50000 }]
	const Bed_Rooms = [{ heading: "Single", label: "1" }, { heading: "Double", label: "1 or more" }, { heading: "Up To 3", label: "2 or more" }, { heading: "Up To 5", label: "3 or more" }]
	const Category = [{ heading: "Renting", label: "Rent" }, { heading: "Buying", label: "Sell" },{ heading: "Selling", label: "Buy" }]
	const [CheckValues, setCheckValues] = useState({
		Amenities: "",
		property: [apartment&&apartment],
		PriceRange: "",
		Bed_Bath: "",
		Category: type || "Rent" ,
		Bathrooms: "",
		city:city,
		Type:type,
	})
	const ChangeCheckbox = (e, name, price) => {

		if (name === "PriceRange") {
			let Pricerange = {
				from: price.from,
				to: price.to
			}
			setCheckValues({
				...CheckValues,
				[name]: Pricerange,
			});
		}
		else if (name === "Category") {
			setCheckValues({
				...CheckValues,
				[name]: e.target.value,
			});
		}
		else {
			let arrValues = []
			if (e.target.checked === true) {
				arrValues = [...CheckValues[name], String(e.target.value)]
			} else {
				const selectedAcc = CheckValues[name].filter(a => {
					if (a === String(e.target.value)) return false;
					return true;
				});
				arrValues = [...selectedAcc]
			}
			setCheckValues({
				...CheckValues,
				[name]: arrValues,
			});
		}
	}

	useEffect(() => {
		GetAmenities().then((data) => {
			setAmenities(data.Response)
		})
		GetPropertyType().then((data) => {
			setProperty_type(data.Response)
		})
		GetBathroom().then((data) => {
			setBathroom_type(data.Response)
		})

	}, [])


	useEffect(() => {
		ApiActionCall(CheckValues,props.Search || SearchData)
	}, [CheckValues,apartment,city,props.Search,SearchData])
	const ApiActionCall = (CheckValues,Search) => {
		dispatch(GetPropertyType_Search(CheckValues,Search)).then((data) => {
		})
	}
	return (
		<div className="col-lg-4">
			           
			<aside className="sidebar ltn__shop-sidebar custom_sidebar">
				
				<h3 className="mb-10">Advance Information</h3>
				<div className="ltn__search-widget mobile_view mb-30">
			             <form>
                            <input
                              type="text"
                              name="search"
                              onChange={(data) => setSearchData(data.target.value)}
                              value={SearchData}
                              placeholder="Search your keyword..."
                            />
                            <button><i className="fas fa-search" /></button>
                          </form>
						  </div>
				{/* Advance Information widget */}
				<div className="widget ltn__menu-widget">
					<h4 className="ltn__widget-title">Property Type</h4>
					<ul>

						{Property_type.map((data, index) =>
							<li>
								<label className="checkbox-item">{data.name}
									<input type="checkbox" checked={CheckValues.property.lastIndexOf(String(data.name)) >= 0 ? true : false} onChange={(e) => ChangeCheckbox(e, "property", data.id, index + 1)} name={data.name} value={data.name} />
									<span className="checkmark" />
								</label>
							</li>
						)}

					</ul>
					<hr />
					<h4 className="ltn__widget-title">Amenities</h4>
					<ul>
						{Amenities.map((data, index) =>
							<li>
								<label className="checkbox-item">{data.name}
									<input type="checkbox" checked={CheckValues.Amenities.lastIndexOf(String(data.name)) >= 0 ? true : false} onChange={(e) => ChangeCheckbox(e, "Amenities", index + 1)} name={data.name} value={data.name} />
									<span className="checkmark" />
								</label>
							</li>
						)}
					</ul>
					<hr />
					<h4 className="ltn__widget-title">Price Range</h4>
					<ul>
						{PriceRange.map((data, index) =>
							<li>
								<label className="checkbox-item">{data.heading}
									<input type="checkbox" checked={CheckValues.PriceRange.from === data.from ? true : false} onChange={(e) => ChangeCheckbox(e, "PriceRange", data)} name={data.heading} value={data.heading} />
									<span className="checkmark" />
								</label>
								<span className="categorey-no">₹{data.from} - ₹{data.to}</span>
							</li>
						)}
					</ul>
					<hr />

					<h4 className="ltn__widget-title">Bed Rooms</h4>
					<ul>
						{Bed_Rooms.map((data, index) =>
							<li>
								<label className="checkbox-item">{data.heading}
									<input type="checkbox" checked={CheckValues.Bed_Bath.lastIndexOf(String(data.label)) >= 0 ? true : false} onChange={(e) => ChangeCheckbox(e, "Bed_Bath", data.id, index + 1)} name={data.label} value={data.label} />
									<span className="checkmark" />
								</label>
							</li>
						)}
					</ul>
					<hr />

					<h4 className="ltn__widget-title">Bath Rooms</h4>
					<ul>
						{Bathroom_type.map((data, index) =>
							<li>
								<label className="checkbox-item">{data.name}
									<input type="checkbox" checked={CheckValues.Bathrooms.lastIndexOf(String(data.name)) >= 0 ? true : false} onChange={(e) => ChangeCheckbox(e, "Bathrooms", data.id, index + 1)} name={data.name} value={data.name} />
									<span className="checkmark" />
								</label>
							</li>
						)}
					</ul>
					<hr />
					<h4 className="ltn__widget-title">Category</h4>
					<ul>
						{Category.map((data, index) =>
							<li>
								<label className="checkbox-item">{data.heading}
									<input type="checkbox" checked={CheckValues.Category == data.label ? true : false} onChange={(e) => ChangeCheckbox(e, "Category", data.id, index + 1)} name={data.label} value={data.label} />
									<span className="checkmark" />
								</label>
							</li>
						)}
					</ul>
				</div>
			</aside>
		</div>
	)
}


const mapStateToProps = (state) => ({
	Property_Detail: state.AllReducer.Property_list.Response || [],
});
export default connect(mapStateToProps)(Sidebar);