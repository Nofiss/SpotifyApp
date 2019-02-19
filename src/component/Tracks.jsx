import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from "graphql-tag";

export default class Tracks extends Component {
    render() {
        return (
            <Query query={gql`
                query myTrack{
                    me{
                        top_tracks{
                            name
                            uri
                            id
                            popularity
                            artists{
                                name
                            }
                            album{
                                name
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
                            {data.me.top_tracks.map((item) => {
                                return(
                                    <div className="container" id={item.id} >
                                        <div className="tracks">
                                            <a href={item.uri}>
                                                <div className="track">
                                                    <div className="space">    
                                                        <div>{item.name}</div>
                                                    </div>
                                                    <div className="space">
                                                        <div>{item.artists[0].name}</div>
                                                    </div>
                                                    <div className="space">
                                                        <div>{item.album.name}</div>
                                                    </div>
                                                    <div className="space">
                                                        <div>{item.popularity}</div>
                                                    </div>                                                    
                                                </div>
                                            </a>
                                        </div>
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
