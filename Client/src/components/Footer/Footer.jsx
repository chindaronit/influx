import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { GitHub, LinkedIn, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";
import "./Footer.css";

const Footer = () => {
  return (
      <Box
        component="footer"
        sx={{
          backgroundColor: "black",
          borderRadius: "0.5rem",
          padding: "2rem",
          borderTop: "2px solid rgba(255,255,255)",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" color="rgba(255,255,255)" gutterBottom>
                About Us
              </Typography>
              <Typography variant="body2" color="rgba(255,255,255,0.7)">
                Hey! I'm Ronit Chinda, UnderGrad at IIIT Guwahati, India.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" color="rgba(255,255,255)" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body2" color="rgba(255,255,255,0.7)">
                Email: ronitchinda100@gmail.com
              </Typography>
              <Typography variant="body2" color="rgba(255,255,255,0.7)">
                Phone: +91 7988224882
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" color="rgba(255,255,255)" gutterBottom>
                Follow Us
              </Typography>
              <Link href="https://github.com/chindaronit" color="inherit">
                <GitHub />
              </Link>
              <Link
                href="https://www.linkedin.com/in/chindaronit/"
                color="inherit"
                sx={{ pl: 1, pr: 1 }}
              >
                <LinkedIn />
              </Link>
              <Link href="https://twitter.com/ChindaRonit" color="inherit">
                <Twitter />
              </Link>
            </Grid>
          </Grid>
          <Box mt={5}>
            <Typography
              variant="body2"
              color="rgba(255,255,255,0.7)"
              align="center"
            >
              {"Copyright © "}
              <Link
                color="inherit"
                href="https://chindaronit.github.io/"
                style={{ textDecoration: "none", fontWeight: "bold" }}
              >
                chinda_ronit
              </Link>{" "}
              {new Date().getFullYear()}
              {"."}
            </Typography>
          </Box>
        </Container>
      </Box>
  );
};

export default Footer;
