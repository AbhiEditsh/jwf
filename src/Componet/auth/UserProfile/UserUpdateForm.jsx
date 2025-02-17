import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  TextField,
  Button,
  LinearProgress,
  Avatar,
  Grid,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { updateUserProfile } from "../../../redux/actions/productActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  bio: Yup.string(),
  profession: Yup.string(),
  address: Yup.object({
    street: Yup.string(),
    city: Yup.string(),
    state: Yup.string(),
    postalCode: Yup.string(),
    country: Yup.string(),
  }),
});

const UserUpdateForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, loading, error } = useSelector((state) => state.userUpdate);
  const user = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    if (data) {
      localStorage.setItem("user", JSON.stringify(data));
      toast.success(data.message);
    } else if (error) {
      toast.error(error.message);
    }
  }, [error, data, navigate]);

  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(user.profilePicture || "");

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "user_profiles");

    try {
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/dnodeczn6/image/upload",
        formData
      );
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload failed", error);
      return null;
    }
  };

  const formik = useFormik({
    initialValues: {
      username: user?.username || "",
      email: user?.email || "",
      password: "",
      bio: user?.bio || "",
      profession: user?.profession || "",
      address: {
        street: user?.address?.street || "",
        city: user?.address?.city || "",
        state: user?.address?.state || "",
        postalCode: user?.address?.postalCode || "",
        country: user?.address?.country || "",
      },
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      let profilePictureUrl = previewImage;

      if (profileImage) {
        profilePictureUrl = await uploadImageToCloudinary(profileImage);
      }
      const formData = {
        ...values,
        profilePicture: profilePictureUrl,
      };
      dispatch(updateUserProfile(formData));
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, profilePicture: profilePictureUrl })
      );

      setSubmitting(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} textAlign="center">
          <Avatar
            src={previewImage}
            sx={{ width: 100, height: 100, margin: "auto" }}
          />
          <input
            accept="image/*"
            type="file"
            id="profileImage"
            hidden
            onChange={(event) => {
              const file = event.target.files[0];
              if (file) {
                setProfileImage(file);
                setPreviewImage(URL.createObjectURL(file));
              }
            }}
          />
          <label htmlFor="profileImage">
            <Button
              variant="outlined"
              component="span"
              startIcon={<CloudUploadIcon />}
            >
              Upload Profile Picture
            </Button>
          </label>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Password"
            type="password"
            name="password"
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Bio"
            name="bio"
            value={formik.values.bio}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Profession"
            name="profession"
            value={formik.values.profession}
            onChange={formik.handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">Address</Typography>
        </Grid>
        {Object.keys(formik.values.address).map((key) => (
          <Grid item xs={12} md={6} key={key}>
            <TextField
              fullWidth
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              name={`address.${key}`}
              value={formik.values.address[key]}
              onChange={formik.handleChange}
            />
          </Grid>
        ))}

        {loading && <LinearProgress sx={{ my: 2 }} />}
        {error && <Typography color="error">{error}</Typography>}
        <Grid item xs={12}>
          <Button type="submit" variant="outlined" disabled={loading}>
            Update
          </Button>
        </Grid>
      </Grid>
    </form>
  );           
};

export default UserUpdateForm;
