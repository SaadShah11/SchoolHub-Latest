import React, { Component } from 'react';
import classes from './Footer.module.css';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import PhoneIcon from '@material-ui/icons/Phone';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

export default class Footer extends Component {
    render() {
        return (
            <div className={classes.rootCont}>
                    <text className={classes.first}>Get In Touch</text>
                <div className={classes.second}>
                    <div className={classes.contactLink}>
                        <PhoneIcon className={classes.contactIcon}  />
                        <p className={classes.contactText}>(+92)-323-2344242</p>
                    </div>
                    <div className={classes.contactLink}>
                        <MailOutlineIcon className={classes.contactIcon} s />
                        <p className={classes.contactText}>rootsinter@gmail.com</p>
                    </div>
                    <div className={classes.contactLink}>
                        <WhatsAppIcon className={classes.contactIcon} />
                        <p className={classes.contactText}>(+92)-323-2344242</p>
                    </div>
                </div>

                <div className={classes.third}>
                    <FacebookIcon className={classes.accIcon} />
                    <GitHubIcon className={classes.accIcon} />
                    <InstagramIcon className={classes.accIcon} />
                </div>
                
            </div>
        );
    }
}