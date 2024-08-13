import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Chip,
  Tooltip,
  Badge,
} from '@mui/material';
import {
  IFeedPostViewpoint,
  DefaultReactionsTypeEnum,
  HumanityTypeEnum,
} from '@duality-social/duality-social-lib';
import Reply from './reply';
import ReactionIcon from './reaction-icon';
import HumanityTypeIcon from './humanity-type-icon';

interface ViewpointProps {
  viewpoint: IFeedPostViewpoint;
  isLeft: boolean;
}

const Viewpoint: React.FC<ViewpointProps> = ({ viewpoint, isLeft }) => {
  const [showReactions, setShowReactions] = useState(false);
  const [humanVotes, setHumanVotes] = useState(
    viewpoint.metadata.humanityByType.Human || 0
  );
  const [aiVotes, setAiVotes] = useState(
    viewpoint.metadata.humanityByType.Ai || 0
  );
  const [botVotes, setBotVotes] = useState(
    viewpoint.metadata.humanityByType.Bot || 0
  );
  const [expanded, setExpanded] = useState(true);

  const handleReact = (reactionType: DefaultReactionsTypeEnum) => {
    // TODO: Implement reaction logic
    console.log(`Reacted with: ${reactionType}`);
  };

  const handleVote = (voteType: HumanityTypeEnum) => {
    // TODO: Implement API call to update vote
    if (voteType === HumanityTypeEnum.Human) {
      setHumanVotes((prevVotes: number) => prevVotes + 1);
    } else if (voteType === HumanityTypeEnum.Ai) {
      setAiVotes((prevVotes: number) => prevVotes + 1);
    } else if (voteType === HumanityTypeEnum.Bot) {
      setBotVotes((prevVotes: number) => prevVotes + 1);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isLeft ? 'flex-start' : 'flex-end',
        width: '48%',
      }}
    >
      <IconButton onClick={() => setExpanded(!expanded)}>
        {expanded ? '-' : '+'}
      </IconButton>
      {expanded && (
        <>
          <Typography variant="body1">{viewpoint.content}</Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, my: 1 }}>
            {Object.entries(viewpoint.metadata.reactionsByType).map(
              ([type, count]) => (
                <Chip
                  key={type}
                  icon={
                    <ReactionIcon
                      reactionType={type as DefaultReactionsTypeEnum}
                    />
                  }
                  label={`${count}`}
                  size="small"
                  variant="outlined"
                />
              )
            )}
          </Box>

          <Box sx={{ display: 'flex', gap: 1, mb: 1, position: 'relative' }}>
            <Badge badgeContent={humanVotes} color="primary">
              <IconButton
                size="small"
                onClick={() => handleVote(HumanityTypeEnum.Human)}
              >
                <HumanityTypeIcon humanityType={HumanityTypeEnum.Human} />
              </IconButton>
            </Badge>
            <Badge badgeContent={aiVotes} color="secondary">
              <IconButton
                size="small"
                onClick={() => handleVote(HumanityTypeEnum.Ai)}
              >
                <HumanityTypeIcon humanityType={HumanityTypeEnum.Ai} />
              </IconButton>
            </Badge>
            <Badge badgeContent={botVotes} color="error">
              <IconButton
                size="small"
                onClick={() => handleVote(HumanityTypeEnum.Bot)}
              >
                <HumanityTypeIcon humanityType={HumanityTypeEnum.Bot} />
              </IconButton>
            </Badge>
            <IconButton
              size="small"
              onMouseEnter={() => setShowReactions(true)}
              onMouseLeave={() => setShowReactions(false)}
            >
              <ReactionIcon reactionType={DefaultReactionsTypeEnum.Like} />
            </IconButton>
            {showReactions && (
              <Box
                sx={{
                  position: 'absolute',
                  bottom: '100%',
                  left: 0,
                  display: 'flex',
                  backgroundColor: 'white',
                  borderRadius: '20px',
                  boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
                  padding: '5px',
                }}
              >
                {Object.values(DefaultReactionsTypeEnum).map((reactionType) => (
                  <Tooltip key={reactionType} title={reactionType}>
                    <IconButton
                      size="small"
                      onClick={() => handleReact(reactionType)}
                    >
                      <ReactionIcon reactionType={reactionType} />
                    </IconButton>
                  </Tooltip>
                ))}
              </Box>
            )}
          </Box>

          <Typography variant="caption" sx={{ mb: 1 }}>
            Replies: {viewpoint.metadata.replies}
          </Typography>

          {viewpoint.replies &&
            viewpoint.replies.map((reply, index) => (
              <Reply
                key={index}
                reply={reply as unknown as IFeedPostViewpoint}
                isLeft={isLeft}
              />
            ))}
        </>
      )}
    </Box>
  );
};
export default Viewpoint;
