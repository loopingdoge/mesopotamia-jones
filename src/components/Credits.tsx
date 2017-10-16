import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'
import { Icon } from 'react-icons-kit'
import { Link } from 'react-router-dom'

import { home } from 'react-icons-kit/ionicons/home'
import { socialGithub } from 'react-icons-kit/ionicons/socialGithub'
import { socialTwitter } from 'react-icons-kit/ionicons/socialTwitter'

import * as AlbyImage from '../../assets/images/alby.jpg'
import * as DevImage from '../../assets/images/dev.jpg'

import { arvo } from '../utils/fonts'

import withWidthHeight from '../containers/widthHeightProvider'

import Actions, {
    addActionListener,
    removeActionListener
} from '../config/actions'
import l10n from '../l10n'

import Button from './Button'
import PressToContinue from './PressToContinue'

const fadeIn = {
    from: {
        opacity: 0.9
    },
    to: {
        opacity: 1
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'rgba(255, 255, 255, 0.28) 0px 0px 24px',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        border: '1px solid rgba(255, 255, 255, 0.09)',
        padding: '40px 0px',
        animationName: [fadeIn],
        animationDuration: '0.5s'
    },
    wrapper: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: [arvo, 'sans-serif'],
        color: 'white',
        fontWeight: 'bold'
    },
    title: {
        fontSize: '8vw'
    },
    subtitle: {
        fontSize: '2vw'
    },
    devsContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        fontSize: '2vw',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    dev: {
        margin: '0px 32px',
        display: 'flex',
        flexDirection: 'column'
    },
    devImage: {
        alignSelf: 'center',
        borderRadius: '50px',
        width: '90px',
        height: '90px',
        backgroundSize: 'cover',
        marginBottom: '12px',
        boxShadow:
            '0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12)'
    },
    goBack: {},
    button: {
        minWidth: '25%'
    },
    iconContainer: {
        transition: 'color 0.5s, background-color 0.5s',
        borderRadius: '24px',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: '#FFFFFF',
        ':hover': {
            color: '#FDD466'
        }
    },
    iconsRow: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '12px',
        justifyContent: 'space-around'
    }
})

export interface CreditsProps {
    onClose: (...args: any[]) => any
    width: number
    height: number
}

export interface IconLinkProps {
    icon: any
    href: string
}

const IconLink = ({ icon, href }: IconLinkProps) => (
    <div className={css(styles.iconContainer)}>
        <a href={href} target="_blank">
            <Icon icon={icon} size={32} />
        </a>
    </div>
)

export interface IconsProps {
    homeHref: string
    twitterHref: string
    githubHref: string
}

const Icons = ({ homeHref, twitterHref, githubHref }: IconsProps) => (
    <div className={css(styles.iconsRow)}>
        <IconLink icon={home} href={homeHref} />
        <IconLink icon={socialTwitter} href={twitterHref} />
        <IconLink icon={socialGithub} href={githubHref} />
    </div>
)

class Credits extends React.Component<CreditsProps> {
    render() {
        const { onClose, width, height } = this.props

        return (
            <div className={css(styles.container)}>
                <div className={css(styles.wrapper)} style={{ width, height }}>
                    <div className={css(styles.title)}>Credits</div>
                    <div className={css(styles.subtitle)}>
                        Made with 💛 by Looping Doge
                    </div>
                    <div className={css(styles.devsContainer)}>
                        <div className={css(styles.dev)}>
                            <div
                                className={css(styles.devImage)}
                                style={{ backgroundImage: `url(${AlbyImage})` }}
                            />
                            <span>Alberto Nicoletti</span>
                            <Icons
                                homeHref="https://illbe.xyz"
                                twitterHref="https://twitter.com/illbexyz"
                                githubHref="https://github.com/illbexyz"
                            />
                        </div>
                        <div className={css(styles.dev)}>
                            <div
                                className={css(styles.devImage)}
                                style={{ backgroundImage: `url(${DevImage})` }}
                            />
                            <span>Devid Farinelli</span>
                            <Icons
                                homeHref="https://devid.io"
                                twitterHref="https://twitter.com/misterdev_"
                                githubHref="https://github.com/misterdev"
                            />
                        </div>
                    </div>
                    <div className={css(styles.goBack)}>
                        <Link to={'/'} style={{ textDecoration: 'none' }}>
                            <Button
                                text={l10n.close_game}
                                onClick={() => ({})}
                                customCSS={styles.button}
                            />
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default withWidthHeight(Credits)
