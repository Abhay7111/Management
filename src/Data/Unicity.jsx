import axios from "axios";
import { useEffect, useState } from "react";

const unicity = () => {
     const Api = 'https://server-01-v2cx.onrender.com/postunicity'
     const [Unicity, setUnicity] = useState([]);
     const [Loading, setLoading] = useState(true);
     const [Error, setError] = useState(null);

     useEffect(() => {
          const fetchunicity = async () => {
               try {
                    const responce = await axios.get(Api);
                    if (responce.data?.length > 0){
                         setUnicity(responce.data);
                    }
               } catch (err) {
                         setError(err);
                    }
                 finally {
                         setLoading(false);
                    }
          };
          fetchunicity();
     }, []);
     return { Unicity, Loading, Error};
}

export { unicity }