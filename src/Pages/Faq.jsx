import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Container,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add"; // Plus icon
import RemoveIcon from "@mui/icons-material/Remove"; // Minus icon

const FAQs = () => {
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();

  // Array of FAQ objects
  const faqData = [
    {
      id: "panel1",
      question: "What is today's Gold Rate in Surat?",
      answer:
        "Call or WhatsApp us to know today's gold rate in Surat and also get current 22 & 24 Carat gold prices for 1 gram to 10 grams.",
    },
    {
      id: "panel2",
      question: "Do you make custom jewellery?",
      answer:
        "Yes, we specialize in crafting bespoke jewellery tailored to your unique preferences.",
    },
    {
      id: "panel3",
      question: "Are your products made out of real gold and diamonds?",
      answer:
        "Absolutely, all our products at [xyz Jewellers] are crafted from hallmarked gold and certified Type IIA lab-grown diamonds. We also provide a BSI Hallmark certificate.",
    },
    {
      id: "panel4",
      question: "Do you sell Gold nazariya for babies?",
      answer:
        "Yes, we have a collection of over 10,000 Gold nazariya for babies and silver nazariya for babies. Check out our latest collection!",
    },
  ];

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box
      sx={{
        py: {
          xs: 4,
          sm: 8,
        },
      }}
    >
      <Container>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: { lg: "40px", md: "34px", sm: "24px", xs: "28px" },
            fontWeight: "600",
            py: 4,
          }}
        >
          Top Customer Questions
        </Typography>

        {faqData.map((faq) => (
          <Accordion
            key={faq.id}
            expanded={expanded === faq.id}
            onChange={handleChange(faq.id)}
          >
            <AccordionSummary
              expandIcon={
                expanded === faq.id ? (
                  <RemoveIcon style={{ color: theme.palette.primary.main }} />
                ) : (
                  <AddIcon />
                )
              }
              aria-controls={`${faq.id}-content`}
              id={`${faq.id}-header`}
              sx={{
                my:2,
              
              }}
            >
              <Typography
                style={{
                  color:
                    expanded === faq.id
                      ? theme.palette.primary.main
                      : "inherit",
                  fontWeight: expanded === faq.id ? "bold" : "normal",
                }}
              >
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
};

export default FAQs;
