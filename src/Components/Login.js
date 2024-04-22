import React, {useState} from 'react';
import { Form, ButtonToolbar, Button, FlexboxGrid, Panel, Animation } from 'rsuite';



function Login() {
    const [Reg_Log, setReg_Log] = useState("Bejelentkezés");
    const [btnreglog, setbtnreglog] = useState("Regisztráció");
    function handleReg_Log() {
      if (Reg_Log === "Bejelentkezés") {
        setReg_Log("Regisztráció");
        setbtnreglog("Bejelentkezés");
      } else {
        setReg_Log("Bejelentkezés");
        setbtnreglog("Regisztráció");
      }
    };
    const Flexboxgrid = React.forwardRef((props, ref) => (
        <div
        {...props}
        ref={ref}
        //style={{ background: '#000', width: 100, height: 160, overflow: 'hidden' }}
        >
            <FlexboxGrid justify="center" style={{ marginTop: '40px' }}>
                <Panel header={<h3 style={{ textAlign: 'center' }}>{Reg_Log}</h3>} bordered>
                    <Form>
                        <Form.Group >
                            <Form.Group hidden={Reg_Log === "Bejelentkezés"}>
                                <Form.ControlLabel >Teljes Név</Form.ControlLabel>
                                <Form.Control name="name" />
                            </Form.Group>
                            <Form.ControlLabel>Email</Form.ControlLabel>
                            <Form.Control name="email" type="email" />
                            <Form.Group hidden={Reg_Log === "Bejelentkezés"}>
                                <Form.ControlLabel >Telefonszám</Form.ControlLabel>
                                <Form.Control name="phone" />
                                <Form.HelpText >pl.: +36301234567</Form.HelpText>
                            </Form.Group>

                            <Form.ControlLabel>Jelszó</Form.ControlLabel>
                            <Form.Control name="password" type="password" autoComplete="off" />
                        </Form.Group>
                        <Form.Group>
                        <ButtonToolbar>
                            <Button appearance="primary" onClick={handleReg_Log}>{btnreglog}</Button>
                            <Button appearance="primary" color='green' >Tovább</Button>
                        </ButtonToolbar>
                        </Form.Group>
                    </Form>
                </Panel>
            </FlexboxGrid>
        </div>
    ));

  return (
    <div>
      <Animation.Bounce in={true}>
        {(props, ref) => <Flexboxgrid {...props} ref={ref} />}
      </Animation.Bounce>
    </div>
  );
}

export default Login;
