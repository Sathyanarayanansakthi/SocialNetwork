import { useState } from "react";
import { Button } from "@mui/material";
import ForumCreation from "./ForumCreation"; // Import ForumCreation

const ForumNavbar = () => {
  const [open, setOpen] = useState(false); // State to control popup visibility

  return (
    <nav className="p-4 border-b bg-blue-700 rounded-md m-9">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">Forum</h2>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpen(true)}
          sx={{ backgroundColor: "white", color: "black", "&:hover": { backgroundColor: "lightgray" } }}
        >
          Create a Forum
        </Button>
      </div>

      {/* Popup Form */}
      <ForumCreation open={open} handleClose={() => setOpen(false)} />
    </nav>
  );
};

export default ForumNavbar;
