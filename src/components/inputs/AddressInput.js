import React, { useEffect } from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { useFormikContext } from "formik";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

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

const AddressInput = ({
    type,
    label,
    field, // { name, value, onChange, onBlur }
    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    form,
    ...props
}) => {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            /* Define search scope here */
        },
        debounce: 300,
    });

    const { setFieldValue } = useFormikContext();

    const ref = useOnclickOutside(() => {
        // When user clicks outside of the component, we can dismiss
        // the searched suggestions by calling this method
        clearSuggestions();
    });

    const handleInput = (e) => {
        // Update the keyword of the input element
        setValue(e.target.value);
    };

    useEffect(() => {
        setFieldValue(field.name, value);
    }, [value]);

    const handleSelect =
        ({ description }) =>
        () => {
            // When user selects a place, we can replace the keyword without request data from API
            // by setting the second parameter to "false"
            setValue(description, false);
            clearSuggestions();

            // Get latitude and longitude via utility functions
            // getGeocode({ address: description }).then((results) => {
            //     const { lat, lng } = getLatLng(results[0]);
            //     console.log("Coordinates: ", { lat, lng });
            // });
        };

    const renderSuggestions = () =>
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text },
            } = suggestion;

            return (
                <div className="address-input-suggestion" key={place_id} onClick={handleSelect(suggestion)}>
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                </div>
            );
        });

    return (
        <div ref={ref} className="address-input">
            <CustomTextField
                {...field}
                {...props}
                name={field.name}
                error={errors[field.name] && touched[field.name] && true}
                fullWidth
                variant="standard"
                type="text"
                value={value}
                onChange={handleInput}
                disabled={!ready}
            />
            {/* <input value={value} onChange={handleInput} disabled={!ready} placeholder="Where are you going?" /> */}
            {/* We can use the "status" to decide whether we should display the dropdown or not */}
            {status === "OK" && <div className="address-input-suggestions__container">{renderSuggestions()}</div>}
            {touched[field.name] && errors[field.name] && (
                <div className="input-error-message">{errors[field.name]}</div>
            )}
        </div>
    );
};

export default AddressInput;
