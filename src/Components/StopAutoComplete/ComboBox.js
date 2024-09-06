import * as React from "react";
import TextField from "@mui/material/TextField";

import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Autocomplete } from "@mui/material";

export default function ComboBox(props) {
  const [stopList, setStopList] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const ticketDataRef = collection(db, "Bus_Stop");
        let filtered = await getDocs(ticketDataRef);
        filtered = filtered.docs.map((doc) => ({
          stop_name: doc.data().stop_name,
          stop_id: doc.data().Stop_id,
          latitude: parseFloat(doc.data().lat),
          longitude: parseFloat(doc.data().lon),
        }));
        setStopList(filtered);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const StopChange = (event, value) => {
    props.stopUpdate(value);
    //console.log('Selected Stop', value);
  };

  return (
    <Autocomplete
      disablePortal
      options={stopList}
      getOptionLabel={(option) => option.stop_name}
      onChange={StopChange}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={props.label} />}
    />
  );
}
