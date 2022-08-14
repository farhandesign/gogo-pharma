import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import CakeIcon from "@mui/icons-material/Cake";
import TranslateIcon from "@mui/icons-material/Translate";
import PhoneIcon from "@mui/icons-material/Phone";

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

const getIcon = (name) => {
    const iconProps = {
        fontSize: "16px",
        color: "inherit",
    };

    if (name === "first_name" || name === "last_name") {
        return <AccountCircle {...iconProps} />;
    }
    if (name === "date_of_birth") {
        return <CakeIcon {...iconProps} />;
    }
    if (name === "contact_language") {
        return <TranslateIcon {...iconProps} />;
    }
    if (name === "phone") {
        return <PhoneIcon {...iconProps} />;
    }
    if (name === "email") {
        return <EmailIcon {...iconProps} />;
    }
};

const TextFieldInput = ({
    type,
    label,
    field, // { name, value, onChange, onBlur }
    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    form,
    ...props
}) => {
    // if (field.name === "first_name") {
    //     if (field.value !== "") {
    //         console.log("Field Value", field.value);
    //         setfirstname(field.value);
    //     }
    //     if (field.value === "") {
    //         setfirstname("New Referral");
    //     }
    // }
    // if (field.name === "last_name") {
    //     if (field.value !== "") {
    //         console.log("Field Value", field.value);
    //         setlastname(field.value);
    //     }
    //     if (field.value === "") {
    //         setlastname("");
    //     }
    // }
    return (
        <div className="text-field__input">
            <CustomTextField
                {...field}
                {...props}
                fullWidth
                variant="standard"
                name={field.name}
                type={props.type}
                error={errors[field.name] && touched[field.name] && true}
                id="outlined-error-helper-text"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start" sx={{ color: "#B8C7CC" }}>
                            {getIcon(field.name)}
                        </InputAdornment>
                    ),
                }}
            />
            {touched[field.name] && errors[field.name] && (
                <div className="input-error-message">{errors[field.name]}</div>
            )}
        </div>
    );
};

export default TextFieldInput;
