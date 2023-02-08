import React, {useEffect, useState} from 'react';
import {getRecommendations} from './services';
import {RecommendationInfo} from './gRPC/rooms/models_pb';
import S from './App.module.css';


function App() {

	const [featuredVideos, setFeaturedVideos] = useState<RecommendationInfo.AsObject[]>([]);

	useEffect(() => {
		//TODO you can remove the from here and move it wherever you want.
		getRecommendations().then((response) => {
			if (response.error) {
				return;
			}
      setFeaturedVideos(response.recommendationsList.filter((info) => info.position >= 0 && info.position < 100));
		});
	}, []);

	return (
		<div className={S.app}>
			<div className={S.title}>Videos</div>
			<hr/>
			<div className={S.subtitle}>Example:</div>
      <div className={S.example}>
	      <img width={260} src={featuredVideos[0]?.metadata!.thumbnailUrl} alt={featuredVideos[0]?.metadata!.title}/>
        <div><b>title:</b> {featuredVideos[0]?.metadata!.title}</div>
        <div><b>video duration:</b> {featuredVideos[0]?.metadata!.duration}</div>
        <div><b>video ID:</b>{featuredVideos[0]?.metadata!.sid}</div>
      </div>

		</div>
	);
}

export default App;
