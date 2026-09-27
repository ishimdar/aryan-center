import React, { useEffect, useState } from "react";
import axios from "axios";

function Services() {
  const [services, setServices] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:1337/api/services")
//       .then(res => setServices(res.data.data))
//       .catch(err => console.error(err));
//   }, []);

  const [menu, setMenu] = useState([]);

  useEffect(() => {
  axios.get("http://localhost:1337/api/navigation-menus")
    .then(res => setMenu(res.data.data))
    .catch(err => console.error(err));
}, []);

  return (
    <div>
      <h2>Our Services</h2>
      {
        console.log('menu---', menu)
      }
      {/* <ul>
        {services.map(service => (
          <li key={service.id}>
            {service.attributes.title} - {service.attributes.description}
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default Services;
