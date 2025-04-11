// import React, { useEffect, useState } from 'react';
// import { getTransactions } from '../../services/api';

// const TransactionList = () => {
//   const [transactions, setTransactions] = useState([]);

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const data = await getTransactions();
//         setTransactions(data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchTransactions();
//   }, []);

//   return (
//     <div>
//       <h2>Transactions</h2>
//       <ul>
//         {transactions.map((transaction) => (
//           <li key={transaction.id}>
//             {transaction.description} - {transaction.amount}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TransactionList;