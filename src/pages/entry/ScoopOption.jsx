import Col from 'react-bootstrap/Col';

function ScoopOption({ name, imagePath }) {
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      This is the Options Component
      <div>
        <img
          style={{ width: '75%' }}
          src={`http://localhost:3030/${imagePath}`}
          alt={`${name} scoop`}
        />
      </div>
      <div>
        <p>{name}</p>
      </div>
    </Col>
  );
}

export default ScoopOption;