import Col from 'react-bootstrap/Col';

function ToppingOption({ name, imagePath }) {
  return (
    <Col xs={6} sm={6} md={2} lg={2} style={{ textAlign: 'center' }}>
      <div>
        <img
          style={{ width: '75%' }}
          src={`http://localhost:3030/${imagePath}`}
          alt={`${name} topping`}
        />
      </div>
      <div>{name}</div>
    </Col>
  );
}

export default ToppingOption;
