import React from "react";
import { useForm, Controller } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import CardFormProps from "../types/CardFormProps";
import { CardWithAction } from "../../card-with-action";

const CardForm: React.FC<CardFormProps> = ({
  title,
  buttonTiles,
  initialValues,
  onSubmit,
  fields,
  Footer,
}) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: initialValues,
  });
  const Body = () => {
    let elements = [];
    for (let i = 0; i < fields.length; i++) {
      if (fields[i].type === "radio") {
        elements.push(
          <Controller
            key={"cardform-" + title + "-" + i}
            name={fields[i].name}
            control={control}
            rules={fields[i].rules}
            render={({ field, fieldState: { error } }) => (
              <FormControl key={"cardform-" + title + "-" + i} error={!!error}>
                <FormLabel id={"cardform-" + title + "-" + i + "label"}>
                  {fields[i].placeholder}
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby={"cardform-" + title + "-" + i + "label"}
                  {...field}
                >
                  {fields[i].children}
                </RadioGroup>
                {error && <FormHelperText>{error.message}</FormHelperText>}
              </FormControl>
            )}
          />
        );
      }
      if (fields[i].type === "text" || fields[i].type === "password") {
        elements.push(
          <Controller
            key={"cardform-" + title + "-" + i}
            name={fields[i].name}
            control={control}
            rules={fields[i].rules}
            render={({ field, fieldState: { error } }) => (
              <>
                <TextField
                  type={fields[i].type}
                  error={!!error}
                  label={error ? error.message : fields[i].placeholder}
                  {...field}
                  sx={{ margin: "5px", width: "100%" }}
                />
              </>
            )}
          />
        );
      }
    }
    return <>{elements}</>;
  };
  const Actions = () => {
    return (
      <>
        <Button variant="contained" size="small" type={"submit"}>
          {buttonTiles}
        </Button>
      </>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardWithAction
        Actions={Actions}
        Body={Body}
        title={title}
        Footer={Footer}
      />
    </form>
  );
};
export default CardForm;
