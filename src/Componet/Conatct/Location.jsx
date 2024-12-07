import { Box, Container } from "@mui/material";
import React from "react";

function Location() {
  return (
    <>
      <Box 
      sx={{
        py:{
            xs:2,
            sm:6,
        }
      }}
      >
        <Container>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.5306605781743!2d72.88494028151037!3d21.210795691449388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f1f68e54d09%3A0xe1d3d1a8bc631529!2sEditsh!5e0!3m2!1sen!2sin!4v1733545016719!5m2!1sen!2sin"
            width={'100%'}
            title="our location"
            height={450}
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Container>
      </Box>
    </>
  );
}

export default Location;
