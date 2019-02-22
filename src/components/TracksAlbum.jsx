import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from "graphql-tag";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

library.add(faPlay)

const humanizeDuration = require('humanize-duration')
humanizeDuration(12000) // '12 seconds'


const shortEnglishHumanizer = humanizeDuration.humanizer({
 language: 'shortEn',
 languages: {
   shortEn: {
     m: () => '',
     s: () => '',
   }
 },
 round: true,
 conjunction:':'
})

shortEnglishHumanizer(15600000)

export default class TracksAlbum extends Component {
    render() {
        const id = this.props.match.params.topicId
        return (
            <Query query={gql`
                query myAlbumTracks($id: String!){
                    album(id: $id){
                        name
                        id
                        images{
                          url
                        }
                        artists{
                            id
                        }
                        tracks {
                            name
                            uri
                          id
                            preview_url
                          duration_ms
                        }
                    }
                }
            `}
                variables={{ id: id }}
                fetchPolicy='no-cache'
            >
                {({ loading, error, data }) => {
                    return (
                        <div>
                            {loading &&
                                <p>caricamento...</p>}
                            {!loading && !error &&
                                <div>
                                    <div className="artista">
                                        <Link to={'/artist/' + data.album.artists[0].id}>
                                            <img src={data.album.images[1].url} alt="album" style={{ width: "300px" }} />
                                        </Link>
                                        <div>{data.album.name}</div>
                                    </div>
                                    {data.album.tracks.map((item, idx) => {
                                        return (
                                            <div className="container" id={item.id} >
                                                <div className="tracks">
                                                    <div className="track">
                                                        <div className="space">
                                                            <div>{idx}</div>
                                                        </div>
                                                        <div className="space">
                                                            <div>{shortEnglishHumanizer(item.duration_ms)}</div>
                                                        </div>
                                                        <a href={item.uri} className="rowLink">
                                                            <div>{item.name}</div>
                                                        </a>
                                                        <div className="space">
                                                            {item.preview_url === null ?
                                                                <FontAwesomeIcon icon={faTimes} style={{ width: "20px" }} />
                                                                :
                                                                <a href={item.preview_url} target="_blank">
                                                                    <FontAwesomeIcon icon={faPlay} />
                                                                </a>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                    }
                                </div>
                            }
                        </div>
                    )
                }}
            </Query>
        )
    }
}
