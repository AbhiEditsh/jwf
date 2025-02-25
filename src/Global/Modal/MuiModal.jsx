import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import loginLogo from "../../assets/image/loginlogo.png";
import { SecondaryButton } from "../Button/MuiButton";

const MuiModal = ({ open, onClose, message, onConfirm }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      BackdropProps={{
        sx: {
          backdropFilter: "blur(5px)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          textAlign: "center",
        }}
      >
        <Box>
          <img src={loginLogo} alt="login logo" style={{ width: 100 }} />
        </Box>
        <Typography variant="h6" component="h2" gutterBottom>
          {message}
        </Typography>
        <SecondaryButton onClick={onConfirm}  text={"Ok"} />
      </Box>
    </Modal>
  );
};

export default MuiModal;
