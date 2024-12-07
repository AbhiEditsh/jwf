import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Container,
  Typography,
} from "@mui/material";
import theme from "../theme/theme";

const diamondData = [
  {
    point: "Meaning",
    natural:
      "Natural Diamond is found in the mine. They were found in the earth's crust during several mining processes. Natural Diamonds are not produced or grown. They are found under thousands of kilometers of the earth's surfaces.",
    lab: "Lab Grown Diamonds are not found but are made in an eco-friendly and human-friendly laboratory. Lab Grown Diamonds are made from diamond seeds with a particular process.",
  },
  {
    point: "Source",
    natural:
      "In Natural Diamond, major diamond manufacturers take mines for lease. Natural Diamond Manufacturers found rough diamonds from the mines and sold them with their profit margin.",
    lab: "Lab Grown Diamonds are made in the laboratory, so there is no discussion about the source. But, Lab Grown Diamonds are made from an ethically sourced process than Natural Diamonds.",
  },
  {
    point: "Making Process",
    natural:
      "Natural Diamonds are not made, but they are found naturally in mines. So, Natural Diamond is not made from any process.",
    lab: "Lab Grown Diamonds are made with the laboratory's HPHT and CVD-making process. Lab Diamonds are the result of technological and scientific inventions that is eco-friendly.",
  },
  {
    point: "Hardness",
    natural:
      "Natural Diamonds have scored a 10/10 Mohs scale which shows how hard it is.",
    lab: "Lab Grown Diamond has also scored 10/10 number on Mohs Scale.",
  },
  {
    point: "Appearance",
    natural:
      "Natural Diamonds have a brilliant and excellent appearance from the surfaces.",
    lab: "Lab Grown Diamonds have the same brilliant appearance as Natural Diamonds.",
  },
  {
    point: "Eco-Friendly",
    natural:
      "Natural Diamonds are found in mines from mining which is dangerous for our planet so they are not Eco-Friendly.",
    lab: "Lab Grown Diamonds are made in a laboratory that is totally Eco-Friendly and Human-Friendly.",
  },
  {
    point: "Certifications",
    natural:
      "Natural Diamonds are found in mines, and they are certified by GIA and IGI.",
    lab: "Instead of grown in the laboratory, Lab Grown Diamond is certified with IGI and GIA.",
  },
  {
    point: "Price",
    natural:
      "Natural Diamond demands more electricity, human beings, and bigger machines for digging. So, the overall cost of the Natural Diamond is very high.",
    lab: "Lab Grown Diamonds are not needed any extravagant equipment like Natural Diamond's foundation process. Lab Grown Diamonds are made in a Laboratory, so they have a 60-70% less price than Natural Diamond.",
  },
  {
    point: "Invite Calamities?",
    natural:
      "Natural Diamond demands more electricity, human beings, and bigger machines for digging. So, the overall cost of the Natural Diamond is very high.",
    lab: "Lab Grown Diamonds are not mined from the earth's crust, so Lab Diamonds are not responsible for inviting artificial calamities. But Lab Grown Diamonds decrease the risk of calamities to come on our planet.",
  },
  {
    point: "Conclusion",
    natural:
      "Natural Diamonds are not eco-friendly, and they are found from harming the natural cycle. Natural Diamonds are very costly and rare to get in your favorite engagement rings and jewelry.",
    lab: "Lab Grown Diamonds have the same appearance as Natural Diamonds; they are eco-friendly that necessary for our planet. Lab Grown Diamond has 60-70% less price than Natural Diamonds, so you can get diamond engagement rings and jewelry.",
  },
];

const benefits = [
  {
    title: "Eco-Friendly",
    description:
      "To mine 1 carat of natural diamond, 200-250 tons of land is mined, and approximately 126 gallons of water is required. In contrast, lab-grown diamonds are created in a lab, requiring only 18 gallons of water per carat.",
  },
  {
    title: "Ethically Sourced",
    description:
      "Thousands of workers are injured and exploited every year in the mining industry, leading to the term 'blood diamonds.' However, lab-grown diamonds eliminate this risk entirely.",
  },
  {
    title: "Competitively Priced",
    description:
      "Natural diamonds are grown by Mother Nature and are highly expensive. Lab-grown diamonds are 30-40% less expensive than natural diamonds.",
  },
];

const LabVsNatural = () => {
  return (
    <>
      <Box container spacing={4} sx={{ py: { xs: 2, lg: 4 } }}>
        <Container>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: { lg: "30px", md: "38px", sm: "24px", xs: "20px" },
              fontWeight: "600",
              mb: 2,
            }}
          >
            Difference Between Lab Grown Diamond Vs Natural Diamond
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Point</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Natural Diamond</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Lab Grown Diamond</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {diamondData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ color: theme.palette.primary.main }}>
                      {row.point}
                    </TableCell>
                    <TableCell>{row.natural}</TableCell>
                    <TableCell>{row.lab}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ py: { xs: 2, lg: 4 } }}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                color: theme.palette.primary.main,
              }}
            >
              Benefits of Lab Grown Diamonds
            </Typography>
            <Box sx={{ marginTop: 4 }}>
              {benefits.map((benefit, index) => (
                <Box key={index} sx={{ marginBottom: 4 }}>
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.primary.main ,
                      marginBottom: 1,
                    }}
                  >
                    {benefit.title}
                  </Typography>
                  <Typography variant="body1">{benefit.description}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default LabVsNatural;
