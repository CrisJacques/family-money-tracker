import RequiredFieldAlert from "../components/RequiredFieldAlert";

const requiredValidation = (value, saveButtonClicked) => {
  if (saveButtonClicked) {
    if (!value) {
      return (
        <RequiredFieldAlert />
      );
    }
  }
  };

  export default requiredValidation;