import Carousel from 'react-bootstrap/Carousel';
import Menu from '../Menu/Menu';
import { Card } from 'react-bootstrap';

const Home = () => {
  return (
    <>
    <Menu></Menu>

    <div style={{width:'100vw',display:'flex', justifyContent:'center', alignItems:'center'}}>
    <Carousel>
      <Carousel.Item>
      <img style={{width:'100vw'}}
          className="d-block"
          src="https://feedbackstore.com.mx/cdn/shop/files/DSC1439_1300x.progressive.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
      <img style={{width:'100vw'}}
          className="d-block"
          src="img/tienda2.jpeg"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
      <img style={{width:'100vw'}}
          className="d-block"
          src="img/tienda1.jpeg"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
    </div>
    <div>
    <Card>
      <Card.Body>Musical Hendrix es una tienda de instrumentos musicales con ya más de 15 años de 
experiencia. Tenemos el conocimiento y la capacidad como para informarte acerca de las 
mejores elecciones para tu compra musical.
</Card.Body>
    </Card>
    </div>
    </>
  )
}

export default Home
