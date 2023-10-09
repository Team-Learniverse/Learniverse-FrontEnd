import { useState } from 'react';

import { ConsumeInfo } from '@/types/socket';

type UseVideoSelectorType = [string | null, (stream: ConsumeInfo) => void];

const useVideoSelector = (): UseVideoSelectorType => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const handleSelectVideo = (stream: ConsumeInfo) => {
    setSelectedVideo(
      selectedVideo === stream.consumer_id ? null : stream.consumer_id,
    );
  };

  return [selectedVideo, handleSelectVideo];
};

export default useVideoSelector;
