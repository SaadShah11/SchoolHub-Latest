import React, { Component } from 'react';
import classes from './Footer.module.css';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import Insta from './instagram.png';
import GitHubIcon from '@material-ui/icons/GitHub';
import Logo from './logo.png'
import PhoneIcon from '@material-ui/icons/Phone';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

export default class Footer extends Component {
    render() {
        return (
            <div className={classes.rootCont}>
                <div className={classes.div1}>
                    <img className={classes.logo} src={Logo}/>
                    <p className={classes.abtText}>School-Hub is one of the leading private institutions of Pakistan. RISC is a world class academic institution with a proud history of achievements and ambitious plans for the future.
                    School-Hub is one of the leading private institutions of Pakistan. RISC is a world class academic institution with a proud history of achievements and ambitious plans for the future.</p>            
                </div>
                {/* <div className={classes.div2}>
                    <p className={classes.abtHead}>Quick Links</p>
                    <div className={classes.linksCont}>
                        <a href="/home" className={classes.links}> Home</a>
                        <a href="/research" className={classes.links}> Faculty</a>
                        <a href="/calendar" className={classes.links}> Academic</a>
                        <a href="/" className={classes.links}> Fee Structure</a>
                        <a href="/about" className={classes.links}> About Us</a>
                    </div>
                </div> */}

                <div className={classes.div4}>
                    <p className={classes.abtHead2}>Get In Touch</p>
                    <div className={classes.contactLink}>
                        <PhoneIcon className={classes.contactIcon}  />
                        <p className={classes.contactText}>(+92)-323-2344242</p>
                    </div>
                    <div className={classes.contactLink}>
                        <MailOutlineIcon className={classes.contactIcon} s/>
                        <p className={classes.contactText}>rootsinter@gmail.com</p>
                    </div>
                    <div className={classes.contactLink}>
                        <WhatsAppIcon className={classes.contactIcon} />
                        <p className={classes.contactText}>(+92)-323-2344242</p>
                    </div>
                    <div className={classes.accCont}>
                        <FacebookIcon className={classes.accIcon}/>
                        <GitHubIcon className={classes.accIcon} />
                        <InstagramIcon className={classes.accIcon}  />
                    </div>
                </div>
            </div>
        );
    }
}