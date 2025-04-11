// import React, { useEffect, useState } from 'react';
// import { getAccounts } from '../../services/api';

// const AccountList = () => {
//   const [accounts, setAccounts] = useState([]);

//   useEffect(() => {
//     const fetchAccounts = async () => {
//       try {
//         const data = await getAccounts();
//         setAccounts(data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchAccounts();
//   }, []);

//   return (
//     <div>
//       <h2>Accounts</h2>
//       <ul>
//         {accounts.map((account) => (
//           <li key={account.id}>
//             {account.account_name} - {account.account_balance}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AccountList;