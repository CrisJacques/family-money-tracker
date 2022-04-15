import RequiredFieldAlert from "../components/RequiredFieldAlert";

const requiredValidation = (value) => {
    if (!value) {
      return (
        <RequiredFieldAlert />
      );
    }
  };

  export default requiredValidation;