import React, {Component} from "react";
import { Link } from 'react-router-dom';

import { Card, Collapse } from "react-bootstrap";
import classNames from "classnames";

export default class BasicPortlet extends Component{

    constructor(props){
        super(props)
        this.state = {
            collapse: true,
            loading: false,
            hidden: false
        }
        this.reloadContent = this.reloadContent.bind(this);
        this.toggleContent = this.toggleContent.bind(this);
        this.remove = this.remove.bind(this);
    }

    /**
     * Toggle the body
     */
     toggleContent(){
        this.setState({collapse: !this.state.collapse})
    }

    /**
     * Reload the content
     */
     reloadContent(){
        this.setState({loading: true})
        setTimeout(() => {
            this.setState({loading: false});
        }, 500 + 300 * (Math.random() * 5));
    }


    /**
     * Remove the Card
     */
    remove(){
        this.setState({hidden: true})
    }



    render() {

        return (
            // <!-- start dashboard cards here -->
            <>
                {!this.state.hidden ? (
                    <Card className={classNames(this.props.className)}>
                        {this.state.loading && (
                            <div className="card-disabled">
                                <div className="card-portlets-loader"></div>
                            </div>
                        )}

                        <Card.Body>
                            <div className="card-widgets">
                                <Link to="#" onClick={this.reloadContent}>
                                    <i className="mdi mdi-refresh"></i>
                                </Link>
                                <Link to="#" onClick={this.toggleContent}>
                                    <i
                                        className={classNames('mdi', {
                                            'mdi-minus': this.state.collapse,
                                            'mdi-plus': !this.state.collapse,
                                        })}
                                    ></i>
                                </Link>
                                <Link to="#" onClick={this.remove}>
                                    <i className="mdi mdi-close"></i>
                                </Link>
                            </div>

                            <h5 className={classNames('mb-0', this.props.titleClass)}>{this.props.cardTitle}</h5>

                            <Collapse in={this.state.collapse}>
                                <div>
                                    <div className="pt-3">{this.props.children}</div>
                                </div>
                            </Collapse>
                        </Card.Body>
                    </Card>
                ) : null}
            </>
            
            // <!-- end dashboard cards here --> 
        );
    }
}

