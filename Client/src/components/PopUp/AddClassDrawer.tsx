import { yupResolver } from "@hookform/resolvers/yup";
import { Label } from "@mui/icons-material";
import * as React from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import axios from "axios";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";
import { UserContext } from "@CampusLink/core";
interface AddClassDrawerType {
  open: boolean;
  setOpen: (e: boolean) => void;
}
interface ClassType {
  subj: string;
  course: string;
  semester: string;
}
const defaultValues: ClassType = {
  subj: "",
  course: "",
  semester: "",
};

const schema = yup.object().shape({
  subj: yup.string().trim().required("Subject Name is Required"),
  course: yup.string().required("Please Select the Course"),
  semester: yup.string().required("Please Select the Semester"),
});
function AddClassDrawer(props: AddClassDrawerType) {
  const { open, setOpen } = props;
  const { refresh, setrefresh } = React.useContext(UserContext);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ClassType>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues,
  });

  const onSubmit: SubmitHandler<ClassType> = async (data) => {
    try {
      const response = await axios.post("/class", data);
      console.log('response::::' , response)
      if (response.status === 200) {
        toast.success("Class Added");
        setrefresh(!refresh);
        setOpen(false);
      } else {
        toast.error("Failed to Add Class");
      }
    } catch (error) {
      console.error("Error creating class:", error);
    }
  };
  return (
    <div>
      <Drawer open={open} anchor="right" onClose={() => setOpen(false)}>
        <Box sx={{ width: "350px", padding: "20px" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Add Class
          </Typography>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "10px ",
              gap: "10px",
            }}
          >
            <Controller
              name="subj"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  aria-label="subject-input"
                  value={value}
                  onChange={onChange}
                  placeholder="Enter Subject Name here ..."
                  label="Subject Name"
                  variant="standard"
                />
              )}
            />
            {errors?.subj && (
              <Typography sx={{ color: "red" }}>
                {errors?.subj?.message}
              </Typography>
            )}

            <Controller
              name="course"
              control={control}
              render={({ field: { value, onChange } }) => (
                <FormControl variant="standard">
                  <InputLabel id="course-label">Course</InputLabel>
                  <Select
                    labelId="course-label-id"
                    id="course-id"
                    value={value}
                    onChange={onChange}
                    label="Course"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="B.Tech">B.Tech</MenuItem>
                    <MenuItem value="BCA">BCA</MenuItem>
                    <MenuItem value="B.Sc">B.Sc</MenuItem>
                    <MenuItem value="M.Sc">M.Sc</MenuItem>
                    <MenuItem value="MCA">MCA</MenuItem>
                    <MenuItem value="M.Tech">M.Tech</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            {errors?.course && (
              <Typography sx={{ color: "red" }}>
                {errors?.course?.message}
              </Typography>
            )}

            <Controller
              name="semester"
              control={control}
              render={({ field: { value, onChange } }) => (
                <FormControl variant="standard">
                  <InputLabel>Semester</InputLabel>
                  <Select value={value} onChange={onChange} label="Semester">
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="1st">1st</MenuItem>
                    <MenuItem value="2nd">2nd</MenuItem>
                    <MenuItem value="3rd">3rd</MenuItem>
                    <MenuItem value="4th">4th</MenuItem>
                    <MenuItem value="5th">5th</MenuItem>
                    <MenuItem value="6th">6th</MenuItem>
                    <MenuItem value="7th">7th</MenuItem>
                    <MenuItem value="8th">8th</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            {errors?.semester && (
              <Typography sx={{ color: "red" }}>
                {errors?.semester?.message}
              </Typography>
            )}

            <Button type="submit" sx={{ marginTop: "5px" }} variant="contained">
              Submit
            </Button>
          </form>
        </Box>
      </Drawer>
    </div>
  );
}

export { AddClassDrawer };
