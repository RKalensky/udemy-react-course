import React from 'react';
import './index.styl';
import MenuToggle from '../../components/Navigation/MenuToggle';
import Menu from '../../components/Navigation/Menu';

export default class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenuOpened: false
        }
    }

    toggleMenuHandler = () => {
        this.setState((prevState) => {
            return {
                isMenuOpened: !prevState.isMenuOpened
            }
        })
    }

    closeMenu = () => {
        this.setState({
            isMenuOpened: false
        })
    }

    setAdditionalMenuClasses() {
        return [this.setOpenClass()];
    }

    setAdditionalToggleMenuClasses() {
        return [this.setOpenClass()];
    }

    setOpenClass() {
        return this.state.isMenuOpened ? 'opened' : '';
    }

    render() {
        return (
            <main className='layout'>
                <Menu
                    additionalClasses={this.setAdditionalMenuClasses()}
                    closeMenuHandler={this.closeMenu}
                ></Menu>
                <MenuToggle
                    onClickHandler={this.toggleMenuHandler}
                    additionalClasses={this.setAdditionalToggleMenuClasses()}
                ></MenuToggle>
                { this.props.children }
            </main>
        );
    }
}
