const CustomSwitch = ({ label }) => {
  return (
    <div>
      <Form>
        <Form.Check type="switch" id="custom-switch" label={label} />
      </Form>
    </div>
  );
};

export default CustomSwitch;
