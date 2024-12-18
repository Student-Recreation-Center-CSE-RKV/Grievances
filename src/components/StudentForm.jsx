import { Box, Button, TextField } from "@mui/material";
import { createGreivance } from "../utils/firebaseFunctions";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";


// eslint-disable-next-line react/prop-types
export default function StudentForm({ initialData }) {
  const [formData, setFormData] = useState({
    ...initialData,
    from: "student",
  });
  const [loading , setLoading] = useState(false);

  const sendForm = async () => {
    setLoading(true);
    try {
      const docId = await createGreivance(formData);
      console.log(`Document written with ID: ${docId}`);
      toast.success("Form submitted successfully!");
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("Failed to submit form. Please try again.");
    }
    setLoading(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    sendForm();
  };
  return (
    <>
    <div><Toaster toastOptions={{ style: {fontFamily: "Roboto, system-ui"} }}/></div>
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        label="Subject"
        variant="outlined"
        value={formData.subject}
        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
        fullWidth
        required
      />
      <TextField
        label="Enter your grievance"
        multiline
        rows={4}
        variant="outlined"
        onChange={(e) => setFormData({ ...formData, body: e.target.value })}
        fullWidth
        required
        />
      <Button type="submit" variant="contained" color="primary" disabled={loading}>
        Submit
      </Button>
    </Box>
      <div style={{ position: 'fixed', textAlign: "right",
        color: 'grey', fontSize: '0.8rem', fontFamily: 'sans-serif',
        bottom: '0', right: '0', margin: '1rem'
       }}>
        Developed by SRC
      </div>
    </>
  );
}
