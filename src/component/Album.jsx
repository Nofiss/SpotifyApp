import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from "graphql-tag";

export default class Album extends Component {
    render() {
        return (
            <Query query={gql`
                query myAlbum{
                    me{
                        albums{
                            album{
                                name
                                popularity
                                uri
                                artists{
                                    name
                                }
                                images{
                                    url
                                }
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
                            {data.me.albums.map((item) => {
                                return(            
                                    <div className="container">      
                                        <a href={item.album.uri}>                    
                                            <div className="album">
                                                <img src={item.album.images[2].url} alt="fotoProfilo" />
                                                <div>{item.album.name}</div>
                                                <div>{item.album.artists[0].name}</div>
                                                <div>{item.album.popularity}</div>
                                            </div>
                                        </a>
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
