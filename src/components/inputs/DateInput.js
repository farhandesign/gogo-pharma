import React from "react";
import { styled } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import CakeIcon from "@mui/icons-material/Cake";

const CustomTextField = styled(TextField)({
    "& label.Mui-focused": {
        color: "#3A719B",
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: "#3A719B",
    },

    "& .MuiInputBase-input": {
        fontSize: 16,
        borderColor: "#3A719B",
        color: "#0B2B5B",
        fontFamily: ["Montserrat", "sans-serif"].join(","),
    },
});

const DateInput = ({ field, form, ...other }) => {
    return (
        <div className="text-field__input">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                    {...other}
                    inputFormat="yyyy/MM/dd"
                    disableFuture
                    name={field.name}
                    value={field.value}
                    onChange={(date) => form.setFieldValue(field.name, date.toISOString(), false)}
                    renderInput={(params) => (
                        <CustomTextField
                            error={form.errors[field.name] && form.touched[field.name] && true}
                            fullWidth
                            variant="standard"
                            id="outlined-error-helper-text"
                            // helperText="Date of Birth"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start" sx={{ color: "#B8C7CC" }}>
                                        <CakeIcon fontSize="16px" color="inherit" />
                                    </InputAdornment>
                                ),
                                ...params.inputProps,
                                placeholder: "Date of Birth*",
                            }}
                        />
                    )}
                    // renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            {form.touched[field.name] && form.errors[field.name] && (
                <div className="input-error-message">{form.errors[field.name]}</div>
            )}
        </div>
    );
};

export default DateInput;
