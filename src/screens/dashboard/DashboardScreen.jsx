import axios from 'axios';
import { useEffect, useState } from "react";
import { AreaCharts, AreaTop } from "../../components";
import ErrorLogTable from "./ErrorLogTable";
import HealthCheckTable from "./HealthCheckTable";
import TraceLogsTable from "./TraceLogsTable";
import dayjs from "dayjs";
import { Base_url } from '../../constants/url';

let currentDate = dayjs();
let formattedDate = currentDate.format('YYYY-MM-DD');

console.log(formattedDate); 

const Dashboard = () => {
  const [healthCheckLogs, setHealthCheckLogs] = useState(null);
  const [errorLogs, setErrorLogs] = useState(null);
  const [traceLogs, setTraceLogs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [errorLogsBarGraphData, setErrorLogsBarGraphData] = useState([]);
  const [errorLogsGraphData, setErrorLogsGraphData] = useState([]);
  const [traceLogsGraphData, setTraceLogsGraphData] = useState([]);



  const fetchDataFromApi = async (filter, endpoint) => {
    const url = `${Base_url}/api/Logs/${endpoint}`;
    try {
      const response = await axios.get(url,
        {
          params: {
            StartDate:  filter?.StartDate || '2024-05-26' || formattedDate,
            EndDate: filter?.EndDate|| formattedDate,
            ...(filter?.ApplicationName && { ApplicationName :filter?.ApplicationName }),
            ...(filter?.ClientId && { ClientId: filter?.ClientId }),
            ...(filter?.UserName && { UserName:filter?.UserName }),
            ...(filter?.ServerName && { ServerName :filter?.ServerName}),
          },
        headers: {
          'Accept': '*/*', 
        }
      });

      return response.data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  };
  const handleButtonClick = async (filterData={}) => {
    setLoading(true);
    try {
      console.log(filterData)
      // return
      const [
        healthCheckLogsData,
        errorLogsData,
        traceLogsData,
        errorLogsBarGraphData,
        errorLogsGraphData,
        traceLogsGraphData,

      ] = await Promise.all([
        fetchDataFromApi(filterData,  'HealthCheckLogs'),
        fetchDataFromApi(filterData,  'ErrorLogs'),
        fetchDataFromApi(filterData,  'TraceLogs'),
        fetchDataFromApi(filterData,  'ErrorLogBarGraph'),
        fetchDataFromApi(filterData,  'ErrorLogLineGraph'),
        fetchDataFromApi(filterData,  'TraceLogOperationGraph'),
      ]);
      console.log({
        healthCheckLogsData,
        errorLogsData,
        traceLogsData
      })
      setHealthCheckLogs(healthCheckLogsData);
      setErrorLogs(errorLogsData);
      setTraceLogs(traceLogsData);
      setTraceLogs(traceLogsData);

      setErrorLogsBarGraphData(errorLogsBarGraphData)
      setErrorLogsGraphData(errorLogsGraphData)
      setTraceLogsGraphData(traceLogsGraphData)


      setLoading(false); // Set loading state to false after fetch
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message); // Set error state if fetch fails
      setLoading(false); // Set loading state to false on error
    }
  };
  useEffect(() => {
    if(!errorLogs){
      handleButtonClick()
    }
  }, [])
  return (
    <div className="content-area">
      {/* {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>} */}
      <AreaTop  handleButtonClick={handleButtonClick} />
      <HealthCheckTable data={healthCheckLogs?.details || []} />
      <ErrorLogTable data={errorLogs?.details || []} />
      <TraceLogsTable data={traceLogs?.details || []} />
      <AreaCharts data={{
        barChart:errorLogsBarGraphData?.details ||[],
        LineChart:errorLogsGraphData?.details ||[],
        TaceChart:traceLogsGraphData?.details ||[],
      }} />
      {/* <AreaTable title="Trace Logs"  tableData={{TABLE_HEADS:Trace_LOGs_Header,TABLE_DATA}}/> */}
    </div>
  );
};

export default Dashboard;
