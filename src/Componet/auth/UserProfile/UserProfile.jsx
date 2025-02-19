import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Container,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Spin, Alert } from "antd";
import UserUpdateForm from "./UserUpdateForm";
import UserReviews from "./UserReviews";
import { getUserProfile } from "../../../redux/actions/productActions";

const UserProfile = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfile);
  const { loading, error, data } = userProfile;
  const userId=JSON.parse(localStorage.getItem("user"))._id;
  useEffect(() => {
    dispatch(getUserProfile(userId));
  }, [dispatch]);
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  return (
    <Container>
      {loading && <Spin />}
      {error && (
        <Alert message="Error" description={error} type="error" showIcon />
      )}
      <Box>
        <Grid container spacing={2} row justifyContent={"center"}>
          <Grid item xs={12} md={4} lg={3}>
            <Box
              sx={{
                p: 2,
                boxShadow: 2,
                borderRadius: "10px",
                textAlign: "center",
              }}
            >
              {data && (
                <>
                  <Avatar
                    alt={data.user.username}
                    src={data?.user?.profilePicture}
                    sx={{ width: 100, height: 100, margin: "auto" }}
                  />
                  <Typography variant="h6">{data.user.username}</Typography>
                  <Typography variant="h6">{data.user.email}</Typography>
                  <Typography variant="body2">
                    {data.user.profession}
                  </Typography>
                  <Typography variant="body2">
                    {data.user?.address?.street} {data.user?.address?.city},{" "}
                    {data.user?.address?.state},{" "}
                    {data.user?.address?.postalCode},{" "}
                    {data.user?.address?.country}
                  </Typography>
                </>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} md={8} lg={9}>
            <Tabs
              value={tabIndex}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Dashboard" />
              <Tab label="Orders" />
              <Tab label="Reviews" />
            </Tabs>
            <Box sx={{ p: 2, boxShadow: 2, borderRadius: "10px", mt: 2 }}>
              {tabIndex === 0 && (
                <Typography variant="h5" sx={{ textAlign: "center", my: 2 }}>
                  Welcome to your Dashboard!
                  <UserUpdateForm />
                </Typography>
              )}
              {tabIndex === 1 && (
                <Typography variant="body1">Here are your orders.</Typography>
              )}
              {tabIndex === 2 && <UserReviews userId={data.user._id}/>}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default UserProfile;
