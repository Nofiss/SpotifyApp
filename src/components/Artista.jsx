import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from "graphql-tag";



export default class Artista extends Component {
    render() {
        const id = this.props.match.params.topId
        console.log(this.props.match.params.topId)
        return (
            <Query query={gql`
                query myArtist($id: String!){
                    artist(id: $id){
                        name
                        id
                        images{
                          url
                        }
                        albums{
                            name
                            release_date
                            images{
                                url
                            }
                        }
                    }
                }
            `}
            variables={{id: id}}
            fetchPolicy='no-cache'
            >
            {({loading, error, data}) => {
                return(
                <div>
                    {loading &&
                        <p>caricamento...</p>}
                    {!loading && !error &&
                       <div>
                            <div className="artista">
                                <img src={data.artist.images[1].url} alt="artist" style={{ width: "300px" }} />
                                <div>{data.artist.name}</div>
                            </div>
                            <div className="artistaAlbums">
                                {data.artist.albums.map(item => {
                                    return(
                                        <div id={item.id} className="artistaAlbum">
                                            <img src={item.images[1].url} alt="album" style={{ width: "200px"}} />
                                            <div>{item.name}</div>
                                            <div>{item.release_date}</div>
                                        </div>
                                    )} 
                                )}
                            </div>
                       </div>                        
                       } 
                </div>
            )}}
                    </Query>
        )
    }
}
