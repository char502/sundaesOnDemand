import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function SummaryForm() {
  const [tcChecked, setTcChecked] = useState(false);

  const checkboxLabel = (
    <label htmlFor='Ts and Cs checkbox'>
      I Agree to the <span style={{ color: 'blue' }}>Terms and Conditions</span>
    </label>
  );

  return (
    <Form>
      <Form.Group controlId='terms-and-conditions'>
        <Form.Check
          type='checkbox'
          checked={tcChecked}
          onChange={e => {
            setTcChecked(e.target.checked);
          }}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button
        variant='primary'
        type='submit'
        disabled={!tcChecked}
        /* onClick={() => console.log('confirm button clicked')} */
      >
        Confirm order
      </Button>
    </Form>
  );
}

export default SummaryForm;
