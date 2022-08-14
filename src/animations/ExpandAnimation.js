import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const ExpandAnimation = ({ children, open }) => {
    return <section className={`${open ? "open-card" : "closed-card"}`}>{children}</section>;
};

export default ExpandAnimation;

// const ExpandAnimation = ({ children, open }) => {
//     return (
//         <AnimatePresence initial={false}>
//             {open && (
//                 <motion.section
//                     key="content"
//                     initial="collapsed"
//                     animate="open"
//                     exit="collapsed"
//                     variants={{
//                         open: { opacity: 1, height: "auto" },
//                         collapsed: {
//                             opacity: 0,
//                             height: 0,
//                             transition: {
//                                 opacity: {
//                                     duration: 0.2,
//                                 },
//                                 height: {
//                                     duration: 0.2,
//                                 },
//                             },
//                         },
//                     }}
//                     transition={{
//                         opacity: {
//                             duration: 0.2,
//                         },
//                         height: {
//                             duration: 0.2,
//                         },
//                         ease: [0.04, 0.62, 0.23, 0.98],
//                     }}
//                 >
//                     {children}
//                 </motion.section>
//             )}
//         </AnimatePresence>
//     );
// };

// export default ExpandAnimation;
