import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from "graphql-tag";
export default class Utente extends Component {
    render() {
        return (
            <Query query={gql`
                query myUser{
                    me {
                        id
                        display_name
                        country
                        email
                        images {
                            url
                        }
                    }
                }
            `}>
                {({ loading, error, data }) => (
                    <div className="utenti">
                        {loading &&
                            <p>caricamento...</p>}
                        {!loading &&
                            <div id="{data.me.id}" className="containerUser">
                                <div className="containerImage">
                                    <div className="image">{/*data.me.images.url*/}</div>
                                    <img src="https://leganerd.com/wp-content/uploads/2018/04/earthhead-999x624.jpg" alt="img" style={{ width: "80%", display: "block", marginLeft: "auto", marginRight: "auto" }} />
                                </div>
                                <div className="info">
                                    <div className="name">Name: {data.me.display_name}</div>
                                    <div className="country">Country: {data.me.country}</div>
                                    <div className="email">Email: {data.me.email}</div>
                                </div>
                            </div>}
                    </div>
                )}
            </Query>
        )
    }
}
