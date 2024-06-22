import { MdOutlineMenu } from "react-icons/md";
import "./AreaTop.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { SidebarContext } from "../../../context/SidebarContext";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { addDays } from "date-fns";
import { DateRange } from "react-date-range";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const AreaTop = () => {
  const { openSidebar } = useContext(SidebarContext);
  const [startDate, setStartDate] = useState(new Date());

  const [state, setState] = useState([
    {
      startDate: null,
      endDate: null,//new Date(),//addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const dateRangeRef = useRef(null);

  const handleInputClick = () => {
    setShowDatePicker(true);
  };

  const handleClickOutside = (event) => {
    if (dateRangeRef.current && !dateRangeRef.current.contains(event.target)) {
      setShowDatePicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className="content-area-top">
      <div className="area-top-l ">
        <button
          className="sidebar-open-btn"
          type="button"
          onClick={openSidebar}
        >
          <MdOutlineMenu size={24} />
        </button>
        <h2 className="area-top-title">Dashboard</h2>
      </div>

      <div className="bar-chart" style={{
        display: "flex", gap: "16px",
        flexWrap: "wrap"
      }}>
        <div

        >
          <span className="input-lable">Start Date</span>
          <input type="date" style={{ width: "160px", marginRight: '10px' }} className="date-range-wrapper" />
          <span className="input-lable"> End Date</span>
          <input type="date" style={{ width: "160px" }} />
        </div>
        <div>
          <span className="input-lable">Application Name</span>
          <input style={{}} placeholder="Application Name" />
        </div>
        <div>
          <span className="input-lable">Server Name</span>
          <input style={{}} placeholder="Servaer Name" />
        </div>
        <div>
          <span className="input-lable">Application name</span>
          <input style={{}} placeholder="Application Name" />
        </div>
        <button className="load-btn" style={{ padding: "8px 20px", borderRadius: '4px', fontSize: '16px', fontWeight: "600" }}>
          Load
        </button>
      </div>

      <div>

      </div>
    </section>
  );
};

export default AreaTop;
