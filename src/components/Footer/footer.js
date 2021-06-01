import { Box, IconButton, Link } from '@material-ui/core';
import React, { useState } from "react";
import Icon from '@mdi/react';
import {mdiFacebook as FacebookIcon,mdiTwitter as TwitterIcon,mdiGithub as GithubIcon,} from '@mdi/js'
import { makeStyles } from '@material-ui/core/styles';

export default function Footer(props) {

    const useStyles = makeStyles((theme) => ({
        footer:{
            justifyContent:"center",
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            margin:'auto',
            width:'70%',
            justifyContent:'space-around'
        },
        link: {
            '&:not(:first-child)': {
                paddingLeft: 30
            },

        },

    }))
    var classes = useStyles();
    return (
        <div className={classes.footer}>
 
            <div >
                <Link
                    color={'inherit'}
                    href={'/'}
                    target={'_blank'}
                    className={classes.link}
                >
                    SchoolHub
                </Link>
                <Link
                    color={'inherit'}
                    href={'/'}
                    target={'_blank'}
                    className={classes.link}
                >
                    About Us
                </Link>
                <Link
                    color={'inherit'}
                    href={'/'}
                    target={'_blank'}
                    className={classes.link}
                >
                    Blog
                </Link>
            </div>
            <div>
                <Link
                    href={'https://www.facebook.com/saadullah.shah.1/'}
                    target={'_blank'}
                >
                    <IconButton aria-label="facebook">
                        <Icon
                            path={FacebookIcon}
                            size={1}
                            color="#6E6E6E99"
                        />
                    </IconButton>
                </Link>
                <Link
                    href={'https://twitter.com/i_mub33n'}
                    target={'_blank'}
                >
                    <IconButton aria-label="twitter">
                        <Icon
                            path={TwitterIcon}
                            size={1}
                            color="#6E6E6E99"
                        />
                    </IconButton>
                </Link>
                <Link
                    href={'https://github.com/SaadShah11/SchoolHub-Latest'}
                    target={'_blank'}
                >
                    <IconButton
                        aria-label="github"
                        style={{ marginRight: -12 }}
                    >
                        <Icon
                            path={GithubIcon}
                            size={1}
                            color="#6E6E6E99"
                        />
                    </IconButton>
                </Link>
            </div>
        
        </div>
    )
}