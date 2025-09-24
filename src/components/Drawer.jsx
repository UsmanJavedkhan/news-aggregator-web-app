// import { useState } from "react";
// import { Menu, X } from "lucide-react"; // X icon for remove

// export function HistoryMenu({ history, setHistory }) {
//   const [open, setOpen] = useState(false);

//   const removeHistoryItem = (index) => {
//     const updated = history.filter((_, i) => i !== index); // remove clicked item
//     setHistory(updated);
//     localStorage.setItem("newsHistory", JSON.stringify(updated)); // persist in localStorage
//   };

//   return (
//     <>
//       {/* Hamburger Button */}
//       <button
//         onClick={() => setOpen(!open)}
//         className="p-2 bg-blue-600 text-white rounded-md fixed top-6 left-4 z-50"
//       >
//         <Menu />
//       </button>

//       {/* Sidebar Drawer */}
//       <div
//         className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg transform ${
//           open ? "translate-x-0" : "-translate-x-full"
//         } transition-transform duration-300 z-40`}
//       >
//         <h2 className="text-xl font-bold p-4 mt-[60px] border-b">History</h2>
//         <ul className="p-4 space-y-3 overflow-y-auto h-[calc(100%-3rem)]">
//           {history.length === 0 && <li>No history yet</li>}
//           {history.map((item, idx) => (
//             <li
//               key={idx}
//               className="flex justify-between items-center border-b pb-2"
//             >
//               {/* Title */}
//               <a
//                 href={item.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-600 hover:underline flex-1 pr-2"
//               >
//                 {item.title}
//               </a>

//               {/* Remove Button */}
//               <button
//                 onClick={() => removeHistoryItem(idx)}
//                 className="text-red-600 hover:text-red-800"
//                 title="Remove from history"
//               >
//                 <X size={16} />
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </>
//   );
// }
"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Menu, X } from "lucide-react";

export function HistoryMenu({ history, setHistory }) {
  const [open, setOpen] = useState(false);

  const removeHistoryItem = (index) => {
    const updated = history.filter((_, i) => i !== index);
    setHistory(updated);
    localStorage.setItem("newsHistory", JSON.stringify(updated));
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Trigger Button */}
      <SheetTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="fixed top-6 left-4 z-50 rounded-full shadow-lg"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      {/* Sidebar */}
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="border-b px-4 py-3">
          <SheetTitle>History</SheetTitle>
        </SheetHeader>

        {/* Scrollable History List */}
        <ScrollArea className="h-[calc(100vh-60px)] px-4 py-3">
          {history.length === 0 && (
            <p className="text-sm text-muted-foreground">No history yet</p>
          )}
          <ul className="space-y-3">
            {history.map((item, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center border-b pb-2"
              >
                {/* Link to news */}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex-1 pr-2 text-sm"
                >
                  {item.title}
                </a>

                {/* Remove Button */}
                <button
                  onClick={() => removeHistoryItem(idx)}
                  className="text-red-500 hover:text-red-700 transition"
                  title="Remove from history"
                >
                  <X size={16} />
                </button>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
