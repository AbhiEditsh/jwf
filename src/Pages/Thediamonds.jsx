import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import theme from "../theme/theme";
import carat from "../assets/image/carat.jpg";
import clarity from "../assets/image/Clarity.jpg";
import colors from "../assets/image/color.jpg";
import cut from "../assets/image/cut.jpg";
import DaimondShape from "../assets/image/diamond-shape.jpg";
function Thediamonds() {
  const clarityData = [
    {
      grade: "VVS1",
      description: "Very Very Slightly Included 1",
      details:
        "Usually just one tiny inclusion visible only to a trained eye under 10x magnification.",
    },
    {
      grade: "VVS2",
      description: "Very Slightly Very Included 2",
      details:
        "Tiny inclusions visible only to a trained eye under 10x magnification.",
    },
    {
      grade: "VS1",
      description: "Very Slightly Included 1",
      details: "Very small inclusions visible with 10x magnification.",
    },
    {
      grade: "VS2",
      description: "Very Slightly Included 2",
      details: "Several very small inclusions visible with 10x magnification.",
    },
    {
      grade: "SI1",
      description: "Slightly Included 1",
      details: "Small inclusions visible with 10x magnification.",
    },
    {
      grade: "SI2",
      description: "Slightly Included 2",
      details: "Several small inclusions visible with 10x magnification.",
    },
    {
      grade: "I1",
      description: "Included 1",
      details: "Flaws that are visible to the naked eye.",
    },
    {
      grade: "I2",
      description: "Included 2",
      details:
        "Many flaws clearly visible to the naked eye that also decrease the brilliance.",
    },
    {
      grade: "I3",
      description: "Included 3",
      details:
        "Many flaws clearly visible to the naked eye which decrease the brilliance and compromise the structure of the diamond, making it more easily cracked or chipped.",
    },
  ];
  const color = [
    {
      grade: "D",
      description: "Absolutely Colorless",
      details: "The highest color grade, which is extremely rare.",
    },
    {
      grade: "E",
      description: "Colorless",
      details:
        "Only minute traces of color can be detected by a gemologist, a rare diamond.",
    },
    {
      grade: "F",
      description: "Colorless",
      details:
        'Slight color detected by an expert gemologist, but still considered a "colorless" grade. A high-quality diamond.',
    },
    {
      grade: "G-H",
      description: "Near-Colorless",
      details:
        "Color noticeable when compared to diamonds of better grades, but these grades offer excellent value.",
    },
    {
      grade: "I",
      description: "Near-Colorless",
      details: "Color slightly detectable. An excellent value.",
    },
  ];

  return (
    <>
      <Box sx={{ mt: { sm: 2, xs: 4 } }}>
        <Container>
          <Box>
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: { lg: "40px", md: "34px", sm: "24px", xs: "28px" },
                fontWeight: "600",
                mb: 2,
              }}
              data-aos="zoom-in"
              data-aos-duration="2000"
            >
              The 4 C's of Diamonds
            </Typography>
            <Typography sx={{ textAlign: "center" }}>
              To simplify diamond grading, the 4Cs refer to cut, color, clarity,
              and carat weight - a universal language developed in collaboration
              with the International Gemological Institute (IGI).
            </Typography>
            <Box sx={{ py: 3 }}>
              <Typography sx={{ fontWeight: "700" }} variant="h5">
                What Are the Four Cs of Diamonds?
              </Typography>
              <Typography sx={{ color: theme.palette.grey.main, my: 2 }}>
                Before purchasing a diamond, it is critical to understand how to
                ensure you are getting what you pay for. Understanding how the
                value of a diamond is determined will also help you make
                trade-offs. You might prefer a larger stone with less clarity or
                minor flaws over a flawless but much smaller stone.
              </Typography>
              <Typography sx={{ color: theme.palette.grey.main }}>
                These four diamond qualities are the most important factors
                influencing its beauty and structure. The combination of these
                factors determines a diamond’s relative rarity and value. Within
                the diamond, the 4Cs interact with one another. They determine
                how the diamond appears and its quality. For example, the
                ability of a diamond to reflect light to your eyes is determined
                primarily by cut quality but also by color and clarity.
              </Typography>
            </Box>
          </Box>

          {/* Carat */}
          <Box>
            <Box sx={{ py: 3 }}>
              <Typography sx={{ fontWeight: "700" }} variant="h5">
                Carat
              </Typography>
              <Typography sx={{ color: theme.palette.grey.main, my: 2 }}>
                The first of the four C’s that most people learn about is the
                carat weight, which is also the best indicator of a diamond’s
                size.
              </Typography>
              <Typography sx={{ color: theme.palette.grey.main }}>
                The weight of a diamond is measured in carats. The weight is
                rounded to two decimal places. One carat is equal to 0.2 grams.
                A half carat (0.50 carat) is thus equivalent to 0.10 grams. In
                contrast, 1 gram equals 5.00 carat. The greater the carat
                weight, the more unique the diamond and, as a result, the
                greater the price.
              </Typography>
              <Box sx={{ py: 3 }} data-aos="zoom-in" data-aos-duration="2000">
                <img src={carat} alt="Carat=image" width={`100%`} />
              </Box>
            </Box>
          </Box>

          {/* Clarity */}
          <Box>
            <Box sx={{ py: 3 }}>
              <Typography sx={{ fontWeight: "700" }} variant="h5">
                Clarity
              </Typography>
              <Typography sx={{ color: theme.palette.grey.main, my: 2 }}>
                The clarity of a diamond is determined by its inherent
                inclusions, typically tiny in size. According to expert
                analysts, the clarity of a diamond is determined by the defects
                associated with it. Contrary to popular belief, many specialists
                in diamond extraction and cutting agree that the clarity of such
                precious stones is strongly tied to the purity and rarity
                element associated with such assets.
              </Typography>
              <Typography sx={{ color: theme.palette.grey.main }}>
                When evaluating the clarity of a diamond, gemologists can be an
                excellent choice. A gemmologist thoroughly examines the product
                qualities and magnifies the product to note the clarity linked
                with the costly stone.
              </Typography>
              <Box sx={{ py: 3 }} data-aos="zoom-in" data-aos-duration="2000">
                <img src={clarity} alt="Carat=image" width={`100%`} />
              </Box>
              <Box>
                <TableContainer
                  component={Paper}
                  sx={{ maxWidth: "100%", margin: "auto", marginTop: 4 }}
                >
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>Grade</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Description
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Details
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {clarityData.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>{row.grade}</TableCell>
                          <TableCell>{row.description}</TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            {row.details}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </Box>

          {/* Carat */}
          <Box>
            <Box sx={{ py: 3 }}>
              <Typography sx={{ fontWeight: "700" }} variant="h5">
                Color
              </Typography>
              <Typography sx={{ color: theme.palette.grey.main, my: 2 }}>
                Diamonds are found in every color of the rainbow. The finest
                colour for a diamond is none at all or something that cannot be
                seen. Most people, however, are preoccupied with diamonds that
                are white or clear in color.
              </Typography>
              <Typography sx={{ color: theme.palette.grey.main }}>
                Light can easily flow through a colorless diamond, resulting in
                light dispersion as a rainbow’s hue. Colors range from entirely
                colorless to pale yellow. Differences between diamond grades are
                relatively subtle; therefore, grading is done under limited
                lighting, and color grading diamonds requires a skilled eye and
                many years of practice.
              </Typography>
              <Box sx={{ py: 3 }} data-aos="zoom-in" data-aos-duration="2000">
                <img src={colors} alt="color-image" width={`100%`} />
              </Box>
              <Box>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Grade</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Details</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {color.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>{row.grade}</TableCell>
                          <TableCell>{row.description}</TableCell>
                          <TableCell>{row.details}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </Box>

          {/* CUt */}
          <Box>
            <Box sx={{ py: 3 }}>
              <Typography sx={{ fontWeight: "700" }} variant="h5">
                Cut
              </Typography>
              <Typography sx={{ color: theme.palette.grey.main, my: 2 }}>
                The Diamond Cut Scale contains five grades ranging from Poor to
                Excellent. The cut grade of a diamond directly impacts its
                beauty; if a diamond is cut and polished correctly, it will have
                a much more desirable appearance, even when compared to diamonds
                of higher color and clarity grades.
              </Typography>
              <Box sx={{ py: 3 }} data-aos="zoom-in" data-aos-duration="2000">
                <img src={cut} alt="Cut=image" width={`100%`} />
              </Box>
            </Box>
          </Box>

          {/* Daimond Shape */}
          <Box>
            <Box sx={{ py: 3 }}>
              <Typography sx={{ fontWeight: "700" }} variant="h5">
                Diamond Shapes
              </Typography>
              <Box sx={{ py: 3 }} data-aos="zoom-in" data-aos-duration="2000">
                <img src={DaimondShape} alt="Daimond_shape" width={`100%`} />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Thediamonds;
