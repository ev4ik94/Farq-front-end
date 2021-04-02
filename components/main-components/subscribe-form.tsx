import { useTranslation } from 'react-i18next'

/*---Bootstrap-components---*/
import {Container, Form, Button} from "react-bootstrap"


/*----Icons----*/
import {Instagram, Facebook} from "react-bootstrap-icons";


/*---Styles----*/
import classes from '../../styles/main-components/form-subscribe.module.sass'

export function SubscribeForm(){

    const {t} = useTranslation()


    return(
        <div className={`${classes['wrap-subscribe-form']}`}>
            <Container>
                <div className={`d-flex flex-column justify-content-center`}>
                    <p className={`mb-0`}>{t('subscribe-form.title')}</p>
                </div>
                <div className='mt-3'>
                    <Form className={`d-flex`}>
                        <Form.Group controlId="formBasicEmail" className={`mb-0 w-100 mr-3`}>
                            <Form.Control type="email" placeholder={t('subscribe-form.input')} />
                        </Form.Group>
                        <Button type="submit"
                                onClick={(e)=>{
                                    e.preventDefault()
                                }}>
                            {t('subscribe-form.button')}
                        </Button>
                    </Form>
                </div>

                <div className={`${classes['social-links']}`}>
                    <a href="https://instagram.com/" target='_blank'>
                        <Instagram />
                    </a>
                    <a href="https://www.facebook.com/" target='_blank'>
                        <Facebook />
                    </a>
                </div>
            </Container>
        </div>
    )
}
