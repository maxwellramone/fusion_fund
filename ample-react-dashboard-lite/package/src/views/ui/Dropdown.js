// import React, { useState } from 'react';
// import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
// import { startOfMonth, addWeeks, isSunday, format, isAfter, isToday, startOfWeek, subWeeks, eachDayOfInterval } from 'date-fns';

// function VariantsExample() {
//     // Get the current date
//     // const currentDate = new Date();

//     // // Set the start date to the first Sunday in August 2023
//     // const startDate = startOfMonth(new Date(2023, 7, 1)); // Note: Months are 0-indexed, so August is 7
  
//     // Generate an array of dates on every Sunday from startDate to currentDate
//     // const sundayDates = [];
//     // let currentSunday = startDate;
//     // while (!isAfter(currentSunday, currentDate) || isToday(currentSunday)) {
//     //   if (isSunday(currentSunday)) {
//     //     sundayDates.push(currentSunday);
//     //     console.log(sundayDates);
//     //   }
//     //   currentSunday = addWeeks(currentSunday, 1);

//     // import { startOfWeek, subWeeks, eachDayOfInterval, format } from 'date-fns';

//     function getLatestFiveSundays() {
//       // Get the current date
//       const currentDate = new Date();
    
//       // Find the most recent Sunday
//       const lastSunday = startOfWeek(currentDate);
    
//       // Generate an array of dates for the latest five Sundays
//       const latestFiveSundays = eachDayOfInterval({
//         start: subWeeks(lastSunday, 4),  // Subtract 4 weeks to get the latest five Sundays
//         end: lastSunday,
//       });
    
//       // Convert dates to string format
//       const dateStrings = latestFiveSundays.map(date => format(date, 'yyyy-MM-dd'));
    
//       console.log(dateStrings);
//       return dateStrings;
//     }
    
//     // Example usage:
//     // const latestFiveSundays = getLatestFiveSundays();
//     // console.log(latestFiveSundays);
    
// const sundayDates = useState(getLatestFiveSundays())
// // Example usage:
// const latestFiveSundays = getLatestFiveSundays();
// console.log(sundayDates);

//     return (
//     <>
//     <Dropdown>
//       <Dropdown.Toggle variant="success" id="dropdown-basic">
//         Dropdown Button
//       </Dropdown.Toggle>

//       <Dropdown.Menu>
//       {/* {sundayDates.length > 0 &&
//       sundayDates.map((day) => (
//         <Dropdown.Item key={day} eventKey={day}>
//           {day}
//         </Dropdown.Item>
//       ))} */}

// {sundayDates.length > 0 && sundayDates.map((option, index) => (
//           <Dropdown.Item key={index} >
//             {option}
//           </Dropdown.Item>
//         ))}

//       </Dropdown.Menu>
//     </Dropdown>

//     {/* {['Dates'].map((variant) => (
//   <DropdownButton
//     as={ButtonGroup}
//     key={variant}
//     id={`dropdown-variants-${variant}`}
//     variant={variant.toLowerCase()}
//     title={variant}
//   >
//     {sundayDates.length > 0 &&
//       sundayDates.map((day) => (
//         <Dropdown.Item key={day} eventKey={day}>
//           {day}
//         </Dropdown.Item>
//       ))}
   
//     <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
//   </DropdownButton>
// ))} */}
//         {/* {['Tech'].map(
//             (variant) => (
//              <DropdownButton
//               as={ButtonGroup}
//               key={variant}
//               id={`dropdown-variants-${variant}`}
//               variant={variant.toLowerCase()}
//               title={variant}
//           >
//             <Dropdown.Item eventKey="1"></Dropdown.Item>
//             <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
//             <Dropdown.Item eventKey="3" active>
//               Active Item
//             </Dropdown.Item>
            
//             <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
//           </DropdownButton>
//         ),
//       )} */}
//     </>
//   );
// }

// export default VariantsExample;

// // import React from 'react';
// // import { Dropdown, ButtonGroup, DropdownButton } from 'react-bootstrap';
// // import { startOfMonth, addWeeks, isSunday, format, isAfter, isToday } from 'date-fns';

// // function VariantsExample() {
// //   // Get the current date
// //   const currentDate = new Date();

// //   // Set the start date to the first Sunday in August 2023
// //   const startDate = startOfMonth(new Date(2023, 7, 1)); // Note: Months are 0-indexed, so August is 7

// //   // Generate an array of dates on every Sunday from startDate to currentDate
// //   const sundayDates = [];
// //   let currentSunday = startDate;
// //   while (isAfter(currentSunday, currentDate) || isToday(currentSunday)) {
// //     if (isSunday(currentSunday)) {
// //       sundayDates.push(currentSunday);
// //     }
// //     currentSunday = addWeeks(currentSunday, 1);
// //   }

// //   return (
// //     <>
// //       {sundayDates.map((date) => (
// //         <DropdownButton
// //           as={ButtonGroup}
// //           key={date.toString()}
// //           id={`dropdown-variants-${date}`}
// //           variant="primary"  // You can change the variant as needed
// //           title={format(date, 'MMMM do, yyyy')}
// //         >
// //           {/* You can customize the Dropdown items as needed */}
// //           <Dropdown.Item eventKey="1">Item 1</Dropdown.Item>
// //           <Dropdown.Item eventKey="2">Item 2</Dropdown.Item>
// //           <Dropdown.Item eventKey="3" active>
// //             Active Item
// //           </Dropdown.Item>
// //           <Dropdown.Divider />
// //           <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
// //         </DropdownButton>
// //       ))}
// //     </>
// //   );
// // }

// // export default VariantsExample;
import React, { useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu } from "react-bootstrap";
import { startOfMonth, addWeeks, isSunday, format, isAfter, isToday, startOfWeek, subWeeks, eachDayOfInterval } from 'date-fns';

const VariantsExample = () => {
  const [options, setOptions] = useState([
    {
      text: "Option 1",
      value: 1,
    },
    {
      text: "Option 2",
      value: 2,
    },
  ]);

  const handleChange = (e) => {
    setOptions([...options, e.target.value]);
  };
  function getLatestFiveSundays() {
          // Get the current date
          const currentDate = new Date();
        
          // Find the most recent Sunday
          const lastSunday = startOfWeek(currentDate);
        
          // Generate an array of dates for the latest five Sundays
          const latestFiveSundays = eachDayOfInterval({
            start: subWeeks(lastSunday, 4),  // Subtract 4 weeks to get the latest five Sundays
            end: lastSunday,
          });
        
          // Convert dates to string format
          const dateStrings = latestFiveSundays.map(date => format(date, 'yyyy-MM-dd'));
        
          console.log(dateStrings);

          const dateStrings2 = dateStrings.map((text, index) => ({
            text,
            value: index + 1,
          }));

          return dateStrings2;
        }
const [days,setdays] = useState (getLatestFiveSundays())
  return (
    <div>
      <Dropdown>
        <DropdownToggle variant="primary">Dropdown</DropdownToggle>
        <DropdownMenu>
          {days.map((option) => (
            <Dropdown.Item key={option.value} >{option.text}</Dropdown.Item>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default VariantsExample;