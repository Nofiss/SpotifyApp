import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from "graphql-tag";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

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
                            preview_url
                            duration_ms
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
                {({ loading, error, data }) => {
                    return (
                        <div>
                            {loading &&
                                <p>caricamento...</p>}
                            {!loading && !error &&
                                <div>
                                    {data.me.top_tracks.map((item, idx) => {
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
                                                            <div>{item.artists[0].name}</div>
                                                        </div>
                                                        <div className="space">
                                                            <div>{item.album.name}</div>
                                                        </div>
                                                        <div className="space">
                                                            <a href={item.preview_url} target="_blank">
                                                                <FontAwesomeIcon icon={faPlay} />
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                    }
                                </div>}
                        </div>
                    )
                }}
            </Query>
        )
    }
}
