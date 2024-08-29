// "use client"
// import { useState } from "react";
// import { FaUser } from "react-icons/fa";
// import { FaUnlockAlt } from "react-icons/fa";
// import { RxCross2 } from "react-icons/rx";
// import { FaHand } from "react-icons/fa6";
// import { toggleSignMethod } from "../store/signMethodStore";
// import { useDispatch } from "react-redux";
// import { useLoginUser } from "../hooks/useLoginUser";

// const LoginModal = () => {
//     const [email,setEmail]=useState('');
//     const [password,setPassword]=useState('');

//     const loginUser=useLoginUser(email,password);
//     const dispatch=useDispatch();

//   return (
//     <div className="h-screen">
//       <div className=" w-1/2 bg-[#121212] border border-white">
//         <div className="flex justify-end p-2 px-2">
//           <RxCross2
//             className="text-slate-400 h-6 w-6 hover:text-slate-300 cursor-pointer 
//             hover;h-7 hover:w-7"
//             onClick={() => dispatch(toggleSignMethod(null))}
//           />
//         </div>
//         <div className="flex gap-4 items-center justify-center">
//           <p className="text-4xl font-semibold font-mono tracking-wide text-slate-300">WELCOME BACK</p>
//           <FaHand className="text-yellow-300 w-8 h-8" />
//         </div>
//         <div className=" flex flex-col gap-6 items-center border-2 border-red-600">
//           <div className="flex items-center h-11 w-3/5 border border-slate-500 rounded-sm">
//             <FaUser className="text-white h-full w-12 p-2 px-3 bg-slate-700" />
//             <input
//               className="w-full h-full p-1 px-4 text-slate-200 placeholder:text-slate-400
//                     bg-[#252424] rounded-md focus:outline-0"
//               type="email"
//               placeholder="Enter email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div className="flex items-center h-11 w-3/5 border border-slate-500 rounded-sm">
//             <FaUnlockAlt className="text-white h-full w-12 p-2 px-3 bg-slate-700" />
//             <input
//               className="w-full h-full p-1 px-4 text-slate-200 placeholder:text-slate-400
//                     bg-[#252424] rounded-md focus:outline-0"
//               type="password"
//               placeholder="Enter Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//         </div>
//         <button
//           className="bg-slate-200 text-xl font-medium rounded-sm w-3/5 p-2 
//         tracking-wider "
//           onClick={() => {
//             loginUser();
//           }}
//         >
//           LOGIN
//         </button>
//         <p className="text-slate-300 text-lg mt-4">
//           Don't have an Account ?
//           <span
//             className="font-medium text-slate-200 hover:underline cursor-pointer"
//             onClick={() => {
//               dispatch(toggleSignMethod("signup"));
//             }}
//           >
//             {" "}
//             Signup now
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginModal;







"use client";
import { useState } from "react";
import { FaHand } from "react-icons/fa6";

import { FaUser, FaUnlockAlt} from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { toggleSignMethod } from "../store/signMethodStore";
import { useDispatch } from "react-redux";
import { useLoginUser } from "../hooks/useLoginUser";

const LoginModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = useLoginUser(email, password);
  const dispatch = useDispatch();

  return (
    <div className="fixed w-screen inset-0 backdrop-blur-md flex items-center justify-center">
      <div className="w-full rounded-lg shadow-lg p-6 px-12 flex justify-center">
        <div className="w-2/3 bg-[#121212] border flex flex-col items-center p-2 gap-2">

        <div className="w-full flex justify-end p-2">
          <RxCross2
            className="text-slate-400 h-6 w-6 hover:text-slate-300 cursor-pointer hover:h-7 hover:w-7"
            onClick={() => dispatch(toggleSignMethod(null))}
          />
        </div>
        <div className="flex gap-4 items-center justify-center mb-6">
          <p className="text-4xl font-semibold font-mono tracking-wide text-slate-300">WELCOME BACK</p>
          {/* <FaHand className="text-yellow-300 w-8 h-8" /> */}
        </div>
        <div className="w-full flex flex-col gap-6 items-center px-5">
          <div className="flex items-center h-11 w-full border border-slate-500 rounded-sm">
            {/* <FaUser className="text-white h-full w-12 p-2 px-3 bg-slate-700" /> */}
            <input
              className="w-full h-full p-2 px-4 text-slate-200 placeholder:text-slate-200 bg-[#252424] rounded-md focus:outline-0"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center h-11 w-full border border-slate-500 rounded-sm">
            {/* <FaUnlockAlt className="text-white h-full w-12 p-2 px-3 bg-slate-700" /> */}
            <input
              className="w-full h-full p-2 px-4 text-slate-700 placeholder:text-slate-200 bg-[#252424] rounded-md focus:outline-0"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button
          className="bg-slate-200 text-slate-300 border border-slate-400 text-xl font-medium rounded-sm w-3/5 p-2 tracking-wider mt-6"
          onClick={() => {
            loginUser();
          }}
        >
          LOGIN
        </button>
        <p className="text-slate-300 text-lg mt-4">Do not have an Account?<span
            className="font-medium text-slate-200 hover:underline cursor-pointer"
            onClick={() => {
              dispatch(toggleSignMethod("signup"));
            }}
          >
            {" "}
            Signup now
          </span>
        </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
