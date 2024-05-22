const VideoInSideBareAppPage = () => {
  return (
    <iframe
      src="https://www.youtube.com/embed/1z6U0HUKWQg"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
      style={{ width: '100%', height: '40%', borderRadius: '25px' }}
    ></iframe>
  );
};
export default VideoInSideBareAppPage;
