import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from "graphql-tag";
import { Link } from "react-router-dom";

export default class Album extends Component {
    render() {
        return (
            <Query query={gql`
                query myArtists{
                    me{
                        artists{
                            name
                            id
                            popularity
                            images{
                              url
                            }
                        }
                    }
                }
            `}
            fetchPolicy='no-cache'
            >
            {({loading, error, data}) => {
                return(
                <div>
                    {loading &&
                        <p>caricamento...</p>}
                    {!loading && !error &&
                        <div>
                            {data.me.artists.map((item) => {
                                return(
                                    <div className="container" id={item.id}>
                                        <Link to={"/" + item.id}>          
                                            <div className="artist">
                                                <img src={item.images[2].url} alt="fotoProfilo" style={{ width: "100px" }} />
                                                <div>{item.name}</div>
                                                <div>{item.popularity}</div>
                                            </div>
                                        </Link>
                    
                                    </div>
                                )
                            })
                            }
                        </div>} 
                </div>
            )}}
            </Query>
        )
    }
}
