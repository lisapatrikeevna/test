import { useEffect, useState } from 'react';
import {
  getVideo,
  getVideoMetadata,
} from '../../services/videoServices/videoShow.service';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
  setError,
  setLoading,
  setVideoUrl,
  setBuffering,
} from '../../store/video/videoSlice';
import {
  Grid,
  Paper,
  Typography,
  Container,
  Skeleton,
  Button,
  Box,
  TextField,
  IconButton,
  Avatar,
} from '@mui/material';
import {
  Contacts,
  ContentCopy,
  Facebook,
  Flag,
  IosShare,
  JoinFull,
  LinkedIn,
  ThumbDown,
  ThumbUp,
  X,
} from '@mui/icons-material';
import { useLikeHandler } from '../../components/VideoComponents/useVideoHandlers/UseLikeProgress.tsx';
import VideoListHorizontal from '../../components/VideoComponents/VideoListHorizontal';
import { useViewProgress } from '../../components/VideoComponents/useVideoHandlers/UseViewProgress.tsx';
import Modal from '../../components/Modal.tsx';
import HandleShareOnFacebook from '../../components/VideoComponents/VideoShare/HandleShareOnFacebook.tsx';
import HandleShareOnX from '../../components/VideoComponents/VideoShare/HandleShareOnX.tsx';
import HandleShareOnLinkedIn from '../../components/VideoComponents/VideoShare/HandleShareOnLinkedIn.tsx';
import { getUserAvatar } from '../../services/userServices/getUserAvatar.service';
import { getAllUsers } from '../../services/userServices/getAllUsers.service.ts';
import { RenderValuesCentralComponent } from '../AppPage.tsx';

interface VideoPageProps {
  videoId: string | null;
  changeRenderCentralComponent: (value: RenderValuesCentralComponent) => void;
}

const VideoPage: React.FC<VideoPageProps> = ({
  videoId,
  changeRenderCentralComponent,
}) => {
  const dispatch = useDispatch();
  const { videoUrl, buffering, loading } = useSelector(
    (state: RootState) => state.video
  );
  const [videoName, setVideoName] = useState('');
  const [description, setDescription] = useState('');
  const [views, setViews] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const { handleVideoProgress } = useViewProgress(videoDuration, videoId || '');
  const { likes, hasLiked, handleLike, hasDisliked, handleDislike, setLikes } =
    useLikeHandler(videoId || '');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const link = window.location.href;
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState('No user found');
  const [avatar, setAvatar] = useState<string | null>(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(link);
    alert('Link copied to clipboard!');
  };

  useEffect(() => {
    const loadAvatar = async () => {
      if (userId) {
        try {
          const userAvatar = await getUserAvatar(userId);
          if (userAvatar) {
            setAvatar(userAvatar.id);
          } else {
            console.error('Avatar not found');
          }
        } catch (error) {
          console.error('Error loading avatar:', error);
        }
      }
    };

    loadAvatar();
  }, [userId]);

  //TODO change user.login for user.userName

  useEffect(() => {
    const loadVideo = async () => {
      if (videoId) {
        dispatch(setLoading(true));
        try {
          const videoData = await getVideo(videoId);
          const metadata = await getVideoMetadata(videoId);
          setVideoName(metadata.videoName);
          setDescription(metadata.description);
          setViews(metadata.videoInfo.contentViewsByUsers.length);
          setLikes(metadata.videoInfo.contentLikesByUsers.length);
          setUserId(metadata.ownerId);
          console.log('userId = ', userId);
          console.log('ownerId = ', metadata.ownerId);
          let blobUrl = '';
          if (videoData) {
            blobUrl = URL.createObjectURL(videoData);
            dispatch(setVideoUrl(blobUrl));
          } else {
            console.error('Video data is null');
          }
        } catch (error) {
          const err = error as Error;
          console.error('Error loading video:', err);
          dispatch(setError(err.message));
        } finally {
          dispatch(setLoading(false));
        }
      }
    };

    loadVideo();
  }, [videoId, dispatch, setLikes, setUserId]);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const users = await getAllUsers();
        const user = users.find((user) => user.id === userId);
        if (user) {
          setUserName(user.login);
        } else {
          console.error('User not found');
        }
      } catch (error) {
        console.error('Error loading users:', error);
      }
    };

    if (userId) {
      loadUser();
    }
  }, [userId]);

  if (loading) {
    return (
      <Container>
        <Skeleton variant="rectangular" width={1200} height={800} />
        <Skeleton />
        <Skeleton width="60%" />
      </Container>
    );
  }
  return (
    <Grid
      container
      spacing={3}
      style={{ flexWrap: 'nowrap', justifyContent: 'center' }}
    >
      <Grid
        item
        xs={12}
        md={8}
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          maxWidth: '1200px',
        }}
      >
        <Container style={{ padding: 0 }}>
          {videoUrl ? (
            <ReactPlayer
              style={{ margin: 0 }}
              width="100%"
              height="auto"
              url={videoUrl}
              controls={true}
              playing={false}
              type="video/mp4"
              onBuffer={() => dispatch(setBuffering(true))}
              onBufferEnd={() => dispatch(setBuffering(false))}
              config={{ file: { attributes: { preload: 'metadata' } } }}
              onProgress={(state) => handleVideoProgress(state)}
              onDuration={setVideoDuration}
            />
          ) : (
            <Typography>Loading...</Typography>
          )}
          {buffering && <Typography>Buffering...</Typography>}
          <Box>
            <Typography variant="h4">{videoName}</Typography>
            {/*Container for all info about video*/}
            <Container style={{ display: 'flex', flexDirection: 'row' }}>
              <Container style={{ display: 'flex', flexDirection: 'row' }}>
                {/*Place for Avatar (first in a row)*/}
                <Box
                  style={{
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'center',
                  }}
                >
                  {/*TODO AVATAR and press on it, navigate to thisUserChannel*/}
                  {avatar ? (
                    <Avatar
                      src={avatar}
                      alt="avatar"
                      sx={{
                        width: 34,
                        height: 34,
                        cursor: 'pointer',
                        position: 'relative',
                      }}
                    />
                  ) : (
                    <Contacts sx={{ fontSize: 34 }} />
                  )}
                </Box>
                <Container style={{ display: 'flex', flexDirection: 'column' }}>
                  <Container
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '10px',
                    }}
                  >
                    <Typography>{views} views</Typography>
                    <Typography>2 weeks ago</Typography>
                  </Container>
                  {/*TODO измени отображение login на UserName*/}
                  <Container style={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography>{userName}</Typography>
                  </Container>
                </Container>
                <Container
                  style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}
                >
                  <Button
                    variant="outlined"
                    startIcon={<ThumbUp />}
                    onClick={handleLike}
                    color={hasLiked ? 'primary' : 'inherit'}
                  >
                    {likes}
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<ThumbDown />}
                    onClick={handleDislike}
                    color={hasDisliked ? 'primary' : 'inherit'}
                  />
                  <Button variant="text" size="small" startIcon={<JoinFull />}>
                    Subscribe
                  </Button>
                  <Button variant="text" startIcon={<Flag />}>
                    Report
                  </Button>
                  <Button
                    variant="text"
                    startIcon={<IosShare />}
                    onClick={handleOpenModal}
                  >
                    Share
                  </Button>
                  <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                    <Box sx={{ textAlign: 'center', p: 2 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          gap: 3,
                          mb: 2,
                        }}
                      >
                        <Facebook
                          onClick={() => HandleShareOnFacebook(link)}
                          style={{ cursor: 'pointer', fontSize: '52px' }}
                        />
                        <X
                          onClick={() => HandleShareOnX(link)}
                          style={{ cursor: 'pointer', fontSize: '52px' }}
                        />
                        <LinkedIn
                          onClick={() => HandleShareOnLinkedIn(link)}
                          style={{ cursor: 'pointer', fontSize: '52px' }}
                        />
                        {/* Add more icons as needed */}
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <TextField
                          value={link}
                          InputProps={{
                            readOnly: true,
                          }}
                          variant="outlined"
                          sx={{ width: '300px', mr: 1 }}
                        />
                        <IconButton onClick={handleCopyLink}>
                          <ContentCopy />
                        </IconButton>
                      </Box>
                    </Box>
                  </Modal>
                </Container>
              </Container>
            </Container>
            <Box>
              <Typography variant="h5">Description</Typography>
              <Typography>{description}</Typography>
            </Box>
          </Box>
          <Box style={{ padding: 0, marginTop: 15 }}>
            <Paper elevation={3}>
              <VideoListHorizontal
                currentVideoId={videoId || ''}
                changeRenderCentralComponent={changeRenderCentralComponent}
              />
            </Paper>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
};

export default VideoPage;
