import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import {
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardFooter,
  MDBIcon,
} from 'mdb-react-ui-kit';
import './Index.css';

interface Values {
  texto: string;
}

const Box: React.FC = () => {
  const [values, setValues] = useState<Values>({ texto: '' });
  const [messageIa, setMessageIa] = useState<string>();

  const handleButton = () => {
    axios.post('http://localhost:3001/', {
      texto: values.texto,
    }).then((response) => {
      console.log('texto: ', values.texto);
      setMessageIa(response.data.resposta);
      setValues({texto: ''});
    }).catch((error) => {
      console.error('Error making post request:', error);
    });
  };

  const handleChangeValues = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleButton();
    }
  };

  return (
    <MDBCol md="10" lg="8" xl="12" >
      <MDBCard id="chat2" className='bg-dark' style={{ borderRadius: '0px', height: '100vh'}}>
        <MDBCardHeader className="d-flex justify-content-start gap-4 align-items-center" style={{backgroundColor: '#18181A'}}>
          <h5 className="mb-0 bg-light p-3 text-blue rounded-pill">ZINFE IA</h5>
          <img
            src="gemini.webp"
            alt="avatar 1"
            style={{ width: '50px', borderRadius: 30 }}
          />
        </MDBCardHeader>
        <MDBCardBody>
          <div className="d-flex flex-row justify-content-start">
            <img
              src="zinfe.png"
              alt="avatar 1"
              style={{ width: '65px', height: '100%', borderRadius: 30 }}
            />
            <div style={{maxWidth: '50%'}}>
              {messageIa && <p className='p-3 text-light' style={{borderRadius: '0 12px 12px 12px'}}>{messageIa}</p>}
            </div>
          </div>
        </MDBCardBody>
        <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-2 mb-4 w-50 m-auto" style={{ borderRadius: 10, backgroundColor: '#18181A' }}>
          <img
            src="zinfe.png"
            alt="avatar 3"
            style={{ width: '65px', height: '100%', borderRadius: 30 }}
          />
          <input
            type="text"
            className="form-control form-control-lg text-light"
            style={{backgroundColor: '#18181A'}}
            id="exampleFormControlInput1"
            placeholder="Digite sua dúvida"
            name="texto"
            value={values.texto}
            onChange={handleChangeValues}
            onKeyDown={handleKeyPress}
          />
          <a className="ms-1 text-muted" href="#!">
            <MDBIcon fas icon="paperclip" />
          </a>
          <a className="ms-3 text-muted" href="#!">
            <MDBIcon fas icon="smile" />
          </a>
          <a className="ms-3" href="#!">
            <MDBIcon fas icon="paper-plane" />
          </a>
          <img
            className='buttonia'
            src="gemini.webp"
            alt="avatar 1"
            style={{ width: '50px', cursor: 'pointer', transition: '200ms ease-in-out' }}
            onClick={handleButton}
          />
        </MDBCardFooter>
      </MDBCard>
    </MDBCol>
  );
};

export default Box;
