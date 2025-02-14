import { yupResolver } from "@hookform/resolvers/yup";
import { Label } from "@mui/icons-material";
import { Box, Input, TextField, Typography } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
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
  const {
    control,
    formState: { errors },
  } = useForm<ClassType>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues,
  });
  return (
    <div>
      <Drawer open={open} anchor="right" onClose={() => setOpen(false)}>
        <Box sx={{ width: "350px", padding: "20px" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Add Class
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginTop: "10px ",
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
          </Box>
        </Box>
      </Drawer>
    </div>
  );
}

export { AddClassDrawer };
